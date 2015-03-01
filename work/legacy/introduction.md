**Crossbar**.io is a open source **unified application router** which enables application developers to create powerful systems from loosely coupled application components.

Application components can talk freely to each other, whether running locally or when distributed over different machines using the application messaging services provided by **Crossbar**.io. They communicate using [**WAMP (Web Application Messaging Protocol)**](http://wamp.ws), an open protocol which provides easy to use *remote procedure calls* and *real-time event notifications*.

WAMP libraries exist for multiple languages (currently: [JavaScript](http://autobahn.ws/js) [(2)](https://github.com/KSDaemon/wampy.js), [Python](http://autobahn.ws/python), [C++](https://github.com/tavendo/AutobahnCpp), [PHP](https://github.com/voryx/Thruway), [Objective-C](https://github.com/mogui/MDWamp), [Erlang](https://github.com/bwegh/erwa)), so that application components can be implemented in a language which best fits the purpose.

This enables application architectures such as

![Crossbar.io Node](/static/img/docs/gen/crossbar_integration.png)

More [Application Scenarios](Application Scenarios).

# Features

**Crossbar**.io is high-performant, scalable, robust and secure, and distributed as Open Source under the AGPL v3 license.

It is written on top of [AutobahnPython](https://github.com/tavendo/AutobahnPython) and [Twisted](http://twistedmatrix.com) and runs on **Linux**, **\*BSD**, **OSX** and **Windows** under [CPython 2.7](https://www.python.org/) and [PyPy 2](http://pypy.org/).

> **Crossbar**.io runs on Twisted (not asyncio - but see below) and is prepared to work with Python 3.3+ as soon as [Twisted support for Python 3](http://twistedmatrix.com/trac/wiki/Plan/Python3) includes all features used.

## Unified Application Messaging

At its core, Crossbar.io provides a flexible and scalable communication infrastructure for application components to talk to each other. This communication infrastructure is based on Unified Routing and WAMP.

Application components involved are fully decoupled by Crossbar.io which dynamically routes calls and events between them.

## Cross-language Integration

Crossbar.io supports application components written in different programming languages: JavaScript (both Browser and NodeJS), Python, PHP, C++, Java (Android) and ObjectiveC (iOS), with more upcoming.

Application components run under their native run-time and can be automatically started and monitored by Crossbar.io.

## Cross-Layer Integration

Crossbar.io features cross-layer integration: application components can be flexibly deployed across layers, and transparently talk to each other no matter in what layer the components reside.

E.g. you can call a remote procedure residing in a backend component from a frontend component running in the browser, but you can also call into code running inside the browser from a backend component!

## Full-stack Services

Crossbar.io also includes a whole set of full-stack services, such as authentication and authorization, serving static Web files, HTTP long-poll fallback, HTTP push bridge, CGI scripts and hosting WSGI applications.

This will often make Crossbar.io all the infrastructure you need besides your database.

## Scale-up & Scale-out Architecture

Crossbar.io has a multi-process architecture where a single node controller process spawns and monitors multiple worker processes. Worker process types include router, application component host and arbitrary guest processes.

The multi-process architecture enables scaling up on multi-core systems and supports secure and robust operation.

# Where to go

* [Quick start to installing Crossbar.io and running a template sample app](Quick Start)
* [Learn more about application scenarios](Application Scenarios)
* [Overview of language-specific guides to getting started](Choose your Weapon)
* [Try out some demos](https://demo.crossbar.io/)