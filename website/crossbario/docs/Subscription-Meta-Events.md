A subscription is created within Crossbar.io when a first client issues a subscription request for a topic, and it is deleted when the last client unsubscribes or its session is disconnected. In between, other client sessions may be attached to the subscription or removed from it.

Subscription meta-events give information about these events. Additionally, there is a set of procedures which can be called to receive information about a currently active subscriptions.

## Use cases for subscription meta-events

Within an application, it may be desirable for a publisher to know whether a publication to a specific topic currently makes sense, i.e. whether there are any subscribers who would receive an event based on the publication. It may also be desirable to keep a current count of subscribers to a topic to then be able to filter out any subscribers who are not supposed to receive an event.

## Events

The set of meta events covers the lifecycle of a subscription. A client can subscribe to the following subscription meta events:



## Procedures

It is also possible to request specific information at any time via calls to meta procedures. The following procedures are available regarding subscriptions:

