/**
* This script listens for the scraper.js content script to ping. When we get a 'get_filters' message,
* we'll gather up all of our current filters, JSON them, and send them to our content script.
*/
chrome.extension.onMessage.addListener(
	function(request, sender, sendResponse) {
		if (request.action === 'get_options') {
			var options = {"scrape":   localStorage.getItem('scrape')};
			sendResponse({msg: JSON.stringify(options)});
		}
	}
);
