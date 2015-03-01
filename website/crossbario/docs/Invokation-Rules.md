As a default, only a single calle may register a procedure for an URI. 

## Use cases for Invokation Rules

There are use cases where more flexibility is required. As an example, for an application component with a high computing load, several instances may run, and load balancing of calls across these desired. As another example, in an an application a second or third component providing a procedure may run, which are only to be called in case the primary component is no longer reachable.

WAMP offers invokation rules to cover such use cases:

* roundrobin
* random
* first
* last

## Basics of Invokation Rules

When an invokation rule other than the default "single" (which may also be omitted) is set, a WAMP router will accept additional registrations for the specified URI provided that these additional registrations set the same invokation rule.

As an example, if a first registration for the URI "com.myapp.procedure1" is made and the invokation rule "last" is set, then any subsequent registration for the URI which also sets the invokation rule "last" will be accepted, while any subsequent registration attempt which sets a different invokation rule (or does not provide one) will fail.

## Load Balancing: Round-Robin & Random

Two invokation rules are provided for load balancing of calls across multiple registered components.

With **"Round-robin"**, a call is routed to the component which comes after the component to which the previous call was routed. Order is determined through a list of components which have registred for the procedure, where registrations are appended to the list. Once the end of the list has been reached, the first component in the list is called next.

With **"Random"** a call is routed to a random component from the list of components which have registered the procedure.

Here are examples of registering procedures using the above invokation rules in a JavaScript application using Autobahn|JS as its WAMP library:

```javascript
session.register("com.myapp.procedure1", procedure1, { invoke: "roundrobin"});
session.register("com.myapp.procedure2", procedure2, { invoke: "random"});
```

## Hot Standby: First & Last

Two invokation rules are provided for enabling hot stand by of components. In each case, a list of components which have registered the procedure is used, where registrations are appended to the list. Components are removed from this list on de-registration or when the WAMP session on which they were registered is closed or is lost.

With **"First"**, a call is routed to the first component in the list, while with **"Last"** the call is routed to the last component in the list.

Here are examples of registering procedures using the above invokation rules in a JavaScript application using Autobahn|JS as its WAMP library:

```javascript
session.register("com.myapp.procedure3", procedure3, { invoke: "first"});
session.register("com.myapp.procedure4", procedure4, { invoke: "last"});
```

## Single invokation

It is possible to explicitly set the invokation rule for "single" invokation, i.e. that only a single registratin for an URI is allowed. 

```javascript
session.register("com.myapp.procedure5", procedure5, { invoke: "single"});
```

Since this is the default, it is unnecessary though, unless there is a need to make the invokation rule explicit in the code for reasons of readability.

> Note: the above examples are for Autobahn|JS since we also maintain and use this WAMP client library, and JavaScript is the closest there is to a lingua franca in programming. Users of other WAMP client libraries should feel free to add code examples for these!