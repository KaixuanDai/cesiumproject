//my_worker.js
 
//这里this并不是传统意义上的window对象,而是一个WorkGlobalScope对象
var self = this;
 
 
// worker入口,类似于Thread的run方法
self.onmessage = function(evt){
	
	// 接收传递过来的参数
	var millSeconds = evt.data;
	
	//wait(millSeconds);
	
	console.log("work time is: " + evt.data.c_point.x);
	
	// 返回数据给调用者
	postMessage("from worker's message.");
}
 
 
function wait(millSeconds)
{
	var begin = new Date().getTime();
	var end = new Date().getTime();
	while(end - begin < millSeconds)
	{
		end = new Date().getTime();
	}
}