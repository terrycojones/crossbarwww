Transports are necessary for allowing incoming connections to *Routers*. This applies to WAMP connections as well as for other services that *Routers* provide, such as a static Web server.

## WAMP Transports

[WAMP](http://wamp.ws/) runs over any transport with the following characteristics (see the [spec](https://github.com/tavendo/WAMP/blob/master/spec/basic.md#transports)):

1. message-based
2. reliable
3. ordered
4. bidirectional (full-duplex)

Over which WAMP transport an application component is connected to a router does not matter. It's completely transparent from the application component point of view.

## Crossbar.io WAMP Transport Support

Crossbar.io currently supports **18** WAMP transports in total:

![Crossbar.io: supported WAMP Transports](/static/img/docs/gen/crossbar_transports_1.png)

References:

 * [WAMP-WebSocket Transport](https://github.com/tavendo/WAMP/blob/master/spec/basic.md#websocket-transport)
 * [WAMP-HTTP/Longpoll Transport](https://github.com/tavendo/WAMP/blob/master/spec/advanced.md#long-poll-transport)
 * [WAMP-RawSocket Transport](https://github.com/tavendo/WAMP/issues/77)

## Common WAMP Transports

The most common transports are the following:

![Common WAMP Transports](/static/img/docs/gen/crossbar_transports_2.png)

## Web Transports

Crossbar.io also allows Web transports. A Web transport allows running one or more of

* [Static Web Service](Static Web Service)
* [WAMP Long-Poll Service](WAMP Long-Poll Service)
* [Web Redirection Service](Web Redirection Service)
* [JSON Value Service](JSON Value Service)
* [CGI Script Service](CGI Script Service)
* [WSGI Host Service](WSGI Host Service)
* [HTTP Pusher Service](HTTP Pusher Service)

## Configuration

For configuring *Transports* with *Routers*, 

* for WAMP connections please see

   * [WebSocket Transports](WebSocket Transports)
   * [RawSocket Transports](RawSocket Transports)

* for the Web server, HTTP/Longpoll and other Web Transport features see

   * [Web Transports and Services](Web Transports and Services)

* for setting up a Flash Policy transport necessary for a WebSocket Flash fallback for older browsers

   * [[Flash Policy Transports]]

