var express = require('express');
var app = express();

app.use("/", express.static(__dirname));
var morgan  = require('morgan')
app.use(morgan('combined'))
var macBssidTable = new Array();

function findById(source, id) {
    return source.filter(function( obj ) {
        return obj.mac === id;
    })[ 0 ];
}


function updateTable(mac, bssid) {
   var entry = {};
   var result = findById( macBssidTable, mac );
   if (result == null) {
      entry.mac = mac;
      entry.bssid = bssid;
      entry.timestamp = new Date().getTime();
      macBssidTable[macBssidTable.length] = entry;
   } else {
      result.bssid = bssid;
      result.timestamp = new Date().getTime();
   }
}

/* For debug purposes, sleasy and easy to test via a browser */
/* The get here is not a true get, but you can use it to inject data */
/*  into the table if electric imp isn't running */
app.get('/usermac/:mac/bssid/:bssid', function(req, res) {
  updateTable(req.params.mac, req.params.bssid);
  res.send(macBssidTable);
});

/* Electric Imp uses this to dynamically update the table */
app.put('/usermac/:mac/bssid/:bssid', function(req, res) {
  updateTable(req.params.mac, req.params.bssid);
  res.send(macBssidTable);
});

/* Return all the mac's and there corresponding bssid and timestamp. */
app.get('/usermac/:mac', function(req, res) {
   var result = findById( macBssidTable, req.params.mac );
   res.send(result);
});

app.get('/usermac', function(req, res) {
  res.send(macBssidTable);
});

/* Training wheel code */
var products = [
  {id: 0, title: 'Paint pots', description: 'Pots full of paint', price: 3.95},
  {id: 1, title: 'Polka dots', description: 'Dots with that polka groove', price: 12.95},
  {id: 2, title: 'Pebbles', description: 'Just little rocks, really', price: 6.95}
];

app.get('/products', function(req, res) {
  res.send(products);
});

app.get('/products/:id', function(req, res) {
  res.send(products[req.params.id]);
});

app.get('/products/:id/bssid/:x', function(req, res) {
  res.send(products[req.params.id]);
});


app.listen(3000);
console.log('Listening on port 3000');
