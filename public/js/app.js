

var app = {}

// Collections
var transactions = new Rocket.TransactionList()

// Views
var transactionsView = new Rocket.TransactionView({ collection: transactions })


transactions.fetch({reset: true});

$(document).ready(function(){

 	workspace = new Workspace();
 	Backbone.history.start({pushState: false, silent: true});

})