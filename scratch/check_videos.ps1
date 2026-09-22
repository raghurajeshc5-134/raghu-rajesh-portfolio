$shell = New-Object -ComObject Shell.Application
$folder = $shell.NameSpace('C:\Users\chisa\.gemini\antigravity-ide\scratch\raghu-rajesh-portfolio\public\videos')
foreach ($item in $folder.Items()) {
    $n = $folder.GetDetailsOf($item, 0)
    $d = $folder.GetDetailsOf($item, 27)
    $w = $folder.GetDetailsOf($item, 316)
    $h = $folder.GetDetailsOf($item, 314)
    Write-Host "$n | $d | ${w}x${h}"
}
