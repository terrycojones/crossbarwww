When Crossbar.io forms part of your application, there are four approaches of starting Crossbar.io:

1. Start Crossbar.io from a startup script
2. Start Crossbar.io from within your application
3. Start you application from Crossbar.io
4. Start Crossbar.io externally

## Starting Crossbar.io from a startup script

You can create a startup script for your application that first start a Crossbar.io node and then starts everything else needed for your application (like WAMP application components or other parts of your app).

## Starting Crossbar.io from within your application

To start a Crossbar.io node from within your application, simply run the Crossbar.io executable using the usual language specific facilities.

E.g in Python, you can start Crossbar.io

```python
import subprocess
p = subprocess.Popen(["/home/oberstet/python278/bin/crossbar",
   "start", "--cbdir", "/home/oberstet/node1/.crossbar"])
```

> Note that you need to specifiy fully qualified paths here.

To stop Crossbar.io

```python
p.terminate()
p.wait()
```

## Starting you application from Crossbar.io

Crossbar.io is able to start, monitor and host application components. Please see the respective documentation about container and guest workers.

## Starting Crossbar.io externally

You can have Crossbar.io be started from OS level startup facilities (like Linux **rc.d scripts** or **systemd**). You actual application might also be started by the same facility and then depend on the Crossbar.io service having started already earlier.
