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
        // TODO: add click handlers to table headers for sorting 
    },

    'selection': function(e) {

        // TODO: add filter on selection, multiple descriptions
        var cid = $(e.target).parent().parent().data('cid')
        workspace.navigate("/detail/" + encodeURI(this.collection.get(cid).get('store')), {trigger: true, replace: true})
        this.collection.filter_by_store(this.collection.get(cid).get('store'))
        this.render()   
    },

    'show_description': function(e) {
        // TODO: make this work
    },

    'hide_description': function(e) {
        // TODO: make this work
    },

    onRender: function() {
        var showing_models = _.filter(transactions.models, function(item) { return (item.get('visible') ? true : false ) })
        var sum_total = parseInt(_.reduce(showing_models, function(memo, item){ return memo + parseInt(item.get('amount'), 10); }, 0), 10)
        $('#sum_total').html(sum_total)
    }

})