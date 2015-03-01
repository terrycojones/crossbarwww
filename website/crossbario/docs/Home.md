Welcome to the [**Crossbar**.io](http://crossbar.io) documentation. Take a look at [the project homepage](http://crossbar.io/) if you haven't.

## How it works

Learn the underlying concepts of Crossbar.io and what you can do with it.

* [Introduction](Introduction)
* [Application Scenarios](Application Scenarios)
* [Crossbar.io Architecture](Architecture)
* [Why WAMP?](http://wamp.ws/why/)
* [Features](Features)
* [Roadmap](Roadmap)
* [FAQ](FAQ)
* [Examples](Examples)

## Getting Started

How to install Crossbar.io, and start using it with your language or device of choice. 

* [Quick Start](Quick Start)
* [The Command Line](The Command Line)
* [Application Templates](Application Templates)

### Installation

Installing locally or in the cloud.

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

### Choose your Weapon

How to get started using your language or device of choice.

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



## [Administration](Administration)

How to adapt Crossbar.io for your specific use case.

### [Configuration](Configuration)

Configuration options explained (with examples).

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

Tips for a performant and secure production configuration.

* [Running on privileged ports](Running on privileged ports)
* [Secure WebSocket and HTTPS](Secure WebSocket and HTTPS)
* [WebSocket Options](WebSocket Options)
* [WebSocket Compression](WebSocket Compression)
* [Automatic startup and restart](Automatic startup and restart)
* [Network Tuning](Network Tuning)
* [Reverse Proxies](Reverse Proxies)
* [SSL/TLS Interception Proxies](SSL-TLS-Interception-Proxies)

### Compliance and Performance

Testing your instance & browser support.

* [Browser Support](Browser Support)
* [WebSocket Compliance Testing](WebSocket Compliance Testing)
* [Stream Testee](Stream Testee)


## [Programming Guides](Programming Guides)

Guides for using Crossbar.io in specific scenarios, or for using specific features of WAMP & Crossbar.io in your applications.

* [WAMP Features](WAMP Features)

  - Session

    + [Session Metaevents](Session Metaevents)
    + [Using Schemas](Using Schemas)

  - Subscriptions

    + [How Subscriptions Work](How Subscriptions Work)
    + [Pattern-Based Subscriptions](Pattern Based Subscriptions)
    + [Subscription Meta-Events and Procedures](Subscription Meta Events and Procedures)

  - Registrations

    + [How Registrations Work](How Registrations Work)
    + [Pattern-Based Registrations](Pattern Based Registrations)
    + [How A Callee Is Determined](How A Callee Is Determined)
    + [Invokation Rules](Invokation Rules)    
    + [Registration Meta-Events and Procedures](Registration Meta-Events and Procedures)

* Frameworks & Specific Scenarios

  - [Adding Real-Time to Django Applications](Adding Real Time to Django Applications)
  - [[AngularJS Application Components]]
  - [Database Programming with PostgreSQL](Database Programming with PostgreSQL)

* Crossbar.io features

  - [Starting and Stopping Crossbar.io](Starting and Stopping Crossbar.io)


## Client Libraries

Programming WAMP application components is tied to the particular client library you're using. Below we give links to documentations we know about. 

* [Autobahn|Python](http://autobahn.ws/python/)
* [Autobahn|JS](http://autobahn.ws/js/)
* [Autobahn|CPP](http://autobahn.ws/cpp/)

## Contributing

Notes for developers working on the **Crossbar**.io code base (*not* application developers).

* [Contributing to the project](Contributing to the project)
* [Manhole](Manhole)
* [Management API](Management API)

## Licenses

All you need to know about the legal aspects of using Crossbar.io

* [Crossbar License](Crossbar License)
* [Documentation License](Documentation License)

## Support

First take a look at the [FAQ](FAQ) since there's a chance your particular question has come up before.

For new questions, your first stop should be the [mailing list](https://groups.google.com/forum/#!forum/crossbario) or the IRC channel (freenode/autobahn).

You can also reach us on Twitter [@crossbario](https://twitter.com/crossbario) (though 140 characters is not the best for asking programming questions).