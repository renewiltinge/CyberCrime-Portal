<#
.SYNOPSIS
    Haalt de NineMinds-huislaag op in dit product en legt vast van welke commit.

.DESCRIPTION
    Dit script staat in een product als nineminds/sync.ps1, maar komt uit NineMinds:
    house/sync.ps1 is het origineel en elke sync kopieert dat mee, zodat een verbetering
    aan het script vanzelf in elk product terechtkomt. Niet in het product bewerken.

    Wat het product meeneemt staat in nineminds/house.json, en dat bestand is wel van het
    product:

        { "files": { "<pad in NineMinds>": "<pad onder nineminds/>" } }

    Het script kopieert precies die bestanden, schrijft lock.json met de commit waar ze
    vandaan komen, en weigert als NineMinds nog onvastgelegde wijzigingen heeft in die
    bestanden of in house/sync.ps1: een kopie van iets dat nergens in de geschiedenis staat
    is niet terug te vinden. Een bestand dat in de vorige lock.json stond maar niet meer in
    house.json, wordt hier weggehaald.

    Vergeleken wordt op inhoud, niet op regeleinden. Verandert er niets, dan blijft lock.json
    staan op de commit waar de inhoud vandaan kwam: een product krijgt dan geen commit bij elke
    commit in NineMinds.

    Met -Check schrijft het niets en meldt het alleen wat afwijkt.

    Exitcodes: 0 gelijk of bijgewerkt, 1 loopt achter (alleen met -Check), 2 fout.

    Zie house/README.md in NineMinds en ADR-0031 daar.

.EXAMPLE
    .\nineminds\sync.ps1
    .\nineminds\sync.ps1 -Check
    .\nineminds\sync.ps1 -Source D:\werk\NineMinds
#>
[CmdletBinding()]
param(
    [string] $Source,
    [switch] $Check
)

$ErrorActionPreference = 'Stop'
trap {
    Write-Host "Fout: $($_.Exception.Message)" -ForegroundColor Red
    exit 2
}

# Het script zelf gaat altijd mee; deze namen onder nineminds/ zijn van het mechanisme of
# van het product, niet van de huislaag.
$Self = 'house/sync.ps1'
$Reserved = @('sync.ps1', 'house.json', 'lock.json', 'README.md')
# Uit deze mappen van NineMinds komt nooit iets in een product (ADR-0025).
$Forbidden = @('src/', 'tests/', 'portals/', '.git/')

function ConvertTo-HousePath([string] $Path) {
    return (($Path -replace '\\', '/') -replace '^\./', '')
}

function Test-SafeRelative([string] $Path) {
    if ([string]::IsNullOrWhiteSpace($Path)) { return $false }
    if ([System.IO.Path]::IsPathRooted($Path)) { return $false }
    foreach ($part in $Path.Split('/')) {
        if ($part -eq '..' -or $part -eq '') { return $false }
    }
    return $true
}

function Read-Mapping($Object) {
    $map = [ordered]@{}
    if ($null -eq $Object) { return $map }
    foreach ($p in $Object.PSObject.Properties) {
        $map[(ConvertTo-HousePath $p.Name)] = (ConvertTo-HousePath ([string] $p.Value))
    }
    return $map
}

function Format-Mapping($Map) {
    $lines = @()
    foreach ($k in $Map.Keys) { $lines += "$k=$($Map[$k])" }
    return ($lines -join "`n")
}

# Vergelijkt op inhoud, niet op regeleinden: elke repository checkt uit met zijn eigen
# instellingen, en CRLF tegenover LF is geen achterstand. Een bestand met een nulbyte is
# binair en wordt byte voor byte vergeleken.
function Get-ContentHash([string] $Path) {
    $bytes = [System.IO.File]::ReadAllBytes($Path)
    if ([Array]::IndexOf($bytes, [byte] 0) -lt 0) {
        $latin1 = [System.Text.Encoding]::GetEncoding(28591)
        $bytes = $latin1.GetBytes($latin1.GetString($bytes).Replace("`r`n", "`n"))
    }
    $sha = [System.Security.Cryptography.SHA256]::Create()
    try { return [System.BitConverter]::ToString($sha.ComputeHash($bytes)) }
    finally { $sha.Dispose() }
}

