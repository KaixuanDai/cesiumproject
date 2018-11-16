function video(view3D, c_point) {
    "use strict";
    var videoElement = document.getElementById('trailer');
    view3D.entities.removeAll();

    var sphere = view3D.entities.add({

        position: Cesium.Cartesian3.fromDegrees(87.68, 43.77, 1000),

        rectangle: {
            coordinates: Cesium.Rectangle.fromDegrees(50.0, 20.0, 120.0, 50.0),
            height: 100000.0,
            outline: false, // height must be set for outline to display
            outlineColor: Cesium.Color.BLACK,
            material: videoElement,
            Alpha: 0.1
        }
    });
    view3D.zoomTo(sphere)
}