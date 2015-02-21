[**Crossbar**.io](http://crossbar.io/) allows to integrate application components running on [Python](http://python.org/) into a WAMP based system.

Application components use [**Autobahn**](Python](https://github.com/tavendo/AutobahnPython) to connect to **Crossbar**.io.

The following is a step-by-step guide that shows how to run Python-based application components in a **Crossbar**.io connected system.

## Demo Application Component

Throughout this guide, we will explore the different options for running the following application component with **Crossbar**.io.

The **TimeService** component provides a procedure `com.timeservice.now` which takes no parameters and returns the current time. It requires  [Twisted](https://twistedmatrix.com/trac/), and consequently only runs under Python 2.7.

```python
import datetime
from twisted.internet.defer import inlineCallbacks

from autobahn.twisted.wamp import ApplicationSession
from autobahn.wamp.exception import ApplicationError

class TimeService(ApplicationSession):

    # @inlineCallbacks
    # def onJoin(self, details):

    #     ## REGISTER a procedure for remote calling
    #     ##
    #     def add2(x, y):
    #         print("add2() called with {} and {}".format(x, y))
    #         return x + y

    #     reg = yield self.register(add2, 'com.example.add2')
    #     print("procedure add2() registered")

    @inlineCallbacks
    def onJoin(self, details):

        def utcnow():
            print("I am being called;)")
            now = datetime.datetime.utcnow()
            return now.strftime("%Y-%m-%dT%H:%M:%SZ")

        try:
            reg = yield self.register(utcnow, 'com.timeservice.now')
            print("Ok, registered procedure for WAMP RPC ({})".format(reg.id))
        except Exception as e:
            print("Failed to register procedure: {}".format(e))
```

You can test the application component from the JavaScript frontends:

  * [Timeservice Frontend](https://github.com/tavendo/AutobahnPython/blob/master/examples/twisted/wamp/basic/rpc/timeservice/frontend.html)

Lots of more demo application components can be found [here](https://github.com/tavendo/AutobahnPython/tree/master/examples/twisted/wamp/basic).

## Prepare

Prepare a new project directory

```
mkdir ~/test1
cd test1
crossbar init
```

and save the above Python component into a file `~/test1/timeservice.py`.

For each experiment below, paste the contents for the listed **Crossbar**.io configuration into the file `~/test1/.crossbar/config.json` and start the node

```
cd ~/test1
crossbar start
```

## Router with Application Session

Crossbar.io router instances can run Python (2.7) application components within the same system process. For more information see [Router Components](Router Components). 

To start a router with an embedded application session that runs the application component, start a **Crossbar**.io node with the following configuration:

```javascript
{
   "controller": {
   },
   "workers": [
      {
         "type": "router",
         "options": {
            "pythonpath": [".."]
         },
         "components": [
            {
               "type": "class",
               "realm": "realm1",
               "classname": "timeservice.TimeService"
            }
         ],
         "realms": [
            {
               "name": "realm1",
               "roles": [
                  {
                     "name": "anonymous",
                     "permissions": [
                        {
                           "uri": "*",
                           "publish": true,
                           "subscribe": true,
                           "call": true,
                           "register": true
                        }
                     ]
                  }
               ]
            }
         ],
         "transports": [
            {
               "type": "web",
               "endpoint": {
                  "type": "tcp",
                  "port": 8080
               },
               "paths": {
                  "/": {
                     "type": "static",
                     "directory": ".."
                  },
                  "ws": {
                     "type": "websocket"
                  }
               }
            }
         ]
      }
   ]
}
```

This will run a WAMP router for frontends to connect, and run an embedded WAMP session with the application component directly connected to the router.

Here is log output

```console
$ crossbar start
2015-01-17 18:48:07+0100 [Controller   6152] Log opened.
2015-01-17 18:48:07+0100 [Controller   6152] ==================== Crossbar.io ====================

2015-01-17 18:48:07+0100 [Controller   6152] Crossbar.io 0.10.0 starting
2015-01-17 18:48:07+0100 [Controller   6152] Running on CPython using IOCPReactor reactor
2015-01-17 18:48:07+0100 [Controller   6152] Starting from node directory c:\Users\Alex\tmp\default\.crossbar
2015-01-17 18:48:07+0100 [Controller   6152] Starting from local configuration 'c:\Users\Alex\tmp\default\.crossbar\conf
ig.json'
2015-01-17 18:48:07+0100 [Controller   6152] Warning, could not set process title (setproctitle not installed)
2015-01-17 18:48:07+0100 [Controller   6152] No WAMPlets detected in enviroment.
2015-01-17 18:48:07+0100 [Controller   6152] Starting Router with ID 'worker1' ..
2015-01-17 18:48:07+0100 [Controller   6152] Entering reactor event loop ...
2015-01-17 18:48:07+0100 [Router       8168] Log opened.
2015-01-17 18:48:07+0100 [Router       8168] Warning: could not set worker process title (setproctitle not installed)
2015-01-17 18:48:09+0100 [Router       8168] Running under CPython using IOCPReactor reactor
2015-01-17 18:48:09+0100 [Router       8168] Entering event loop ..
2015-01-17 18:48:09+0100 [Controller   6152] Router with ID 'worker1' and PID 8168 started
2015-01-17 18:48:09+0100 [Controller   6152] Router 'worker1': PYTHONPATH extended
2015-01-17 18:48:09+0100 [Controller   6152] Router 'worker1': realm 'realm1' started
2015-01-17 18:48:09+0100 [Controller   6152] Router 'worker1': role 'role1' started on realm 'realm1'
2015-01-17 18:48:09+0100 [Controller   6152] Router 'worker1': component 'component1' started
2015-01-17 18:48:09+0100 [Router       8168] Ok, registered procedure for WAMP RPC (1740149135)
2015-01-17 18:48:09+0100 [Router       8168] Site starting on 8080
2015-01-17 18:48:09+0100 [Controller   6152] Router 'worker1': transport 'transport1' started
2015-01-17 18:48:39+0100 [Router       8168] I am being called;)
2015-01-17 18:48:40+0100 [Router       8168] I am being called;)
2015-01-17 18:48:41+0100 [Router       8168] I am being called;)
2015-01-17 18:48:41+0100 [Router       8168] I am being called;)
```


## Router and Native Worker

Crossbar.io can also run Python (2.7) components 

To start a router together with a separate *worker process that hosts the application components, start a **Crossbar**.io node with the following configuration:

```javascript
{
   "controller": {
   },
   "workers": [
      {
         "type": "router",
         "options": {
            "pythonpath": [".."]
         },
         "realms": [
            {
               "name": "realm1",
               "roles": [
                  {
                     "name": "anonymous",
                     "permissions": [
                        {
                           "uri": "*",
                           "publish": true,
                           "subscribe": true,
                           "call": true,
                           "register": true
                        }
                     ]
                  }
               ]
            }
         ],
         "transports": [
            {
               "type": "web",
               "endpoint": {
                  "type": "tcp",
                  "port": 8080
               },
               "paths": {
                  "/": {
                     "type": "static",
                     "directory": ".."
                  },
                  "ws": {
                     "type": "websocket"
                  }
               }
            }
         ]
      },
      {
         "type": "container",
         "options": {
            "pythonpath": [".."]
         },
         "components": [
            {
               "type": "class",
               "classname": "timeservice.TimeService",
               "realm": "realm1",
               "transport": {
                  "type": "websocket",
                  "endpoint": {
                     "type": "tcp",
                     "host": "127.0.0.1",
                     "port": 8080
                  },
                  "url": "ws://127.0.0.1:8080/ws"
               }
            }
         ]
      }
   ]
}
```

The application component will run in a separate process that connects over loopback TCP to the WAMP router. The configuration for this connection is part of the above configuration file, and does not happen in the component itself.

Here is log output:

```console
$ crossbar start
2015-01-17 19:13:09+0100 [Controller   6416] Log opened.
2015-01-17 19:13:09+0100 [Controller   6416] ==================== Crossbar.io ====================

2015-01-17 19:13:09+0100 [Controller   6416] Crossbar.io 0.10.0 starting
2015-01-17 19:13:09+0100 [Controller   6416] Running on CPython using IOCPReactor reactor
2015-01-17 19:13:09+0100 [Controller   6416] Starting from node directory c:\Users\Alex\tmp\default\.crossbar
2015-01-17 19:13:09+0100 [Controller   6416] Starting from local configuration 'c:\Users\Alex\tmp\default\.crossbar\conf
ig.json'
2015-01-17 19:13:09+0100 [Controller   6416] Warning, could not set process title (setproctitle not installed)
2015-01-17 19:13:09+0100 [Controller   6416] No WAMPlets detected in enviroment.
2015-01-17 19:13:09+0100 [Controller   6416] Starting Router with ID 'worker1' ..
2015-01-17 19:13:09+0100 [Controller   6416] Entering reactor event loop ...
2015-01-17 19:13:09+0100 [Router       8736] Log opened.
2015-01-17 19:13:09+0100 [Router       8736] Warning: could not set worker process title (setproctitle not installed)
2015-01-17 19:13:10+0100 [Router       8736] Running under CPython using IOCPReactor reactor
2015-01-17 19:13:11+0100 [Router       8736] Entering event loop ..
2015-01-17 19:13:11+0100 [Controller   6416] Router with ID 'worker1' and PID 8736 started
2015-01-17 19:13:11+0100 [Controller   6416] Router 'worker1': PYTHONPATH extended
2015-01-17 19:13:11+0100 [Controller   6416] Router 'worker1': realm 'realm1' started
2015-01-17 19:13:11+0100 [Controller   6416] Router 'worker1': role 'role1' started on realm 'realm1'
2015-01-17 19:13:11+0100 [Router       8736] Site starting on 8080
2015-01-17 19:13:11+0100 [Controller   6416] Router 'worker1': transport 'transport1' started
2015-01-17 19:13:11+0100 [Controller   6416] Starting Container with ID 'worker2' ..
2015-01-17 19:13:11+0100 [Container    7048] Log opened.
2015-01-17 19:13:11+0100 [Container    7048] Warning: could not set worker process title (setproctitle not installed)
2015-01-17 19:13:12+0100 [Container    7048] Running under CPython using IOCPReactor reactor
2015-01-17 19:13:13+0100 [Container    7048] Entering event loop ..
2015-01-17 19:13:13+0100 [Controller   6416] Container with ID 'worker2' and PID 7048 started
2015-01-17 19:13:13+0100 [Controller   6416] Container 'worker2': PYTHONPATH extended
2015-01-17 19:13:13+0100 [Controller   6416] Container 'worker2': component 'component1' started
2015-01-17 19:13:13+0100 [Container    7048] Ok, registered procedure for WAMP RPC (729673538)
2015-01-17 19:13:18+0100 [Container    7048] I am being called;)
2015-01-17 19:13:19+0100 [Container    7048] I am being called;)
2015-01-17 19:13:20+0100 [Container    7048] I am being called;)
```

## Router and Guest Worker

Crossbar.io also allows to start components which use arbitrary runtimes (or are compiled executables). This also allows Python 3.x components to be started from Crossbar.io

To start a Crossbar.io node which runs our TimeSerive as a guest worker, use this configuration:

- write me -



