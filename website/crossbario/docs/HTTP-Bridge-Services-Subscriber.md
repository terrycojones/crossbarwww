## Introduction

> The *HTTP Subscriber* feature is available starting with Crossbar **0.10.3**.

The *HTTP Subscriber* is a service that forwards PubSub events to HTTP endpoints.

## Try it

Clone the [Crossbar.io examples repository](https://github.com/crossbario/crossbarexamples), and got to the `rest/subscriber` subdirectory.

Now start Crossbar:

```console
crossbar start
```

This example is configured to subscribe all events sent to the `com.myapp.topic1` topic to `httpbin.org/post`.
If you publish a message using the [HTTP Publisher](HTTP Bridge Services Publisher) configured in the example, it will forward the message and print the response of the message in Crossbar's debug log:

```shell
curl -H "Content-Type: application/json" \
	-d '{"topic": "com.myapp.topic1", "args": ["Hello, world"]}' \
	http://127.0.0.1:8080/publish
```

## Configuration

The *HTTP Subscriber* is configured as a WAMP component. Here it is as part of a Crossbar configuration:

```javascript
{
    "workers": [
        {
            "type": "container",
            "options": {
                "pythonpath": [".."]
            },
            "components": [
                {
                    "type": "class",
                    "classname": "crossbar.adapter.rest.MessageForwarder",
                    "realm": "realm1",
                    "extra": {
                        "subscriptions": [
                            {"url": "https://httpbin.org/post",
                             "topic": "com.myapp.topic1"}
                        ],
                        "method": "POST",
                        "expectedcode": 200,
                        "debug": true
                    },
                    "transport": {
                        "type": "websocket",
                        "endpoint": {
                            "type": "tcp",
                            "host": "127.0.0.1",
                            "port": 8080
                        },
                        "url": "ws://127.0.0.1:8080/ws"
                    }
                }
            ]
        }
    ]
}
```

The subscriber is configured through the `extra` dictionary:

option | description
---|---
**`subscriptions`** | A list of dictionaries which each MUST contain `"url"` and `"topic"` keys. The `"url"` key is a full URL with `http` or `https` (for example, `"https://example.org/endpoint"`), and the topic is the exact topic which events will be forwarded from. (*required*)
**`method`** | The HTTP method which the forwarding requests will be made with. (optional, `"POST"` by default)
**`expectedcode`** | The HTTP status code which is expected from the requests. If none is given, the status code is not checked. (optional)
**`debug`** | If `true`, then the response body will be printed to Crossbar's debug log. (optional, `false` by default)

## Handling Forwarded Events

The Subscriber, upon recieving a PubSub event that it has been configured to subscribe to, will send a request to the URL associated with the topic.
The body will be a JSON encoded dictionary and contain two keys, `"args"` and `"kwargs"` from the PubSub event.
