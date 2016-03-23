var tabQueue = [];
var maxQueueLength = 5;

document.addEventListener('DOMContentLoaded', function() {
  // add current tabs to the tabQueue;

  chrome.tabs.query({}, function (tabs) {
    tabQueue = tabs;
  });

  chrome.tabs.onCreated.addListener(function (tab) {
    if (tabQueue.length >= maxQueueLength) {
      let t = tabQueue.shift();
      chrome.tabs.remove(t.id);
    }
    tabQueue.push(tab);
  });

  chrome.tabs.onRemove.addListener(function (tabId) {
    // cleaning it from the tab list
    for (let _i = 0; _i < tabQueue.length; _i++) {
      if (tabQueue[_i] === tabId) {
        tabQueue.splice(_i, 1);
        break;
      }
    }
  });

});

