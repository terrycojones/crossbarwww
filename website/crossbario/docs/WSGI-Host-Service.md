**Crossbar**.io is able to *host* [WSGI](http://legacy.python.org/dev/peps/pep-0333/) based Python applications, such as [Flask](http://flask.pocoo.org/), [Pyramid](http://www.pylonsproject.org/projects/pyramid/about) or [Django](https://docs.djangoproject.com/).

Here is a minimal example using Flask. The overall files involved are:

```
myapp.py
templates/index.html
.crossbar/config.json
```

Create a file `myapp.py` with your Flask application object:

```python
from flask import Flask, render_template

##
## Our WSGI application .. in this case Flask based
##
app = Flask(__name__)


@app.route('/')
def page_home():
   return render_template('index.html', message = "Hello from Crossbar.io")
```

Create a Jinja template file `templates/index.html` (note the `templates` subfolder):

```html
<!DOCTYPE html>
<html>
   <body>
      <h1>{{ message }}</h1>
   </body>
</html>
```

Add a **Web Transport** with a **WSGI Host Service** on a subpath within your node configuration:

```javascript
{
   "controller": {
   },
   "workers": [
      {
         "type": "router",
         "options": {
            "pythonpath": [".."]
         },
         "transports": [
            {
               "type": "web",
               "endpoint": {
                  "type": "tcp",
                  "port": 8080
               },
               "paths": {
                  "/": {
                     "type": "wsgi",
                     "module": "myapp",
                     "object": "app"
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