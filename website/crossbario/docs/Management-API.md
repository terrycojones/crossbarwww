**Important: The management API is not (yet) officially supported. The API as described below works, but it will change in the upcoming. Do NOT use this!**

> How will the API change? Currently, the API is exposed by providing a listening endpoint on the (local) Crossbar.io node where management clients connect to. In the future, the (local) Crossbar.io node will connect to an upstream management service over which then this former node, as well as other nodes in a network/cluster of Crossbar.io nodes can be managed.

# Introduction

The node management router running inside the *Controller* of a **Crossbar**.io node can be accessed via WAMP. The management router allows the reconfiguration of the node during operation, in addition to the initial configuration on startup via configuration file.

For access to the management router, you need to start a *Transport*:

```javascript
{
   "controller": {
      "transport": {
         "type": "websocket",
         "endpoint": {
            "type": "tcp",
            "port": 9000
         }
      }
   },
   "workers": [
   ]
}
```
# API Definition

## Controller

* **Event** `crossbar.on_node_ready`
* **Procedure** `crossbar.node.<node_id>.get_info`
* **Procedure** `crossbar.node.<node_id>.shutdown`

### Worker Information

* **Procedure** `crossbar.node.<node_id>.get_workers`
* **Procedure** `crossbar.node.<node_id>.get_worker_log`

### Worker Control

* **Procedure** `crossbar.node.<node_id>.start_router`
* **Procedure** `crossbar.node.<node_id>.stop_router`
* **Procedure** `crossbar.node.<node_id>.start_container`
* **Procedure** `crossbar.node.<node_id>.stop_container`
* **Procedure** `crossbar.node.<node_id>.start_guest`
* **Procedure** `crossbar.node.<node_id>.stop_guest`

### Basic

* **Procedure** `crossbar.node.<node_id>.utcnow`
* **Procedure** `crossbar.node.<node_id>.started`
* **Procedure** `crossbar.node.<node_id>.uptime`

### Python

#### GC

* **Procedure** `crossbar.node.<node_id>.trigger_gc`

### Process Monitoring

#### Process Information

* **Procedure** `crossbar.node.<node_id>.get_process_info`
   * **Error** `crossbar.error.feature_unavailable`

#### Process Statistics

* **Procedure** `crossbar.node.<node_id>.get_process_stats`
   * **Error** `crossbar.error.feature_unavailable`
* **Procedure** `crossbar.node.<node_id>.set_process_stats_monitoring`
   * **Error** `crossbar.error.feature_unavailable`
   * **Event** `crossbar.node.<node_id>.on_process_stats_monitoring_set`
   * **Event** `crossbar.node.<node_id>.on_process_stats`

### Manhole

* **Procedure** `crossbar.node.<node_id>.start_manhole`
   * **Error** `crossbar.error.feature_unavailable`
   * **Error** `crossbar.error.already_started`
   * **Error** `crossbar.error.invalid_configuration`
   * **Error** `crossbar.error.cannot_listen`
   * **Event** `crossbar.node.<node_id>.on_manhole_starting`
   * **Event** `crossbar.node.<node_id>.on_manhole_started`
* **Procedure** `crossbar.node.<node_id>.stop_manhole`
   * **Error** `crossbar.error.feature_unavailable`
   * **Error** `crossbar.error.not_started`
   * **Event** `crossbar.node.<node_id>.on_manhole_stopping`
   * **Event** `crossbar.node.<node_id>.on_manhole_stopped`
* **Procedure** `crossbar.node.<node_id>.get_manhole`
   * **Error** `crossbar.error.feature_unavailable`

## Native Workers

* **Event** `crossbar.node.<node_id>.on_worker_ready`

### Basic

* **Procedure** `crossbar.node.<node_id>.worker.<worker_id>.utcnow`
* **Procedure** `crossbar.node.<node_id>.worker.<worker_id>.started`
* **Procedure** `crossbar.node.<node_id>.worker.<worker_id>.uptime`

### Python

#### GC

* **Procedure** `crossbar.node.<node_id>.worker.<worker_id>.trigger_gc`

#### Python Path

