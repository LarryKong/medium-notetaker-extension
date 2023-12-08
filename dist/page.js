/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
/*!*****************************!*\
  !*** ./src/scripts/page.js ***!
  \*****************************/
__webpack_require__.r(__webpack_exports__);
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === "checkScript") {
    sendResponse({
      scriptInjected: true
    });
  } else if (request.action === "extractText") {
    var extractedText = extractArticleText();
    // Here, you can either store the text, send it back to the background script, or take another action
    console.log(extractedText);
    sendTextToBackground(extractedText);
    console.log("Text sent to background");
  }
});
function extractArticleText() {
  var articleText = document.querySelector('#root').innerText;
  return articleText;
}

// This function sends the extracted text to the background
function sendTextToBackground(text) {
  chrome.runtime.sendMessage({
    action: "extractedText",
    text: text
  }, function (response) {
    if (response !== null && response !== void 0 && response.success) {
      console.log("Text successfully sent to background");
    }
  });
}
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnZS5qcyIsIm1hcHBpbmdzIjoiOztVQUFBO1VBQ0E7Ozs7O1dDREE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7QUNOQUEsTUFBTSxDQUFDQyxPQUFPLENBQUNDLFNBQVMsQ0FBQ0MsV0FBVyxDQUFDLFVBQVNDLE9BQU8sRUFBRUMsTUFBTSxFQUFFQyxZQUFZLEVBQUU7RUFDekUsSUFBSUYsT0FBTyxDQUFDRyxNQUFNLEtBQUssYUFBYSxFQUFFO0lBQ2xDRCxZQUFZLENBQUM7TUFBRUUsY0FBYyxFQUFFO0lBQUssQ0FBQyxDQUFDO0VBQzFDLENBQUMsTUFDSSxJQUFJSixPQUFPLENBQUNHLE1BQU0sS0FBSyxhQUFhLEVBQUU7SUFDdkMsSUFBTUUsYUFBYSxHQUFHQyxrQkFBa0IsQ0FBQyxDQUFDO0lBQzFDO0lBQ0FDLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDSCxhQUFhLENBQUM7SUFFMUJJLG9CQUFvQixDQUFDSixhQUFhLENBQUM7SUFDbkNFLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDLHlCQUF5QixDQUFDO0VBQzFDO0FBQ0osQ0FBQyxDQUFDO0FBRUYsU0FBU0Ysa0JBQWtCQSxDQUFBLEVBQUc7RUFDMUIsSUFBTUksV0FBVyxHQUFHQyxRQUFRLENBQUNDLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQ0MsU0FBUztFQUM3RCxPQUFPSCxXQUFXO0FBQ3RCOztBQUVBO0FBQ0EsU0FBU0Qsb0JBQW9CQSxDQUFDSyxJQUFJLEVBQUU7RUFDaENsQixNQUFNLENBQUNDLE9BQU8sQ0FBQ2tCLFdBQVcsQ0FBQztJQUFFWixNQUFNLEVBQUUsZUFBZTtJQUFFVyxJQUFJLEVBQUVBO0VBQUssQ0FBQyxFQUFFLFVBQVNFLFFBQVEsRUFBRTtJQUNuRixJQUFJQSxRQUFRLGFBQVJBLFFBQVEsZUFBUkEsUUFBUSxDQUFFQyxPQUFPLEVBQUU7TUFDbkJWLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDLHNDQUFzQyxDQUFDO0lBQ3ZEO0VBQ0osQ0FBQyxDQUFDO0FBQ04sQyIsInNvdXJjZXMiOlsid2VicGFjazovL2FydGljbGUtbm90ZS10YWtlci93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9hcnRpY2xlLW5vdGUtdGFrZXIvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9hcnRpY2xlLW5vdGUtdGFrZXIvLi9zcmMvc2NyaXB0cy9wYWdlLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIFRoZSByZXF1aXJlIHNjb3BlXG52YXIgX193ZWJwYWNrX3JlcXVpcmVfXyA9IHt9O1xuXG4iLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJjaHJvbWUucnVudGltZS5vbk1lc3NhZ2UuYWRkTGlzdGVuZXIoZnVuY3Rpb24ocmVxdWVzdCwgc2VuZGVyLCBzZW5kUmVzcG9uc2UpIHtcbiAgICBpZiAocmVxdWVzdC5hY3Rpb24gPT09IFwiY2hlY2tTY3JpcHRcIikge1xuICAgICAgICBzZW5kUmVzcG9uc2UoeyBzY3JpcHRJbmplY3RlZDogdHJ1ZSB9KTtcbiAgICB9XG4gICAgZWxzZSBpZiAocmVxdWVzdC5hY3Rpb24gPT09IFwiZXh0cmFjdFRleHRcIikge1xuICAgICAgICBjb25zdCBleHRyYWN0ZWRUZXh0ID0gZXh0cmFjdEFydGljbGVUZXh0KCk7XG4gICAgICAgIC8vIEhlcmUsIHlvdSBjYW4gZWl0aGVyIHN0b3JlIHRoZSB0ZXh0LCBzZW5kIGl0IGJhY2sgdG8gdGhlIGJhY2tncm91bmQgc2NyaXB0LCBvciB0YWtlIGFub3RoZXIgYWN0aW9uXG4gICAgICAgIGNvbnNvbGUubG9nKGV4dHJhY3RlZFRleHQpOyBcblxuICAgICAgICBzZW5kVGV4dFRvQmFja2dyb3VuZChleHRyYWN0ZWRUZXh0KTtcbiAgICAgICAgY29uc29sZS5sb2coXCJUZXh0IHNlbnQgdG8gYmFja2dyb3VuZFwiKTtcbiAgICB9XG59KTtcblxuZnVuY3Rpb24gZXh0cmFjdEFydGljbGVUZXh0KCkge1xuICAgIGNvbnN0IGFydGljbGVUZXh0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Jvb3QnKS5pbm5lclRleHQ7XG4gICAgcmV0dXJuIGFydGljbGVUZXh0O1xufVxuXG4vLyBUaGlzIGZ1bmN0aW9uIHNlbmRzIHRoZSBleHRyYWN0ZWQgdGV4dCB0byB0aGUgYmFja2dyb3VuZFxuZnVuY3Rpb24gc2VuZFRleHRUb0JhY2tncm91bmQodGV4dCkge1xuICAgIGNocm9tZS5ydW50aW1lLnNlbmRNZXNzYWdlKHsgYWN0aW9uOiBcImV4dHJhY3RlZFRleHRcIiwgdGV4dDogdGV4dCB9LCBmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICBpZiAocmVzcG9uc2U/LnN1Y2Nlc3MpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiVGV4dCBzdWNjZXNzZnVsbHkgc2VudCB0byBiYWNrZ3JvdW5kXCIpO1xuICAgICAgICB9XG4gICAgfSk7XG59Il0sIm5hbWVzIjpbImNocm9tZSIsInJ1bnRpbWUiLCJvbk1lc3NhZ2UiLCJhZGRMaXN0ZW5lciIsInJlcXVlc3QiLCJzZW5kZXIiLCJzZW5kUmVzcG9uc2UiLCJhY3Rpb24iLCJzY3JpcHRJbmplY3RlZCIsImV4dHJhY3RlZFRleHQiLCJleHRyYWN0QXJ0aWNsZVRleHQiLCJjb25zb2xlIiwibG9nIiwic2VuZFRleHRUb0JhY2tncm91bmQiLCJhcnRpY2xlVGV4dCIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsImlubmVyVGV4dCIsInRleHQiLCJzZW5kTWVzc2FnZSIsInJlc3BvbnNlIiwic3VjY2VzcyJdLCJzb3VyY2VSb290IjoiIn0=