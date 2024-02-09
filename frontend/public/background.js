chrome.tabs.onUpdated.addListener((tabId, tab) => {
    if (tab.url && tab.url.includes("youtube.com/watch")) {
        console.log(tab.url);
        chrome.storage.local.set({"tab_url": tab.url}, () => {
            if (chrome.runtime.lastError)
                console.log('Error storing url into tabs storage');
        });
    }
})