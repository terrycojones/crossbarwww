## Introduction

> The *HTTP Subscriber* feature is available starting with Crossbar **0.10.3**.

The *HTTP Subscriber* is a service that forwards PubSub events to HTTP endpoints by POST requests.

## Try it

Clone the [Crossbar.io examples repository](https://github.com/crossbario/crossbarexamples), and got to the `rest/subscriber` subdirectory.

Now start Crossbar:

```console
crossbar start
```

This example is configured to subscribe all events sent to the `com.myapp.topic1` topic to `httpbin.org/post`.
If you publish a message using the [HTTP Publisher](HTTP Bridge Services Publisher) configured in the example, it will forward the message and post the response of the message in Crossbar's debug log:

```shell
curl -H "Content-Type: application/json" \
	-d '{"topic": "com.myapp.topic1", "args": ["Hello, world"]}' \
	http://127.0.0.1:8080/publish
```
