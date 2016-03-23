# Foundation + Node.js test

Run ``npm install`` to install dependencies, ``foundation watch`` to run the project, project code lives in Gulpfile.

 - Using Jade for page templating.
 - Proxy works on data server (through Apache2 proxypass config)
 - Plugged in Angularjs
 - Currently pushes data to both json file and a MongoDB
 - Need to double check dependencies (specifically MongoDB)
 - Need to work on proper routing/templating
 - Schema and can, and should, be refactored into separate files

Run ``forever gulpfile.js`` to keep service running on server "forever"

Project currently being used for our RestaurantDB