## Release 1.0
(planned for early December 2014)

Release 1.0 consolidates existing functionality and improves stability.

- finish authorization & authentication mechanisms 
- add application templates covering authentication and authorization
- stabilization & cleanup

## Release 2.0
(planned for May 2015)

Release 2.0 adds new features. It primarily allows databases to act as application components in WAMP applications, and adds new features from the WAMP Advanced Profile.

### Database Integration

Adds connectors for 

* PostgreSQL
* Oracle

These allow databases to become WAMP clients. They offer all four WAMP client roles:

* *Publisher*
* *Subscriber*
* *Caller*
* *Callee*

(Note: Caller functionality may be limited due to lack of support for async operations in PL/SQL.)

### Features from the WAMP Advanced Profile
   
* pattern-based subscription & registrations
* more meta events, e.g. first subscribe/last unsubscribe for a topic

### Additional Features

* automatic reloading of components

## Release 3.0
(planned for August 2015)

Release 3.0 adresses scalability and robustness/high availability both for Crossbar itself and for WAMP applications.

### Multi-core/Multi-node Support

WAMP messages are routed between routers. This allows to scale Crossbar and/or increase system availability by scaling up to multiple cores and/or scaling out to multiple nodes (clustering, federation).

### Partitioned/distributed calls & events

* Distributed calls allow load balancing for callees.
* Partitioned calls enable using e.g. database sharding.

-----------------------------------

Additionally, Tavendo, the maintainers of the Crossbar.io project, are planning commercial offerings to be used with Crossbar:

* Cloud Management Service

  * manage your Crossbar instances centrally
  * instances connect to a central cloud management service run by Tavendo

* Hosted Crossbar Realms (Routing-as-a-Service)