// 1) SUBSCRIBE to a topic to reveive events
function onhello(args) {
   console.log("Got event:", args[0]);
}
session.subscribe('com.myapp.hello', onhello);

// 2) PUBLISH an event
session.publish('com.myapp.hello', ['Hello, world!']);

// 3) REGISTER a procedure for remote calling
function add2(args) {
   return args[0] + args[1];
}
session.register('com.myapp.add2', add2);

// 4) CALL a remote procedure
session.call('com.myapp.add2', [2, 3]).then(
   function (result) {
      console.log("Got result:", result);
   }
);
