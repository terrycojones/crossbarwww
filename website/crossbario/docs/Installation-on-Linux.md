If you are not running CentOS 7 or Ubuntu 14.04, you can still install Crossbar from ``pip``.

## Requirements

Your system will need OpenSSL, libffi, and a working build chain.
On a Debian (or Debian-derived) system, the requirements can be installed by:

```console
sudo apt-get install build-essential libssl-dev libffi-dev \
   libreadline-dev libbz2-dev libsqlite3-dev libncurses5-dev
```

Or for Red Hat and derivatives:

```console
sudo yum install python-devel "@Development tools" libffi-devel openssl-devel
```

Then download and install a portable PyPy binary:

```console
cd $HOME
wget https://bitbucket.org/squeaky/portable-pypy/downloads/pypy-2.5-linux_x86_64-portable.tar.bz2
tar xvjf pypy-2.5-linux_x86_64-portable.tar.bz2
```

Install pip:

```console
wget https://bootstrap.pypa.io/get-pip.py
~/pypy-2.5-linux_x86_64-portable/bin/pypy get-pip.py
```

## Installing Crossbar

This PyPy is a entirely self contained Python distribution.
Any packages installed inside it are local only to that PyPy installation, without having to worry about conflicting Python packages installed from your distribution.

Install Crossbar inside the PyPy distribution:

```console
~/pypy-2.5-linux_x86_64-portable/bin/pip install crossbar[tls,msgpack,manhole,system]
```

Then check the Crossbar installation to make sure it installed correctly:

```console
~/pypy-2.5-linux_x86_64-portable/bin/crossbar version
```

...which should print something like:

```console
Crossbar.io package versions and platform information:

Crossbar.io                  : 0.10.2

  Autobahn|Python            : 0.10.1
    WebSocket UTF8 Validator : autobahn
    WebSocket XOR Masker     : autobahn
    WAMP JSON Codec          : stdlib
    WAMP MsgPack Codec       : msgpack-python-0.4.5
  Twisted                    : 15.0.0-EPollReactor
  Python                     : 2.7.8-PyPy

OS                           : Linux-3.10.0-123.el7.x86_64-x86_64-with-centos-7.0.1406-Core
Machine                      : x86_64
```


## Next

Ready to go? Then [choose your language or device of choice](Choose your Weapon).
