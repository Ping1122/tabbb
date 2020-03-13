savedTabs = {
	readLater: [],
	bookmark: [],
	customized: {},
}

let saveCurrentTab = (category, customizedCategory=null) => {
	chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
		let currentTab = tabs[0];
		let favicon;
		let target;
		if (
			currentTab.favIconUrl && 
			currentTab.favIconUrl != '' && 
			currentTab.favIconUrl.indexOf('chrome://favicon/') == -1
		) {
			favicon = currentTab.favIconUrl;
		}
		else {
			favicon = 'chrome://favicon/';
		}
		if (category === "customized") {
			target = savedTabs[category][customizedCategory];
		}
		else {
			target = savedTabs[category];
		}
		target.push({
			id: currentTab.id,
			url: currentTab.url,
			title: currentTab.title,
			favicon : favicon,
		});
		console.log(savedTabs);
	});
}

let saveCurrentWindow = () => {}

let closeCurrentTab = () => {
	chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
	  chrome.tabs.remove(tabs[0].id, function() {});
	});
}

let closeCurrentWindow = () => {}

let saveAndCloseTab = (e) => {
  console.log("saveToReadLaterAndCloseCurrentTab");
  console.log(e);
  const id = e.menuItemId;
  switch (id) {
  	case 1:
  	  saveCurrentTab("readLater");
      closeCurrentTab();
 	  break;
  	case 2:
  	  saveCurrentTab("bookmark");
      closeCurrentTab();
	  break;
	case 3:
	  saveCurrentWindow("readLater");
	  closeCurrentWindow();
	  break;
	case 4:
	  saveCurrentWindow("bookmark");
	  closeCurrentWindow();
  	default:
  	  break;
  }
}

let handleRemoveTab = (info) => {
	let target = savedTabs[info.category];
	if (info.customizedCategory) target = target[customizedCategory];
	target.splice(info.index, 1);
}

let handleRemoveReadLater = () => {
	savedTabs.readLater = [];
}

chrome.contextMenus.create({
  "title": "Save To Read Later                 ALT+Q",
  "contexts": ["page", "selection", "image", "link"]
});

chrome.contextMenus.create({
  "title": "Save To Bookmark                  ALT+W",
  "contexts": ["page", "selection", "image", "link"]
});

chrome.contextMenus.create({
  "title": "Save Window To Read Later    ALT+SHIFT+Q",
  "contexts": ["page", "selection", "image", "link"]
});

chrome.contextMenus.create({
  "title": "Save Window To Bookmark     ALT+SHIFT+W",
  "contexts": ["page", "selection", "image", "link"]
});

chrome.contextMenus.onClicked.addListener(saveAndCloseTab);

chrome.runtime.onMessage.addListener((msg, sender, response) => {
    switch (msg.type) {
        case 'requestSavedTabs':
            response(savedTabs);
            break;
        case 'removeTab':
        	handleRemoveTab(msg.message);
        	break;
        case "removeReadLater":
        	handleRemoveReadLater();
        	break;
        default:
            response('unknown request');
            break;
    }
})

chrome.commands.onCommand.addListener(function(command) {
  switch (command) {
  	case "saveToReadLater":
  	  saveCurrentTab("readLater");
      closeCurrentTab();
  	  break;
  	case "saveToBookmark":
  	  saveCurrentTab("bookmark");
  	  closeCurrentTab();
	  break;
	case "saveAllTabsToReadLater":
  	  saveCurrentWindow("readLater");
      closeCurrentWindow();
  	  break;
  	case "saveAllTabsToBookmark":
  	  saveCurrentWindow("bookmark");
  	  closeCurrentWindow();
	  break;
  	default:
  	  break;
  }
});