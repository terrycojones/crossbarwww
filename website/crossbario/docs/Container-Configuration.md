

**Containers** are worker processes spawned by **Crossbar**.io which *directly* host application classes written in Python deriving from `autobahn.twisted.wamp.ApplicationSession`.

This relieves the application programmer from any boilerplate code for hooking up application components into **Crossbar**.io via WAMP.

For example, here is a **Python Component** configuration that will load the application class `timeservice.TimeService` in a worker process, connecting to the specified router (router config part omitted):

```javascript
{
   "controller": {
   },
   "workers": [
      ...
      {
         "type": "container",
         "options": {
            "pythonpath": [".."]
         },
         "components": [
            {
               "type": "class",
               "classname": "hello.hello.AppSession",
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

The worker itself has the options

1. `type`: must be `"container"`(*required*)
2. `options`: a dictionary of configuration options
3. `components`: a list Python components to run in the container (*required*)

`options` are those [shared by Native Workers](Native Worker Shared Options)

For a `component`, the `type` is *required* and may be either `class` or `wamplet`.

Both types share the following options:

1. `id`: The ID of the node
2. `realm`: The realm to connect to (*required*)
3. `transport`: the data for connecting to the router (*required*)
4. `extra`: Optional data provided to the class when instantiating

For the type `class`, you need to set

* `classname`: the Python WAMP application class, a module/classname of a class derived from `autobahn.twisted.wamp.ApplicationSession`*required* 

For the type `wamplet`, you need to set

1. `package`: The name of the installed Python package (*required*)
2. `entrypoint`: The name of the file within the package to execute (*required*)


