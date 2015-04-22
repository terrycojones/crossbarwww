The default transport for WAMP is WebSocket. For clients not supporting WebSocket, the WAMP specification defines a transport that runs over a HTTP long-poll mechanism.

## Configuration

The *Long-Poll Service* is configured on a path of a Web transport - here is part of a Crossbar configuration:

```javascript
{   
   "workers": [
      {
         "type": "router",
         ...
         "transports": [
            {
               "type": "web",
               ...
               "paths": {
                  ...
                  "lp": {
                     "type": "longpoll"
                  }
               }
            }
         ]
      }
   ]
}
```

The service dictionary has the following parameters:

option | description
---|---
**`type`** | MUST be `"longpoll"` (*required*)
**`options`** | A dictionary of options (optional, see below).

The `options` dictionary has the following configuration parameters:

option | description
---|---
**`request_timeout`** | An integer which determines the timeout in seconds for long-poll requests. If 0, do not timeout. (default: **10**)
**`session_timeout`** | An integer which determines the timeout on inactivity of sessions. If 0, do not timeout. (default: **30**)
**`queue_limit_bytes`** | Limit the number of total queued bytes. If 0, don't enforce a limit. (default: **131072**)
**`queue_limit_messages`** | Limit the number of queued messages. If 0, don't enforce a limit. (default: **100**)
**`debug`** | A boolean that activates debug output for this service. (default: **false**).
**`debug_transport_id`** | If given (e.g. `"kjmd3sBLOUnb3Fyr"`), use this fixed transport ID. (default: **null**).

## Example using AutobahnJS

You can find a working example for longpolling using AutobahnJS in the [Crossbar.io examples](https://github.com/crossbario/crossbarexamples/tree/master/longpoll).

## Testing

Here is how to test the *Long-Poll Service* using [curl](http://curl.haxx.se/).

We are using the following config for Crossbar.io (put that into `.crossbar/config.json`):

```javascript

{
   "controller": {
   },
   "workers": [
      {
         "type": "router",
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
                  },
                  "lp": {
                     "type": "longpoll",
                     "options": {
                        "debug": true,
                        "debug_transport_id": "kjmd3sBLOUnb3Fyr"
                     }
                  }
               }
            }
         ]
      }
   ]
}
```

Above config enables debug mode, and sets a fixed transport ID `kjmd3sBLOUnb3Fyr`.

You can now **open** a new connection by running the following in a first terminal:

```console
curl -H "Content-Type: application/json" \
   -d '{"protocols": ["wamp.2.json"]}' \
   http://127.0.0.1:8080/lp/open
```

and **subscribe** to a topic by sending a `SUBSCRIBE` message:

```console

```

then get ready to **receive** WAMP messages by long-polling:

```console
curl -H "Content-Type: application/json" -d "" \
   http://127.0.0.1:8080/lp/kjmd3sBLOUnb3Fyr/receive
```

Now, in a second terminal, **establish** a WAMP session over the transport by sending a WAMP `HELLO` message:

```console
curl -H "Content-Type: application/json" \
   -d '[1, "realm1", {"roles": {"subscriber": {}, "publisher": {}}}]' \
   http://127.0.0.1:8080/lp/kjmd3sBLOUnb3Fyr/send
```

and **send** a message:

```console
curl -H "Content-Type: application/json" \
   -d '[32, 1, {}, "com.myapp.topic1"]' \
   http://127.0.0.1:8080/lp/kjmd3sBLOUnb3Fyr/send
```

The first terminal (which is doing the receive long-poll), will now receive WAMP events for topic `com.myapp.topic1`.

To **close** the transport:

```console
curl -H "Content-Type: application/json" -d '' \
   http://127.0.0.1:8080/lp/kjmd3sBLOUnb3Fyr/close
```