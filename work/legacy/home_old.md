Welcome to the Crossbar.io documentation!

This page links to content answering fundamental questions regarding Crossbar.io.

The 

[Table of Contents](TOC) 

gives an overview of the full contents of the documentation.

## What is Crossbar.io?

Crossbar.io is a unified application router. It routes RPCs and PubSub events between application components/microservices using the Web Application Messaging Protocol (WAMP), enabling distributed, cross-platform, polyglot applications.

The [landing page of the project website](http://crossbar.io) is the best place to get a quick overview, including some code and links to live demos.

You may also want to take a look at the [WAMP project page](http://wamp.ws/why) to learn more about the motivation behind the protocol.


## What can I do with Crossbar.io?

With Crossbar.io you can develop distributed, cross-platform, polyglot applications with loosely coupled components/microservices. Microservices can run on anything from embedded devices to servers. All microservices can publish events, subscribe to topics, register and call procedures. 

* [[Application Scenarios]] shows some of the possibilities.
* [Live Demos](https://demo.crossbar.io/) present some browser frontends (mostly focussing on PubSub)
* [Feature List](Features) gives an overview of the capabilities, and the
* [[Roadmap]] shows were the project is going. Many new features are coming in 2015!


## Try out Crossbar.io in the browser - without any installation

Download the following two HTML pages (right click & save)

* [Component 1](https://raw.githubusercontent.com/crossbario/crossbardemo/master/crossbardemo/crossbardemo/web/demo/minimal/component_01.html)
* [Component 2](https://raw.githubusercontent.com/crossbario/crossbardemo/master/crossbardemo/crossbardemo/web/demo/minimal/component_02.html)

and open them in your browser (double click on the file).

They connect to an online demo instance of Crossbar.io. Each registers a procedure, calls a procedure on the other, subscribes to one topic, and publishes to another.

Open the browser console to see the output. Open the files in your editor to see how little code is needed.

(There will be an initial registration error if more than one person tries this at the same time  - only a single component can register a procedure. The calls and subscribes will still work though.)

## Installation Options

Crossbar.io runs pretty much anywhere you can install Python. There are guides for

* [[Local Installation]] 
* [[Setup in the Cloud]]

## Language Options

You can implement components/microservices for a WAMP/Crossbar.io application in any language and platform for which a WAMP client library exists. To get you started in your language of choice, we have guides for

* [Python](Getting started with Python)
* [C++](Getting started with Cplusplus)
* [Erlang](Getting started with Erlang)
* [PHP](Getting started with PHP)
* [C#](Getting-started-with-CSharp)
* [Java](Getting-started-with-Java)
* [JavaScript/Browser](Getting started with JavaScript in the browser)
* [JavaScript/Node.js](Getting started with NodeJS)#
* [JavaScript/Tessel](Getting-started-with-Tessel)


## Programming

Some more information about Programming in WAMP can be found under

[Programming](Programming)

## Administration

The default configuration is intended for development purposes, and is maximally permissive. 

* [Configuration](Configuration) covers configuring the basics of Crossbar.io, e.g. realms, transports and workers.
* [Going to Production](Going to Production) covers security issues and fine-tuning of advanced options.

## Support

First take a look at the 

[FAQ](FAQ)

since there's a chance your particular question has come up before.

For new questions, your first stop should be the 

[mailing list](https://groups.google.com/forum/#!forum/crossbario)

or the 

IRC channel (freenode/autobahn) 

You can also reach us on Twitter 

[@crossbario](https://twitter.com/crossbario) 

(though 140 characters is not the best for asking programming questions).

## The WAMP ecosystem

Crossbar.io is part of the wider WAMP ecosystem, which consists of client libraries for multiple languages, as well as other WAMP router implementations. For an overview see the 

[WAMP implementations page](http://wamp.ws/implementations/)


## Contributing

This is an open source project, and all kinds of contributions are highly welcome.

You could:

* fix & extend the documentation on the [GitHub wiki](https://github.com/crossbario/crossbar/wiki)
* add code examples for specific features, or adapt an existing example for another language (send a pull request to the [Examples repo](https://github.com/crossbario/crossbarexamples))
* contribute to Crossbar.io itself - see [these instructions](Contributing to the project)



