There are two methods of installing Crossbar -- from the official binary distribution, or from source.

## Installing the Official Distribution

Crossbar hosts official binary packages for CentOS 7.
If this is not the CentOS version you are using, please install from source as mentioned below.

First, install the repo's GPG key:

```console
sudo rpm --import "http://pool.sks-keyservers.net/pks/lookup?op=get&search=0x5FC6281FD58C6920"
```

Then add the repo to your sources:

```console
sudo sh -c "echo '[crossbar]
name = Crossbar
baseurl = http://package.crossbar.io/centos/7/
enabled = 1
gpgcheck = 1' > /etc/yum.repos.d/crossbar.repo"
```

Install Crossbar:

```console
sudo yum install crossbar
```

You can then test the installation by printing out the versions of the Crossbar components.

```console
/opt/crossbar/bin/crossbar version
```

You're done! See _Next_.


## Installing from Source

Install the requirements:

```console
sudo yum install libffi-devel
sudo pip install virtualenv
```

Then create a new virtualenv:

```console
virtualenv python-venv
```

> *Why virtualenv?* Virtualenv, as the name suggests, creates a "virtual environment" for your Python packages. This means that you can have newer versions of packages that might already be on your system, without worrying about breaking any applications that might require previous versions.

Finally, start working in the virtual environment:

```console
cd python-venv/
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
crossbar version
```

To update an existing **Crossbar**.io installation:

```console
pip install -U crossbar
```

You can then invoke Crossbar without activating the virtualenv by running ``~/python-venv/bin/crossbar``.


## Next

Ready to go? Then [choose your language or device of choice](Choose your Weapon).
