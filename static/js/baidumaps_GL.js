//地图初始化
var map = new BMapGL.Map("container");
//创建地图对象
var point = new BMapGL.Point(119.263324,33.358868);//创建地图中心点坐标对象
map.centerAndZoom(point, 5);		//设置初始化地图中心位置坐标和地图级别
map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
map.enableKeyboard(); //键盘放大

var scaleCtrl = new BMapGL.ScaleControl();  // 添加比例尺控件
map.addControl(scaleCtrl);
var zoomCtrl = new BMapGL.ZoomControl();  // 添加缩放控件
map.addControl(zoomCtrl);
var cityCtrl = new BMapGL.CityListControl();  // 添加城市列表控件
map.addControl(cityCtrl);
var navi3DCtrl = new BMapGL.NavigationControl3D({offset: new BMapGL.Size(8, 80)});  // 添加3D控件
map.addControl(navi3DCtrl);

//添加地图类型控件（地图/混合）
map.addControl(new BMapGL.MapTypeControl({
mapTypes:[
        BMAP_NORMAL_MAP,
        BMAP_HYBRID_MAP
    ]
}));  

// 创建定位控件
var locationControl = new BMapGL.LocationControl({
   // 控件的停靠位置（可选，默认左上角）
   anchor: BMAP_ANCHOR_TOP_LEFT,
   // 控件基于停靠位置的偏移量（可选）
   offset: new BMapGL.Size(16, 50)
});
// 将控件添加到地图上
map.addControl(locationControl);

// 添加定位事件
locationControl.addEventListener("locationSuccess", function(e){
        var address = '';
        address += e.addressComponent.province;
        address += e.addressComponent.city;
        address += e.addressComponent.district;
        address += e.addressComponent.street;
        address += e.addressComponent.streetNumber;
        alert("当前定位地址为：" + address);
    });
    locationControl.addEventListener("locationError",function(e){
        alert(e.message);
    });

//右键菜单开始
var menu = new BMapGL.ContextMenu();
var txtMenuItem = [
{
    text: '放大一级',
    callback: function () {
        map.zoomIn();
    }
}, {
    text: '缩小一级',
    callback: function () {
        map.zoomOut();
    }
}
];
for (var i = 0; i < txtMenuItem.length; i++) {
menu.addItem(new BMapGL.MenuItem(txtMenuItem[i].text, txtMenuItem[i].callback, 100));
}
map.addContextMenu(menu);

map.enableInertialDragging();
map.enableContinuousZoom();
var size = new BMapGL.Size(10, 20);

//标注信息json，已做出调整，改为单独的文件存储数据。
//循环取出对应数据  
for(let i = 0;i<str.jsondata.length;i++){
    var points = new BMapGL.Point(str.jsondata[i].x,str.jsondata[i].y);	//创建经纬度坐标对象
    var marker = new BMapGL.Marker(points);			//创建标记对象
    var t1 = new BMapGL.Icon("../static/img/types/单飞.png", new BMapGL.Size(18,20), {anchor: new BMapGL.Size(10, 20)});
    var t2 = new BMapGL.Icon("../static/img/types/小巷.png", new BMapGL.Size(18,20), {anchor: new BMapGL.Size(10, 20)});
    var t3 = new BMapGL.Icon("../static/img/types/按摩.png", new BMapGL.Size(18,20), {anchor: new BMapGL.Size(10, 20)});
    var t4 = new BMapGL.Icon("../static/img/types/洗浴.png", new BMapGL.Size(18,20), {anchor: new BMapGL.Size(10, 20)});
    var t5 = new BMapGL.Icon("../static/img/types/经纪.png", new BMapGL.Size(18,20), {anchor: new BMapGL.Size(10, 20)});
    var t6 = new BMapGL.Icon("../static/img/types/舞厅.png", new BMapGL.Size(18,20), {anchor: new BMapGL.Size(10, 20)});
    var t7 = new BMapGL.Icon("../static/img/types/足疗.png", new BMapGL.Size(18,20), {anchor: new BMapGL.Size(10, 20)});
    if (str.jsondata[i].type=="单飞")
    {
       var marker = new BMapGL.Marker(points, {icon: t1} );
    }
    if (str.jsondata[i].type=="小巷")
    {
       var marker = new BMapGL.Marker(points, {icon: t2} );
    }
    if (str.jsondata[i].type=="按摩")
    {
       var marker = new BMapGL.Marker(points, {icon: t3} );
    }
    if (str.jsondata[i].type=="洗浴")
    {
       var marker = new BMapGL.Marker(points, {icon: t4} );
    }
    if (str.jsondata[i].type=="经纪")
    {
       var marker = new BMapGL.Marker(points, {icon: t5} );
    }
    if (str.jsondata[i].type=="舞厅")
    {
       var marker = new BMapGL.Marker(points, {icon: t6} );
    }
    if (str.jsondata[i].type=="足疗")
    {
       var marker = new BMapGL.Marker(points, {icon: t7} );
        
    }
    map.addOverlay(marker);//标记地图
    //添加标记点击事件	
    marker.addEventListener("click",function(e){
        addMarker(str.jsondata[i]);
    });
}
// 编写自定义函数,绑定信息窗口	
function addMarker(data){
    //重新创建经纬度坐标对象，防止覆盖
    var points = new BMapGL.Point(data.x,data.y);
    var size = new	BMapGL.Size(0,-13);
    var opts = {
            width: 300,  // 信息窗口宽度 
            height: 200,  // 信息窗口高度 
            title: data.title, // 信息窗口标题 
            offset: size	//增加偏移量
        }
    //创建信息窗口对象
    var infoWindow = new BMapGL.InfoWindow(data.text, opts); 
    //对标注对象和信息窗口进行绑定	
    map.openInfoWindow(infoWindow, points);
}	