function ConvertTo-JsonString([string] $Value) {
    return '"' + ($Value -replace '\\', '\\' -replace '"', '\"') + '"'
}

# --- de bron -----------------------------------------------------------------------------

# Niet als standaardwaarde in param(): Windows PowerShell 5.1 laat $PSScriptRoot daar leeg in
# een script met [CmdletBinding()].
if (-not $Source) { $Source = Join-Path $PSScriptRoot '..\..\NineMinds' }

if (-not (Test-Path $Source)) {
    throw "Geen NineMinds-repository op '$Source'. Geef -Source mee."
}
$Source = (Resolve-Path $Source).Path
if (-not (Test-Path (Join-Path $Source $Self))) {
    throw "Geen NineMinds-repository op '$Source' (geen $Self). Geef -Source mee."
}
if ((Resolve-Path $PSScriptRoot).Path -eq (Resolve-Path (Join-Path $Source 'house')).Path) {
    throw "Dit is het origineel in NineMinds. Draai de kopie in een product, of house/sync-products.ps1."
}

# --- wat het product meeneemt ------------------------------------------------------------

$manifestPath = Join-Path $PSScriptRoot 'house.json'
if (-not (Test-Path $manifestPath)) {
    throw "Geen nineminds/house.json. Zie house/README.md in NineMinds."
}
$manifest = Get-Content $manifestPath -Raw -Encoding UTF8 | ConvertFrom-Json
$Files = Read-Mapping $manifest.files
if ($Files.Count -eq 0) {
    throw "nineminds/house.json noemt geen bestanden onder 'files'."
}

$targets = @{}
foreach ($from in $Files.Keys) {
    $to = $Files[$from]
    if (-not (Test-SafeRelative $from)) { throw "Ongeldig bronpad in house.json: '$from'." }
    if (-not (Test-SafeRelative $to)) { throw "Ongeldig doelpad in house.json: '$to'." }
    foreach ($f in $Forbidden) {
        if ($from -like "$f*") { throw "'$from' hoort niet in de huislaag: niets uit $f gaat naar een product." }
    }
    if ($Reserved -contains $to) { throw "'$to' is gereserveerd onder nineminds/." }
    if ($targets.ContainsKey($to)) { throw "'$to' staat twee keer als doel in house.json." }
    $targets[$to] = $true
    if (-not (Test-Path (Join-Path $Source $from) -PathType Leaf)) {
        throw "'$from' bestaat niet in NineMinds."
    }
}

$commit = (git -C $Source rev-parse HEAD).Trim()
if ($LASTEXITCODE -ne 0) { throw "Kan de commit van NineMinds niet lezen." }
$short = $commit.Substring(0, 7)

$dirty = git -C $Source status --porcelain -- (@($Files.Keys) + $Self)
if ($dirty) {
    if (-not $Check) {
        throw "NineMinds heeft onvastgelegde wijzigingen in de huislaag:`n$($dirty -join "`n")`nLeg ze eerst vast in NineMinds."
    }
    Write-Host "Let op: NineMinds heeft onvastgelegde wijzigingen in de huislaag." -ForegroundColor Yellow
}

# --- vergelijken -------------------------------------------------------------------------

$copies = [ordered]@{}
foreach ($from in $Files.Keys) { $copies[$from] = $Files[$from] }
$copies[$Self] = 'sync.ps1'

$drift = @()
foreach ($from in $copies.Keys) {
    $src = Join-Path $Source $from
    $dst = Join-Path $PSScriptRoot $copies[$from]
    $same = (Test-Path $dst) -and ((Get-ContentHash $src) -eq (Get-ContentHash $dst))
    if (-not $same) { $drift += $from }
}

