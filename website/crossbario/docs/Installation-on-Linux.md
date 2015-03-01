## Prerequisites

You can run Crossbar under CPython or PyPy. PyPy is recommended, at least for production use, since it brings significant speed gains.

### Updates

Update your system (optional, but recommended anyway):

```
sudo apt-get update
sudo apt-get dist-upgrade
```

> Note: `dist-upgrade` will NOT upgrade the distribution to a new major version (e.g. from 12.04 to 12.10). That would be done using `sudo do-release-upgrade`.

### Running under CPython

On **Debian** based systems (such as Ubuntu), please install the following:

```console
sudo apt-get install build-essential libssl-dev libffi-dev python-dev python-pip
```

On **RedHat** based systems, please install the following:

```console
yum install libffi-devel -y
pip upgrade twisted
pip install ez_setup
pip install six
pip install pyopenssl
pip install pycrypto
pip install wsaccel
pip install ujson
pip upgrade distribute
pip install virtualenv
```

Then create a new virtualenv:

```
virtualenv python-venv
```

> *Why virtualenv?* Virtualenv, as the name suggests, creates a "virtual environment" for your Python packages. This means that you can have newer versions of packages that might already be on your system, without worrying about breaking any applications that might require previous versions.

Finally, start working in the virtual environment:

```
cd python-venv/
. bin/activate
```

### Running under PyPy

To install **Crossbar**.io together with [PyPy](http://pypy.org/) on Linux, follow this recipe.

> * **Crossbar**.io runs on [CPython](https://www.python.org/) as well. It'll just run much faster on PyPy.
> * Your Linux distribution might have a PyPy package also. However, those are often well behind the official vanilla PyPy release.
> * This recipe was tested on [Ubuntu Server](http://www.ubuntu.com/download/server) (14.10, 64 bit).

Add the PyPy PPA:

```
sudo apt-add-repository ppa:pypy/ubuntu/ppa
sudo apt-get update
```

Install [PyPy](http://pypy.org/), pip, and build requirements:

```
sudo apt-get install build-essential libssl-dev python-pip pypy pypy-dev
```

Then install virtualenv through pip:

```
sudo pip install virtualenv
```

Create a PyPy virtualenv in the directory `pypy-venv`:

```
virtualenv --python=pypy pypy-venv
```

Finally, start working in the virtual environment:

```
cd pypy-venv/
. bin/activate
```

## Crossbar.io

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

```
pip install -U crossbar
```

## Next

Ready to go? Then [choose your language or device of choice](Choose your Weapon).
