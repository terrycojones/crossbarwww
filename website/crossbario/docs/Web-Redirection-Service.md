Here is how you define a **Web Transport** that redirects HTTP (and WebSocket) on port 80 to secure HTTPS (and secure WebSocket) on port 443:

```javascript
{
   "type": "web",
   "endpoint": {
      "type": "tcp",
      "port": 80
   },
   "paths": {
      "/": {
         "type": "redirect",
         "url": "https://example.com"
      }
   }
}
```
> The former example assumes the host's name is **example.com**


The single parameter to the *Redirection* service is `url`, which can take different forms:

 * `../foobar` (relative)
 * `/download` (absolute)
 * `https://example.com` (fully qualified)

You can also redirect *subpaths* on a **Web Transport**:

```javascript
{
   "type": "web",
   "endpoint": {
      "type": "tcp",
      "port": 80
   },
   "paths": {
      "/": {
         "type": "static",
         "directory": ".."
      },
      "ws": {
         "type": "websocket",
         "url": "ws://localhost:8080/ws"
      },
      "tavendo": {
         "type": "redirect",
         "url": "http://somewhere.com/to/something"
      }
   }
}
```

