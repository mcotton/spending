Rocket.TransactionList = Rocket.Collection.extend({
    model: transaction,

    filter_by_store: function(store) {
        _.each(this.models, function(item) {
            item.set('visible', (item.get('store') === store) ? true : false)
        })
    }

})
