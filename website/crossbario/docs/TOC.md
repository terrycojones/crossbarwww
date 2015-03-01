Welcome to the [**Crossbar**.io](http://crossbar.io) documentation. Jump into the **[Quick Start](Quick Start)** or read more ..

## Introduction

* [Introduction](Introduction)
* [Application Scenarios](Application Scenarios)
* [Crossbar.io Architecture](Architecture)
* [Why WAMP?](http://wamp.ws/why/)
* [Features](Features)
* [Roadmap](Roadmap)
* [FAQ](FAQ)
* [Examples](Examples)

## Getting Started

* [Quick Start](Quick Start)
* [The Command Line](The Command Line)
* [Application Templates](Application Templates)


### Choose your Weapon

* [Overview](Choose your Weapon)
* [Getting started with Python](Getting started with Python)
* [Getting started with NodeJS](Getting started with NodeJS)
* [Getting started with JavaScript/Browser](Getting started with JavaScript in the Browser)
* [Getting started with C++](Getting started with Cplusplus)
* [Getting started with Erlang](Getting started with Erlang)
* [Getting started with PHP](Getting started with PHP)
* [Getting started with C#](Getting-started-with-CSharp)
* [Getting started with Java](Getting-started-with-Java)
* [Getting started with Tessel](Getting-started-with-Tessel)

### Installation

* [Local Installation](Local Installation)
  * [Installation on Linux](Installation on Linux)
  * [Installation on FreeBSD](Installation on FreeBSD)
  * [Installation on Mac OS X](Installation on Mac OS X)
  * [Installation on Windows](Installation on Windows)
  * [Installation on Docker](Installation on Docker)
  * [Installation from Source](Installation from Source)
  * [Installation on the RaspberryPi](Installation on the RaspberryPi)
* [Setup in the Cloud](Setup in the Cloud)
  * [Setup on Microsoft Azure](Setup on Microsoft Azure)
  * [Setup on Amazon EC2](Setup on Amazon EC2)
  * [Setup on Heroku](Setup on Heroku)
* [Updating from the Repository](Updating from the Repository)

## [Administration](Administration)

### [Configuration](Configuration)

* [Configuration Overview](Configuration Overview)
  - [Endpoints](Endpoints)
  - [Native Worker Shared Options](Native Worker Shared Options)
  - [Process Enviroments](Process Environments)
* [Router Configuration](Router Configuration)
  - [Router Realms](Router Realms)
  - [Router Transports](Router Transports)
     - [WebSocket Transports](WebSocket Transports)
     - [RawSocket Transports](RawSocket Transports)
     - [Web Transports and Services](Web Transports and Services)
        - [Static Web Service](Static Web Service)
        - [Web Redirection Service](Web Redirection Service)
        - [JSON Value Service](JSON Value Service)
        - [CGI Script Service](CGI Script Service)
        - [WSGI Host Service](WSGI Host Service)
        - [WAMP Long-Poll Service](WAMP Long-Poll Service)
        - [HTTP Pusher Service](HTTP Pusher Service)
     - [Flash Policy Transports](Flash-Policy-Transports)
  - [Router Components](Router Components)
  - [Authentication](Authentication)
     - [WAMP CRA (Challenge-Response Authentication)](WAMP CRA Authentication)
     - [Mozilla Persona](Mozilla Persona)
     - [Cookie](Cookie-Authentication)
     - [OTP](OTP-Authentication)
     - [Anonymous Authentication](Anonymous Authentication)
  - [Authorization](Authorization)
* [Container Configuration](Container Configuration)
* [Guest Configuration](Guest Configuration)

### [Going to Production](Going to Production)

* [Running on privileged ports](Running on privileged ports)
* [Secure WebSocket and HTTPS](Secure WebSocket and HTTPS)
* [WebSocket Options](WebSocket Options)
* [WebSocket Compression](WebSocket Compression)
* [Automatic startup and restart](Automatic startup and restart)
* [Network Tuning](Network Tuning)
* [Reverse Proxies](Reverse Proxies)
* [SSL/TLS Interception Proxies](SSL-TLS-Interception-Proxies)

### Compliance and Performance

* [Browser Support](Browser Support)
* [WebSocket Compliance Testing](WebSocket Compliance Testing)
* [Stream Testee](Stream Testee)


## [Programming Guides](Programming Guides)

The following are guides for using Crossbar.io in specific scenarios, or for using specific features of WAMP & Crossbar.io in your applications.

* Frameworks & Specific Scenarios
  - [Adding Real-Time to Django Applications](Adding Real Time to Django Applications)
  - [[AngularJS Application Components]]
  - [Database Programming with PostgreSQL](Database Programming with PostgreSQL)

* WAMP features
  - [Session Metaevents](Session Metaevents)
  - [Using Schemas](Using Schemas)

* Crossbar.io features
  - [Starting and Stopping Crossbar.io](Starting and Stopping Crossbar.io)


## Client Libraries

Programming WAMP application components is tied to the particular client library you're using. Below we give links to documentations we know about. 

* [Autobahn|Python](http://autobahn.ws/python/wamp/programming.html)
* [Autobahn|JS](http://autobahn.ws/js/programming.html)
* [Autobahn|CPP]()

## Contributing

Notes for developers working on the **Crossbar**.io code base (*not* application developers).

* [Contributing to the project](Contributing to the project)
* [Manhole](Manhole)
* [Management API](Management API)

## Licenses

* [Crossbar License](Crossbar License)
* [Documentation License](Documentation License)