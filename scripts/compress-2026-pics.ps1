$sourceDir = Join-Path $PSScriptRoot '..\public\2026_pics'
$outputDir = Join-Path $sourceDir 'optimized'

New-Item -ItemType Directory -Force -Path $outputDir | Out-Null

$images = Get-ChildItem -LiteralPath $sourceDir -File |
    Where-Object { $_.Extension -match '^\.(jpe?g|png)$' }

if ($images.Count -eq 0) {
    throw "No JPG, JPEG, or PNG files found in $sourceDir"
}

foreach ($image in $images) {
    $outputPath = Join-Path $outputDir ($image.BaseName + '.webp')

    & ffmpeg -hide_banner -loglevel error -y `
        -i $image.FullName `
        -vf 'scale=2400:2400:force_original_aspect_ratio=decrease' `
        -c:v libwebp -q:v 78 -compression_level 6 -preset photo -an `
        $outputPath

    if ($LASTEXITCODE -ne 0) {
        throw "ffmpeg failed for $($image.Name)"
    }
}

$originalBytes = ($images | Measure-Object -Property Length -Sum).Sum
$optimizedFiles = Get-ChildItem -LiteralPath $outputDir -File -Filter '*.webp'
$optimizedBytes = ($optimizedFiles | Measure-Object -Property Length -Sum).Sum
$savedPercent = [math]::Round((1 - ($optimizedBytes / $originalBytes)) * 100, 1)

Write-Output ("Compressed {0} images: {1:N1} MB -> {2:N1} MB ({3}% smaller)" -f `
    $optimizedFiles.Count,
    ($originalBytes / 1MB),
    ($optimizedBytes / 1MB),
    $savedPercent)
