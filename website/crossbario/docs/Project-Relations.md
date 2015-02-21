## Python

**Crossbar**.io is implemented in Python. The productivity of the Python language and the robustness and performance of available Python run-times are a major plus.

## PyPy

PyPy is a JITting Python implementation that has incredible performance and a leading garbage collector. For maximum performance in production, we recommend to run **Crossbar**.io under PyPy.

## RaspberryPi

The Pi is a powerful but low-cost little computer. You can do awesome projects with the Pi and some accessoirs. If you want to connect your Pi in real-time to the Web, the **Autobahn** project provides open-source libraries in various languages:

* **Autobahn**](Python provides you with the basis of WebSocket and WAMP implementations in Python.
* If you want to go with JavaScript on the Pi, **Autobahn**](JS is a WAMP implementation that runs on Node.
* And **Autobahn**](Cpp is a C++ 11 WAMP implementation that works with other native code on the Pi.

Of course, **Crossbar**.io runs great on the Pi as well. This provides you with a very capable local WAMP router with built-in Web server. You can create uplinks to other **Crossbar**.io routers, e.g. connecting your Pi to a cloud server. And you can let **Crossbar**.io start, host and monitor all your application components (Python, JavaScript/Node or C++) running locally on the Pi.


Shared objects instead of duplicate parsing.


2. WAMP


1. Autobahn](Python
2. Python
3. PyPy
4. Twisted


1. Crossbar/PG
2. PostgreSQL

1. Crossbar/SRDP
3. Arduino

1. Autobahn](Python
2. RaspberryPi

1. Autobahn](Cpp
2. C++
3. Boost/ASIO
4. WebSocket++
