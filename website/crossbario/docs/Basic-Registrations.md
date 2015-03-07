As a default, registrations use exact matching, i.e. a callee which registers a procedure URI `com.myapp.procedure1` will receive calls for `com.myapp.procedure1`only. There are, however, also [patter-based registrations](Patter Based Registrations) which can be selected via an option when registering.

Further, as a default only a single registration for a URI is allowed, i.e. once one component has registered a procedure for an URI `com.myapp.topic1`, all further attempts to register a procedure for this URI will be rejected. There are, however, [shared registrations](Shared Registrations) which can be seleted via an option when registering.

Here's an example for a simple registration in JavaScript using Autobahn|JS:

```javascript
session.register("com.myapp.procedure1", procedure1);
```

This is equivalent to

```javascript
session.register("com.myapp.procedure1", procedure1, { match: "exact", invoke: "single" })
```


