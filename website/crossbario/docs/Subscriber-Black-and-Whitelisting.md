As a default, whenever there is a publication to a topic, a PubSub event is dispatched to all subscribers to that topic. Subscriber Black- and Whitelisting allows to restrict the set of subscribers who receive events for a particular publication.

## Use cases for Subscriber Black- and Whitelisting

For a frontend with state synchronized across devices, a device on which an update is made may communicate this via an RPC to the backend. The local change may be effected as soon as the user input is made, with a possible rollback should the RPC fail. The other devices receive the update based on a successfully processed user input from the backend. In this case the backend will want to exclude the source device for the user input from the update.


## Subscriber Blacklisting

With Subscriber Blacklisting, a set of subscribers can be excluded from receiving an event based on the publication. This is done via a list of session IDs which are passed as part of the publication options.

For example, for a component written in JavaScript and using Autobahn|JS, the following publish would not lead to a dispatch to sessions `27837283` and `8888373` if these are currently subscribed to the topic `com.myapp.topic1`

```javascript
session.publish("com.myapp.topic1", ["news!"], { newsbody: "this is new"}, { exclude: [27837283, 8888373] })
```

## Subscriber Whitelisting

With Subscriber Whitelisting, dispatch of an event based on a publication can be restricted to a set of sessions. This is done via a list of session IDs which are passed as part of the publication options.

For example, for a component written in JavaScript and using Autobahn|JS, the following publish would lead to a dispatch to sessions `4783838` and `2347777` only if these are currently subscribed to the topic `com.myapp.topic1`

```javascript
session.publish("com.myapp.topic1", ["news!"], { newsbody: "this is new 2"}, { eligible: [4783838, 2347777] })
```

## Getting Subscriber Session IDs

Subscriber session IDs which are used can be communicated to application components via application-level messages (components should be able to retrieve their session ID, e.g. in Autobahn|JS, it's stored in `session.id`).

Additionally, Crossbar.io has [Subscription Meta-Events and Procedures](Subscription Meta Events and Procedures) which allow the retrieval of this information from the router.