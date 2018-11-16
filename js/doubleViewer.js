function create2D() {
    "use strict"
    var clockViewModel = new Cesium.ClockViewModel();

    var options2D = {
        fullscreenButton: false,
        sceneModePicker: false,
        clockViewModel: clockViewModel,
        sceneMode: Cesium.SceneMode.SCENE2D,
        animation: false, //是否显示动画控件(左下方那个)
        baseLayerPicker: true, //是否显示图层选择控件
        geocoder: false, //是否显示地名查找控件
        timeline: false, //是否显示时间线控件
        sceneModePicker: false, //是否显示投影方式控件
        navigationHelpButton: false, //是否显示帮助信息控件
        infoBox: false, //是否显示点击要素之后显示的信息


    };
    var view2D = new Cesium.Viewer('view2D', options2D);
    view2D._cesiumWidget._creditContainer.style.display = "none"; //	去除版权信息
    return view2D;

}

function create3D() {
    var clockViewModel = new Cesium.ClockViewModel();

    var options3D = {
        homeButton: false,
        fullscreenButton: false,
        sceneModePicker: false,
        clockViewModel: clockViewModel,
        infoBox: false,
        geocoder: false,
        animation: false, //是否显示动画控件(左下方那个)
        baseLayerPicker: true, //是否显示图层选择控件
        geocoder: false, //是否显示地名查找控件
        timeline: false, //是否显示时间线控件
        sceneModePicker: false, //是否显示投影方式控件
        navigationHelpButton: false, //是否显示帮助信息控件
        infoBox: true, //是否显示点击要素之后显示的信息
        animation: false,

    };

    var view3D = new Cesium.Viewer('view3D', options3D);
    view3D._cesiumWidget._creditContainer.style.display = "none";




    return view3D;

    // 全球影像中文注记服务

}





function doubleViewer(view2D, view3D) {
    "use strict";
    var worldPosition;
    var distance;

    var high = 10000000; //初始3D视角高度

    //2D和3D视图同步函数
    function sync3DView() {

        //中心是3D摄像头的焦点
        var viewCenter = new Cesium.Cartesian2(Math.floor(view2D.canvas.clientWidth / 2), Math.floor(view2D.canvas.clientHeight / 2));
        // Given the pixel in the center, get the world position
        var newWorldPosition = view2D.scene.camera.pickEllipsoid(viewCenter);
        if (Cesium.defined(newWorldPosition)) {
            // Guard against the case where the center of the screen
            // does not fall on a position on the globe
            worldPosition = newWorldPosition;
        }
        // Get the distance between the world position of the point the camera is focusing on, and the camera's world position
        distance = Cesium.Cartesian3.distance(worldPosition, view3D.scene.camera.positionWC);
        // Tell the 2D camera to look at the point of focus. The distance controls how zoomed in the 2D view is
        // (try replacing `distance` in the line below with `1e7`. The view will still sync, but will have a constant zoom)t
        view3D.scene.camera.lookAt(worldPosition, new Cesium.Cartesian3(0.0, 0.0, high));

    }

    // Apply our sync function every time the 3D camera view changes
    view2D.camera.changed.addEventListener(sync3DView);
    // By default, the `camera.changed` event will trigger when the camera has changed by 50%
    // To make it more sensitive, we can bring down this sensitivity
    view2D.camera.percentageChanged = 0.01;

    //  function xxx(){console.log('农大：'+view3D.scene.camera.positionWC.z);}
    //  view3D.camera.changed.addEventListener(xxx);

    // Since the 2D view follows the 3D view, we disable any
    // camera movement on the 2D view
    //  view3D.scene.screenSpaceCameraController.enableRotate = false;
    //  view3D.scene.screenSpaceCameraController.enableTranslate = false;
    //  view3D.scene.screenSpaceCameraController.enableZoom = false;
    //  view3D.scene.screenSpaceCameraController.enableTilt = false;
    //  view3D.scene.screenSpaceCameraController.enableLook = false;
    //Sandcastle_End
    Sandcastle.finishedLoading();
}