var fs = require('fs');

module.exports = function(app) {

  app.post('/api/spot', function(req, res) {
    fs.writeFile('server/spot.json', req.data, function(err, data) {
      if (err) {
        return console.log('api/spot error: ', err)
      }
      console.log(data)
    })
  })


}