* **Procedure** `crossbar.node.<node_id>.worker.<worker_id>.get_pythonpath`
* **Procedure** `crossbar.node.<node_id>.worker.<worker_id>.add_pythonpath`
   * **Error** `crossbar.error.invalid_argument`
   * **Event** `crossbar.node.<node_id>.worker.<worker_id>.on_pythonpath_add`

### Process Monitoring

#### Process Information

* **Procedure** `crossbar.node.<node_id>.worker.<worker_id>.get_process_info`
   * **Error** `crossbar.error.feature_unavailable`

#### Process Statistics

* **Procedure** `crossbar.node.<node_id>.worker.<worker_id>.get_process_stats`
   * **Error** `crossbar.error.feature_unavailable`
* **Procedure** `crossbar.node.<node_id>.worker.<worker_id>.set_process_stats_monitoring`
   * **Error** `crossbar.error.feature_unavailable`
   * **Event** `crossbar.node.<node_id>.worker.<worker_id>.on_process_stats_monitoring_set`
   * **Event** `crossbar.node.<node_id>.worker.<worker_id>.on_process_stats`

### Process Control

#### CPU Affinity

* **Procedure** `crossbar.node.<node_id>.worker.<worker_id>.get_cpu_affinity`
   * **Error** `crossbar.error.feature_unavailable`
   * **Error** `crossbar.error.runtime_error`
* **Procedure** `crossbar.node.<node_id>.worker.<worker_id>.set_cpu_affinity`
   * **Error** `crossbar.error.feature_unavailable`
   * **Error** `crossbar.error.runtime_error`
   * **Event** `crossbar.node.<node_id>.worker.<worker_id>.on_cpu_affinity_set`

### Manhole

* **Procedure** `crossbar.node.<node_id>.worker.<worker_id>.start_manhole`
   * **Error** `crossbar.error.feature_unavailable`
   * **Error** `crossbar.error.already_started`
   * **Error** `crossbar.error.invalid_configuration`
   * **Error** `crossbar.error.cannot_listen`
   * **Event** `crossbar.node.<node_id>.worker.<worker_id>.on_manhole_starting`
   * **Event** `crossbar.node.<node_id>.worker.<worker_id>.on_manhole_started`
* **Procedure** `crossbar.node.<node_id>.worker.<worker_id>.stop_manhole`
   * **Error** `crossbar.error.feature_unavailable`
   * **Error** `crossbar.error.not_started`
   * **Event** `crossbar.node.<node_id>.worker.<worker_id>.on_manhole_stopping`
   * **Event** `crossbar.node.<node_id>.worker.<worker_id>.on_manhole_stopped`
* **Procedure** `crossbar.node.<node_id>.worker.<worker_id>.get_manhole`
   * **Error** `crossbar.error.feature_unavailable`

## Routers

### Realms

* **Procedure** `crossbar.node.<node_id>.worker.<worker_id>.get_router_realms`
* **Procedure** `crossbar.node.<node_id>.worker.<worker_id>.start_router_realm`
* **Procedure** `crossbar.node.<node_id>.worker.<worker_id>.stop_router_realm`

### Components

* **Procedure** `crossbar.node.<node_id>.worker.<worker_id>.get_router_components`
* **Procedure** `crossbar.node.<node_id>.worker.<worker_id>.start_router_component`
* **Procedure** `crossbar.node.<node_id>.worker.<worker_id>.stop_router_component`

### Transports

* **Procedure** `crossbar.node.<node_id>.worker.<worker_id>.get_router_transports`
* **Procedure** `crossbar.node.<node_id>.worker.<worker_id>.start_router_transport`
* **Procedure** `crossbar.node.<node_id>.worker.<worker_id>.stop_router_transport`

### Links

* **Procedure** `crossbar.node.<node_id>.worker.<worker_id>.get_router_links`
* **Procedure** `crossbar.node.<node_id>.worker.<worker_id>.start_router_link`
* **Procedure** `crossbar.node.<node_id>.worker.<worker_id>.stop_router_link`


## Containers

### Components

* **Procedure** `crossbar.node.<node_id>.worker.<worker_id>.get_container_components`
* **Procedure** `crossbar.node.<node_id>.worker.<worker_id>.start_container_component`
* **Procedure** `crossbar.node.<node_id>.worker.<worker_id>.stop_container_component`
