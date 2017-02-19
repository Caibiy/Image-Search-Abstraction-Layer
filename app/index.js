/**
 * 路由初始化
 * @param   app 
 * @return      
 */

module.exports=function(app,History,client){
	app.get('/',function(req,res){
		res.render('index',{
			err:"error: 用法错误,参考案例"
		})
	});
	app.get('/:name',function(req,res){
		var page = req.query.offset?req.query.offset:1;//默认搜索page为1
		var imageName = req.params.name;
		var date = new Date().toISOString();

		client.search(imgName,{
			page:page
		}).then(function(images){
			res.send(images.map(makeList));
		});
	});
	function makList(img){
		return {
			"url": img.url,
			"type": img.width,
			"thumbnail": img.thumbnail.url
		}
	}
}