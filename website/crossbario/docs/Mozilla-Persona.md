## Mozilla Persona

> Mozilla Persona authentication is currently broken - see [issue #158](https://github.com/crossbario/crossbar/issues/158)

To quote Mozilla:
> [Persona](http://www.mozilla.org/en-US/persona/) allows you to sign in to sites using any of your existing email addresses; and if you use Yahoo! or Gmail for email, you will be able to sign in without having to create a new password.

**Crossbar**.io can authenticate WAMP/WebSocket connections in a fully WebSocket based authentication procedure using Cookies and [Mozilla Persona](http://www.mozilla.org/en-US/persona/).

This can be done on web pages hosted fully statically. No dynamic Web endpoint is involved. On the client side there is just the storage of an authentication cookie.

**To enable Mozilla Persona based authentication on a WebSocket transport:**

```javascript
{
   "type": "websocket",
   "endpoint": {
      "type": "tcp",
      "port": 8080
   },
   "url": "ws://localhost:8080/ws",
   "cookie": {},
   "auth": {
      "mozilla_persona": {
         "role": {
            "type": "static",
            "value": "com.myapp.user"
         }
      }
   }
}
```

This will enable both Cookie tracking and Mozilla Persona authentication.

> Note: You can activate Mozilla Persona without Cookie tracking, but the user will then need to re-authenticate using Persona on each page load.

The above configuration maps any connection which is successfully authenticated via Mozilla Persona to the **authrole** `com.myapp.user`. This mapped role can then be used to specify permissions the connection will have on a **realm** :

```javascript
"realms": {
   "realm1": {
      "permissions": {
         "com.myapp.user": {
            "create": true,
            "join": true,
            "access": {
               "*": {
                  "publish": true,
                  "subscribe": true,
                  "call": true,
                  "register": true
               }
            }
         }
      }
   }
}
```

The Mozilla Persona configuration has a couple of options:

```javascript
"mozilla_persona": {
   "audience": "http://localhost:8080",
   "provider": "https://verifier.login.persona.org/verify"
}
```

* `audience` is the audience value given to the Persona ID service when verifying authentications. When no value is configured, this is set from the WebSocket `origin` from the WebSocket opening handshake.
* `provider` is the URL of the Persona ID service to be used. When no value is configured, this is set to the Mozilla Persona ID service

The Cookie tracking also has some options:

```javascript
"cookie": {
   "name": "crossbar",
   "length": 16,
   "max_age": 86400
}
```

* `name` is the field name where Crossbar.io will store its (random) tracking ID within the Cookie set. The default is `"cbtid"`.
* `length` is the length of the value for the tracking ID. The default is 24 (which amounts to 144 bits of randomness). The default should be large enough to reduce the collision probability to essentially zero.
* `max_age` is the maximum Cookie lifetime in seconds. The default is (approximately) 1 year.

To use Persona based authentication in Autobahn|JS, set a challenge handler that processes Mozilla Persona challenges:

```javascript
function onchallenge (session, method, extra) {
   if (method === "mozilla-persona") {
      return autobahn.auth_persona(session, currentUser);
   } else {
      console.log("don't know how to authentication using " + method);
   }
}

var connection = new autobahn.Connection({
   url: 'ws://localhost:8080/ws',
   realm: 'realm1',
   onchallenge: onchallenge
});
```
