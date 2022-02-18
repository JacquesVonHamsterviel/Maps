//地图初始化
var map = new BMap.Map("container");	//创建地图对象
var point = new BMap.Point(119.263324,33.358868);//创建地图中心点坐标对象
map.centerAndZoom(point, 5);		//设置初始化地图中心位置坐标和地图级别
map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
map.enableKeyboard(); //键盘放大
var scaleCtrl = new BMap.ScaleControl();  // 添加比例尺控件
map.addControl(scaleCtrl);
//右键菜单开始
var menu = new BMap.ContextMenu();
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
menu.addItem(new BMap.MenuItem(txtMenuItem[i].text, txtMenuItem[i].callback, 100));
}
map.addContextMenu(menu);
//右键菜单结束
// 覆盖区域图层测试
//map.addTileLayer(new BMap.PanoramaCoverageLayer());
var stCtrl = new BMap.PanoramaControl(); //构造全景控件
stCtrl.setOffset(new BMap.Size(20, 50));
map.addControl(stCtrl);//添加全景控件
//添加地图类型控件（地图/混合）
map.addControl(new BMap.MapTypeControl({
mapTypes:[
        BMAP_NORMAL_MAP,
        BMAP_HYBRID_MAP
    ]
}));  
//城市定位
map.enableInertialDragging();
map.enableContinuousZoom();
var size = new BMap.Size(10, 20);
map.addControl(new BMap.CityListControl({
       anchor: BMAP_ANCHOR_TOP_LEFT,
       offset: size,
}));
//标注信息json，已做出调整，改为单独的文件存储数据。
//循环取出对应数据  
for(let i = 0;i<str.jsondata.length;i++){
    var points = new BMap.Point(str.jsondata[i].x,str.jsondata[i].y);	//创建经纬度坐标对象
    var marker = new BMap.Marker(points);			//创建标记对象
    var t1 = new BMap.Icon("../static/img/types/单飞.png", new BMap.Size(18,20), {anchor: new BMap.Size(10, 20)});
    var t2 = new BMap.Icon("../static/img/types/小巷.png", new BMap.Size(18,20), {anchor: new BMap.Size(10, 20)});
    var t3 = new BMap.Icon("../static/img/types/按摩.png", new BMap.Size(18,20), {anchor: new BMap.Size(10, 20)});
    var t4 = new BMap.Icon("../static/img/types/洗浴.png", new BMap.Size(18,20), {anchor: new BMap.Size(10, 20)});
    var t5 = new BMap.Icon("../static/img/types/经纪.png", new BMap.Size(18,20), {anchor: new BMap.Size(10, 20)});
    var t6 = new BMap.Icon("../static/img/types/舞厅.png", new BMap.Size(18,20), {anchor: new BMap.Size(10, 20)});
    var t7 = new BMap.Icon("../static/img/types/足疗.png", new BMap.Size(18,20), {anchor: new BMap.Size(10, 20)});
    if (str.jsondata[i].type=="单飞")
    {
       var marker = new BMap.Marker(points, {icon: t1} );
    }
    if (str.jsondata[i].type=="小巷")
    {
       var marker = new BMap.Marker(points, {icon: t2} );
    }
    if (str.jsondata[i].type=="按摩")
    {
       var marker = new BMap.Marker(points, {icon: t3} );
    }
    if (str.jsondata[i].type=="洗浴")
    {
       var marker = new BMap.Marker(points, {icon: t4} );
    }
    if (str.jsondata[i].type=="经纪")
    {
       var marker = new BMap.Marker(points, {icon: t5} );
    }
    if (str.jsondata[i].type=="舞厅")
    {
       var marker = new BMap.Marker(points, {icon: t6} );
    }
    if (str.jsondata[i].type=="足疗")
    {
       var marker = new BMap.Marker(points, {icon: t7} );
        
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
    var points = new BMap.Point(data.x,data.y);
    var size = new	BMap.Size(0,-13);
    var opts = {
            width: 300,  // 信息窗口宽度 
            height: 200,  // 信息窗口高度 
            title: data.title, // 信息窗口标题 
            offset: size	//增加偏移量
        }
    //创建信息窗口对象
    var infoWindow = new BMap.InfoWindow(data.text, opts); 
    //对标注对象和信息窗口进行绑定	
    map.openInfoWindow(infoWindow, points);
}	