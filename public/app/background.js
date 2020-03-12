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
	});
}

let closeCurrentTab = () => {
	chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
	  chrome.tabs.remove(tabs[0].id, function() {});
	});
}

let saveToReadLaterAndCloseCurrentTab = (e) => {
  saveCurrentTab("readLater");
  closeCurrentTab();
}

let handleRemoveTab = (info) => {
	let target = savedTabs[info.category];
	if (info.customizedCategory) target = target[customizedCategory];
	target.splice(info.index, 1);
}

chrome.contextMenus.create({
  "title": "Save to read later and close current tab",
  "contexts": ["page", "selection", "image", "link"]
});

chrome.contextMenus.onClicked.addListener(saveToReadLaterAndCloseCurrentTab);

chrome.runtime.onMessage.addListener((msg, sender, response) => {
    switch (msg.type) {
        case 'requestSavedTabs':
            response(savedTabs);
            break;
        case 'removeTab':
        	handleRemoveTab(msg.message);
        	break;
        default:
            response('unknown request');
            break;
    }
})