When installing on OS X, you have the choice of installing on CPython (the standard interpreter) or PyPy (a high performance interpreter).
Both are good choices, but PyPy is generally faster (at the cost of a little extra RAM).

## Setting up CPython

Install pip:

```console
curl https://bootstrap.pypa.io/get-pip.py -o get-pip.py
sudo python get-pip.py
```

Install virtualenv:

```console
sudo pip install -U virtualenv
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


## Setting up PyPy

Install Homebrew using the instructions on the [Homebrew site](http://brew.sh/).

> *Why Homebrew?* Homebrew is OS X's "missing package manager" and can make updating PyPy in the future much easier. It also makes sure you have all the dependencies without manually fetching anything.

Then install PyPy:

```console
brew install pypy
```

Install virtualenv:

```console
pypy -m pip install virtualenv
```

Create a PyPy virtualenv in the directory `pypy-venv`:

```console
pypy -m virtualenv ~/pypy-venv
```

Finally, start working in the virtual environment:

```console
cd ~/pypy-venv/
. bin/activate
```

Continue with the step _Installing **Crossbar.io**_.


## Installing Crossbar.io

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
(pypy-venv)hawkowl@hegira:~/pypy-venv> crossbar version

Crossbar.io package versions and platform information:

Crossbar.io                  : 0.10.2

  Autobahn|Python            : 0.10.1
    WebSocket UTF8 Validator : autobahn
    WebSocket XOR Masker     : autobahn
    WAMP JSON Codec          : stdlib
    WAMP MsgPack Codec       : msgpack-python-0.4.5
  Twisted                    : 15.0.0-KQueueReactor
  Python                     : 2.7.8-PyPy

OS                           : Darwin-14.1.0-x86_64-i386-64bit
Machine                      : x86_64
```

To update an existing **Crossbar**.io installation:

```console
pip install -U crossbar
```


## Next

Ready to go? Then [choose your language or device of choice](Choose your Weapon).
