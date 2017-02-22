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
var appi = require('./app');

var gSearch = require('google-images');
var apiKey = 'AIzaSyAw1PyCqYEp1Fmk8qMGpXagP2LAwX_yXdE';
var cseId = '009439860460342694497:qgs3igncbno';
var client = new gSearch(cseId,apiKey);

var pug = require('pug');
/**
 * 环境设置
 */
app.set('views',path.join(__dirname,'views'));
app.set('view engine','pug');

var historySchema = new Schema({
	term: String,
	when: String
});

var History = mongoose.model('History',historySchema);
var dburi=process.env.MONGOLAB_URI||"mongodb://root:root@ds111489.mlab.com:11489/sites";
//var dburi = "mongodb://localhost:27017/image";
mongoose.connect(dburi,function(err,db){
	if(err){
		return console.log('DBError:'+dburi);
	}
	appi(app,History,client,pug);
});
/**
 * 监听端口
 */
var port = process.env.PORT || 8080;

app.listen(port,function(){
	console.log('Node.js listening on port: '+port);
})