$port = 3000
$fwRuleName = "WSL 2 Firewall Unlock"

Remove-NetFireWallRule -DisplayName $fwRuleName
netsh interface portproxy delete v4tov4 listenport=$port listenaddress=*