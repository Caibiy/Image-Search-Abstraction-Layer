/**
 * 路由初始化
 * @param   app 
 * @return      
 */

module.exports=function(app,db,client){
	
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
		var history = {
			term:imageName,
			when:date
		};
		db.collection('coll_image').insert(history,function(err){
			if(err)
				 console.log('Db Error: '+err);
		})
      
		/*client.search(imageName).then(function(images){
			res.send(images.map(makeList));
		});*/
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
		db.collection('coll_image').insert(obj,function(err){
			if(err)
				 console.log('Db Error: '+err);
		})
	}

	function getHistory(req,res){
		var histors=db.collection('coll_image').find();
		res.send(historys.map(makeList));
	}

}