As a default, a publisher does not receive an event for its own publication if it is subscribed to the publication topic.

For example, a component which is connected via a session `3232` and is subscribed to `com.example.topic1` will not receive an event if it publishes to this same topic based on this publication. It will receive events published by other components. If the component is connected via additional sessions, then it will receive events on these sessions.

This behavior can be overriden by setting `exclude_me` to `false` in the publication options, e.g.

```javascript
session.publish("com.myapp.topic1", ["hello"], {}, { exclude_me: "false"});
```

## Why is this the default?

The publisher can execute any local changes which need to occur based on the event which triggers a publish. This obviously does not require any triggering by a PubSub event. 

We see this execution independent of an event as a trigger as preferable, as it allows the component to react without being limited by networking speed, and retain a maximum of functionality while there is no connection. 

With this model, receiving an event when all actions which could be based on the event have already executed locally creates the necessity to filter out events which originate locally. This leads to both overhead on the wire and more complicated code. 

It's now necessary to transmit some kind of unique publication ID, and store this in a way that it is accessible to the event handler. The event handler then needs to check the store of publication IDs on each received event and discard events which are based on local publications.

Exlcuding the publisher from receiving an event as a default avoids this, and the possibility to override this allows use cases where only external triggering is preferable.
