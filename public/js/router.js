
Workspace = Rocket.Router.extend({

	routes: {
		"": 				"index" ,
		"detail/:store": 	"detail",
		"detail": 			"list",
		"list": 			"list"
	},

	index: function() {
		workspace.navigate('/list', {trigger: true, replace: true})
	},

	list: function() {

		transactions.filter_by_none();
    	transactionsView.render()
	},

	detail: function(store) {
		if(store && store.length > 0) {
			transactions.filter_by_store(decodeURI(store))
			transactionsView.render()
		} else {
			workspace.navigate('/list', {trigger: true, replace: true})
		}
	}

});