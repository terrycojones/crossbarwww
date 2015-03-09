Generally, the routed RPCs in WAMP decouple callers and callees. Callers do not have knowledge of callees and vice versa.

Depending on your app design and requirements, it may be useful however for a callee to know the identity of a caller.

With WAMP, a caller can set the option `disclose_me` to `true` and the callee will receive the publisher's session ID as part of the invocation details.

For example, in a JavaScript application using Autobahn|JS, for the call

```javascript
session.call("com.myapp.procedure1", [], {}, { disclose_me: true });
```

and given that the caller's session ID is `4747837`, the callee would receive the session ID `4747837` as `details.caller`.

If further information about the caller is required, then this can be retrieved via [Registration Meta-Events and Procedures](Registration Meta Events and Procedures).

## Overriding the default

As a default, the `disclose_me` option needs to be set to `true` on every call. Some libraries may implement a global flag which changes this behaviour.

For example, with Autobahn|JS you can do

```javascript
session.caller_disclose_me = true
```

This flag can be changed at any time during the session lifecycle.
