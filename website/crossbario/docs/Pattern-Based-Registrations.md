As a default, URIs in registration requests and calls are processed with exact matching, i.e. an call will be accepted and a procedure invoked on a callee if the  URI of the call exactly matches the URI for which the callee registered the procedure.

## Use cases for Pattern-Based Registrations

There are use cases where more flexibility is required. As an example, in a warehouse management system, you may have calls such as "com.myapp.manage.move.473883sjs", where the final URI part is an ID for an individual item in the warehouse. Alterantively, it may be convenient to include the ID for goods as an earlier URI part, e.g. "com.myapp.manage.34dhfh56.move" and "com.myapp.manage.dj4783839.retrieve". In both cases, a component which offers handling of "move" would want to register for all "move" calls irrespective of the particular goods ID.

WAMP offers two matching mechanisms to cover use cases such as these:

* prefix matching
* wildcard matching

## Prefix Matching

With prefix matching, a callee can register to be invoked for calls to URIs which contain the registration URI as a prefix.

For example, the registration URI

`com.myapp.manage`

in a registration with prefix matching would all the callee to be called for calls to URIs

`com.myapp.manage.add`
`com.myapp.manage.store`
`com.myapp.manage.retrieve`
`com.myapp.manage.ship`

but not

`com.myapp2.manage.create`

Using this, in the warehouse management application mentioned initially, with the goods ID as the final URI part, a component would register for "com.myapp.manage.move" and set prefix matching for this.

To set prefix matching, the matching policy "prefix" needs to be set within the registation options.

As an example, in an application written in JavaScript and using Autobahn|JS as the WAMP client library, the registration would be

```javascript
session.register("com.myapp.manage.move", move, { match: "prefix" });
```

## Wildcard Matching

With wildcard matching, a callee can register to be invoked for calls to URIs where all given URI components match the registration URI.

For example, the registration URI

`com.myapp.manage..create`

contains four defined URI components ("com", "myapp", "manage", "create") and one wildcard. The wildcard is defined by the double dots betwen "manage" and "create". 

This would be matched by

`com.myapp.manage.47837483.create`
`com.myapp.manage.an_item.create`
`com.myapp.manage.test.create`

but not by

`com.myapp.manage.test.3728378.create`
`com.myapp.manage.37283.create.new`

Using this, in the warehouse management application mentioned initially, with the goods ID used as a component within the URI, a component would register for "com.myapp.manage..move" and set wildcard matching for this.

To set wildcard matching, the matching policy "wildcard" needs to be set within the registation options.

As an example, in an application written in JavaScript and using Autobahn|JS as the WAMP client library, the registration would be

```javascript
session.register("com.myapp.manage..move", move, { match: "wildcard" });
```

> Using wildcard matching, only entire component parts of URIs can be set as wildcards. There is no mechanism to match partially identical components, e.g. "com.myapp.user3278378" and "com.myapp.user7727278".

## No combination of prefix & wildcard matching

Only one of prefix matching and wildcard matching may be set for a registration URI, i.e. there is no way to combine the two matching policies.

## Exact matching

It is possibly to explicitly set the matching policy for exact matching, e.g.

```javascript
session.register("com.myapp.manage.move", move, { match: "exact" });
```

Since this is the default, it is unnecessary though, unless there is a need to make the matching policy explicit as a marker in the code.


> Note: the above examples are for Autobahn|JS since we also maintain and use this WAMP client library, and JavaScript is the closest there is to a lingua franca in programming. Users of other WAMP client libraries should feel free to add code examples for these!


## Conflict resolution

With pattern-based registrations, it is possible that multiple registrations match on the URI for a particular call. There are rules for [how a callee is determined]()How A Callee Is Determined).


> Note: the above examples are for Autobahn|JS since we also maintain and use this WAMP client library, and JavaScript is the closest there is to a lingua franca in programming. Users of other WAMP client libraries should feel free to add code examples for these!


## Working Example

For a full working example in JavaScript, see [Crossbar Examples](https://github.com/crossbario/crossbarexamples/tree/master/metaapi).