Strictly speaking, Anonymous Authentication is not authentication - it is about what to do in the absence of authentication. 

Crossbar.io allows to create a role `anonymous` which is assigned to any client which connects *without* authentication.

You can assign permissions to this role.

Without this special role, unauthenticated clients do not have any permissions.

For example, the default, very open configuration, which is intended for development purposes, defines anonymous like so

```javascript
{
   "controller": {
   },
   "workers": [
      {
         "type": "router",
         "realms": [
            {
               "name": "realm1",
               "roles": [
                  {
                     "name": "anonymous",
                     "permissions": [
                        {
                           "uri": "*",
                           "publish": true,
                           "subscribe": true,
                           "call": true,
                           "register": true
                        }
                     ]
                  }
               ]
            }
         ],
         "transports": [
            ...
         ]
      }
   ]
}
```

Here any unauthenticated client has full permissions for all four actions - which allows starting development without worrying about client permissions.

For production purposes, you'll want to handle things more restrictively, e.g. you could just not define a role `anonymous`. It may make sense to allow anonymous authentication with limited rights, e.g. to subscribe to topics which should be accessible to anybody, or to make calls required to start a registration process.