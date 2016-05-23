# Vanilla Routing Framework

Vanilla Routing Framework can help you easily set up routes for a local server using RESTFUL methods (as of right now, it can handle GET, POST, PUT, PATCH AND DELETE). You will also need to provide a path and a callback function, but VRF will handle the rest!

---

##To Install

Via your terminal install the VRF framework using npm.

```
$npm i vanilla-routing-framework
```

---

##Requiring In

Like with any other npm package, you'll need to require in VRF as a dependancy. First, create a new instance of the router object. You'll also need to define the custom routes you wish your server to respond to (for a given url). It is recommended to define your routes in a separate module from your server, so that after adding your routes you can export the route object to your server like so.

```javascript
const Router = require('vanilla-routing-framework');
const router = new Router();

module.exports = router;
```

###Your Own Routes

You can create your own methods on this router by calling one of the five given RESTFUL methods on your router object, passing in a url and a callback like so.

```javascript
const Router = require('vanilla-routing-framework');
const Router = new Router;

router.get('/pathypath', function(req, res) {
  res.write('You went down the pathypath');
  res.end();
})
```

###Instantiating a server

Require our routes module into the file we're instantiating our server on (recommended) or define your custom routes in that same file. Then, pass router.route() into your server creation.

```javascript
const http = require('http');
const router = require('./router') //or wherever you defined your routes.

http.createServer(router.route()).listen(3000);
