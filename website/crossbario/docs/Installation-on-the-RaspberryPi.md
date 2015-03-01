This recipe will guide you through installing Crossbar.io on the Pi. After this, you will be able to

* run the Crossbar.io WAMP router on the Pi, as well as
* run WAMP application components on the Pi written in Python using [AutobahnPython](http://autobahn.ws/python/), which connect to a WAMP router - either on the Pi or on a different machine.

## Install Rasbian

The recipe was tested with a complete fresh install of everything, beginning from the operating system. We will use [Raspbian]() as the operating system on the Pi. If you already have Raspbian running, you can skip this step.

To install Raspbian on your Pi, follow the [NOOBS installation guide](http://www.raspberrypi.org/help/noobs-setup/).

The only adjustments I made during installation were:

1. Activate *Turbo mode*, which allows the CPU clock to scale from 700MHz to 1GHz during load. Note that you will need a power supply that can supply sufficient current for this to work stable.
2. Activate *SSH daemon*, which allows to log into the Pi remotely via SSH.

> Note: you can check the current clock rate at which the Pi runs by doing `sudo cat /sys/devices/system/cpu/cpu0/cpufreq/cpuinfo_cur_freq`


## Update the OS

It is recommended to update the OS and installed software. Log into your Pi and do

```
sudo apt-get update
sudo apt-get -y dist-upgrade
```

## Install prerequisites

To install the necessary prerequisites on the Pi, do

```
sudo apt-get install -y build-essential libssl-dev libffi-dev python-dev
```

Then install the latest version of [Pip](https://pip.pypa.io/en/latest/), a Python package manager:

```
wget https://bootstrap.pypa.io/get-pip.py
sudo python get-pip.py
```

## Install Crossbar.io

Now we are ready to install Crossbar.io.

You can install the **minimal set** of packages for Crossbar.io by doing

```
sudo pip install crossbar
```

*or* you can install the **full set** of packages (takes longer):

```
sudo pip install crossbar[all]
```

To test the installation, do the following (be patient, this can take 10-20s):

```console
pi@raspberrypi ~ $ crossbar version

Crossbar.io package versions and platform information:

Crossbar.io                  : 0.9.11

  Autobahn|Python            : 0.9.3-3
    WebSocket UTF8 Validator : wsaccel-0.6.2
    WebSocket XOR Masker     : wsaccel-0.6.2
    WAMP JSON Codec          : ujson-1.33
    WAMP MsgPack Codec       : msgpack-python-0.4.2
  Twisted                    : 14.0.2-EPollReactor
  Python                     : 2.7.3-CPython

OS                           : Linux-3.12.28+-armv6l-with-debian-7.6
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
Creating directory /home/pi/node1/hello
Creating directory /home/pi/node1/.crossbar
Creating file      /home/pi/node1/README.md
Creating file      /home/pi/node1/setup.py
Creating file      /home/pi/node1/MANIFEST.in
Creating directory /home/pi/node1/hello/web
Creating file      /home/pi/node1/hello/hello.py
Creating file      /home/pi/node1/hello/__init__.py
Creating file      /home/pi/node1/hello/web/index.html
Creating file      /home/pi/node1/hello/web/autobahn.min.js
Creating file      /home/pi/node1/.crossbar/config.json
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