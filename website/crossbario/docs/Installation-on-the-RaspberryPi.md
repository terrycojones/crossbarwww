This recipe will guide you through installing Crossbar.io on the Pi. After this, you will be able to

* run the Crossbar.io WAMP router on the Pi, as well as
* run WAMP application components on the Pi written in Python using [AutobahnPython](http://autobahn.ws/python/), which connect to a WAMP router - either on the Pi or on a different machine.

## Install Rasbian

The recipe was tested with a complete fresh install of everything, beginning from the operating system. We will use [Raspbian]() as the operating system on the Pi. If you already have Raspbian running, you can skip this step.

To install Raspbian on your Pi, follow the [NOOBS installation guide](http://www.raspberrypi.org/help/noobs-setup/).

The only adjustments I made during installation were:

1. Activate *SSH daemon*, which allows to log into the Pi remotely via SSH.
2. *Expand Filesystem*, which ensure all of the SD card capacity is available.
3. Activate *Turbo mode*, which allows the CPU clock to scale from 700MHz to 1GHz during load. **Note that you will need a power supply that can supply sufficient current for this to work stable.**

> Note: you can check the current clock rate at which the Pi runs by doing `sudo cat /sys/devices/system/cpu/cpu0/cpufreq/cpuinfo_cur_freq`


## Enlarge Root Partition

The Raspbian images will create a root filesystem of only 2GB size, independent of the capacity of the actual SD card used. The is very small and you can't install a lot of additional stuff.

To enlarge the root partition to the full size of the SD card, you can [use raspi-config](http://elinux.org/RPi_raspi-config#expand_rootfs_-_Expand_root_partition_to_fill_SD_card):

```console
sudo raspi-config
```

and choose **Expand Filesystem**.


## Update the OS

It is recommended to update the OS and installed software. Log into your Pi and do

```console
sudo apt-get update
sudo apt-get -y dist-upgrade
```

## Install prerequisites

To install the necessary prerequisites on the Pi, do

```console
sudo apt-get install -y build-essential libssl-dev libffi-dev python-dev
```

Then install the latest version of [Pip](https://pip.pypa.io/en/latest/), a Python package manager:

```console
wget https://bootstrap.pypa.io/get-pip.py
sudo python get-pip.py
```

## Install AutobahnPython

If you want to write WAMP application components in Python which run on the Pi and connect to Crossbar.io running somewhere else, all you need is [AutobahnPython](http://autobahn.ws/python).

AutobahnPython can run on top of [Twisted]() and [asyncio]() as the underlying network framework. You need to choose one.

### Running on asyncio

Install AutobahnPython for asyncio:

```console
sudo pip install autobahn[asyncio]
```

To test, save the following to a file `client.py` on the Pi, adjusting the URL of Crossbar.io:

```python
from autobahn.asyncio.wamp import ApplicationSession
from autobahn.asyncio.wamp import ApplicationRunner

class MyComponent(ApplicationSession):

    def onJoin(self, details):
        print("session ready")

runner = ApplicationRunner(url=u"ws://192.168.1.141:8080/ws", realm=u"realm1")
runner.run(MyComponent)
```

When running, you should see the following:

```console
pi@raspberrypi ~ $ python client.py
session ready
```

Hooray, that means it works!


### Running on Twisted

Install AutobahnPython for Twisted:

```console
sudo pip install autobahn[twisted]
```

To test, save the following to a file `client.py` on the Pi, adjusting the URL of Crossbar.io:

```python
from autobahn.twisted.wamp import ApplicationSession
from autobahn.twisted.wamp import ApplicationRunner

class MyComponent(ApplicationSession):

    def onJoin(self, details):
        print("session ready")

runner = ApplicationRunner(url=u"ws://192.168.1.141:8080/ws", realm=u"realm1")
runner.run(MyComponent)
```

When running, you should see the following:

```console
pi@raspberrypi ~ $ python client.py
session ready
```

Hooray, that means it works!


## Install Crossbar.io

If you want to run Crossbar.io itself on the Pi, you need to install it on the Pi - obviously;)

You can install the **minimal set** of packages for Crossbar.io by doing

```console
sudo pip install crossbar
```

*or* you can install the **full set** of packages (this will take a long time):

```console
sudo pip install crossbar[all]
```

To test the installation, do the following (be patient, startup can take 10-20s):

```console
pi@raspberrypi ~ $ crossbar version

Crossbar.io package versions and platform information:

Crossbar.io                  : 0.10.4

  Autobahn|Python            : 0.10.3
    WebSocket UTF8 Validator : wsaccel-0.6.2
    WebSocket XOR Masker     : wsaccel-0.6.2
    WAMP JSON Codec          : ujson-1.33
    WAMP MsgPack Codec       : msgpack-python-0.4.6
  Twisted                    : 15.1.0-EPollReactor
  Python                     : 2.7.3-CPython

OS                           : Linux-3.18.7+-armv6l-with-debian-7.8
Machine                      : armv6l
```

## Run a demo

Crossbar.io comes with a set of *application templates*, which you can use to get started in no time.

To create a simple demo, do:

```console
pi@raspberrypi ~ $ mkdir node1
pi@raspberrypi ~ $ cd node1/
pi@raspberrypi ~/node1 $ crossbar init --template hello:python
Initializing application template 'hello:python' in directory '/home/pi/node1'
Using template from '/usr/local/lib/python2.7/dist-packages/crossbar/templates/hello/python'
Creating directory /home/pi/node1/.crossbar
Creating directory /home/pi/node1/hello
Creating file      /home/pi/node1/MANIFEST.in
Creating file      /home/pi/node1/setup.py
Creating file      /home/pi/node1/README.md
Creating file      /home/pi/node1/.crossbar/config.json
Creating directory /home/pi/node1/hello/web
Creating file      /home/pi/node1/hello/__init__.py
Creating file      /home/pi/node1/hello/hello.py
Creating file      /home/pi/node1/hello/web/index.html
Application template initialized

To start your node, run 'crossbar start --cbdir /home/pi/node1/.crossbar'
```

Now start the Crossbar.io node (this takes a while):

```console
pi@raspberrypi ~/node1 $ crossbar start
2014-11-15 14:35:14+0000 [Controller  18623] Log opened.
2014-11-15 14:35:14+0000 [Controller  18623] ============================== Crossbar.io ==============================

2014-11-15 14:35:14+0000 [Controller  18623] Crossbar.io 0.9.11 starting
2014-11-15 14:35:27+0000 [Controller  18623] Running on CPython using EPollReactor reactor
2014-11-15 14:35:27+0000 [Controller  18623] Starting from node directory /home/pi/node1/.crossbar
2014-11-15 14:35:29+0000 [Controller  18623] Starting from local configuration '/home/pi/node1/.crossbar/config.json'
2014-11-15 14:35:29+0000 [Controller  18623] No WAMPlets detected in enviroment.
2014-11-15 14:35:29+0000 [Controller  18623] Starting Router with ID 'worker1' ..
2014-11-15 14:35:29+0000 [Controller  18623] Entering reactor event loop ...
2014-11-15 14:35:30+0000 [Router      18632] Log opened.
2014-11-15 14:35:44+0000 [Router      18632] Running under CPython using EPollReactor reactor
2014-11-15 14:35:46+0000 [Router      18632] Entering event loop ..
2014-11-15 14:35:47+0000 [Controller  18623] Router with ID 'worker1' and PID 18632 started
2014-11-15 14:35:47+0000 [Controller  18623] Router 'worker1': PYTHONPATH extended
2014-11-15 14:35:47+0000 [Controller  18623] Router 'worker1': realm 'realm1' started
2014-11-15 14:35:47+0000 [Controller  18623] Router 'worker1': role 'role1' started on realm 'realm1'
2014-11-15 14:35:47+0000 [Router      18632] Site starting on 8080
2014-11-15 14:35:47+0000 [Controller  18623] Router 'worker1': transport 'transport1' started
2014-11-15 14:35:47+0000 [Controller  18623] Starting Container with ID 'worker2' ..
2014-11-15 14:35:48+0000 [Container   18635] Log opened.
2014-11-15 14:36:01+0000 [Container   18635] Running under CPython using EPollReactor reactor
2014-11-15 14:36:04+0000 [Container   18635] Entering event loop ..
2014-11-15 14:36:04+0000 [Controller  18623] Container with ID 'worker2' and PID 18635 started
2014-11-15 14:36:04+0000 [Controller  18623] Container 'worker2': PYTHONPATH extended
2014-11-15 14:36:04+0000 [Controller  18623] Container 'worker2': component 'component1' started
2014-11-15 14:36:04+0000 [Container   18635] subscribed to topic 'onhello'
2014-11-15 14:36:04+0000 [Container   18635] procedure add2() registered
2014-11-15 14:36:04+0000 [Container   18635] published to 'oncounter' with counter 0
2014-11-15 14:36:05+0000 [Container   18635] published to 'oncounter' with counter 1
2014-11-15 14:36:06+0000 [Container   18635] published to 'oncounter' with counter 2
2014-11-15 14:36:07+0000 [Container   18635] published to 'oncounter' with counter 3
...
```

Now open your browser (not on the Pi, but a machine that is on the same network as the Pi) at `http://<Your Pi IP Address>:8080`.

> Note: You can check the IP address assigned to your Pi by entering `ifconfig`.

To get a list of available application templates, enter

```
crossbar templates
```

To learn how to program WAMP application components in different languages, head over to [Choose your Weapon](Choose your Weapon).