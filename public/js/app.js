

var app = {}

 var transactions = new Rocket.TransactionList()


$(document).ready(function() {

    $.getJSON('/all.json', function(data) {
        transactions.reset(data, {parse: true})
        transactionsView = new Rocket.TransactionView({ collection: transactions })
        transactionsView.render()
    })


});
