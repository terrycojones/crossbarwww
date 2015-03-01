*WebSocket Transports* are the default and most common way for running WAMP. In particular, WAMP-over-WebSocket is the protocol used to communicate with browsers that natively support WebSocket.

To expose its WAMP routing services you can run an *Endpoint* that talks WAMP-over-WebSocket. Here is an example (part of a Crossbar.io configuration):

```javascript
{
   "type": "websocket",
   "endpoint": {
      "type": "tcp",
      "port": 8080
   },
   "debug": true
}
```


The available parameters for WebSocket transports are:

parameter | description
---|---
**`id`** | The (optional) transport ID - this must be unique within the router this transport runs in (default: **"transportN"** where N is numbered starting with 1)
**`endpoint`** | A network connection for data transmission - see [Endpoints](Endpoints) (**required**)
**`url`** | The WebSocket server URL to use (default: **None**)
**`serializers`** | List of WAMP serializers to announce/speak, must be from `json` and `msgpack` (default: **all available**)
**`options`** | Please see [WebSocket Options](WebSocket Options)
**`debug`** | Enable transport level debug output. (default: **false**)
**`auth`** | Authentication to be used for this *Endpoint* - see [[Authentication]]

In addition to running a WAMP-over-WebSocket *Endpoint* on its own port, an *Endpoint* can share a port with a *Web Transport*. For more information on this, take a look at [[Web Transports and Services]]. 
