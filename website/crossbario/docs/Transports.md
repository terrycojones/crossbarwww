## Introduction

This chapter explains options to configure transports.

There are currently two transport types implemented:

 * **websocket**
 * **web**

The **websocket** transport provides a pure, WebSocket-only transport.

The **web** transport allows to create a Web server with distinct paths providing different services, including WebSocket, but also static file serving, redirection, CGI and so on.

### WebSocket Transport

**Example 1**

```javascript
{
   "type": "websocket",
   "endpoint": {
      "type": "tcp",
      "port": 8080
   },
   "url": "ws://myhost.example.com:8080"
}
```

**Example 2**

```javascript
{
   "type": "websocket",
   "endpoint": {
      "type": "tcp",
      "port": 8080,
      "backlog": 200,
      "interface": "127.0.0.1"
   },
   "url": "ws://myhost.example.com:8080"
}
```

### Web Transport

**Example 1**

```javascript
{
   "type": "web",
   "endpoint": {
      "type": "tcp",
      "port": 8080,
      "backlog": 200,
      "interface": "",
      "tls": {
         "key": "server.key",
         "certificate": "server.crt",
         "ciphers": "AES128-GCM-SHA256"
      }
   },
   "paths": {
      "/": {
         "type": "static",
         "directory": ".."
      },
      "ws": {
         "type": "websocket",
         "url": "wss://myhost.example.com:8080/ws"
      }
   }
}
```