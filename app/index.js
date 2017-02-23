/**
 * 路由初始化
 * @param   app 
 * @return      
 */

module.exports=function(app,db,client,search){
	
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
		var history = new search({
			term:imageName,
			when:date
		});
		history.save(function(err,search){
			if(err){
				throw err;
			}else{
				search.print();
			}
		});
		client.search(imageName).then(function(images){
			res.send(images.map(makeList));
		});
	});

	app.get('/api/query/lastest',getHistory);
	function makeList(img){
		return {
			"url": img.url,
			"type": img.width,
			"thumbnail": img.thumbnail.url
		};
	}
	function makeHistory(history){
		return {
			"term":history.term,
			"when":history.when
		}
	}
	function getHistory(req,res){
		search.find({},function(err,users){
			res.send(users.map(makeHistory));
		})
		
	}

}