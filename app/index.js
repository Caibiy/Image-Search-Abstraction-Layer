/**
 * 路由初始化
 * @param   app 
 * @return      
 */

module.exports=function(app,History,client,pug){
	
	app.get('/',function(req,res){
		res.render('index',{
			err:"error: 用法错误,参考案例"
		})
	})

	app.get('/api/:name',function(req,res){
		console.log('-------------');
		console.log('name:'+req.params.name);
		console.log('-------------');
		var page = req.query.offset?req.query.offset:1;//默认搜索page为1
		var imageName = req.params.name;
		var date = new Date().toISOString();
	/*	var history = {
			"term":imageName,
			"when":date
		};*/
		//save(history);
      
		client.search(imageName).then(function(images){
			res.send(images.map(makeList));
		});
	});

	app.get('/api/lastest',getHistory);
	function makeList(img){
		return {
			"url": img.url,
			"type": img.width,
			"thumbnail": img.thumbnail.url
		};
	}
	
	function save(obj){
		//保存对象到数据库
		var history = new History(obj);
		history.save(function(err,history){
			if(err) throw err;
			console.log('Saved' + history);
		})
	}

	function getHistory(req,res){
		History.find({},null,{
			"limit":10,
			"sort":{
				"when":-1
			}
		},function(err,history){
			if(err) return console.error(err);
			console.log(history);
			res.send(history.map(function(arg){
				return {
					term: arg.term,
					when: arg.when
				};
			}));
		});
	}

}