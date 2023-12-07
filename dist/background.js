/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!***********************!*\
  !*** ./background.js ***!
  \***********************/
// This event is triggered when the extension is installed or updated.
chrome.runtime.onInstalled.addListener(function () {
  // Perform some initialization if necessary
  console.log('Extension installed or updated');
});

// When extension is clicked, execute youtube_transcript.js
chrome.action.onClicked.addListener(function (tab) {
  if (tab.url.includes("youtube.com")) {
    chrome.scripting.executeScript({
      target: {
        tabId: tab.id
      },
      files: ["youtube.js"]
    });
  }
});

// Download txt file
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === 'downloadTranscript') {
    var blob = new Blob([request.data], {
      type: 'text/plain'
    });
    var url = URL.createObjectURL(blob);

    // Use the chrome.downloads API
    chrome.downloads.download({
      url: url,
      filename: 'transcript.txt',
      saveAs: true
    }, function (downloadId) {
      // If you want to do something with the downloadId or handle errors
      if (downloadId) {
        console.log('Download initiated with ID:', downloadId);
      } else {
        console.error('Failed to initiate download:', chrome.runtime.lastError);
      }
      // Revoke the URL to clean up memory
      URL.revokeObjectURL(url);
    });
  }
});
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFja2dyb3VuZC5qcyIsIm1hcHBpbmdzIjoiOzs7OztBQUFBO0FBQ0FBLE1BQU0sQ0FBQ0MsT0FBTyxDQUFDQyxXQUFXLENBQUNDLFdBQVcsQ0FBQyxZQUFZO0VBQy9DO0VBQ0FDLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDLGdDQUFnQyxDQUFDO0FBQ2pELENBQUMsQ0FBQzs7QUFFRjtBQUNBTCxNQUFNLENBQUNNLE1BQU0sQ0FBQ0MsU0FBUyxDQUFDSixXQUFXLENBQUMsVUFBQ0ssR0FBRyxFQUFLO0VBQ3pDLElBQUlBLEdBQUcsQ0FBQ0MsR0FBRyxDQUFDQyxRQUFRLENBQUMsYUFBYSxDQUFDLEVBQUU7SUFDakNWLE1BQU0sQ0FBQ1csU0FBUyxDQUFDQyxhQUFhLENBQUM7TUFDM0JDLE1BQU0sRUFBRTtRQUFFQyxLQUFLLEVBQUVOLEdBQUcsQ0FBQ087TUFBRyxDQUFDO01BQ3pCQyxLQUFLLEVBQUUsQ0FBQyxZQUFZO0lBQ3hCLENBQUMsQ0FBQztFQUNOO0FBQ0osQ0FBQyxDQUFDOztBQUVGO0FBQ0FoQixNQUFNLENBQUNDLE9BQU8sQ0FBQ2dCLFNBQVMsQ0FBQ2QsV0FBVyxDQUFDLFVBQVNlLE9BQU8sRUFBRUMsTUFBTSxFQUFFQyxZQUFZLEVBQUU7RUFDekUsSUFBSUYsT0FBTyxDQUFDWixNQUFNLEtBQUssb0JBQW9CLEVBQUU7SUFDekMsSUFBTWUsSUFBSSxHQUFHLElBQUlDLElBQUksQ0FBQyxDQUFDSixPQUFPLENBQUNLLElBQUksQ0FBQyxFQUFFO01BQUNDLElBQUksRUFBRTtJQUFZLENBQUMsQ0FBQztJQUMzRCxJQUFNZixHQUFHLEdBQUdnQixHQUFHLENBQUNDLGVBQWUsQ0FBQ0wsSUFBSSxDQUFDOztJQUVyQztJQUNBckIsTUFBTSxDQUFDMkIsU0FBUyxDQUFDQyxRQUFRLENBQUM7TUFDdEJuQixHQUFHLEVBQUVBLEdBQUc7TUFDUm9CLFFBQVEsRUFBRSxnQkFBZ0I7TUFDMUJDLE1BQU0sRUFBRTtJQUNaLENBQUMsRUFBRSxVQUFTQyxVQUFVLEVBQUU7TUFDcEI7TUFDQSxJQUFJQSxVQUFVLEVBQUU7UUFDWjNCLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDLDZCQUE2QixFQUFFMEIsVUFBVSxDQUFDO01BQzFELENBQUMsTUFBTTtRQUNIM0IsT0FBTyxDQUFDNEIsS0FBSyxDQUFDLDhCQUE4QixFQUFFaEMsTUFBTSxDQUFDQyxPQUFPLENBQUNnQyxTQUFTLENBQUM7TUFDM0U7TUFDQTtNQUNBUixHQUFHLENBQUNTLGVBQWUsQ0FBQ3pCLEdBQUcsQ0FBQztJQUM1QixDQUFDLENBQUM7RUFDTjtBQUNKLENBQUMsQ0FBQyxDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdHJhbnNjcmlwdC10by1ub3Rlcy8uL2JhY2tncm91bmQuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gVGhpcyBldmVudCBpcyB0cmlnZ2VyZWQgd2hlbiB0aGUgZXh0ZW5zaW9uIGlzIGluc3RhbGxlZCBvciB1cGRhdGVkLlxuY2hyb21lLnJ1bnRpbWUub25JbnN0YWxsZWQuYWRkTGlzdGVuZXIoZnVuY3Rpb24gKCkge1xuICAgIC8vIFBlcmZvcm0gc29tZSBpbml0aWFsaXphdGlvbiBpZiBuZWNlc3NhcnlcbiAgICBjb25zb2xlLmxvZygnRXh0ZW5zaW9uIGluc3RhbGxlZCBvciB1cGRhdGVkJyk7XG59KTtcblxuLy8gV2hlbiBleHRlbnNpb24gaXMgY2xpY2tlZCwgZXhlY3V0ZSB5b3V0dWJlX3RyYW5zY3JpcHQuanNcbmNocm9tZS5hY3Rpb24ub25DbGlja2VkLmFkZExpc3RlbmVyKCh0YWIpID0+IHtcbiAgICBpZiAodGFiLnVybC5pbmNsdWRlcyhcInlvdXR1YmUuY29tXCIpKSB7XG4gICAgICAgIGNocm9tZS5zY3JpcHRpbmcuZXhlY3V0ZVNjcmlwdCh7XG4gICAgICAgICAgICB0YXJnZXQ6IHsgdGFiSWQ6IHRhYi5pZCB9LFxuICAgICAgICAgICAgZmlsZXM6IFtcInlvdXR1YmUuanNcIl1cbiAgICAgICAgfSk7XG4gICAgfVxufSk7XG5cbi8vIERvd25sb2FkIHR4dCBmaWxlXG5jaHJvbWUucnVudGltZS5vbk1lc3NhZ2UuYWRkTGlzdGVuZXIoZnVuY3Rpb24ocmVxdWVzdCwgc2VuZGVyLCBzZW5kUmVzcG9uc2UpIHtcbiAgICBpZiAocmVxdWVzdC5hY3Rpb24gPT09ICdkb3dubG9hZFRyYW5zY3JpcHQnKSB7XG4gICAgICAgIGNvbnN0IGJsb2IgPSBuZXcgQmxvYihbcmVxdWVzdC5kYXRhXSwge3R5cGU6ICd0ZXh0L3BsYWluJ30pO1xuICAgICAgICBjb25zdCB1cmwgPSBVUkwuY3JlYXRlT2JqZWN0VVJMKGJsb2IpO1xuXG4gICAgICAgIC8vIFVzZSB0aGUgY2hyb21lLmRvd25sb2FkcyBBUElcbiAgICAgICAgY2hyb21lLmRvd25sb2Fkcy5kb3dubG9hZCh7XG4gICAgICAgICAgICB1cmw6IHVybCxcbiAgICAgICAgICAgIGZpbGVuYW1lOiAndHJhbnNjcmlwdC50eHQnLFxuICAgICAgICAgICAgc2F2ZUFzOiB0cnVlXG4gICAgICAgIH0sIGZ1bmN0aW9uKGRvd25sb2FkSWQpIHtcbiAgICAgICAgICAgIC8vIElmIHlvdSB3YW50IHRvIGRvIHNvbWV0aGluZyB3aXRoIHRoZSBkb3dubG9hZElkIG9yIGhhbmRsZSBlcnJvcnNcbiAgICAgICAgICAgIGlmIChkb3dubG9hZElkKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ0Rvd25sb2FkIGluaXRpYXRlZCB3aXRoIElEOicsIGRvd25sb2FkSWQpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKCdGYWlsZWQgdG8gaW5pdGlhdGUgZG93bmxvYWQ6JywgY2hyb21lLnJ1bnRpbWUubGFzdEVycm9yKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIFJldm9rZSB0aGUgVVJMIHRvIGNsZWFuIHVwIG1lbW9yeVxuICAgICAgICAgICAgVVJMLnJldm9rZU9iamVjdFVSTCh1cmwpO1xuICAgICAgICB9KTtcbiAgICB9XG59KTtcbiJdLCJuYW1lcyI6WyJjaHJvbWUiLCJydW50aW1lIiwib25JbnN0YWxsZWQiLCJhZGRMaXN0ZW5lciIsImNvbnNvbGUiLCJsb2ciLCJhY3Rpb24iLCJvbkNsaWNrZWQiLCJ0YWIiLCJ1cmwiLCJpbmNsdWRlcyIsInNjcmlwdGluZyIsImV4ZWN1dGVTY3JpcHQiLCJ0YXJnZXQiLCJ0YWJJZCIsImlkIiwiZmlsZXMiLCJvbk1lc3NhZ2UiLCJyZXF1ZXN0Iiwic2VuZGVyIiwic2VuZFJlc3BvbnNlIiwiYmxvYiIsIkJsb2IiLCJkYXRhIiwidHlwZSIsIlVSTCIsImNyZWF0ZU9iamVjdFVSTCIsImRvd25sb2FkcyIsImRvd25sb2FkIiwiZmlsZW5hbWUiLCJzYXZlQXMiLCJkb3dubG9hZElkIiwiZXJyb3IiLCJsYXN0RXJyb3IiLCJyZXZva2VPYmplY3RVUkwiXSwic291cmNlUm9vdCI6IiJ9