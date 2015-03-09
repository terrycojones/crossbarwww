Generally, PubSub is used to decouple publishers and subscribers. Publishers do not have any knowledge of subscribers and vice versa. 

Depending on your app design, it may be useful however for a subscriber to know the identity of a publisher.

With WAMP, a publisher can set the option `disclose_me` to `true` and subscribers will receive the publisher's session ID as part of the event details.

For example, in a JavaScript application using Autobahn|JS, for the publish

```javascript
session.publish("com.myapp.topic1", ["change"], {}, { disclose_me: true });
```

and given that the publisher's session ID is `4747837`, a subscriber would receive the session ID `4747837` as `details.publisher`.

If further information about the publisher is required, then this can be retrieved via [Subscription Meta-Events and Procedures](Subscription Meta Events and Procedures).

## Rationale for the publisher setting the option

We see the need for publisher disclosure. With the provided solution, we wanted to keep things simple with just one place to set the option. With a view to having a single serialization for an event which is sent to all subscribers, the publisher was the logical place for this.

WAMP client libraries may provide a global flag for setting the default for `disclose_me` to `true`.

For example, with Autobahn|JS you can do

```javascript
session.publisher_disclose_me = true
```

This flag can be changed at any time during the session lifecycle.