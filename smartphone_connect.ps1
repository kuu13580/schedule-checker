$port = 3000
$fwRuleName = "WSL 2 Firewall Unlock"
$wsl2Address = wsl -e hostname -I | ForEach-Object { $_.trim() }

New-NetFireWallRule -DisplayName $fwRuleName -Direction Inbound -LocalPort $port -Action Allow -Protocol TCP
netsh interface portproxy add v4tov4 listenport=$port listenaddress=* connectport=$port connectaddress=$wsl2Address