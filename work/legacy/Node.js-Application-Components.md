This page needs reworking. New config file format for guest workers looks like this:

```javascript
      {
         "type": "guest",
         "executable": "/usr/bin/node",
         "arguments": ["hello.js"],
         "options": {
            "workdir": "../hello",
            "stdin": {
               "type": "json",
               "value": {
                  "url": "ws://localhost:8080/ws",
                  "realm": "realm1",
                  "custom1": 23
               },
               "close": true
            },
            "watch": {
               "directories": ["../hello"],
               "action": "restart"
            }
         }
      }
```

[**Crossbar**.io](http://crossbar.io/) allows to integrate application components running inside [Nodejs](http://nodejs.org/) into a WAMP based system.

Application components use [**Autobahn**|JS](https://github.com/tavendo/AutobahnJS) to connect to **Crossbar**.io - the same library and API that developers use to connect frontends running in browsers via WAMP.

The following is a step-by-step guide that shows how to run Nodejs-based application components in a **Crossbar**.io connected system.

## Consuming a time service

**Crossbar**.io in the default configuration for development will automatically run a couple of demo application components. One of those is a demo time service that provides a single procedure to retrieve the current time.

We will show how to call a time service procedure from a Nodejs script. In the following section, we show how to implement the procedure in a Nodejs script.

### Prepare

Create project directory

```
mkdir ~/test1
cd ~/test1
```

and initialize a new **Crossbar**.io node

```
crossbar init
```

> This will create a demo configuration which will start some demo application components in the node.
   
Install Nodejs

```
sudo apt-get install nodejs npm
```

and **Autobahn**](JS

```
npm install autobahn
```

### Demo script

Create a test script `~/test1/gettime.js`

```javascript
var autobahn = require('autobahn');

var connection = new autobahn.Connection({
   url: 'ws://localhost:8080/ws',
   realm: 'realm1'}
);

connection.onopen = function (session) {

   session.call('com.timeservice.now').then(
      function (now) {
         console.log("Current time:", now);
         connection.close();
      },
      function (error) {
         console.log("Call failed:", error);
         connection.close();
      }
   );
};

connection.open();
```

### Run demo

Start **Crossbar**.io in a first terminal

```
crossbar start
```

and run the script in a second terminal

```
nodejs gettime.js
```

You should see output like this

```
oberstet@vbox-ubuntu1310:~/test1$ nodejs gettime.js 
Current time: 2014-02-27T11:43:23Z
```

We have just run a WAMP application component which called a remote procedure on another WAMP application component. Besides this *Caller* role, an application component can also act as a *Callee*, *Publisher* and *Subscriber*. You can find examples of all these [here](https://github.com/tavendo/AutobahnPython/tree/master/examples/twisted/wamp/basic).

## Providing a time service

A second example will show how to replace the builtin time service application component with our own, written in JavaScript under Nodejs.

### Disable Demo Component

Since we want to provide our own implementation of the time service component, we first need to disable the application component that comes built into **Crossbar**.io.

Delete the following line from `~/test1/.crossbar/config.json`

```javascript
"classes": [
    "crossbar.demo.TimeService"   <= DELETE THIS LINE
]
```

### Backend Component

Create a test script `~/test1/timeservice.js`

```javascript
var autobahn = require('autobahn');

var connection = new autobahn.Connection({
   url: 'ws://localhost:8080/ws',
   realm: 'realm1'}
);

connection.onopen = function (session) {

   function utcnow() {
      console.log("Someone is calling me;)");
      now = new Date();
      return now.toISOString();
   }

   session.register('com.timeservice.now', utcnow).then(
      function (registration) {
         console.log("Procedure registered:", registration.id);
      },
      function (error) {
         console.log("Registration failed:", error);
      }
   );
};

connection.open();
```

### Run demo

Start **Crossbar**.io in a first terminal

```
crossbar start
```

and run the script in a second terminal

```
nodejs timeservice.js
```

You should see output like this

```
oberstet@vbox-ubuntu1310:~/test1$ nodejs timeservice.js 
Procedure registered: 2943169627316209
```

Open a third terminal and run

```
nodejs gettime.js
```

You should see similar output as before, but this time the procedure called is running from our JavaScript timeservice component.

## More examples

Lots of more demo application components can be found [here](https://github.com/tavendo/AutobahnPython/tree/master/examples/twisted/wamp/basic).

## Running Nodesjs components under **Crossbar**.io

In above examples, we started the Nodejs application components manually from the command line. This is handy for developement, but for production you probably want an automated start, monitor and restart mechanism.

**Crossbar**.io can automatically start at system boot time. Further, when a **Crossbar**.io node starts, application components can be started automatically in background worker processes by **Crossar**.io in turn.

Lets say we want to have our **TimeService** application component be started in Nodejs automatically. Here is a process configuration for that:

```javascript
{
   "type": "component.program",
   "executable": "/usr/bin/node",
   "arguments": ["timeservice.js"],
   "workdir": ".."
}
```

where
 * `type` must be `"component.program"`
 * `executable` must be a fully qualified path to an executable
 * `arguments` optional list of command line arguments provided to the executable
 * `workdir` the working directory to run in. This can be an absolute path or a path relative to the Crossbar.io data directory.

> Note that the executable must be a fully qualified, properly escaped path. E.g. on Windows, the path to the Nodejs executable on my system is `"C:\\Program Files (x86)\\nodejs\\node.exe"`.

The **stdio** mapping can be set like this (default values shown):

```javascript
{
   ...
   "stdin": null,
   "stdout": "log",
   "stderr": "log"
}
```

A program can also be started getting configuration via **stdin**

```javascript
{
   "type": "component.program",
   "executable": "/usr/bin/node",
   "arguments": ["timeservice.js"],
   "workdir": "..",
   "stdout": "log",
   "stderr": "log",
   "stdin": "config",
   "config": {
      "url": "ws://localhost:8080/ws",
      "realm": "realm1",
      "custom1": 23
   }
}
```

This could then be used from Nodejs by reading the configuration from **stdin** before starting services:

```javascript
var autobahn = require('autobahn');
var when = require('when');

function read_config() {
   process.stdin.setEncoding('utf8');

   var buffer = '';
   var d = when.defer();

   process.stdin.on('readable', function (chunk) {
      var chunk = process.stdin.read();
      if (chunk !== null) {
         buffer += chunk;
      }
   });

   process.stdin.on('end', function () {
      try {
         var config = JSON.parse(buffer);
         d.resolve(config);
      }
      catch (e) {
         d.reject(e);
      }
   });

   return d.promise;
}

read_config().then(function (config) {

   var connection = new autobahn.Connection({
      url: config.url,
      realm: config.realm}
   );

   connection.onopen = function (session) {

      function utcnow() {
         console.log("Someone is calling me;)");
         now = new Date();
         return now.toISOString();
      }

      session.register('com.timeservice.now', utcnow).then(
         function (registration) {
            console.log("Procedure registered:", registration.id);
         },
         function (error) {
            console.log("Registration failed:", error);
         }
      );
   };

   connection.open();
});
```



