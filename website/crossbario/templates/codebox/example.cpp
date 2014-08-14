// 1) SUBSCRIBE to a topic to reveive events
void onhello(const anyvec&amp; args, const anymap&amp; kwargs) {
   cout << "Got event: " << any_cast<string>(args[0]) << endl;   
}
session.subscribe("com.myapp.hello", &amp;onhello);

// 2) PUBLISH an event
session.publish("com.myapp.hello", {string("Hello, world!")});

// 3) REGISTER a procedure for remote calling
any add2(const anyvec&amp; args, const anymap&amp; kwargs) {
   return any_cast<uint64_t>(args[0]) + any_cast<uint64_t>(args[1]);
}
session.provide("com.myapp.add2", &amp;add2);

// 4) CALL a remote procedure
session.call("com.mathservice.add2", {2, 3}).then(
   [&amp;](future<any> f) {
      cout << "Got result: " << any_cast<uint64_t> (f.get()) << endl;
   }
);
