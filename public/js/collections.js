Rocket.TransactionList = Rocket.Collection.extend({
    model: transaction,
    url: '/all.json',

    filter_by_store: function(store) {
        _.filter(this.models, function(model) {
            model.set('visible', (model.get('store') === store) ? true : false);
        });
    },

    filter_by_none: function() {
        _.each(this.models, function(model) {
        	model.set('visible', true);
        })
    },

    parse: function(response) {
    	return response;
    },

    comparator: function(model) {
    	return -1 * model.get('date')
    }

});