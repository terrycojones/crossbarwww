When a **Crossbar**.io node starts, the node controller reads a local configuration from a file and starts services as specified in the configuration.

Later, while the node runs, services can be dynamically stopped, reconfigured and started via the WAMP based [[Management API]] exposed by the node controller.

## Configuration File Location

The local configuration of a **Crossbar**.io node is defined in a **[JSON](http://www.json.org/) file `.crossbar/config.json`** within the node directory.

> The default path of the configuration file can be overridden using the `--cbdir` and `--config` options of the **Crossbar**.io command line interface (CLI). See `crossbar start --help`.

While the local configuration is the only required file in the node directory, the directory will usually contain other files. For example, here are the contents of a typical Crossbar.io node directory:

File | Description
---|---
**`./.crossbar/`** | **Crossbar.io node directory**
`./.crossbar/config.json` | Local node configuration
`./.crossbar/myapp.sock` | A Unix domain socket of a configured *Transport*
`./.crossbar/log` | Log directory
`./.crossbar/log/node.log` | Current log file
`./.crossbar/log/node.log.2014_4_26` | Archived log file
`./.crossbar/cookies.db` | Crossbar.io authentication cookie database
`./.crossbar/dhparam.pem` | TLS Diffie-Hellman server parameter file
`./.crossbar/myserver_key.pem` | TLS key of server
`./.crossbar/myserver_cert.pem` | TLS certificate of server

## Configuration File Format

A configuration is a [JSON](http://www.json.org/) file with two sections: for the `controller` configuration and for the definition of `workers`

```json
{
   "controller": {
   },
   "workers": [
   ]
}
```

The contents of the `controller` and `workers` section is described in the following pages:

1. [[Controller Configuration]]
2. Worker Configuration
  - [[Router Configuration]]
  - [[Container Configuration]]
  - [[Guest Configuration]]

## Checking a Configuration

You can check a configuration by doing:

```console
oberstet@corei7ub1310:~/mynode1$ crossbar check
Checking local configuration file /home/oberstet/mynode1/.crossbar/config.json
Checking process item 1 ..
Checking process item 2 ..
Checking process item 3 ..
Checking module item 1 ..
Checking realm item 1 ('realm1') ..
Checking transport item 1 ..
Ok, configuration file looks good.
```

`crossbar check` checks to see if there are any syntactical issues, e.g. invalid attributes. It will NOT catch all possible configuration issues. E.g. if you configure 2 router transports listening on the *same* TCP port, this will not work, but the check won't raise an error. You will only get error feedback upon starting the node.
