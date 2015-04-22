There are two methods of installing Crossbar -- from the official binary distribution, or from source.

## Installing the Official Distribution

Crossbar hosts official binary packages for Ubuntu 14.04 LTS.
If this is not the version of Ubuntu you are using, please install from source as mentioned below.

First, install the repo's GPG key:

```console
sudo apt-key adv --keyserver hkps.pool.sks-keyservers.net --recv D58C6920
```

Then add the repo to your server's apt sources:

```console
sudo sh -c "echo 'deb http://package.crossbar.io/ubuntu trusty main' > /etc/apt/sources.list.d/crossbar.list"
```

Update your package sources:

```console
sudo apt-get update
```

Install Crossbar.io:

```console
sudo apt-get install crossbar
```

You can then test the installation by printing out the versions of the Crossbar components.

```console
/opt/crossbar/bin/crossbar version
```

You're done! See _Next_.


## Installing from Source

When installing from source, you have the choice of installing on CPython (the standard interpreter) or PyPy (a high performance interpreter).
Both are good choices, but PyPy is generally faster (at the cost of a little extra RAM).

This guide will install Crossbar.io in a virtualenv.

> *Why virtualenv?* Virtualenv, as the name suggests, creates a "virtual environment" for your Python packages. This means that you can have newer versions of packages that might already be on your system, without worrying about breaking any applications that might require previous versions.


### Update your system

Update your system, to make sure you have the latest packages:

```console
sudo apt-get update
sudo apt-get dist-upgrade
```

Continue with _Setup for CPython_ or _Setup for PyPy_.


### Setup for CPython

First, install the requirements:

```console
sudo apt-get install build-essential libssl-dev libffi-dev python-dev python-pip
```

Then create a new virtualenv:

```console
virtualenv ~/python-venv
```

Finally, start working in the virtual environment:

```console
cd ~/python-venv/
. bin/activate
```

Continue with the step _Installing **Crossbar.io**_.


### Setup for PyPy

Add the PyPy PPA:

```console
sudo apt-add-repository ppa:pypy/ubuntu/ppa
sudo apt-get update
```

Install [PyPy](http://pypy.org/), pip, and build requirements:

```console
sudo apt-get install build-essential libssl-dev python-pip pypy pypy-dev
```

Then install virtualenv through pip:

```console
sudo pip install virtualenv
```

Create a PyPy virtualenv in the directory `pypy-venv`:

```console
virtualenv --python=pypy ~/pypy-venv
```

Finally, start working in the virtual environment:

```console
cd ~/pypy-venv/
. bin/activate
```

Continue with the step _Installing **Crossbar.io**_.


### Installing Crossbar.io

To install **Crossbar**.io with minimal (required) dependencies:

```console
pip install crossbar
```

To install **Crossbar**.io with all additional (optional) dependencies:

```console
pip install crossbar[all]
```

To check the installation:

```console
(pypy-venv)hawkowl@ubuntu-14-10:~/pypy-venv$ crossbar version

Crossbar.io package versions and platform information:

Crossbar.io                  : 0.10.1

  Autobahn|Python            : 0.9.5
    WebSocket UTF8 Validator : autobahn
    WebSocket XOR Masker     : autobahn
    WAMP JSON Codec          : stdlib
    WAMP MsgPack Codec       : msgpack-python-0.4.5
  Twisted                    : 15.0.0-EPollReactor
  Python                     : 2.7.8-PyPy

OS                           : Linux-3.16.0-30-generic-x86_64-with-Ubuntu-14.10-utopic
Machine                      : x86_64
```

To update an existing **Crossbar**.io installation:

```console
pip install -U crossbar
```

You can then invoke Crossbar without activating the virtualenv by running ``~/pypy-venv/bin/crossbar`` or ``~/python-venv/bin/crossbar``, depending on which Python interpreter you are using.


## Next

Ready to go? Then [choose your language or device of choice](Choose your Weapon).
