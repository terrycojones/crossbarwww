As a default, topic URIs in subscription requests are processed with exact matching, i.e. an event will be dispatched to subscribers if the topic of the publication exactly matches the topic of the subscription. 

## Use cases for Pattern-Based Subscriptions

There are use cases where more flexibility is required. As an example, in a chat application users may create individual channels, e.g. "com.mychatapp.privatechannel.34", "com.mychatapp.privatechannel.145", but a logging component may want to log all channels without the need to create a subscription for each and every channel. In the same chat application, you may want to centrally monitor status updates published with URIs such as "com.mychatapp.privatechannel.145.currentstatus", and the component monitoring these wants to receive only the status updates, but across all channels.

WAMP offers two matching mechanisms to cover use cases such as these:

* prefix subscriptions
* wildcard subscriptions

## Prefix Matching

With prefix matching, an event is dispatched to a subscriber when the subscription topic URI matches the publication URI as a prefix.

For example, the subscription topic URI

`com.myapp`

in a prefix subscription would match (and receive events for) publications with the topics

`com.myapp`
`com.myapp.topic1`
`com.myapp.topic1.update`
`com.myapp.2`
`com.myapp2.foobar`

but not

`com.otherapp`
`com.thirdapp.topic1`

Using this, in the chat application mentioned initially, the logging component would subscribe to `com.mychatapp.privatechannel` using prefix matching, and receive the events for any private channels.

To enable prefix matching, the matchig policy "prefix" needs to be set within the subscription options. 

As an example, in an application written in JavaScript and using Autobahn|JS as the WAMP client library, the subscription would be

```javascript
session.subscribe("com.mychatapp.privatechannel", logPrivateChannels, { match: "prefix" });
```

## Wildcard Matching

With wildcard matching, one or more URI components in a topic URI can be replaced by wildcards, and any URI which contains the given components will be matched.

For example, the subscription topic URI

`com.myapp..create`

contains three defined URI components ("com", "myapp", "create") and one wildcard, which is indicated by the double dots between "myapp" and "create".

This would be matched by

`com.myapp.product.create`
`com.myapp.123.create`

but not 

`com.myapp.product.delete`
`com.myapp.product.123.create`

Using this, in the chat application mentioned initially, the component monitoring status updates would subscribe to `com.mychatapp.privatechannel..statusupdate` using wildcard matching and receive just the status updates for any priivate channels.

To enable wildcard matching, the matchin policy "wildcard" needs to be set within the subscription options.

As an example, in an application written in JavaScript and using Autobahn|JS as the WAMP client library, the subscription would be

```javascript
session.subscribe("com.mychatapp.privatechannel..statusupdate", monitorStatusUpdates, { match: "wildcard" });
```


## Exact matching

It is possibly to explicitly set the matching policy for exact matching, e.g.

```javascript
session.subscribe("com.mychatapp.privatechannel.123", printMyEvents, { match: "exact" });
```

Since this is the default, it is unnecessary though, unless there is a need to make the matching policy explicit as a marker in the code.


> Note: the above examples are for Autobahn|JS since this we also maintain and use this WAMP client library, and JavaScript is the closest there is to a lingua franca in programming. Users of other WAMP client libraries should feel free to add code examples for these!