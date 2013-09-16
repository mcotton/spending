transaction = Rocket.Model.extend({
    defaults: {
        'visible': true
    },

    parse: function(data, options) {
        if(data.direction && data.direction === 'out') { 
            this.set('store', data.desc.replace(/.*\d\d\/\d\d/, '').replace(/\d\d\d\d\d.*$/,''))
        } else {
            this.set('store', data.desc)
        }

        data.date = new Date(data.date)

        return data
    }

})
