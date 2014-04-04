// IE mobile viewport fix
if (navigator.userAgent.match(/IEMobile\/10\.0/)) {
  var msViewportStyle = document.createElement("style")
  msViewportStyle.appendChild(
    document.createTextNode(
      "@-ms-viewport{width:auto!important}"
    )
  )
  document.getElementsByTagName("head")[0].appendChild(msViewportStyle)
}


// console.log("js enabled");



/*********************************************
*  Community widget integration code         *
*********************************************/


// set up community widget once everything else has loaded
window.addEventListener("load", setupWidget);

function setupWidget() {
   // add the iFrame
   var iFrame = document.createElement("iframe");
   iFrame.id = "communityWidget";
   iFrame.src = "http://127.0.0.1:8040/iframe.html";
   iFrame.frameBorder = "0";
   document.body.appendChild(iFrame);

   // send page URL to widget
   var parentUrl = window.location.host;
   iFrame.addEventListener("load", sendUrlToWidget);
   function sendUrlToWidget() {
      iFrame.contentWindow.postMessage(parentUrl, "*"); // "*" - can be sent irrespective of the origin of the calling page
   }

   // add listener for resize messages from widget
   window.addEventListener("message", function(message) {
      resizeWidget(message.data);
   });

   function resizeWidget(targetSize) {
      if(targetSize === "min") {
         $(iFrame).removeClass("max");
      } else {
         $(iFrame).addClass("max");
      }
   }
}



