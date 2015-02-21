Crossbar.io is a Python application, with a few additional dependencies. Since Windows does not have any kind of dependency package management for applications, running Crossbar.io requires installing some of these dependencies manually.

There are two possibilities to install Crossbar.io:

* **Basic installation** - which is quick and simple, but leads to a Crossbar installation which lacks some features, e.g. SSL for connections. This is recommended for first trying out Crossbar. Demos and application templates work with basic installations.
* **Full installation** - which requires installing more dependencies, but allows you to use all features of Crossbar.io.

## Basic Installation

### Installing the Dependencies

Crossbar.io is a Python application. In addition to Python, setup requires the PyWin32 additions and `pip`, a Python package manager.

* Download [Python for Windows](https://www.python.org/downloads/windows/) - we recommend the latest 2.7.x 32-bit version (even on 64-bit systems).
* Once you've installed Python, add `C:\Python27\` and `C:\Python27\Scripts` to your `PATH`
* Download [PyWin32](http://sourceforge.net/projects/pywin32/files/pywin32/) - make sure you download the 32-bit version if you've installed a 32-bit Python (as recommended)
* If you're on any Python version previous to 2.7.9, you need to install `pip`. Download the [`get-pip` script](https://bootstrap.pypa.io/get-pip.py) and run this (works from Windows Explorer or the download dialog of your browser).

You now have all the dependencies for a basic Crossbar.io installation. 

### Installing Crossbar.io

Now you can install Crossbar.io by opening a command shell and doing

```sh
pip install crossbar
```

To verify that the installation was successful, in the shell do

```sh
crossbar version
```

which should output something like:

```sh
C:\Python27\lib\site-packages\twisted\internet\iocpreactor\reactor.py:30: UserWarning: pyOpenSSL 0.10 or newer is required for SSL support in iocpreactor. It is missing, so the reactor will not support SSL APIs. 
"pyOpenSSL 0.10 or newer is required for SSL support in iocpreactor. "

Crossbar.io software versions:

Crossbar.io     : 0.9.9
Autobahn        : 0.9.2
Twisted         : 14.0.2-IOCPReactor
Python          : 2.7.8
UTF8 Validator  : autobahn
XOR Masker      : autobahn
```

The initial warning is about the missing SSL support - which does not affect your initial trying out of Crossbar.

### Where to go now

To start exploring what Crossbar.io can do, and to get a basis for hacking your own applications, we suggest using the [application templates](Application Templates) which come with Crossbar.io. Using these, you can initialize a Crossbar.io instance which automatically starts a fully functioning (small) demo application. For example

```sh
crossbar init --template hello:python
```

and then

```sh
crossbar start
```

will start up a Crossbar.io instance which serves the files for a small demo application at `http://localhost:8080`.


## Full Installation

The full installation requires you to install more dependencies. 

The functionality is enabled by installing

1. [Python](http://www.python.org/)
2. [pip](https://bootstrap.pypa.io/get-pip.py)
3. [Microsoft Visual C++ 2008 Redistributable](http://www.microsoft.com/en-us/download/details.aspx?id=29)
4. [OpenSSL](http://www.openssl.org/related/binaries.html)
5. [cffi](https://pypi.python.org/pypi/cffi)
6. [cryptography](https://pypi.python.org/pypi/cryptography)
7. [pyOpenSSL](https://pypi.python.org/pypi/pyOpenSSL)
8. [zope.interface](https://pypi.python.org/pypi/zope.interface/)
9. [Twisted](http://www.twistedmatrix.com/)
10. [msgpack-python](https://pypi.python.org/pypi/msgpack-python)
11. [psutil](https://pypi.python.org/pypi/psutil)
12. [pywin32](http://sourceforge.net/projects/pywin32/)

> Make sure to add `C:\Python27\` and `C:\Python27\Scripts` on your `PATH` after installing Python!

**Optionally**, for higher performance, install:

1. [wsaccel](https://pypi.python.org/pypi/wsaccel/)
32. [ujson](https://pypi.python.org/pypi/ujson)

Once you have installed all the dependencies, open a Windows command shell and then install [Crossbar.io](https://pypi.python.org/pypi/crossbar/) by doing:

    pip install crossbar

This should install **Crossbar**.io from the Python Package Index, and automatically add all non-binary dependencies.

To upgrade **Crossbar**.io to a new version:

    pip install --upgrade crossbar

To test the installation, open a Windows command shell and type

    crossbar version

This should print **Crossbar**.io software versions:

```
Crossbar.io software versions:

Crossbar.io     : 0.9.9
Autobahn        : 0.9.2
Twisted         : 13.2.0-IOCPReactor
Python          : 2.7.6
UTF8 Validator  : wsaccel-0.6.2
XOR Masker      : wsaccel-0.6.2
```

## Installation from Source

Recently, Microsoft has published a compiler package specifically for building Python binary extensions on Windows which simplifies matters a lot.

1. Download and install the [compiler package](http://www.microsoft.com/en-us/download/details.aspx?id=44266).
2. Open "Visual C++ 2008 32-bit Command Prompt" from the "Microsoft Visual C++ Compiler Package for Python 2.7" program folder
3. Change to the `crossbar/crossbar` directory and type `pip install -e .[all]`

