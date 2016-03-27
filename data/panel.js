var keyElement = document.getElementById("key");
var hashElement = document.getElementById("hash");
var msgElement = document.getElementById("message");
self.port.on("activeTab",function (tabUrl) {
    var masterkey = keyElement.value;
    var domainMatch = tabUrl.match(/^http(?:s?):\/\/([^/]*)/);
    var domain = domainMatch[1].toLowerCase();
    document.getElementById("domain").innerHTML = domain;
    // The hashing difficulty.
    // 2 ^ difficulty times of SHA-256 will be computed.
    var difficulty = 16;
    var times = Math.pow(2, difficulty);
    var bits = domain + ":" + masterkey;
    for (var i = 0; i < times; i += 1) {
        bits = sjcl.hash.sha256.hash(bits);
    }
    var hash = sjcl.codec.base64.fromBits(bits).slice(0, 16);
    console.log("com val",hash);
    hashElement.value = hash;
});

keyElement.addEventListener("keypress", function(e){
    var key = e.which || e.keyCode;
    if (key === 13) {               // 13 is enter
        self.port.emit("getTab");
        msgElement.innerHTML = "Click on password field to COPY!";
    }
}, false);

keyElement.onclick = function() {
    msgElement.innerHTML = "Press ENTER to see password!";
};


hashElement.onclick = function() {
    this.select();
    document.execCommand('copy');
    msgElement.innerHTML = "Password Copied!!";
};














