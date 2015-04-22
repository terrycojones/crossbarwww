## WAMP Application Router

* realtime RPC and PubSub routing
* multiple [realms](Router Realms) per router (mutliple routing & authorization domains)
* Authentication via

  * [WAMP-CRA](WAMP CRA Authentication) (challenge-response mechanism)
  * [Mozilla Persona](Mozilla Persona)
  * [OTP](OTP-Authentication) (e.g for Google Authenticator)
  * [cookie-based](Cookie Authentication)
  * TLS client certificate (planned)

* [Authorization](Authorization)
  * static for URI + role + realm combinations
  * dynamic via custom authorizations handlers - use any callable WAMP procedure for authorization


## WAMP Advanced Profile Features

* [Subscriber Black & Whitelisting](https://github.com/tavendo/WAMP/blob/master/spec/advanced.md#subscriber-black--and-whitelisting)
* [Publisher and caller identification](https://github.com/tavendo/WAMP/blob/master/spec/advanced.md#publisher-identification)
* Meta-events:

  + [session join & leave](Session Metaevents) 


## Multi-Transport and Serialization

* [Serializations](https://github.com/tavendo/WAMP/blob/master/spec/basic.md#serializations): 

  * JSON
  * msgpack

* Framings:
  
  * [WebSocket](WebSocket Transports) with [Flash fallback](Flash Policy Transports)
  * [RawSocket](RawSocket Transports)
  * HTTP/long poll

* Transport

  * TCP/TLS
  * Unix Domain Socket
  * Unix pipes 

## Polyglot Application Components

* Application components can be written in any language for which a WAMP library exists.
* Current WAMP libraries exist for:

  * [Python](http://autobahn.ws/python)
  * [JavaScript](http://autobahn.ws/js)
  * [PHP](https://github.com/voryx/Thruway)
  * [Java](https://github.com/Matthias247/jawampa)
  * [C++](https://github.com/tavendo/AutobahnCpp)
  * [Objective-C](https://github.com/mogui/MDWamp)
  * [C#](https://github.com/Code-Sharp/WampSharp)
  * [Erlang](https://github.com/bwegh/erwa)

## Component Host

* host WAMP application components in Crossbar
* **Native Worker** - native hosting and deep control for Python components
* **Guest Worker** - start, stop and monitoring for components in any runtime (e.g. NodeJS, PHP, Java)

## Embedded Web Server

* [static web server](Static Web Service)
* configurable paths

  * [Web redirection](Web Redirection Service)
  * [JSON value](JSON Value Service)
  * [CGI script](CGI Script Service)
  * [WSGI host](WSGI Host Service)


## Application Template Scaffolding for Quick Start

* [application templates](Application Templates) for multiple supported languages and platforms
* install from the command line
* offer a working basis to get you hacking

## JSON and YAML configuration

## Multi-Process Architecture



## Upcoming Features

* Database connectors - databases as WAMP components
* Mult-core and multi-node architecture

For more details about upcoming features, see the [Roadmap](Roadmap).

