This chapter is about WAMP **authorization** concepts and configuration with Crossbar.io.

See also:

 * [Authentication](Authentication)

# Introduction

**Authentication** with Crossbar.io determines the identity of a connecting WAMP *Client*, while **authorization** determines which permissions a *Client* is granted, once its identity has been established.

With Crossbar.io, authentication and authorization of WAMP connections are *orthogonal* aspects which can be configured on transports and routers running in a Crossbar.io node.

Permissions in the context of WAMP refers to allowance of the four main interactions

* call
* register
* publish
* subscribe

E.g. is a client allowed to **call** procedure `com.example.proc1` or is a client allowed to **subscribe** topic `com.example.topic1`?

The natural place to *enforce* authorization is the WAMP router. The router is the one actually doing the WAMP call and event routing, and it is hence the right place to put restrictions regarding routing into effect.

Crossbar.io provides two mechanisms for authorization:

1. [Static Authorization](#static-authorization)
2. [Dynamic Authorization](#dynamic-authorization)

*Static Authorization* is a simple, yet flexible permissions scheme which can be setup via the Crossbar.io configuration.

*Dynamic Authorization* allows to hook up arbitrary, custom authorization code which is then called by Crossbar.io to determine client permissions.

The idea is to have the majority of scenarios covered using *Static Authorization*, and handle special requirements and scenarios using *Dynamic Authorization*.


# Authorization Procedure

A *Client* connects to a *Router* establishing a WAMP session by joining a *Realm*. The *Client* can announce which authentication methods it is willing to perform to authenticate itself. The *Router* will choose an authentication method and initiate the authentication procedure.

When the authentication succeeds, the *Router* will have determined (at least) an authentication role (`authrole`) for the *Client*. The `authrole` is the role under which the *Client* was authenticated for the *Realm* it has joined.

The set of *Permissions* a *Client* gets is then determined by the *Realm-Role* combination and possibly other information from the authenticated WAMP session.

E.g. a client that joined realm `realm1` with role `role1` might have the following set of permissions:

1. Allow to **call** any procedure
2. Disallow to **register** procedures
3. Allow to **subscribe** to any topic
4. Allow to **publish** to any topic that starts with URI `com.example.frontend`

# Static Authorization

To configure Crossbar.io to enforce the above set of permissions, the following part of a router configuration could be used:

```javascript
"realms": [
   {
      "name": "realm1",
      "roles": [
         {
            "name": "role1",
            "permissions": [
               {
                  "uri": "*",
                  "call": true,
                  "register": false,
                  "subscribe": true,
                  "publish": false
               },
               {
                  "uri": "com.example.frontend.*",
                  "call": true,
                  "register": false,
                  "subscribe": true,
                  "publish": true
               }
            ]
         }
      ]
   }
]
```

Here, `realms[0].roles` defines a list of roles for realm `"realm1"`. The permissions of a client that joined realm `"realm1"` with role `"role1"` is then given in `realms[0].roles[0].permissions`, which is a list of permission rules.

Each permission rule, like

```javascript
{
   "uri": "*",
   "call": true,
   "register": false,
   "subscribe": true,
   "publish": false
}
```

is a dictionary with 4 boolean attributes for the WAMP interaction (`call`, `register`, `publish` and `subscribe`) and string valued attribute `uri` for the URI or URI pattern the rule should apply to.

The above rule, using the wildcard URI pattern `"*"` would apply to *any* URI.

> When a given concrete URI matches more than one rule, the rule with the longest matching URI (pattern) wins.

In the above example configuration, a publication to `com.example.fronted.action1` would thus be allowed, since the URI pattern of the second defined rule which matches the publication URI, and which allows publication,  is longer than that of the first, which disallows publication.

> Crossbar.io can be dynamically reconfigured via the [Management API](Management API). This includes the ability to reconfigure the authorization and permissions.


# Dynamic Authorization

Besides *Static Authorization* using the URI-pattern based authorization scheme above, Crossbar.io also provides a mechanism to hook up arbitrary custom code which is dynamically called by Crossbar.io for authorization.

With *Dynamic Authorization* your application will provide a WAMP procedure (with a defined signature) that Crossbar.io will then call to determine the permissions of other clients.

E.g. consider the following Python function

```python
@wamp.register('com.example.authorize')
def custom_authorize(session, uri, action):
   ## your custom authorization logic to determine whether client
   ## session should be allowed to perform action on uri
   if ...
      ## allow action
      return True
   else:
      ## deny action
      return False
```

This function can be called from Crossbar.io to determine whether a client should be allowed the specified action on the given URI. Here, the return value of your authorizing function must be a boolean.

The `session` argument is a dictionary with details on the session that wishes to perform the action:

```python
{
   "realm": "realm1",
   "authprovider": None,
   "authid": "VA-TKRAaIT44meQKZ6n5y7wk",
   "authrole": "frontend",
   "authmethod": "anonymous",
   "session": 1849286409148650
}
```

You can then configure Crossbar.io to use this custom authorizing function:

```javascript
"realms": [
   {
      "name": "realm1",
      "roles": [
         {
            "name": "approver",
            "permissions": [
               {
                  "uri": "com.example.authorize",
                  "register": true
               }
            ]
         },
         {
            "name": "user",
            "authorizer": "com.example.authorize"
         }
      ]
   }
]
```

The above configuration defines two roles:

 * `"approver"`
 * `"user"`

The `"approver"` role is for the application component that contains the custom authorization function (`custom_authorize()`).

The `"user"` role is for application components that should be authorized using the custom authorization function. Hence, it does not define a `permissions` attribute, but a `authorize` attribute giving the URI of the custom authorization function to call.

## Example

Here is a Python based custom authorizer:

```python
from twisted.internet.defer import inlineCallbacks
from autobahn.twisted.wamp import ApplicationSession


class MyAuthorizer(ApplicationSession):

    @inlineCallbacks
    def onJoin(self, details):
       print("MyAuthorizer.onJoin({})".format(details))
       try:
           yield self.register(self.authorize, 'com.example.auth')
           print("MyAuthorizer: authorizer registered")
       except Exception as e:
           print("MyAuthorizer: failed to register authorizer procedure ({})".format(e))

    def authorize(self, session, uri, action):
       print("MyAuthorizer.authorize({}, {}, {})".format(session, uri, action))
       return True
```

Above could be used in a node configuration like this:

```javascript

{
   "controller": {
   },
   "workers": [
      {
         "type": "router",
         "options": {
            "pythonpath": [".."]
         },
         "realms": [
            {
               "name": "realm1",
               "roles": [
                  {
                     "name": "backend",
                     "permissions": [
                        {
                           "uri": "com.example.*",
                           "publish": true,
                           "subscribe": true,
                           "call": true,
                           "register": true
                        }
                     ]
                  },
                  {
                     "name": "authorizer",
                     "permissions": [
                        {
                           "uri": "com.example.auth",
                           "register": true
                        }
                     ]
                  },
                  {
                     "name": "frontend",
                     "authorizer": "com.example.auth"
                  }
               ]
            }
         ],
         "transports": [
            {
               "type": "web",
               "endpoint": {
                  "type": "tcp",
                  "port": 8080
               },
               "paths": {
                  "/": {
                     "type": "static",
                     "directory": "../hello/web"
                  },
                  "ws": {
                     "type": "websocket",
                     "auth": {
                        "anonymous": {
                           "role": "frontend"
                        }
                     }
                  }
               }
            }
         ],
         "components": [
            {
               "type": "class",
               "classname": "hello.auth.MyAuthorizer",
               "realm": "realm1",
               "role": "authorizer"
            },
            {
               "type": "class",
               "classname": "hello.hello.AppSession",
               "realm": "realm1",
               "role": "backend"
            }
         ]
      }
   ]
}
```

