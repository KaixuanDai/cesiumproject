function loadContinents()
{
   var datasource = view2D.dataSources.get(view2D.dataSources.length-1)
    view2D.dataSources.remove(datasource, true)
        
    
    var dataSource1 = new Cesium.GeoJsonDataSource();
    var promise= dataSource1.load('world.geojson');
    view2D.dataSources.add(dataSource1);
   // view2D.zoomTo(promise);
    //high=view3D.scene.camera.positionWC.z;
    high=18755994.75545965;
    //console.log('世界：'+view3D.scene.camera.positionWC.z);
    view3D.camera.flyTo({
      destination: Cesium.Rectangle.fromDegrees(-180.00, -90.00, 180.00, 90.00)
      });
    view2D.camera.flyTo({
      destination: Cesium.Rectangle.fromDegrees(-180.00, -90.00, 180.00, 90.00)
      });
}


function loadCountries()
{
    var datasource = view2D.dataSources.get(view2D.dataSources.length-1)
    view2D.dataSources.remove(datasource, true)
        
    
    var dataSource1 = new Cesium.GeoJsonDataSource();
    var promise= dataSource1.load('countries.geojson');
    view2D.dataSources.add(dataSource1);
    view2D.zoomTo(promise);
    view3D.zoomTo(promise);


    
}

function loadChina()
{
    var datasource = view2D.dataSources.get(view2D.dataSources.length-1)
    view2D.dataSources.remove(datasource, true)
        
    
    var dataSource1 = new Cesium.GeoJsonDataSource();
    var promise= dataSource1.load('china.json');
    view2D.dataSources.add(dataSource1);
    //view2D.zoomTo(promise);

     //high=view3D.scene.camera.positionWC.z;
     high=8143239;
     //console.log('中国：'+view3D.scene.camera.positionWC.z);
   view3D.camera.flyTo({
     destination: Cesium.Rectangle.fromDegrees(74.18, 18.31, 128.05, 55.61)
   });

   view2D.camera.flyTo({
     destination: Cesium.Rectangle.fromDegrees(74.18, 18.31, 128.05, 55.61)
   });
    
}
function loadSector()
{
    var datasource = view2D.dataSources.get(view2D.dataSources.length-1)
    view2D.dataSources.remove(datasource, true)
        
    
    var dataSource1 = new Cesium.GeoJsonDataSource();
    var promise= dataSource1.load('nongda.geojson');
    view2D.dataSources.add(dataSource1);

    view2D.zoomTo(promise);

    high=1500;
    //high=view3D.scene.camera.positionWC.z;
    //console.log('农大：'+view3D.scene.camera.positionWC.z);
    view3D.camera.flyTo({
      destination: Cesium.Rectangle.fromDegrees(116.35, 40.00, 116.36, 40.01)
    });
    view2D.camera.flyTo({
    destination: Cesium.Rectangle.fromDegrees(116.35, 40.00, 116.36, 40.01)
    });

    
}


