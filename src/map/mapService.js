/**
 * Created by xiaowei on 2017/7/23.
 */
export default function () {
  let map = new AMap.Map('map', {
    resizeEnable: true,
    zoom: 11
  });

  //地图中添加地图操作ToolBar插件
  map.plugin(['AMap.ToolBar'], function () {
    //设置地位标记为自定义标记
    let toolBar = new AMap.ToolBar();
    map.addControl(toolBar);
  });

  AMap.service(["AMap.PlaceSearch"], function () {
    let placeSearch = new AMap.PlaceSearch({ //构造地点查询类
      pageSize: 5,
      pageIndex: 1,
      city: "0571"//城市
    });
    //关键字查询
    placeSearch.search('西湖', function (status, result) {
      let searchResults = [], markers = [];
      if (status === 'complete') {
        searchResults = result.poiList.pois;
      }
      if (searchResults.length) {
        for (let i = 0; i < searchResults.length; i++) {
          let addr = searchResults[i];
          let marker = new AMap.Marker({
            position: addr.location,
            title: addr.name,
            map: map
          });
        }
      }
    });
  });
}