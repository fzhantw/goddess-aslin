function onMessage(request, sender, sendResponse) {
  if (request.method == "saveStats") { 
    chrome.storage.sync.get({
      trumps: 0,
      pages: 0
    }, function(items) {
      chrome.storage.sync.set({
        trumps: items.trumps + request.trumps,
        pages: items.pages + 1
      });
    });
    sendResponse({});
  } else {
    // Show icon
    chrome.pageAction.show(sender.tab.id);

    chrome.storage.sync.get({
      filter: 'aggro'
    }, function(items) {
    });
    sendResponse({});
  }
}

chrome.runtime.onMessage.addListener(onMessage);
