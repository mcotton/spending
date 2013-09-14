

var app = {}

 var transactions = new Rocket.TransactionList()


$(document).ready(function() {


    transactions.fetch({reset: true});
    transactionsView = new Rocket.TransactionView({ collection: transactions })
    transactionsView.render()


});
