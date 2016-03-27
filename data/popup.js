var button = document.getElementById("button");
self.port.on("activeTab",function (tabUrl) {
    var domainMatch = tabUrl.match(/^http(?:s?):\/\/([^/]*)/);
    var domain = domainMatch[1].toLowerCase();
    console.log(777,domain);
    var masterkey = document.getElementById("key").value;
    console.log(44,masterkey)
    document.getElementById("domain").value = domain;
   
    // The hashing difficulty.
    // 2 ^ difficulty rounds of SHA-256 will be computed.
    var difficulty = 16;
    var rounds = Math.pow(2, difficulty);
    var bits = domain + "/" + masterkey;
    for (var i = 0; i < rounds; i += 1) {
        bits = sjcl.hash.sha256.hash(bits);
    }
    var hash = sjcl.codec.base64.fromBits(bits).slice(0, 16);
    console.log("com val",hash);
    document.getElementById("hash").value = hash;
    
});

button.addEventListener("click", function(){

    try{
        self.port.emit("getTab");
    } catch(e){
        console.log(e)
    }

    
}, false);














