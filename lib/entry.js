var mongoose = require('./mongoose.js'),
    Schema = mongoose.Schema;

var EntrySchema = new Schema({
  username: {type: String, require: true},
  title: String,
  date: { type: Date, default: Date.now },
  body: String
});

var Entry = mongoose.model('EntryData2', EntrySchema);

Entry.getRange = function fromOldest(from, to, fn) {
  Entry.find({}, null, {skip: from, limit: to - from + 1}, fn)
};
//Entry.getRange = function fromLast(from, to, fn) {
//  Entry.count(function (error, len) {
//    if(error){
//      console.log('查询数据总数量失败');
//    }else{
//      var pageSize = to - from + 1;
//      if(len < 5){
//        Entry.find({}, fn).sort({'date':-1});
//      }else{
//        Entry.find({}, null, {skip: to - len - 1, limit: 5}).sort({'date':-1}).exec(fn);
//      }
//      //Entry.find().sort({'date':-1}).find({}, null, {skip: from, limit: to - from + 1}, fn)
//    }
//  });
//};
module.exports = Entry;

/*
function Entry(obj) {
  for (var key in obj) {
    this[key] = obj[key];
  }
}

Entry.prototype.save = function(fn){
  var entryJSON = JSON.stringify(this);

  db.lpush(
    'entries',
    entryJSON,
    function(err) {
      if (err) return fn(err);
      fn();
    }
  );
};

Entry.getRange = function(from, to, fn){
  db.lrange('entries', from, to, function(err, items){
    if (err) return fn(err);
    var entries = [];

    items.forEach(function(item){
      entries.push(JSON.parse(item));
    });

    fn(null, entries);
  });
};

Entry.count = function(fn){
  db.llen('entries', fn);
};
*/