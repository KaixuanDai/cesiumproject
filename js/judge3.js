var picken = {
    name:"",
    enti: undefined,
    originalColor: Cesium.Color.YELLOW.withAlpha(0.5)
}

var centerP=new Cesium.Cartesian3(0.0,0.0,0.0);
var test;
var pickedObject;
var selectedEntity1;
var pickName;
function judge(view2D,c_point)
{
    //sleep(5000);
  //  console.log(c_point);
    var scene = view2D.scene;
                
    var point = Cesium.Cartesian3.fromDegrees(c_point.x, c_point.y);
                var point_1 = scene.cartesianToCanvasCoordinates(point);
              
                pickedObject = scene.pick(point_1);

                if(!Cesium.defined(pickedObject))
                {
                    console.log("未进入区域");
                    return;
                }
                view2D.selectedEntity=pickedObject;
                
                if(!(pickedObject.id==picken.enti))
                { 
                    picken.enti = pickedObject.id;
                }

                pickName=pickedObject.id.name;
             
               
                    
                var centerArray=view2D.selectedEntity.id.properties.center.getValue();
                                             
                    if(centerP!=test)
                       {
                        centerP.x=centerArray[0];
                        centerP.y=centerArray[1];
                        centerP.z=1000;
                        test =centerP;
                       }
                
            
    //视频动态切换
    view2D.selectedEntityChanged.addEventListener(function(){
                  
        picken.enti.polygon.material = Cesium.Color.YELLOW.withAlpha(0.5);

        pickedObject.id.polygon.material= Cesium.Color.RED.withAlpha(1.5);
      
        //picken.enti = pickedObject.id;
        
        //video(view3D,centerP);
                   
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
