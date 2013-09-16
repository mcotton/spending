
Workspace = Rocket.Router.extend({

	routes: {
		"": 				"index" ,
		"list": 			"list",
		"detail/:store": 	"detail"
	},

	index: function() {
		workspace.navigate('/list', {trigger: true, replace: true})
	},

	list: function() {

		transactions.filter_by_none();
    	transactionsView.render()
	},

	detail: function(store) {

		transactions.filter_by_store(decodeURI(store))
		transactionsView.render()

	}

});