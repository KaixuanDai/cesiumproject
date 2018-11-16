var tf_result = Cesium.Matrix4.IDENTITY;
var c_point = new Cesium.Cartesian3(0.0, 0.0, 0.0);
var tf_center = new Cesium.Cartesian3(0.0, 0.0, 0.0);
var tf_a = 4.0,
  tf_b = 4.0;

var test_m;
var test_m1;

function createPoint(id, p) {
  view2D.entities.add({
    name: id,
    position: p,
    point: {
      pixelSize: 5,
      color: Cesium.Color.RED,
      outlineColor: Cesium.Color.WHITE,
      outlineWidth: 2,
    }
  });
}

function getWidth(msg) {
  tf_a = tf_b = msg.header.a;
}



function updateStats(memuse) {


  if (tf_a == 0) {
    getWidth(memuse);
  }

  view2D.entities.removeAll();
  var i;

  for (i in memuse.tracks) {
    if (memuse.tracks[i].x >= -tf_a / 2.0 && memuse.tracks[i].x <= tf_a / 2.0 && memuse.tracks[i].y >= -tf_b / 2.0 && memuse.tracks[i].y <= tf_b / 2.0) {
     
      var x = memuse.tracks[i]["x"];
      var y = memuse.tracks[i]["y"];
      var track_p = new Cesium.Cartesian3(-y, x, 0.0);
     
      //获取点的坐标
      c_point = Cesium.Matrix4.multiplyByPoint(tf_result, track_p, new Cesium.Cartesian3());

      var f_point = Cesium.Cartesian3.fromDegrees(c_point.x, c_point.y);


      createPoint(memuse.tracks[i]["id"].toString(), f_point);


      if ((memuse.tracks[i]["id"] != "") && (test_m != undefined)) {


        if (Math.abs(x - test_m.tracks[i]["x"] > 0.005) && Math.abs(y - test_m.tracks[i]["y"]) > 0.005) {
          judge(view2D, c_point);
        }


      }

      test_m = memuse;

    }
  }

}
var tf_rec;

function computetfMatrix(src) {
  //加载json数据
  var promise = Cesium.GeoJsonDataSource.load(src);
  promise.then(function (dataSource) {
    view2D.dataSources.add(dataSource);

    //Get the array of entities
    var entities = dataSource.entities.values;
    var p_3d = [];

    //计算最小包围矩形
    for (var i = 0; i < entities.length; i++) {
      var entity = entities[i];
      // Generate Polygon position
      var polyPositions = entity.polygon.hierarchy.getValue(Cesium.JulianDate.now()).positions; //获取当前时间的一个位置消息
      for (var j = 0; j < polyPositions.length; j++) {
        p_3d.push(polyPositions[j]);
      }
    }
    tf_rec = Cesium.Rectangle.fromCartesianArray(p_3d);

    //计算矩形中心点
    var tf_width = Cesium.Math.toDegrees(tf_rec.width);
    var tf_height = Cesium.Math.toDegrees(tf_rec.height);

    var tf_w = Cesium.Math.toDegrees(tf_rec.west);
    var tf_n = Cesium.Math.toDegrees(tf_rec.south);

    tf_center = new Cesium.Cartesian3(tf_w + tf_width / 2.0, tf_n + tf_height / 2.0, 0.0);
    
    
    //window.alert(tf_center+"**"+tf_a);

    //计算转换矩阵
    var s_factor = (tf_width / tf_a) <= (tf_height / tf_b) ? tf_width / tf_a : tf_height / tf_b;
   
    tf_result = Cesium.Matrix4.fromTranslationQuaternionRotationScale(
      tf_center, // translation //与加载的json对象一致。
      Cesium.Quaternion.IDENTITY, // rotation
      new Cesium.Cartesian3(s_factor, s_factor, s_factor) // scale
    );
  }).otherwise(function (error) {
    //Display any errrors encountered while loading.
    window.alert(error);
  });
}




function loadContinents() {
  var datasource = view2D.dataSources.get(view2D.dataSources.length - 1)
  view2D.dataSources.remove(datasource, true)
  computetfMatrix('world.geojson');
  high = 18755994.75545965;

  view3D.camera.flyTo({
    destination: Cesium.Cartesian3.fromDegrees(-155.00, 15.00, 50000000.0)
  });

  view2D.camera.flyTo({
    destination: Cesium.Cartesian3.fromDegrees(-155.00, 15.00, 50000000.0)
  });

}


function loadCountries() {
  var datasource = view2D.dataSources.get(view2D.dataSources.length - 1)
  view2D.dataSources.remove(datasource, true)

  computetfMatrix('countries.geojson');
  view3D.camera.flyTo({
    destination: Cesium.Cartesian3.fromDegrees(10.00, 20.00, 50000000.0)
  });

  view2D.camera.flyTo({
    destination: Cesium.Cartesian3.fromDegrees(10.00, 20.00, 50000000.0)
  });
}

function loadChina() {
  var datasource = view2D.dataSources.get(view2D.dataSources.length - 1)
  view2D.dataSources.remove(datasource, true)

  computetfMatrix('china.json');
  high = 8143239;

  view3D.camera.flyTo({
    destination: Cesium.Rectangle.fromDegrees(74.18, 18.31, 128.05, 55.61)
  });

  view2D.camera.flyTo({
    destination: Cesium.Rectangle.fromDegrees(74.18, 18.31, 128.05, 55.61)
  });


}

function loadSector() {
  var datasource = view2D.dataSources.get(view2D.dataSources.length - 1)
  view2D.dataSources.remove(datasource, true)
  computetfMatrix('nongda.geojson');
  high = 1500;
  view3D.camera.flyTo({
    destination: Cesium.Rectangle.fromDegrees(116.35, 40.00, 116.36, 40.01)
  });
  view2D.camera.flyTo({
    destination: Cesium.Rectangle.fromDegrees(116.35, 40.00, 116.36, 40.01)
  });


}