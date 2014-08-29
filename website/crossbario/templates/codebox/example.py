# 1) SUBSCRIBE to a topic to reveive events
def onhello(msg):
   print("Got event: {}".format(msg))
session.subscribe(onhello, 'com.myapp.hello')

# 2) PUBLISH an event
session.publish('com.myapp.hello', 'Hello, world!')

# 3) REGISTER a procedure for remote calling
def add2(x, y):
   return x + y
session.register(add2, 'com.myapp.add2');

# 4) CALL a remote procedure
result = yield from session.call('com.myapp.add2', 2, 3)
print("Got result: {}".format(result))
