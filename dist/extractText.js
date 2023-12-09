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
/*!************************************!*\
  !*** ./src/scripts/extractText.js ***!
  \************************************/
__webpack_require__.r(__webpack_exports__);
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === "extractText") {
    var extractedText = extractArticleText();
    if (extractedText) {
      sendTextToBackground(extractedText);
      console.log("Text sent to background");
    }
  }
});
var alreadyExtracted = false;
function extractArticleText() {
  if (alreadyExtracted) {
    console.log("Extraction already performed.");
    return null; // Explicitly return null
  }

  var articleText = document.querySelector('#root').innerText;
  alreadyExtracted = true;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXh0cmFjdFRleHQuanMiLCJtYXBwaW5ncyI6Ijs7VUFBQTtVQUNBOzs7OztXQ0RBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7O0FDTkFBLE1BQU0sQ0FBQ0MsT0FBTyxDQUFDQyxTQUFTLENBQUNDLFdBQVcsQ0FBQyxVQUFTQyxPQUFPLEVBQUVDLE1BQU0sRUFBRUMsWUFBWSxFQUFFO0VBQ3pFLElBQUlGLE9BQU8sQ0FBQ0csTUFBTSxLQUFLLGFBQWEsRUFBRTtJQUNsQyxJQUFNQyxhQUFhLEdBQUdDLGtCQUFrQixDQUFDLENBQUM7SUFDMUMsSUFBSUQsYUFBYSxFQUFFO01BQ2ZFLG9CQUFvQixDQUFDRixhQUFhLENBQUM7TUFDbkNHLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDLHlCQUF5QixDQUFDO0lBQzFDO0VBQ0o7QUFDSixDQUFDLENBQUM7QUFFRixJQUFJQyxnQkFBZ0IsR0FBRyxLQUFLO0FBRTVCLFNBQVNKLGtCQUFrQkEsQ0FBQSxFQUFHO0VBQzFCLElBQUlJLGdCQUFnQixFQUFFO0lBQ2xCRixPQUFPLENBQUNDLEdBQUcsQ0FBQywrQkFBK0IsQ0FBQztJQUM1QyxPQUFPLElBQUksQ0FBQyxDQUFDO0VBQ2pCOztFQUNBLElBQU1FLFdBQVcsR0FBR0MsUUFBUSxDQUFDQyxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUNDLFNBQVM7RUFDN0RKLGdCQUFnQixHQUFHLElBQUk7RUFDdkIsT0FBT0MsV0FBVztBQUN0Qjs7QUFHQTtBQUNBLFNBQVNKLG9CQUFvQkEsQ0FBQ1EsSUFBSSxFQUFFO0VBQ2hDbEIsTUFBTSxDQUFDQyxPQUFPLENBQUNrQixXQUFXLENBQUM7SUFBRVosTUFBTSxFQUFFLGVBQWU7SUFBRVcsSUFBSSxFQUFFQTtFQUFLLENBQUMsRUFBRSxVQUFTRSxRQUFRLEVBQUU7SUFDbkYsSUFBSUEsUUFBUSxhQUFSQSxRQUFRLGVBQVJBLFFBQVEsQ0FBRUMsT0FBTyxFQUFFO01BQ25CVixPQUFPLENBQUNDLEdBQUcsQ0FBQyxzQ0FBc0MsQ0FBQztJQUN2RDtFQUNKLENBQUMsQ0FBQztBQUNOLEMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9hcnRpY2xlLW5vdGUtdGFrZXIvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYXJ0aWNsZS1ub3RlLXRha2VyL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vYXJ0aWNsZS1ub3RlLXRha2VyLy4vc3JjL3NjcmlwdHMvZXh0cmFjdFRleHQuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gVGhlIHJlcXVpcmUgc2NvcGVcbnZhciBfX3dlYnBhY2tfcmVxdWlyZV9fID0ge307XG5cbiIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImNocm9tZS5ydW50aW1lLm9uTWVzc2FnZS5hZGRMaXN0ZW5lcihmdW5jdGlvbihyZXF1ZXN0LCBzZW5kZXIsIHNlbmRSZXNwb25zZSkge1xuICAgIGlmIChyZXF1ZXN0LmFjdGlvbiA9PT0gXCJleHRyYWN0VGV4dFwiKSB7XG4gICAgICAgIGNvbnN0IGV4dHJhY3RlZFRleHQgPSBleHRyYWN0QXJ0aWNsZVRleHQoKTtcbiAgICAgICAgaWYgKGV4dHJhY3RlZFRleHQpIHtcbiAgICAgICAgICAgIHNlbmRUZXh0VG9CYWNrZ3JvdW5kKGV4dHJhY3RlZFRleHQpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJUZXh0IHNlbnQgdG8gYmFja2dyb3VuZFwiKTtcbiAgICAgICAgfVxuICAgIH1cbn0pO1xuXG5sZXQgYWxyZWFkeUV4dHJhY3RlZCA9IGZhbHNlO1xuXG5mdW5jdGlvbiBleHRyYWN0QXJ0aWNsZVRleHQoKSB7XG4gICAgaWYgKGFscmVhZHlFeHRyYWN0ZWQpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJFeHRyYWN0aW9uIGFscmVhZHkgcGVyZm9ybWVkLlwiKTtcbiAgICAgICAgcmV0dXJuIG51bGw7IC8vIEV4cGxpY2l0bHkgcmV0dXJuIG51bGxcbiAgICB9XG4gICAgY29uc3QgYXJ0aWNsZVRleHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcm9vdCcpLmlubmVyVGV4dDtcbiAgICBhbHJlYWR5RXh0cmFjdGVkID0gdHJ1ZTtcbiAgICByZXR1cm4gYXJ0aWNsZVRleHQ7XG59XG5cblxuLy8gVGhpcyBmdW5jdGlvbiBzZW5kcyB0aGUgZXh0cmFjdGVkIHRleHQgdG8gdGhlIGJhY2tncm91bmRcbmZ1bmN0aW9uIHNlbmRUZXh0VG9CYWNrZ3JvdW5kKHRleHQpIHtcbiAgICBjaHJvbWUucnVudGltZS5zZW5kTWVzc2FnZSh7IGFjdGlvbjogXCJleHRyYWN0ZWRUZXh0XCIsIHRleHQ6IHRleHQgfSwgZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgaWYgKHJlc3BvbnNlPy5zdWNjZXNzKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIlRleHQgc3VjY2Vzc2Z1bGx5IHNlbnQgdG8gYmFja2dyb3VuZFwiKTtcbiAgICAgICAgfVxuICAgIH0pO1xufSJdLCJuYW1lcyI6WyJjaHJvbWUiLCJydW50aW1lIiwib25NZXNzYWdlIiwiYWRkTGlzdGVuZXIiLCJyZXF1ZXN0Iiwic2VuZGVyIiwic2VuZFJlc3BvbnNlIiwiYWN0aW9uIiwiZXh0cmFjdGVkVGV4dCIsImV4dHJhY3RBcnRpY2xlVGV4dCIsInNlbmRUZXh0VG9CYWNrZ3JvdW5kIiwiY29uc29sZSIsImxvZyIsImFscmVhZHlFeHRyYWN0ZWQiLCJhcnRpY2xlVGV4dCIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsImlubmVyVGV4dCIsInRleHQiLCJzZW5kTWVzc2FnZSIsInJlc3BvbnNlIiwic3VjY2VzcyJdLCJzb3VyY2VSb290IjoiIn0=