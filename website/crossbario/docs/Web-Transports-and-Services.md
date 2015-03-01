**Quick Links** - Crossbar.io Web Services:

 1. [Static Web Service](Static Web Service)
 1. [Web Redirection Service](Web Redirection Service)
 1. [JSON Value Service](JSON Value Service)
 1. [CGI Script Service](CGI Script Service)
 1. [WSGI Host Service](WSGI Host Service)
 1. [WAMP Long-Poll Service](WAMP Long-Poll Service)
 1. [HTTP Pusher Service](HTTP Pusher Service)

## Introduction

**Crossbar**.io includes a full-featured WAMP router to wire up your application components. But if you serve HTML5 Web clients from **Crossbar**.io, the **static Web assets** for your frontends like HTML, JavaScript and image files need to be hosted somewhere as well.

You can host static content on your existing Web server or a static hosting service like Amazon S3. It does not matter if your **Crossbar**.io nodes reside on different domain names from the static content. However, you can  let **Crossbar**.io also host the static assets. This is possible by using a **Web Transport** with your router.

Besides hosting static content, the **Web Transport** also adds a whole number of other features like serving WSGI, redirection or CGI.


## Web Transport Configuration

Here is the basic outline of a **Web Transport** configuration

```javascript
{
   "controller": {
   },
   "workers": [
      {
         "type": "router",
         "transports": [
            {
               "type": "web",
               "endpoint": {
                  "type": "tcp",
                  "port": 8080
               },
               "paths": {
                  "/": {
                     "type": "static",
                     "directory": ".."
                  },
                  "ws": {
                     "type": "websocket"
                  }
               }
            }
         ]
      }
   ]
}
```

The Web transport has a few parameters:

 1. `id`- The (optional) transport ID - this must be unique within the router this transport runs in (default: **"transportN"** where N is numbered starting with 1)
 2. `type` must be `"web"` (*required*)
 3. `endpoint` is the endpoint to listen on (*required*)
 4. `paths` is a dictionary for configuring services on subpaths (*required* - see below). 
 5. `options` is an optional dictionary for additional transport wide configuration:

option | description
---|---
**`access_log`** | set to `true` to enable Web access logging (default: **false**)
**`display_tracebacks`** | set to `true` to enable rendering of Python tracebacks (default: **false**)
**`hsts`** | set to `true` to enable [HTTP Strict Transport Security (HSTS)](http://en.wikipedia.org/wiki/HTTP_Strict_Transport_Security) (only applicable when using a TLS endpoint) (default: **false**)
**`hsts_max_age`** | for HSTS, use this maximum age (only applicable when using a TLS endpoint). (default: **31536000**)
**`hixie76_aware`** | set to `true` to support use of WebSocket Hixie-76 on any path services configured (default: **false**)

## Web Transport Services

A *Web Transport* defines services on URL paths - the **Web Transport** allows to configure individual paths with different services, including e.g. WebSocket transports running from URL paths:

```javascript
{
   "type": "web",
   "endpoint": {
      "type": "tcp",
      "port": 8080
   },
   "paths": {
      "/": {
         "type": "static",
         "directory": ".."
      },
      "ws": {
         "type": "websocket",
      }
   }
}
```

This will make the subpath **/ws** into a WebSocket transport. All other paths will serve static assets from the directory specified. The directory path can be absolute or relative to the `.crossbar` directory.

> The path `"/"` MUST always be specified, and configured with `type` either `"static"`, `"redirect"`or `"wsgi"`. The keys in `paths` MUST be proper (atomic) components from the HTTP URI scheme. Nesting subpaths is [currently](https://github.com/crossbario/crossbar/issues/10) not possible.

The WebSocket transport as used above (as a subpath service) has all the parameters and options like for a standalone WebSocket transport. The only exception is **endpoint**, which must be provided with standalone WebSocket transport, but which must not be specified when running as a subpath service (since the endpoint is already configured on the base Web transport).

If present, the URL in the WebSocket part of the configuration MUST include the path component. In the above, since the WebSocket transport runs on the path **/ws**, the correct URL is **ws://localhost:8080/ws**. A standalone WebSocket transport's URL would have used **ws://localhost:8080**.

## Path Services

**Crossbar**.io implements multiple subpath services for use with Web transports:

 1. [Static Web Service](Static Web Service)
 1. [Web Redirection Service](Web Redirection Service)
 1. [JSON Value Service](JSON Value Service)
 1. [CGI Script Service](CGI Script Service)
 1. [WSGI Host Service](WSGI Host Service)
 1. [WAMP Long-Poll Service](WAMP Long-Poll Service)
 1. [HTTP Pusher Service](HTTP Pusher Service)

The WebSocket subpath service runs a WebSocket transport as part of a Web transport on a URL subpath. This accepts the `options`, `debug`, `url` and `auth` arguments similarly to a regular WebSocket transport.

The Static subpath service can serve static assets from a directory. This directory can be different from the base directory of the containing Web transport.

The Web Redirection subpath service redirects HTTP (and WebSocket) on port 80 to secure HTTPS (and secure WebSocket) on port 443.

The JSON subpath service can expose part of the configuration file under a URL path and return a document of JSON MIME type.

The CGI script subpath service allows you to serve CGI scripts.

The WSGI host subpath service allows you to host [WSGI](http://legacy.python.org/dev/peps/pep-0333/) based Python applications, such as [Flask](http://flask.pocoo.org/), [Pyramid](http://www.pylonsproject.org/projects/pyramid/about) or [Django](https://docs.djangoproject.com/).

The WAMP Longpoll subpath service adds a longpoll transport which can be used as a fallback solution for devices which lack WebSocket support, such as older browsers.

The HTTP Pusher subpath service allows submitting PubSub events via HTTP/POST requests.

Here is an example that combines three services:

```javascript
"paths": {
   "/": {
      "type": "static",
      "directory": ".."
   },
   "ws": {
      "type": "websocket",
   },
   "downloads": {
      "type": "static",
      "directory": "/home/someone/downloads"
   },
   "config": {
      "type": "json",
      "value": {
         "param1": "foobar",
         "param2": [1, 2, 3]
      }
   }
}
```