## Quick Reference

* `crossbar version` Print Crossbar.io version
* `crossbar init` Initializes a new Crossbar.io node from an application template
* `crossbar start` Starts a Crossbar.io node
* `crossbar stop` Stops a Crossbar.io node
* `crossbar restart` Restarts a Crossbar.io node
* `crossbar status` Check if a Crossbar.io node is running
* `crossbar convert` Converts a Crossbar.io node configuration file from JSON to YAML and vice-versa

## The command line

**Crossbar**.io comes as a command line tool `crossbar` which works identical across all supported platforms.

To get help, type `crossbar --help`:

```console
oberstet@ubuntu1404:~$ crossbar --help
usage: crossbar [-h] [-d] [--reactor {select,poll,epoll,kqueue,iocp}]
                {version,init,templates,start,stop,restart,status,check,convert}
                ...

Crossbar.io - Polyglot application router - http://crossbar.io

optional arguments:
  -h, --help            show this help message and exit
  -d, --debug           Debug on.
  --reactor {select,poll,epoll,kqueue,iocp}
                        Explicit Twisted reactor selection

commands:
  {version,init,templates,start,stop,restart,status,check,convert}
                        Crossbar.io command to run
    version             Print software versions.
    init                Initialize a new Crossbar.io node.
    templates           List templates available for initializing a new
                        Crossbar.io node.
    start               Start a Crossbar.io node.
    stop                Stop a Crossbar.io node.
    restart             Restart a Crossbar.io node.
    status              Checks whether a Crossbar.io node is running.
    check               Check a Crossbar.io node`s local configuration file.
    convert             Convert a Crossbar.io node`s local configuration file
                        from JSON to YAML or vice versa.
```

The `crossbar` tool has multiple subcommands, and you can get help on those also, e.g. `crossbar init --help`:

```console
oberstet@ubuntu1404:~$ crossbar init --help
usage: crossbar init [-h] [--template TEMPLATE] [--appdir APPDIR]

optional arguments:
  -h, --help           show this help message and exit
  --template TEMPLATE  Template for initialization
  --appdir APPDIR      Application base directory where to create app and node
                       from template.
```

## Initializing a Node

**Crossbar**.io runs from a node directory. The node directory, usually `.crossbar`, contains a node configuration file `.crossbar/config.json` and other data such as log files. It is for internal use, and you should not add or modify files other than the `config.json`.

You can initialize a new node by doing:

```console
oberstet@ubuntu1404:~$ mkdir mynode
oberstet@ubuntu1404:~$ cd mynode
oberstet@ubuntu1404:~/mynode$ crossbar init --template default
Initializing application template 'default' in directory '/home/oberstet/mynode'
Using template from '/home/oberstet/python278/lib/python2.7/site-packages/crossbar-0.9.12.post2-py2.7.egg/crossbar/templates/default'
Creating directory /home/oberstet/mynode/.crossbar
Creating file      /home/oberstet/mynode/.crossbar/config.json
Application template initialized

To start your node, run 'crossbar start --cbdir /home/oberstet/mynode/.crossbar'

```
In this example, `/home/oberstet/mynode/.crossbar` is the **Crossbar**.io *node directory*.

The initialization above was done using the default template. Node templates are a quick and easy way of creating a new node. There are additional templates besides the basic default one. Some of these create working sample application for a specific language.

You can list the available templates by running `crossbar templates`:

```console
oberstet@ubuntu1404:~$ crossbar templates

Available Crossbar.io node templates:

  default          A WAMP router speaking WebSocket plus a static Web server.
  hello:python     A minimal Python WAMP application hosted in a router and a HTML5 client.
  hello:nodejs     A minimal NodeJS WAMP application hosted in a router and a HTML5 client.
  hello:cpp        A minimal C++11/AutobahnCpp WAMP application hosted in a router and a HTML5 client.
  hello:csharp     A minimal C#/WampSharp WAMP application hosted in a router and a HTML5 client.
  hello:erlang     A minimal Erlang/Erwa WAMP application hosted in a router and a HTML5 client.
  hello:php        A minimal PHP/Thruway WAMP application hosted in a router and a HTML5 client.
  hello:java       A minimal Java/jawampa WAMP application hosted in a router and a HTML5 client.
  hello:tessel     A minimal JavaScript/wamp-tessel WAMP application running on a Tessel and with a HTML5 client.

```

## Starting a Node

To start your **Crossbar**.io node:

```console
oberstet@ubuntu1404:~/mynode$ crossbar start
2015-01-11 21:41:13+0100 [Controller   4374] Log opened.
2015-01-11 21:41:13+0100 [Controller   4374] ==================== Crossbar.io ====================
	
2015-01-11 21:41:13+0100 [Controller   4374] Crossbar.io 0.9.12-2 starting
2015-01-11 21:41:13+0100 [Controller   4374] Running on CPython using EPollReactor reactor
2015-01-11 21:41:13+0100 [Controller   4374] Starting from node directory /home/oberstet/mynode/.crossbar
2015-01-11 21:41:13+0100 [Controller   4374] Starting from local configuration '/home/oberstet/mynode/.crossbar/config.json'
2015-01-11 21:41:13+0100 [Controller   4374] No WAMPlets detected in enviroment.
2015-01-11 21:41:13+0100 [Controller   4374] Starting Router with ID 'worker1' ..
2015-01-11 21:41:13+0100 [Controller   4374] Entering reactor event loop ...
2015-01-11 21:41:13+0100 [Router       4383] Log opened.
2015-01-11 21:41:14+0100 [Router       4383] Running under CPython using EPollReactor reactor
2015-01-11 21:41:14+0100 [Router       4383] Entering event loop ..
2015-01-11 21:41:14+0100 [Controller   4374] Router with ID 'worker1' and PID 4383 started
2015-01-11 21:41:14+0100 [Controller   4374] Router 'worker1': realm 'realm1' started
2015-01-11 21:41:14+0100 [Controller   4374] Router 'worker1': role 'role1' started on realm 'realm1'
2015-01-11 21:41:14+0100 [Router       4383] Site starting on 8080
2015-01-11 21:41:14+0100 [Controller   4374] Router 'worker1': transport 'transport1' started
^C2015-01-11 21:41:18+0100 [Controller   4374] Received SIGINT, shutting down.
2015-01-11 21:41:18+0100 [Controller   4374] Main loop terminated.
...
```

In this case, **Crossbar**.io has automatically detected the node directory by its canonical name `.crossbar` and used the configuration `.crossbar/config.json`.

You can set a different node directory via the command line option `--cbdir` or via an environment variable `CROSSBAR_DIR`.

Open **http://localhost:8080** in your browser. You should see a 404 page rendered by **Crossbar**.io. Which means: it works!

![Crossbar.io 404 page](/static/img/docs/shots/crossbar_404.png)
