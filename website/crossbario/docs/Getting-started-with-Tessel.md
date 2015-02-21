In this recipe we will use **Crossbar**.io to generate an application template for a [WAMP](http://wamp.ws/) application with JavaScript components running on a [Tessel](https://tessel.io/) and in the browser.

The [Tessel](https://tessel.io/) is a microcontroller which can be programmed in JavaScript and aims for Node.js compatibility. It has integreted wi-fi and its functionality can be extended using modules that provide e.g. an accelerometer, a camera or audio input and output.

The browser component uses the open source library [AutobahnJS](https://github.com/tavendo/AutobahnJS) to provide WAMP functionality, while for the Tessel we use [wamp-tessel](https://github.com/mykwillis/wamp-tessel), a fork of AutobahnJS adapted to work around compatibility issues. (The Tessel is not fully there with the Node.js compatibility.)

The components will talk with each other using all four main interactions available in WAMP:

 1. call a remote procedure
 2. register a procedure for remote calling
 3. publish an event to a topic
 4. subscribe to a topic to receive events

We will run the whole application with **Crossbar**.io serving as a WAMP router and  application component host for the Node.js component.

**Note**: The combination of Tessel and browser components is just an example. WAMP allows polyglot applications, i.e. application components can be written in any language for which a WAMP library exists. This means you can combine the Tessel with components written in (at the moment) Python, Java, PHP, C#, Objective-C, C++ and Erlang.

# Prerequisites

You need to have [Node.js](http://nodejs.org/) and the the [Node package manager](https://www.npmjs.org/) installed. Tessel uses npm for installing the Tessel environment and the software for the modules.

Once you've installed Node.js and npm (and added Node.js to your system path - see the project installation instructions), you need to get your Tessle initialized. The Tessel website has a nice [getting started](http://start.tessel.io/install) which you should follow up to getting the lights on the Tessel to blink, just to be sure that things are working properly.

You also need to install Crossbar.io. To use the built-in templates, this should be a [[Local Installation]].


## Running the demo

To set up Crossbar.io with the template, do

```sh
crossbar init --template hello:tessel --appdir hello_tessel
```

To install `wamp-tessel`, the required WAMP library, do 

```
npm install
```

You should then start Crossbar.io by doing 

```
cd hello_tessel
crossbar start
```

The browser component is served by the integrated Web server in Crossbar.io, and can be accessed under `http://localhost:8080`.

For the Tessel component, connect your Tessel, connect it to a wi-fi network which the computer running Crossbar.io is also connected to.

You then need to open `tessel/hello.js` and edit the URL for the WAMP connection to use the IP for the computer running Crossbar.io.

Then run the code on the Tessel by doing

```
cd tessel
tessel run hello.js
```

The two components each subscribe to a topic + publish to a topic, register a procedure and call a procedure, logging events in connection with these actions to the console.

**Note**: At the time of writing, the Tessel was somewhat unstable. If there is no logging of events, try disconnecting and reconnecting the Tessel first before assuming that there are problems elsewhere. 


## Crossbar.io configuration

The Crossbar.io configuration for this demo is completely standard - with a single exception: The WebSocket library used by `wamp-tessel` does not transmit the WebSocket subprotocol. When using `wamp-tessel`, you need to set the WebSocket option:
```
"options": {
   "require_websocket_subprotocol": false   
}
```

## Where to go now?

* For more Tessel code, see the [Alarm App](https://github.com/crossbario/crossbardemo/tree/master/crossbardemo/crossbardemo/iot/tessel/alarmapp) which we created as part of a Microsoft IoT Hackation.
