/*global chrome*/
const CRAIGLIST_CLASS = 'mapaddress'
const GET_ADDRESS = 'GET_ADDRESS'

chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        if (request.action === GET_ADDRESS) {
            console.log('action received!')
            sendResponse({
                address: document.getElementsByClassName(CRAIGLIST_CLASS)[0].textContent
            });
        }
    });