$lockPath = Join-Path $PSScriptRoot 'lock.json'
$previous = [ordered]@{}
$lockCommit = ''
if (Test-Path $lockPath) {
    $lock = Get-Content $lockPath -Raw -Encoding UTF8 | ConvertFrom-Json
    $previous = Read-Mapping $lock.files
    $lockCommit = [string] $lock.commit
}

$stale = @()
foreach ($old in $previous.Values) {
    if ($targets.ContainsKey($old) -or $Reserved -contains $old -or -not (Test-SafeRelative $old)) { continue }
    if (Test-Path (Join-Path $PSScriptRoot $old) -PathType Leaf) { $stale += $old }
}

# lock.json klopt als hij dezelfde lijst noemt als house.json, en als de bestanden op zijn
# commit dezelfde inhoud hebben als nu. Een commit in NineMinds die de huislaag niet raakt,
# maakt de lock dus niet oud.
$lockStale = (Format-Mapping $previous) -ne (Format-Mapping $Files)
if (-not $lockStale) {
    $known = ($lockCommit -match '^[0-9a-f]{40}$') -and
        (git -C $Source rev-parse --verify --quiet "$lockCommit^{commit}")
    if ($known) {
        git -C $Source diff --quiet $lockCommit $commit -- @($copies.Keys)
        $lockStale = $LASTEXITCODE -ne 0
    }
    else { $lockStale = $true }
}

if ($Check) {
    if ($drift -or $stale -or $lockStale) {
        Write-Host "Loopt achter op NineMinds ${short}:" -ForegroundColor Yellow
        $drift | ForEach-Object { Write-Host "  anders: $_" }
        $stale | ForEach-Object { Write-Host "  weg:    nineminds/$_" }
        if ($lockStale) { Write-Host "  lock.json wijst niet naar deze inhoud" }
        exit 1
    }
    Write-Host "Gelijk aan NineMinds $short." -ForegroundColor Green
    exit 0
}

if (-not ($drift -or $stale -or $lockStale)) {
    Write-Host "Gelijk aan NineMinds $short; niets gewijzigd." -ForegroundColor Green
    exit 0
}

# --- schrijven ---------------------------------------------------------------------------

# Een script dat draait is al ingelezen; zichzelf overschrijven is dus veilig.
foreach ($from in $drift) {
    $dst = Join-Path $PSScriptRoot $copies[$from]
    New-Item -ItemType Directory -Force (Split-Path $dst) | Out-Null
    Copy-Item (Join-Path $Source $from) $dst -Force
}

$root = (Resolve-Path $PSScriptRoot).Path
foreach ($old in $stale) {
    $path = Join-Path $root $old
    Remove-Item $path -Force
    $dir = Split-Path $path
    while ($dir -and ($dir -ne $root) -and $dir.StartsWith($root) -and
           -not (Get-ChildItem $dir -Force | Select-Object -First 1)) {
        Remove-Item $dir -Force
        $dir = Split-Path $dir
    }
}

# Met de hand geschreven in plaats van ConvertTo-Json: dan is lock.json byte voor byte gelijk
# onder Windows PowerShell 5.1 en PowerShell 7.
$entries = @()
foreach ($from in $Files.Keys) {
    $entries += "    $(ConvertTo-JsonString $from): $(ConvertTo-JsonString $Files[$from])"
}
$json = "{`r`n" +
    "  `"source`": `"NineMinds`",`r`n" +
    "  `"commit`": `"$commit`",`r`n" +
    "  `"synced`": `"$((Get-Date).ToString('yyyy-MM-dd'))`",`r`n" +
    "  `"files`": {`r`n" + ($entries -join ",`r`n") + "`r`n  }`r`n}`r`n"
[System.IO.File]::WriteAllText($lockPath, $json, (New-Object System.Text.UTF8Encoding $false))

Write-Host "Huislaag bijgewerkt naar NineMinds $short." -ForegroundColor Green
$drift | ForEach-Object { Write-Host "  gewijzigd:  $_" }
$stale | ForEach-Object { Write-Host "  weggehaald: nineminds/$_" }
exit 0
