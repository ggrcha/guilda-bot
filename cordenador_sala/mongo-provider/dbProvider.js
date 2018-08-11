var mongoose = require('mongoose')

var mongourl=process.env.MONGODB_URL;
// var mongourl="mongodb://mongodb:27017/guilda";
// var dbname=process.env.MONGODB_DB;
// var dbname="guilda";

mongoose.connect(mongourl , { useNewUrlParser: true });

module.exports.getDb = function() {
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function() {
      console.log("coordenador: conectado mongodb");
    });
    return db;
}


