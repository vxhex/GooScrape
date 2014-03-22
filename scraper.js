/**
* This is the content script that loads into the Google tab.
* The GooScrape object handles scraping URLs and communicating with the background script.
*/
function GooScrape() {
    var _scrape   = false;
    var _this     = this;
    var _urlKey   = 'SavedUrls';
    var _urls     = Array();

    /**
     * Collect link urls to send back to the mothership
     */
    this.run = function() {
        if(_scrape) {
            _scrapeLogStart();
            _loadUrls();
            _scrapeUrls();
            _saveUrls();
            _scrapeLogEnd();
        }
    }

    /**
     * Set var to check if we should be scraping
     */
    this.scrape = function(doScrape) {
        _scrape = doScrape;
    }

    /**
     * Loads previously saved URLs, if they exist
     */
    var _loadUrls = function() {
         var urls = localStorage.getItem(_urlKey);
         if (urls) {
            _urls = JSON.parse(urls);
         }
    }

    /**
     *
     */
    var _saveUrls = function() {
        localStorage.setItem(_urlKey, JSON.stringify(_urls));
    }

    /**
     * Scrapes URLs from search results page and saves 'em to an array
     */
    var _scrapeUrls = function() {
        $('h3.r').find('a').each(function() {
            var url = $(this).attr('href');
            if ((url.indexOf('http') === 0) && (_urls.indexOf(url) === -1)) {
                _urls.push(url);
            }
        });
    }

    /**
     * Log scrape start to console
     */
    var _scrapeLogStart = function() {
        console.log('GooChrome beginning scrape');
    }

    /**
     * Log scrape end to console
     */
    var _scrapeLogEnd = function () {
        console.log('GooChrome ending scrape. ' + _urls.length + ' items saved.');
    }

    /**
    * Set up scraper object
    */
    var _init = function() {}

    _init();
};

/**
* Once the document is loaded, request our settings and make a new GooScrape object
*/
$(document).ready(function() {
    chrome.extension.sendMessage({action: "get_options"}, function(response) {
        var scraper = new GooScrape();
        var options = JSON.parse(response.msg);
        scraper.scrape(options.scrape === 'true');
        scraper.run();
    });
});
