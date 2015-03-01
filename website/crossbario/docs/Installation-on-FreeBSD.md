To install **Crossbar**.io together with [PyPy](http://pypy.org/) on [FreeBSD](http://www.freebsd.org/), follow this recipe.

> * **Crossbar**.io runs on [CPython](https://www.python.org/) as well. It'll just run much faster on PyPy.
> * This recipe was tested on [FreeBSD](http://www.freebsd.org/) (9.2, x86 64 bit).

## PyPy

For installing [PyPy](http://pypy.org/) on FreeBSD, please follow [this](http://tavendo.com/blog/post/pypy-on-freebsd-nightlies/).

Add the following to `$HOME/.profile` (adjusting the path to PyPy according to the one you unpacked):

```
export PATH=${HOME}/pypy-c-jit-68238-4369d6c2378e-freebsd64/bin:${PATH}
```

and

```
source $HOME/.profile
```

Then install [pip](http://pip.readthedocs.org/en/latest/installing.html):

```
wget --no-check-certificate https://raw.github.com/pypa/pip/master/contrib/get-pip.py
pypy get-pip.py
```

## Crossbar.io

To install **Crossbar**.io with minimal (required) dependencies:

```console
pip install crossbar
```

To install **Crossbar**.io with all additional (optional) dependencies:

```console
pip install crossbar[tls,msgpack,manhole,system]
```

To check the installation:

```console
[oberstet@tvd_build_txpypy ~]$ crossbar version

Crossbar.io software versions:

Crossbar.io     : 0.9.1
Autobahn        : 0.8.6
Twisted         : 13.2.0-KQueueReactor
Python          : 2.7.6
UTF8 Validator  : autobahn
XOR Masker      : autobahn
```

To update an existing **Crossbar**.io installation:

```
pip install -U crossbar
```

## Next

Ready to go? Please follow the [First Steps](First Steps).


