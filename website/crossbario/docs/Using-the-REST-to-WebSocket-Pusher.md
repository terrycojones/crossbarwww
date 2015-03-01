*Crossbar.io* comes with REST integration.

Using this you can use any client or language that can issue an HTTP/POST to send data to *Crossbar.io* which will then distribute the information to connected clients via WebSocket in real-time.

Start *Crossbar.io*:

    crossbar start

This will start the server which you can verify by opening `http://127.0.0.1:8080` in your browser.

To checkout basic publish & subscribe functionality, open the `<GitHub Repository>/example/index.html` in 2 different tabs or instances of your web browser and the console output of the browser (hit F12).

You should be able to push information between the connected clients by pressing the button.

Now, to check the REST-to-WebSocket bridge, we'll be using curl to send a message:
   
    curl -d 'topic=http://myapp.com#test1&event="hello"' http://127.0.0.1:8090

You can also send any JSON data

    curl -d 'topic=http://myapp.com#test1&event=[23,"hello", {"foo": 0, "bar": null}]' http://127.0.0.1:8090

You can get status information and generally control your Crossbar.io server also via the `crossbar` command line tool:

```
$ crossbar status --password secret

                                       Crossbar.io Status

----------------+-------------------------------------------+------------------------------------------
                |                  PubSub                   |                    RPC
----------------+---------------------+---------------------+---------------------+--------------------
                |       Publish       |      Dispatch       |        Call         |       Forward
----------------+----------+----------+----------+----------+----------+----------+----------+---------
                | allowed  |  denied  | success  |  failed  | allowed  |  denied  | success  |  failed
----------------+----------+----------+----------+----------+----------+----------+----------+---------
REST            |        5 |        0 |       10 |        0 |        0 |        0 |        0 |        0
Oracle          |        0 |        0 |        0 |        0 |        0 |        0 |        0 |        0
PostgreSQL      |        0 |        0 |        0 |        0 |        0 |        0 |        0 |        0
----------------+----------+----------+----------+----------+----------+----------+----------+---------
```

The `crossbar` tool has already a couple of feature, you can find out more by:

     crossbar --help
     crossbar <command> --help


