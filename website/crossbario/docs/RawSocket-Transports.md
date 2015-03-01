RawSocket *Transports* implement WAMP-over-RawSocket and support TCP/TLS as well as Unix domain socket, each combined with JSON and MsgPack for serialization.

## Why?

"RawSocket" is an (alternative) transport for WAMP that uses length-prefixed, binary messages - a message framing different from WebSocket. Compared to WebSocket, "RawSocket" is extremely simple to implement.

It can run over TCP, TLS or Unix domain socket. When run over TLS on a (misused) standard Web port (443), it is also able to traverse most locked down networking environments (unless Man-in-the-Middle intercepting proxies are in use).

However, it does not support compression or automatic negotiation of WAMP serialization (as WebSocket allows). Perhaps most importantly, RawSocket cannot be used with Web browser clients.


## Configuration

Here is an example *Transport* that will run WAMP-over-RawSocket on a Unix domain socket using MsgPack serialization:

```javascript
{
   "type": "rawsocket",
   "serializer": "msgpack",
   "endpoint": {
      "type": "unix",
      "path": "/tmp/mysocket1"
   }
}
```

> Note that you MUST specify the serializer to use (since RawSocket does not provide negotiation capabilities). If you want to support both JSON and MsgPack, you can just create two *Transports* listening on different ports or socket paths.

RawSocket *Transports* are configured using the following parameters:

Parameter | Description
-----|------
**`id`** | The (optional) transport ID - this must be unique within the router this transport runs in (default: **"transportN"** where N is numbered starting with 1)
**`type`** | Must be `"rawsocket"` (**required**)
**`endpoint`** |  A network connection for data transmission - see [Endpoints](Endpoints) (**required**)
**`serializer`** | the serializer to use - currently one of: `"json"` or `"msgpack"` (**required**)
**`max_message_size`** | Maximum size in bytes of incoming RawSocket messages accepted. Must be between 1 and 64MB (default: **128kB**)
**`auth`** | Authentication to be used for this *Endpoint* - see [[Authentication]]
**`debug`** | Enable transport level debug output. (default: **false**)
