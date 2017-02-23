'use strict';
/**
 * 模块依赖
 * @type 
 */
var express = require('express');
var app = express();
var path = require('path');
var mongoose = require('mongoose');
var Schema=mongoose.Schema;
var MongoClient = require('mongodb').MongoClient;
var appi = require('./app');

var gSearch = require('google-images');
var apiKey = 'AIzaSyAw1PyCqYEp1Fmk8qMGpXagP2LAwX_yXdE';
var cseId = '009439860460342694497:qgs3igncbno';
var client = new gSearch(cseId,apiKey);

var Search = require('./models/search');
/**
 * 环境设置
 */
app.set('views',path.join(__dirname,'views'));
app.set('view engine','pug');

/*var historySchema = new Schema({
	term: String,
	when: String
});

var History = mongoose.model('History',historySchema);*/
//var dburi=process.env.MONGOLAB_URI||"mongodb://root:root@ds111489.mlab.com:11489/sites";
var dburi = "mongodb://root:root@ds059804.mlab.com:59804/image";
/*MongoClient.connect(dburi,function(err,db){
	if(err){
		 console.log('DBError:'+dburi);
	}
	appi(app,db,client);
});*/
mongoose.connect(dburi);
var db = mongoose.connection;
db.on('error',console.error.bind(console,'connection error'));
db.once('open',function(){
	appi(app,db,client,Search);
});
/**
 * 监听端口
 */
var port = process.env.PORT || 8080;

app.listen(port,function(){
	console.log('Node.js listening on port: '+port);
})