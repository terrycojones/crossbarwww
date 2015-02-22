With the Publish & Subscribe (PubSub) messaging pattern in WAMP, a WAMP client issues a subscription request to a router, in which it expresses interest in a topic. The router registers this. Whenever a publication to this topic comes in, an event is dispatched to all WAMP clients which are currently registered for the topic.

The 'subscription', as the term is used here, exists within the router. A subscription is created when a client sends a subscription request for a topic where there are currently no other subscribers. It is deleted when the last subscriber cancels its subscriptions, or its session is disconnected.

A subscriber receives a subscription ID as the result of a successful subscription request. E.g. say a client issues a subscription request for a topic "com.myapp.topic1", it could receive the subscription ID "1748038973" on success. This subscription ID is used as part of the unsubscribe request, i.e. an unsubscribe does not contain a topic URI, but a subscription ID.

When an second subscriber issues a subscription request for the same topic, then it receives the same subscription ID. For "com.myapp.topic1", it would also receive "1748038973". 

When the subscription is deleted, e.g. because the above two clients both issue an unsubscribe for the topic, and then a client issues a subscription request for the same topic, a new subscription is created, and the client receives a new subscription ID.

The act of subscribing and unsubscribing may create or delete a subscription. It necessarily adds or removes a session from a subscription. 

The creation and deletion of subscriptions, as well as the addition or removal of sessions to a subscription lead to subscription meta-events, which are described in [Subscription Meta-Events](Subscription Meta Events).

The above explanation used a topic string which was fully matched. WAMP additionally allows for pattern-based subscriptions in two flavors: prefix registration and wildcard registration. These are explained in [Pattern-Based Subscriptions](Pattern Based Subscriptions).

