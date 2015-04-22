Imagine you have an existing application which isn't based on WAMP components -- say, a REST or classical Web application using HTTP.

Now what if you just want to *add* some real-time features *without* changing your existing app to use WAMP or migrate from synchronous, blocking to asynchronous, non-blocking code?
Or if you want to access your existing HTTP services using WAMP?

This is where the *HTTP bridge services* of Crossbar can help.
They provide WAMP components which provide interoperability with existing code by using HTTP.

* The *HTTP Publisher* is a service that allows clients to submit PubSub events via HTTP/POST requests.
Crossbar will receive the event data via the request and forward the event via standard WAMP to any connected subscribers in real-time. [HTTP Publisher Docs >](HTTP Bridge Services Publisher)
* The *HTTP Caller* is a service that allows clients to perform WAMP calls via HTTP/POST requests.
Crossbar will forward the call to the performing server and return the result. [HTTP Caller Docs >](HTTP Bridge Services Caller)
* The *HTTP Subscriber* is a service that forwards PubSub events to HTTP endpoints. [HTTP Subscriber Docs >](HTTP Bridge Services Subscriber)
* The *HTTP Callee* is a service that translates WAMP procedures to HTTP requests. [HTTP Callee Docs >](HTTP Bridge Services Callee)
