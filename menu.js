/**
 * Draws our controllers based on saved settings
 */
var redrawInputs = function() {
    if (localStorage.getItem('scrape') === 'true') {
        $('#start').html('End Scrape');
    } else {
        $('#start').html('Begin Scrape');
    }
};

/**
 * If no scraper settings are found, initilize them
 */
var initSettings = function() {
    if (localStorage.getItem('scrape') === null) {
        localStorage.setItem('scrape', 'false');
    }
}

/**
 * Click handler for the scrape button
 */
var clickStart = function() {
    if (localStorage.getItem('scrape') === 'true') {
        localStorage.setItem('scrape', 'false');
    } else {
        localStorage.setItem('scrape', 'true');
    }

    redrawInputs();
}

/**
 * Attach click handlers for controls
 */
$(document).ready(function(){
    $('#start').click(function(){
        clickStart();
    });

    initSettings();
    redrawInputs();
});
