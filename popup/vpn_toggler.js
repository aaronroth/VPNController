// Returns true or false depending on VPN state.
function getAndParse(url) {
    var json_status_string = getStatus(url);
    var status_object = JSON.parse(json_status_string);
    return status_object.enabled;
}

// Makes GET request to fetch JSON status.
function getStatus(url) {
    var http = new XMLHttpRequest();
    http.open("GET", url, false);
    http.send(null);
    return http.responseText;
}

// Updates displayed VPN state in the extension popup.
function updateStatus(status_boolean) {
    var status_text;
    var status_color;

    if (status_boolean) {
        status_text = "ON";
        status_color = "green";
    } else {
        status_text = "OFF";
        status_color = "red";
    }
    
    var status_element = document.getElementById("status-box");
    status_element.innerHTML = "VPN status: " + status_text;
    status_element.setAttribute("style", "background-color: " + status_color);
}
    
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

    http.send(param);
    
    // Update status after a delay to allow POST request to go through.
    window.setTimeout(function() {
        updateStatus(getAndParse("http://mini/cgi-bin/pia-client-enabled/"));
    }, 100);
}

// Add event listeners to the buttons.
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

// Update the current VPN status when the popup first loads.
updateStatus(getAndParse("http://mini/cgi-bin/pia-client-enabled/"));
