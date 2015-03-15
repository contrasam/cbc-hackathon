var unirest = require('unirest');
var restify = require('restify');
var Firebase = require('firebase');

var server = restify.createServer({ name: 'my-api' });

server
  .use(restify.fullResponse())
  .use(restify.bodyParser());
  
server.get('/events', function (req, res, next) {
	unirest.get("https://hypecal-events.p.mashape.com/search.json?key=&city=Montreal&country=CA&distance=10&from=2015-03-14T20%3A30%3A00&lat=40.71435&to=2015-06-14T20%3A30%3A00%2B08%3A00")
	.header("X-Mashape-Key", "ruAAnwwor9mshnd6PGacLmMgcDLsp1CAnvPjsnJ6msCJiQB4qR")
	.header("Accept", "application/json")
	.end(function (result) {
		res.send(result.body);
	});
});

server.post('/incident', function (req, res, next) {
	var db = new Firebase('https://cbc-feed.firebaseio.com/');
	var reportsRef = db.child("reports");
	reportsRef.push({"details":req.body,"messages":{}}); 
	res.send({status:true,message:"Report Created"});
});

server.listen(8080, function () {
  console.log('%s listening at %s', server.name, server.url);
});


