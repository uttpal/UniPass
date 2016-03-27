var { ToggleButton } = require('sdk/ui/button/toggle');
var panels = require("sdk/panel");
var self = require("sdk/self");
var tabs = require('sdk/tabs');

var button = ToggleButton({
  id: "menu-button",
  label: "Get Password",
  icon: {
    "32": "./lock.png"
  },
  onChange: handleChange
});

var panel = panels.Panel({
  contentURL: self.data.url("panel.html"),
  contentScriptFile: ["./panel.js","./sjcl.js"],
  onHide: handleHide
});
var getTab = function () {
  activeTab = tabs.activeTab.url;
  console.log("main",activeTab)
  panel.port.emit("activeTab",activeTab);
};
var activeTab;
panel.port.on("getTab",getTab);


function handleChange(state) {
  if (state.checked) {
    panel.show({
      position: button
    });
  }
}

function handleHide() {
  button.state('window', {checked: false});
}

panel.on('show', function() {
    var height = 240;
    var width = 332;
  panel.resize(width, height);
});