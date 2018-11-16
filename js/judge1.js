var picken = {
    enti: undefined,
    originalColor: Cesium.Color.YELLOW.withAlpha(0.5)
}

var centerP=new Cesium.Cartesian3(0.0,0.0,0.0);
var test;

function sleep(numberMillis) {
	var now = new Date();
	var exitTime = now.getTime() + numberMillis;
	while (true) {
		now = new Date();
		if (now.getTime() > exitTime)
		return;
	    }
}

var pickedObject;
var pickName;

function judge(view2D,c_point)
{ 
   
    var scene = view2D.scene;
                
    var point = Cesium.Cartesian3.fromDegrees(c_point.x, c_point.y);
                var point_1 = scene.cartesianToCanvasCoordinates(point);
              
                pickedObject = scene.pick(point_1);

                if(!Cesium.defined(pickedObject))
                {
                    console.log("未进入区域");
                    return;
                }

                if(pickedObject.id.properties.name.getValue()!=picken.name)
                {
                   // picken.enti = pickedObject.id;

                   if(picken.enti==undefined)
                   {
                    picken.enti = pickedObject.id;
                   }

                    picken.name = pickedObject.id.properties.name.getValue(); 

                   // pickName =pickedObject.id.name;

                    pickName = pickedObject.id.properties.name.getValue(); 

                    view2D.selectedEntity=pickedObject;

                }

    //视频动态切换
    view2D.selectedEntityChanged.addEventListener(function(){
                  
        picken.enti.polygon.material = Cesium.Color.YELLOW.withAlpha(0.5);

        pickedObject.id.polygon.material= Cesium.Color.RED.withAlpha(1.5);
      
        picken.enti = pickedObject.id;
        
        video(view3D,centerP);
       
        $.ajax({
                    url: "videoSrc.json",//json文件位置
                    type: "GET",//请求方式为get
                    dataType: "json", //返回数据格式为json
                    success: function(data) {//请求成功完成后要执行的方法 
                    //each循环 使用$.each方法遍历返回的数据date
                    $.each(data, function(i, item) {
                        if(item.name==pickName)  
                             {
                                document.getElementById("firstVideo").src= item.src;  
                                document.getElementById("trailer").load();
                            }  
                        })
                     }
                })         
          }) 
        }

        var j=false;
        var temp="";
        
        function tips()
        {
            if(j==true)
            {
                alert(pickName);
                j=false;
            }
        }

        function tips0()
        {
            if(temp==null)
            {
                temp=pickName; 
            }

            if((temp==pickName)&&temp!=null&&pickName!=null)
            {
                j=true;
            }
            else
            {
                j=false;
                temp=pickName;
            }
        }

        var t1=self.setInterval(tips,12000);
        var t2=self.setInterval(tips0,2000);