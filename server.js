

var csv     =   require('csv'),
    fs      =   require('fs'),
    u       =   require('underscore')._,
    http    =   require('http'),
    getMimeType = require('simple-mime')('application/octect-stream'),
    redis   =   require('redis'),
    client  =   redis.createClient(),
    util    =   require('util'),
    formidable    =   require('formidable'),
    host    =   '0.0.0.0',
    port    =   3000;



function return_by_date(callback) {
    var results = [],
        dates = [],
        amounts = [],
        directions = [],
        descs = []

    client.lrange('user:1000:date', 0, -1, function(err,data) { dates = data 
        client.lrange('user:1000:amount', 0, -1, function(err,data) { amounts = data  
            client.lrange('user:1000:direction', 0, -1, function(err,data) { directions = data 
                client.lrange('user:1000:desc', 0, -1, function(err,data) { descs = data  
                    

                   for(var i=0; i < dates.length - 1; i++) {
                        results[i] = {
                            'date':        dates[i],
                            'amount':      amounts[i],
                            'direction':   directions[i],
                            'desc':        descs[i]
                        } 
                   } 

                   return (typeof callback === 'function') ? callback(results) : results
                })
            })
        })
    })

}

function importCSV(req, res) {
    /*
    
    */
    var form = new formidable.IncomingForm(),
        files = [],
        fields = [];

    form.uploadDir = 'uploads';

    form
      .on('field', function(field, value) {
        console.log(field, value);
        fields.push([field, value]);
      })
      .on('file', function(field, file) {
        console.log(field, file);
        files.push([field, file]);
      })
      .on('end', function() {
        console.log('-> upload done');
        res.writeHead(302, {'location': 'http://' + host + ':' + port + '/' });
        res.end();

        console.log('uploaded file to: ' + files[0][1].path)
        
        var results = []
        csv()
            .from(fs.createReadStream(files[0][1].path))
            .to(function(data) {
                    u.map(data.split('\n'), function(item)  {
                        var arr = item.split(',')

                        results.push({
                            'date':         new Date(arr[0]).toString(),
                            'amount':       parseFloat(arr[1], 10),
                            'direction':    (parseFloat(arr[1], 10) <= 0) ? 'out' : 'in',
                            'desc':         arr[4]
                        })

                        client.rpush('user:1000:date',      new Date(arr[0]) ) 
                        client.rpush('user:1000:amount',    parseFloat(arr[1], 10) )
                        client.rpush('user:1000:direction', (parseFloat(arr[1],10) <= 0) ? 'out' : 'in') 
                        client.rpush('user:1000:desc',      arr[4]) 
                    });
                    (typeof callback === 'function') ? callback(results) : results
                });

      });
    form.parse(req);

}

http.createServer(function(req, res) {
    if( /[/A-Za-z]\.json/.test(req.url) ) {
        // see if it matches the pattern of [A-Za-z].json
        res.writeHead(200, {'Content-type': 'application/json'})
        return_by_date(function(data) { res.end(JSON.stringify(data)) })
    } else if(req.url === '/import') {
        importCSV(req, res);
    } else {
        var url = (req.url === '/' || req.url === '') ? '/public/index.html' : '/public' + req.url;
        // pull the file from the local filesystem
        fs.readFile(__dirname + url, function(err, data) {
            if(err) { console.log(err) }
            if(data) {
                res.writeHead(200, {'Content-type': getMimeType(__dirname + url) })
                res.end(data);   
            }
        })
    }
}).listen(port, host);
console.log('starting server on ' + host + ':' + port)




