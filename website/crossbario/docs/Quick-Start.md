## Install Crossbar.io

Get [Python 2](http://python.org) (or [PyPy](http://pypy.org/)) and install Crossbar.io with *required* dependencies using [pip](https://pip.pypa.io/)

```sh
pip install crossbar
```
To install Crossbar.io with *all optional* parts as well, do

```sh
pip install crossbar[tls,msgpack,manhole,system]
```

If you run into issues with installation you might check out [these guides for specific operating systems](Installation guides overview).

## Test the Installation

When successful, the installation will have created a `crossbar` command line tool. You can verify the install by doing:

```console
oberstet@ubuntu1404:~$ crossbar version

Crossbar.io software versions:

Crossbar.io     : 0.9.6
Autobahn        : 0.8.10
Twisted         : 14.0.0-EPollReactor
Python          : 2.7.7
UTF8 Validator  : autobahn
XOR Masker      : autobahn
```

which lists the software versions of some Crossbar.io components.

## Create an Application

The Crossbar.io command line tool `crossbar` can generate complete, ready-to-run application templates to get you started quickly.

To create a *Hello world!* application with a HTML5/JavaScript frontend and *Python backend*:

```sh
crossbar init --template hello:python --appdir hello
```

or to create the application with a *NodeJS backend*:

```sh
crossbar init --template hello:nodejs --appdir hello
```

> You will need to install AutobahnJS for Node by doing `npm install -g autobahn` and have `NODE_PATH` set so Node finds it.

To get a list of available templates:

```sh
crossbar templates
```

When initializing an application template, a directory will be created with a couple of files prefilled. E.g. the Python variant of the application template will create the following files:

```sh
./.crossbar/config.json
./hello/hello.py
./hello/web/autobahn.min.js
./hello/web/index.html
./hello/__init__.py
./MANIFEST.in
./README.md
./setup.py
```

Here, `./.crossbar/config.json` is a configuration file for a Crossbar.io node while the other files are for the application itself.

For further information about getting started with specific languages, see this [overview](Choose your Weapon).

## Run the Application

To start the **Crossbar**.io node switch to the application directory

```sh
cd hello
```

and do

```sh
crossbar start
```

Then open [`http://localhost:8080/`](http://localhost:8080/) in your browser. Make sure to open the JavaScript console as well to see logging output.

What you should see logged is a message such as "Hello from Python" or "Hello from NodeJS", indicating that the JavaScript code running in the browser just successfully called a remote procedure in another WAMP application component implemented in Python or NodeJS.

You can find the backend code in `./hello/hello.py` (for the Python variant) and the frontend code in `./hello/web/index.html`.

## What now?

Go to [The Command Line](The Command Line) to learn about the Crossbar.io command line tool or jump into one of the language specific getting starteds:

  * [Getting started with Python](Getting started with Python)
  * [Getting started with NodeJS](Getting started with NodeJS)
  * [Getting started with C++](Getting started with Cplusplus)
  * [Getting started with Erlang](Getting started with Erlang)
  * [Getting started with PHP](Getting started with PHP)