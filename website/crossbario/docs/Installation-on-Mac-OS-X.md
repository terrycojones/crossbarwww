## Prerequisites

It is possible to run **Crossbar.io** based on the CPython interpreter, but running on the PyPy infrastructure has speed advantages. Have a try for yourself, e.g. using [virtualenv](http://www.virtualenv.org/en/latest/)!

### Running under CPython

These instructions have been tested with a plain vanilla Python2.7 installation on Mac OS X v10.5.8.

Install a pip version that matches your CPython version.

Continue with the step _Installing **Crossbar.io**_

### Running under PyPy

These instructions have largely been tested with PyPy 2.2.1 on Mac OS X v10.9.2.

Download [the Mac OS X version of PyPy 2.2.1](https://bitbucket.org/pypy/pypy/downloads/pypy-2.2.1-osx64.tar.bz2) (or find a newer version in https://bitbucket.org/pypy/pypy/downloads).

Let's extract it into your $HOME.

#### Untested (but should work)
In order to have the shell find the **pypy** command, add it to your $PATH as follows:

Add the following to `$HOME/.profile`:
```
export PATH=$HOME/pypy-2.2.1-osx64/bin:${PATH}
```
and either incorporate this addition to your $PATH in your current shell:
```
source $HOME/.profile
```
or log out and log in again.

Next, install a pip version that matches the PyPy version:
```
wget https://raw.github.com/pypa/pip/master/contrib/get-pip.py
pypy get-pip.py
```
(There are other ways than to use **wget** to obtain that file from github, of course).

Continue with the step _Installing **Crossbar.io**_

#### Tested (worked, duh)
As an alternative, these instructions used a virtualenv called 'my-pypy-env', based on the pypy that was extracted to $HOME:
```
virtualenv -p ~/pypy-2.2.1-osx64/bin/pypy my-pypy-env
```

The virtualenv comes with its own pip, so it is easy to continue with the step _Installing **Crossbar.io**_ after the virtualenv has been activated:

```console
cd my-pypy-env
source bin/activate
```

## Installing **Crossbar.io**
Fingers crossed now, and:

```console
pip install crossbar
```

will give you no errors!

The latter will install **Crossbar**.io with minimal (required) dependencies. To install **Crossbar**.io with all additional (optional) dependencies:

```console
pip install crossbar[tls,msgpack,manhole,system]
```


## Checking the installation of **Crossbar.io**
Entering:
```
crossbar version
```
should give you output resembling:
```
Crossbar.io software versions:

Crossbar.io     : 0.9.3
Autobahn        : 0.8.8
Twisted         : 13.2.0-KQueueReactor
Python          : 2.7.3
UTF8 Validator  : autobahn
XOR Masker      : autobahn
```

## Updating an existing **Crossbar**.io installation:
The project is in flux, so rather sooner than later, you'll need to:
```
pip install -U crossbar
```

## Next
Ready to go? Please follow the [First Steps](First-Steps) page.