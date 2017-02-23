var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var searchSchema = new Schema({
	term:String,
	when:String
});

searchSchema.methods.print = function(){
	var str = this.term+','+this.when;
	console.log('Saved: '+str);
}
var Search = mongoose.model('Search',searchSchema);

module.exports = Search;