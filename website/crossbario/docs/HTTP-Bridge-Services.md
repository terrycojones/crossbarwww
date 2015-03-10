## Introduction

> This feature is available starting with Crossbar **0.9.5**

Imagine you have an existing application which isn't based on WAMP components -- say, a REST or classical Web application using HTTP.

Now what if you just want to *add* some real-time features *without* changing your existing app to use WAMP or migrate from synchronous, blocking to asynchronous, non-blocking code?

This is where the *HTTP Pusher Service* of Crossbar can help.

The *HTTP Pusher* is a service that can be configured on a path of a Crossbar Web transport. The service allows to submit PubSub events via plain old HTTP/POST requests. Crossbar will receive the event data via the HTTP/POST and forward the event via standard WAMP to any connected subscribers in real-time.

![](/static/img/docs/crossbar_http_push.png)
## Try it

Clone the [Crossbar.io examples repository](https://github.com/crossbario/crossbarexamples), and got to the `pusher` subdirectory.

Now start Crossbar:

```console
crossbar start
```

and open [http://localhost:8080](http://localhost:8080) in your browser. Open the JavaScript console to see events received.

To submit events via HTTP/POST, you can use [curl](http://curl.haxx.se/):

```console
curl -H "Content-Type: application/json" \
   -d '{"topic": "com.myapp.topic1", "args": ["Hello, world"]}' \
   http://127.0.0.1:8080/push
```

or any other HTTP/POST capable tool or library. Blocking or non-blocking. Does not matter.

## Using Python

To make using the *HTTP Pusher* service even easier, we've created a (trivial) library which you can install by doing:

```console
pip install crossbarconnect
```

> `crossbarconnect` does *not* depend on `crossbar`, `autobahn`, `twisted` or `asyncio`. It only uses the Python standard library. It only does HTTP/POST requests.

You can publish events from Python like this:

```python
import crossbarconnect

client = crossbarconnect.Client("http://127.0.0.1:8080/push")
client.publish("com.myapp.topic1", "Hello, world!", 23)
```

The example also contains two Python scripts for testing unsigned requests:

```console
python publish.py
```

and signed requests:

```console
python publish_signed.py
```

## Configuration

The *HTTP Pusher* is configured on a path of a Web transport - here is part of a Crossbar configuration:

```javascript
{
   "workers": [
      {
         "type": "router",
         ...
         "transports": [
            {
               "type": "web",
               ...
               "paths": {
                  ...
                  "push": {
                     "type": "pusher",
                     "realm": "realm1",
                     "role": "anonymous"
                  }
               }
            }
         ]
      }
   ]
}
```

The service dictionary has the following parameters:

option | description
---|---
**`type`** | MUST be `"pusher"` (*required*)
**`realm`** | The realm to which the forwarding session is attached that will inject the submitted events, e.g. `"realm1"` (*required*)
**`role`** | The fixed (authentication) role the forwarding session is authenticated as when attaching to the router-realm, e.g. `"role1"` (*required*)
**`options`** | A dictionary of options (optional, see below).

The `options` dictionary has the following configuration parameters:

option | description
---|---
**`key`** | A string that when present provides the *key* from which request signatures are computed. If present, the `secret` must also be provided. E.g. `"myapp1"`.
**`secret`** | A string with the *secret* from which request signatures are computed. If present, the `key` must also be provided. E.g. `"kkjH68GiuUZ"`).
**`post_body_limit`** | An integer when present limits the length of a HTTP/POST body that will be accepted. If the request body exceed this limit, the request is rejected. If 0, accept unlimited length. (default: **0**)
**`timestamp_delta_limit`** | An integer when present limits the difference (in seconds) between a signature's timestamp and current time. If 0, allow any divergence. (default: **0**).
**`require_ip`** | A list of strings with single IP addresses or IP networks. When given, only clients with an IP from the designated list are accepted. Otherwise a request is denied. E.g. `["192.168.1.1/255.255.255.0", "127.0.0.1"]` (default: **-**).
**`require_tls`** | A flag that indicates if only requests running over TLS are accepted. (default: **false**).
**`debug`** | A boolean that activates debug output for this service. (default: **false**).


## Requests

### Unsigned Requests

To submit events to Crossbar, issue a HTTP/POST request to the URL of the Crossbar HTTP Pusher service with:

1. Content type `application/json`
2. Body containing a JSON object
3. Two query parameters: `timestamp` and `seq`

The JSON object MUST be a dictionary with the following attributes:

* `topic`: A string with the URI of the topic to publish to.
* `args`: An (optional) list of positional event payload arguments.
* `kwargs`: An (optional) dictionary of keyword event payload arguments.
* `options`: An (optional) dictionary of WAMP publication options (see below).

The HTTP query parameters are as follows:

* `timestamp`: The current UTC time in ISO8601 format, e.g. `2011-10-14T16:59:51.123Z` (optional for unsigned requests)
* `seq`: A sequence number starting with 1, incremented each time the client issues a new request. (optional for unsigned requests).

> Note: With unsigned requests, the `timestamp` and `seq` HTTP query parameters are optional. However, it is recommended to include these nevertheless, since this can help avoid issues with caching intermediaries (ensure that nothing between your app and Crossbar would try to cache any request or response).

### Signed Requests

Signed requests work like unsigned requests, but have the following additional query parameters. All query parameters (below and above) are mandatory for signed requests.

* `key`: The key to be used for computing the signature.
* `nonce`: A random integer from [0, 2^53]
* `signature`: See below.

The signature computed as the Base64 encoding of the following value:

```
HMAC[SHA256]_{secret} (key | timestamp | seq | nonce | body)
```

Here, `secret` is the secret shared between the pushing application and Crossbar. This value will never travel over the wire.

The **HMAC[SHA256]** is computed w.r.t. the `secret`, and over the concatenation

```
key | timestamp | seq | nonce | body
```

The `body` is the JSON serialized event. You can look at working code [here](https://github.com/crossbario/crossbarconnect/blob/master/python/lib/crossbarconnect/client.py#L197).

## Running Standalone

If you only want to run WebSocket and the HTTP Pusher Service (and no other Web path services), here is an example configuration:

```javascript
{
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
            {
               "type": "websocket",
               "endpoint": {
                  "type": "tcp",
                  "port": 9000
               }
            },
            {
               "type": "web",
               "endpoint": {
                  "type": "tcp",
                  "port": 8080
               },
               "paths": {
                  "/": {
                     "type": "pusher",
                     "realm": "realm1",
                     "role": "anonymous"
                  }
               }
            }
         ]
      }
   ]
}
```

This will run:

 1. a WAMP-over-WebSocket endpoint on `ws://localhost:9000`
 2. a HTTP Push Bridge endpoint on `http://localhost:8080`

You can test this using

```html
<!DOCTYPE html>
<html>
   <body>
      <script src="autobahn.min.js"></script>
      <script>
         var connection = new autobahn.Connection({
            url: "ws://127.0.0.1:9000",
            realm: "realm1"
         });

         connection.onopen = function (session) {

            console.log("Connected");

            function onevent (args, kwargs) {
               console.log("Got event:", args, kwargs);
            }

            session.subscribe('com.myapp.topic1', onevent);
         };

         connection.onclose = function () {
            console.log("Connection lost", arguments);
         }

         connection.open();
      </script>
   </body>
</html>
```

and pushing from curl:

```console
curl -H "Content-Type: application/json" \
   -d '{"topic": "com.myapp.topic1", "args": ["Hello, world"]}' \
   http://127.0.0.1:8080/
```
