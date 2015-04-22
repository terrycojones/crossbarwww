There are two methods of installing Crossbar -- from the official binary distribution, or from source.

## Installing the Official Distribution

Crossbar hosts official binary packages for FreeBSD 10.1.
If this is not the version of FreeBSD you are using, please install from source as mentioned below.

First, install Crossbar's software signing key:

```console
mkdir -p /usr/local/etc/ssl/certs/
cat >> /usr/local/etc/ssl/certs/crossbar.cert << EOT
-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAzlYpaiHktflMhsXVIT03
yH+tS7IgFrucL6Hqpa394WUR8w23Ua1PtoQruj7sn4ZkmA02g2qzSJ8A9DdgYFBE
0AHqAEIzVljGXYWN8FmULs290WpL9R6pSp0mDcpFu+FEhaeQXC0t7wjlZOpEpiV+
vDeX+/Mnf1yW75sE9gbRqT4zfmz6oIE9LIWkqW9CKiV0+XvmsSLRg6fJfKfi77GM
Wg8DzIHo4ssWr3AqpXABxnV+euXHGViYCzCMjOxW7lRmEm4ySPanZokKIpUBtKhA
SNchklvN4JfYSQuE3P+d3Amx0st6SnTeEB6/du9lwJ5PpK+tF2JblOIdkMy5+TkU
wwIDAQAB
-----END PUBLIC KEY-----
EOT
```

Then install the Crossbar package repository:

```console
mkdir -p /usr/local/etc/pkg/repos/
cat >> /usr/local/etc/pkg/repos/crossbar.conf << EOT
crossbar: {
  url: "http://package.crossbar.io/freebsd/10.1",
  mirror_type: "http",
  signature_type: "pubkey",
  pubkey: "/usr/local/etc/ssl/certs/crossbar.cert",
  enabled: yes
}
EOT
```

Update your pkg cache:

```console
pkg update
```

Install Crossbar:

```console
pkg install crossbar
```

Then test your installation:

```console
/opt/crossbar/bin/crossbar version
```

You're done! See _Next_.


## Installing from Source

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

### Installing Crossbar.io

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

Ready to go? Then [choose your language or device of choice](Choose your Weapon).
