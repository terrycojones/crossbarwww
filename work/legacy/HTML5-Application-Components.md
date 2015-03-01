> The shell commands shown here assume use of a Unix-like shell. On Windows, we recommend to install [Git for Windows](http://msysgit.github.io/), which includes a bash shell.

# Minimal Example

The following is a minimalistic example showing how to send and receive events in real-time in JavaScript running in a browser.

**1. Create a new Crossbar.io node**

```console
cd $HOME
mkdir test1
cd test1
crossbar init
```

**2. Create a file `$HOME/test1/index.html`**

```console
cd $HOME/test1
touch index.html
```

and insert the following contents

```html
<!DOCTYPE html>
<html>
   <body>
      <h1>Real-time messaging with Crossbar.io</h1>
      <p>Open console (hit F12) ..</p>
      <script>
         AUTOBAHN_DEBUG = true;
      </script>
      <script src="https://autobahn.s3.amazonaws.com/autobahnjs/latest/autobahn.min.jgz">
      </script>
      <script>
         var connection = new autobahn.Connection({url: 'ws://127.0.0.1:8080/ws', realm: 'realm1'});

         // "onopen" handler will fire when WAMP session has been established ..
         connection.onopen = function (session) {

            console.log("session established!");

            // our event handler we will subscribe on our topic
            //
            function onevent1(args, kwargs) {
               console.log("got event:", args, kwargs);
            }

            // subscribe to receive events on a topic ..
            //
            session.subscribe('com.myapp.mytopic1', onevent1).then(
               function (subscription) {
                  console.log("ok, subscribed with ID " + subscription.id);
               },
               function (error) {
                  console.log(error);
               }
            ); 
         };

         // "onclose" handler will fire when connection was lost ..
         connection.onclose = function (reason, details) {
            console.log("connection lost", reason);
         }

         // initiate opening of WAMP connection ..
         connection.open();

         // button click handler .. will publish an event
         //
         function publish1() {
            if (connection.session) {
               // publish an event to a topic ..
               //
               connection.session.publish("com.myapp.mytopic1", ["Hello, world!"]);
               console.log("event published!");
            } else {
               console.log("cannot publish: no session");
            }
         }
      </script>
      <button onclick="publish1()">Publish</button>
   </body>
</html>
```

**3. Start the demo**

Start **Crossbar**.io

```console
cd $HOME/test1
crossbar start
```

**Crossbar**.io will log to console while starting:

```console
oberstet@COREI7 ~/test1
$ crossbar start
2014-04-02 13:46:44+0200 [Controller 2596] Log opened.
2014-04-02 13:46:44+0200 [Controller 2596] ============================== Crossbar.io ==============================

2014-04-02 13:46:44+0200 [Controller 2596] Crossbar.io 0.9.2 node starting
2014-04-02 13:46:44+0200 [Controller 2596] Warning, could not set process title (setproctitle not installed)
2014-04-02 13:46:44+0200 [Controller 2596] WampWebSocketServerFactory starting on 9000
2014-04-02 13:46:44+0200 [Controller 2596] Starting factory <autobahn.twisted.websocket.WampWebSocketServerFactory instance at 0x032B47B0>
2014-04-02 13:46:44+0200 [Controller 2596] Worker PID 4752 process connected
2014-04-02 13:46:44+0200 [Worker 4752] Log opened.
2014-04-02 13:46:44+0200 [Worker 4752] Warning, could not set process title (setproctitle not installed)
2014-04-02 13:46:44+0200 [Worker 4752] Starting from node directory c:\Users\oberstet\test1\.crossbar.
2014-04-02 13:46:45+0200 [Worker 4752] Running on IOCPReactor reactor.
2014-04-02 13:46:45+0200 [Worker 4752] Entering event loop ..
2014-04-02 13:46:45+0200 [Worker 4752] Connected to node router.
2014-04-02 13:46:45+0200 [Worker 4752] Procedures registered.
2014-04-02 13:46:45+0200 [Controller 2596] Worker 4752: CPU affinity is [0, 1, 2, 3, 4, 5, 6, 7]
2014-04-02 13:46:46+0200 [Controller 2596] Worker 4752: Router started (101)
2014-04-02 13:46:46+0200 [Controller 2596] Worker 4752: Realm started on router 101 (None)
2014-04-02 13:46:46+0200 [Controller 2596] Worker 4752: Transport web/tcp (1) started on router 101
2014-04-02 13:46:46+0200 [Worker 4752] Site starting on 8080
2014-04-02 13:46:46+0200 [Worker 4752] Starting factory <twisted.web.server.Site instance at 0x034BAC10>
...
```

Now open `http://127.0.0.1:8080` in your browser in **two** tabs. In each browser tab, open the JavaScript console (hit F12) to see logging messages. Hit the "Publish" button and watch the event arrive in the other tab.

![](/static/img/docs/shots/html5_minimal_example.png)

> Note: By default, an event published will not be sent to the publisher, even if the latter is also subscribed. This behavior can be modified using the `exclude_me` option.


