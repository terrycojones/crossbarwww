The *Controller* can be configured using the `controller` item in the node's configuration:

```javascript
{
   "controller": {
      "id": "mynode1",
      "realm": "management1",
      "options": {
         "title": "mycontroller"
      },
      "transport": {
         // local management router transport
      },
      "manhole": {
         // Manhole running in controller (for debugging)
      }
   }
}
```

The available parameters are:

option | description
---|---
**`id`** | The ID of the node (default: **hostname** of machine)
**`realm`** | The management realm of the node (default: **"crossbar"**)
**`options`** | Controller process options - see below (default: **{}**).
**`transport`** | Management router transport - please see [here](Management API).
**`manhole`** | Manhole for controller - please see [here](Manhole).

The available `options` are:

option | description
---|---
**`title`** | The controller process title (default: **"crossbar-controller"**)
