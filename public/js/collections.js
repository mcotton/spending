Rocket.TransactionList = Rocket.Collection.extend({
    model: transaction,
    url: '/all.json',

    filter_by_store: function(store) {
        _.each(this.models, function(item) {
            item.set('visible', (item.get('store') === store) ? true : false)
        })
    },

    parse: function(response) {
    	console.log(response);
    	return response;
    }

})
