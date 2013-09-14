Rocket.TransactionView = Rocket.CollectionView.extend({
    template: $('#previous_transactions_table').html(),

    initialize: function() {
        this.setElement('#transactions')
        this.listenTo(this.collection, 'reset', this.render)
    },

    events: {
        'click .selection':     'selection',
        'mouseover .store':     'show_description', 
        'mouseout .store':      'hide_description' 
    },

    'selection': function(e) {
        var cid = $(e.target).parent().parent().data('cid')
        this.collection.filter_by_store(this.collection.get(cid).get('store'))
        this.render()  
    },

    'show_description': function(e) {
    
    },

    'hide_description': function(e) {
    
    },

    onRender: function() {
        var showing_models = _.filter(transactions.models, function(item) { return (item.get('visible') ? true : false ) })
        var sum_total = parseInt(_.reduce(showing_models, function(memo, item){ return memo + parseInt(item.get('amount'), 10); }, 0), 10)
        $('#sum_total').html(sum_total)
    }

})
