function startup(Cesium) {
    'use strict';
//Sandcastle_Begin
var viewer = new Cesium.Viewer('cesiumContainer');

var tf_a=2.0,tf_b=2.0;
var tf_result=Cesium.Matrix4.IDENTITY;

function createPoint(id,p){
    viewer.entities.add({
    name : id,
    position : p,
    point : {
    pixelSize : 5,
    color : Cesium.Color.RED,
    outlineColor : Cesium.Color.WHITE,
    outlineWidth : 2
    }
	});
}
//加载json数据
var promise = Cesium.GeoJsonDataSource.load('China.json');
promise.then(function(dataSource) {
    viewer.dataSources.add(dataSource);

    //Get the array of entities
    var entities = dataSource.entities.values;
    var p_3d=[];
    //计算最小包围矩形
    for (var i = 0; i < entities.length; i++) {
        var entity = entities[i];
        // Generate Polygon position
        var polyPositions = entity.polygon.hierarchy.getValue(Cesium.JulianDate.now()).positions;//获取当前时间的一个位置消息
	    for(var j=0;j<polyPositions.length;j++){
		    p_3d.push(polyPositions[j]);
		}
	}
    var rec=Cesium.Rectangle.fromCartesianArray(p_3d);
		
    //计算转换矩阵
	var width=Cesium.Math.toDegrees(rec.width);
	var height=Cesium.Math.toDegrees(rec.height);
    var s_factor=(width/tf_a)<=(height/tf_b)?width/tf_a:height/tf_b;
    tf_result = Cesium.Matrix4.fromTranslationQuaternionRotationScale(
		new Cesium.Cartesian3(104.0,28.0,0.0),// translation //与加载的json对象一致。
        Cesium.Quaternion.IDENTITY,           // rotation
        new Cesium.Cartesian3(s_factor, s_factor, s_factor) // scale
		);
	
}).otherwise(function(error){
    //Display any errrors encountered while loading.
    window.alert(error);
});    
	
function updateStats(memuse) { 
        viewer.entities.removeAll();
	    var i;
        for (i in memuse.tracks) {
		    if(memuse.tracks[i].x>=-tf_a/2.0&&memuse.tracks[i].x<=tf_a/2.0&&memuse.tracks[i].y>=-tf_b/2.0&&memuse.tracks[i].y<=tf_b/2.0)
		    {
			    var x=memuse.tracks[i]["x"];
		        var y=memuse.tracks[i]["y"];
		        var track_p=new Cesium.Cartesian3(x,y,0.0);
		        var c_point=Cesium.Matrix4.multiplyByPoint(tf_result, track_p, new Cesium.Cartesian3());
		        var f_point=Cesium.Cartesian3.fromDegrees(c_point.x,c_point.y);
		        createPoint(memuse.tracks[i]["id"].toString(), f_point);
			}
        }
    }
    
    var ws = new WebSocket('ws://' + '192.168.1.62' + ':3030');
    ws.onopen = function()
            {
                alert("open WebSocket on server");
            };

    ws.onmessage = function (evt)
            {
               updateStats(JSON.parse(evt.data));
            };

    ws.onclose = function()
            {
                // websocket is closed.
                alert("Connection is closed...");
            };


//Sandcastle_End
    Sandcastle.finishedLoading();
}
if (typeof Cesium !== "undefined") {
    startup(Cesium);
} else if (typeof require === "function") {
    require(["Cesium"], startup);
}