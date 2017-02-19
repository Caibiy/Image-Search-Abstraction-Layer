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
var appi = require('app');

var gSearch = require('google-images');
var apiKey = 'AIzaSyCj6zGCOthX__AzcGDENssx-5-I5W3XR8c';
var cseId = '009398540246307978289:iqst39d97we';
var client = new gSearch(cseId,apiKey);

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
var dburi=process.env.MONGOLAB_URI;
mongoose.connect(dburi,function(err,db){
	if(err){
		return console.log('DBError:'+dburi);
	}
	appi(app,History,client);
});