// POSTs true or false to VPN to change state.
function vpnSwitcher(vpn_state) {
    var url = "http://mini/cgi-bin/pia-client-enabled/";
    var param = "enabled=" + vpn_state;

    var http = new XMLHttpRequest();
    http.open("POST", url, true);

    // Send the proper header information along with the request.
    http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    http.setRequestHeader("Content-length", param.length);
    http.setRequestHeader("Connection", "close");

    http.onreadystatechange = function() {
        if (http.readyState == 4 && http.status == 200) {
            // alert(http.responseText);
        }
    }

    http.send(param);
}

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("button")) {
    var chosenState = e.target.textContent;
    
    switch (chosenState) {
        case "Turn VPN On":
            vpnSwitcher(true);
        case "Turn VPN Off":
            vpnSwitcher(false);
    }
  }
});
