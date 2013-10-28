var session = null;

function initialize() {

   // turn on WAMP debug output
   //ab.debug(true, true, false);

   // use jQuery deferreds
   ab.Deferred = $.Deferred;

   var wsuri;
   if (true && (window.location.hostname === "127.0.0.1" || window.location.hostname === "localhost")) {
//      wsuri = 'ws://127.0.0.1/ws';
//      wsuri = 'ws://127.0.0.1:9000';
      wsuri = 'ws://192.168.1.130/ws';
   } else {
//      wsuri = 'wss://crossbardemo.tavendo.de/ws';
      wsuri = 'ws://192.168.1.130/ws';
   }

   ab.log("Connecting to " + wsuri + " ...");

   ab.launch(
      {
         wsuri: wsuri,
         appkey: "cbanalytics",
         appsecret: "98$7633ad",
         appextra: {'referrer': document.referrer, 'href': document.location.href},
         sessionConfig: {maxRetries: 10, sessionIdent: "Crossbar.io"}
      },

      function (newSession) {
         session = newSession;
         session.log("Connected to " + wsuri + ".");
      },
      // session close handler
      function (code, reason, detail) {
         session.log("Connection lost [" + reason + "]");
         session = null;
      }
   );
}

initialize();
