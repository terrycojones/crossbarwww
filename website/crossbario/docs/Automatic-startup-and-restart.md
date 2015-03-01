For running **Crossbar**.io in production, you might want to:

* automatically start **Crossbar**.io at system boot as a daemon (background service) and under a dedicated service user (non-root)
* automatically restart **Crossbar**.io if it exits (either deliberately, or by accident)

There are different approaches and tools to accomplish above.

The following describes how to monitor and restart **Crossbar**.io automatically using [Daemontools](http://cr.yp.to/daemontools.html). **Daemontools** is a simple, effective, highly secure tool create by [Dan Bernstein](http://en.wikipedia.org/wiki/Daniel_J._Bernstein) (aka "djb").

> Note: There is also [runit](http://smarden.org/runit/), which is a Daemontools clone that some people [prefer](http://www.sanityinc.com/articles/init-scripts-considered-harmful/).

## Installation

To install Daemontools on Debian based systems (Ubuntu et al):

```
sudo apt-get install csh daemontools daemontools-run
```

This will install a couple of tools including

```
/usr/bin/svc
/usr/bin/svstat
/usr/bin/svscanboot
/usr/bin/setuidgid
```

## Configuration

Create a Daemontools service directory for **Crossbar**.io:

```
sudo mkdir /etc/service/crossbar
```

Create a service run script

```
sudo vi /etc/service/crossbar/run
```

with the following content:

```
#!/bin/sh

exec /usr/bin/setuidgid ubuntu \
   /home/ubuntu/pypy-2.2.1-linux64/bin/crossbar start \
   --cbdir /home/ubuntu/cbdemo/.crossbar \
   --logdir /home/ubuntu/cbdemo/.crossbar/log
```

Above assumes:

 * you are using PyPy under the specified path (see: [Installation on PyPy](Installation on PyPy))
 * you want to run **Crossbar**.io under the dedicated Unix user `ubuntu` (which fits for a Amazon EC2 Ubuntu Server AMI)
 * you have a **Crossbar**.io node created in the specified node directory
 * you want **Crossbar**.io log to the specified subdirectory within the node directory

Make the run script executable:

```
sudo chmod +x /etc/service/crossbar/run
```

To make Daemontools start automatically at system boot:

```
sudo vi /etc/rc.local
```

and add the following to the end of that file:

```
/bin/csh -cf '/usr/bin/svscanboot &'

exit 0
```

Reboot your system and check the **Crossbar**.io has been started:

```
ubuntu@ip-10-229-126-122:~$ sudo svstat /etc/service/crossbar
/etc/service/crossbar: up (pid 1006) 91391 seconds
```

## Administration

To stop **Crossbar**.io:

```
sudo svc -d /etc/service/crossbar
```

To (manually) start again:

```
sudo svc -u /etc/service/crossbar
```

To restart:

```
sudo svc -t /etc/service/crossbar
```

To check status:

```
sudo svstat /etc/service/crossbar
```

By default - if given `--logdir` option - **Crossbar**.io will create daily rotated log files in the directory specified:

```
ubuntu@ip-10-229-126-122:~$ ls -la /home/ubuntu/cbdemo/.crossbar/log
total 28
drwxr-xr-x 2 ubuntu ubuntu  4096 Mar 18 04:15 .
drwxrwxr-x 3 ubuntu ubuntu  4096 Mar 17 16:14 ..
-rw-r--r-- 1 ubuntu ubuntu  2737 Mar 18 08:13 node.log
-rw-r--r-- 1 ubuntu ubuntu 13915 Mar 17 16:14 node.log.2014_3_17
```

To watch the log file:

```
tail -f /home/ubuntu/cbdemo/.crossbar/log/node.log
```

