**Crossbar**.io's Web server allows you to serve plain old CGI scripts. This can be useful if you have some legacy or other scripts that you want to run as part of a **Crossbar**.io node.

Here is an example configuration for a **Web Transport** that includes a CGI processor on a *subpath*:

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
         "url": "ws://localhost:8080/ws"
      },
      "script": {
         "type": "cgi",
         "directory": "../cgi",
         "processor": "/usr/bin/python"
      }
   }
}
```

CGI is configured as a path component on a Web transport:

 * `type` must be `"cgi"`
 * `directory` is the CGI base directory containing your scripts. The path can be absolute or relative to the **Crossbar**.io node directory
 * `processor` is the CGI script processor to use. This MUST be a fully qualified path to an executable.

Here is a complete example:

1) Create a new **Crossbar**.io node

```
cd ~
mkdir test1
cd test1
crossbar init
```

2) Activate CGI

Add the following snippet to configuration file at **~/test1/.crossbar./config.json** in the `processes.web.transports.paths` dictionary

```javascript
"script": {
   "type": "cgi",
   "directory": "../cgi",
   "processor": "/usr/bin/python"
}
```

3) Test

Create an example CGI directory **~/test1/cgi** and script **~/test1/cgi/foo**:

```python
import sys

print "Content-Type: text/html\n\n"

print """<!doctype html>
<html>
   <body>
      <p>This is {} running {}</p>
   </body>
</html>
""".format(sys.executable, __file__)
```

Then start **Crossbar**.io

```
crossbar start
```

and open the page **http://localhost:8080/script/foo** in your browser. You should see a hello from the Python CGI script.
