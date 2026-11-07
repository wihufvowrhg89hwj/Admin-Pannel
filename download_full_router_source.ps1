# ============================================================================
# TP-Link Archer C24 v2 (http://192.168.0.101) Full Web UI Source Downloader
# Downloads 100% of HTML views, JS controllers, Models, Configs, Locales & Images
# ============================================================================

$ErrorActionPreference = "Continue"
$baseUrl = "http://192.168.0.101"
$headers = @{ "Referer" = "http://192.168.0.101/" }
$outRoot = "c:\Users\Laptop\Downloads\Archer C24(US)_V2_230608\router_full_source"

New-Item -ItemType Directory -Force -Path $outRoot | Out-Null

$queue = New-Object System.Collections.Generic.Queue[string]
$visited = @{}

function Enqueue-Path([string]$rel) {
    if ([string]::IsNullOrWhiteSpace($rel)) { return }
    $clean = $rel.Split('?')[0].Split('#')[0].Trim()
    $clean = $clean -replace "^\./", "" -replace "^/", ""
    if ([string]::IsNullOrWhiteSpace($clean) -or $clean.StartsWith("data:") -or $clean.StartsWith("http")) { return }
    if (-not $visited.ContainsKey($clean)) {
        $visited[$clean] = $true
        $queue.Enqueue($clean)
    }
}

# 1. Seed initial core files from the router's index
$seedFiles = @(
    "index.html",
    "error.html",
    "favicon.ico",
    "config/device.json",
    "config/models.json",
    "config/modules.json",
    "config/classes.json",
    "config/src.js",
    "config/navigator.json",
    "config/navigator.ap.json",
    "config/navigator.re.json",
    "config/navigator.wisp.json",
    "config/navigator.client.json",
    "config/navigator.ssid.json",
    "locale/language.js",
    "locale/en_US/lan.js",
    "locale/en_US/lan.css",
    "locale/en_US/help.js",
    "themes/default/css/perfect-scrollbar.css",
    "themes/default/css/base.css",
    "themes/default/css/total.css",
    "themes/default/css/mobile.css",
    "js/libs/jquery.min.js",
    "js/libs/polyfill.js",
    "js/libs/cryptoJS.min.js",
    "js/libs/tpEncrypt.new.js",
    "js/app/url.js",
    "js/app/ruIspAutoConfig.js",
    "js/su/char.js",
    "js/su/language.js",
    "js/su/frame1.js",
    "js/su/widgets.js",
    "js/su/frame2.js",
    "js/su/widget/widget.mobile.js"
)

foreach ($f in $seedFiles) { Enqueue-Path $f }

# Also save root "/" as router_index.html
try {
    Invoke-WebRequest -Uri "$baseUrl/" -Headers $headers -OutFile (Join-Path $outRoot "router_index.html") -UseBasicParsing -ErrorAction Stop
} catch {}

$downloaded = 0

while ($queue.Count -gt 0) {
    $relPath = $queue.Dequeue()
    $localFile = Join-Path $outRoot ($relPath -replace "/", "\")
    $parentDir = Split-Path $localFile -Parent
    if (-not (Test-Path $parentDir)) {
        New-Item -ItemType Directory -Force -Path $parentDir | Out-Null
    }

    try {
        $resp = Invoke-WebRequest -Uri "$baseUrl/$relPath" -Headers $headers -OutFile $localFile -PassThru -UseBasicParsing -ErrorAction Stop
        $downloaded++
        
        # Parse JSON/JS/CSS/HTML to discover more linked modules, models, and images
        if ($relPath -match "\.(json|js|css|html)$") {
            $text = Get-Content $localFile -Raw -ErrorAction SilentlyContinue
            if ($text) {
                # Match ./modules/..., ./models/..., ./js/..., themes/...
                $mPaths = [regex]::Matches($text, '(\./)?(modules|models|js|themes|config|locale)/[a-zA-Z0-9_\-\./]+')
                foreach ($m in $mPaths) {
                    Enqueue-Path $m.Value
                }
                # Match relative ../img/... in CSS
                $cssImgs = [regex]::Matches($text, '\.\./img/[a-zA-Z0-9_\-\./]+')
                foreach ($ci in $cssImgs) {
                    $resolved = $ci.Value -replace "^\.\./img/", "themes/default/img/"
                    Enqueue-Path $resolved
                }
            }
        }
    } catch {
        # Remove empty file if 404
        if (Test-Path $localFile) { Remove-Item $localFile -Force -ErrorAction SilentlyContinue }
    }
}

Write-Host "=========================================================="
Write-Host "FINISHED! Downloaded $downloaded complete source files from $baseUrl"
Write-Host "Saved to: $outRoot"
Write-Host "=========================================================="
