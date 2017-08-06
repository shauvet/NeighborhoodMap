/**
 * Created by xiaowei on 2017/7/23.
 */
import ko from 'knockout';
import data from './data.json';
import JSONP from 'jsonp';

let originLocations = data.originLocations;

let map = new AMap.Map('map', {
  resizeEnable: true,
  center: [120.135552, 30.239346],
  zoom: 14
});

//创建地图
let createMarker = (place) => {
  return new AMap.Marker({
    map: map,
    position: [place.lat, place.long],
    title: place.name,
    animation: 'AMAP_ANIMATION_DROP',
    visible: true
  });
};

//在指定位置打开信息窗体
let openInfo = (position, title, content) => {
  //构建信息窗体中显示的内容
  let info = [];
  info.push('<div style="max-height: 10em;"><p>' + title + '</p>');
  info.push('<div>' + content + '</div></div>');
  let infoWindow = new AMap.InfoWindow({
    content: info.join('<br/>'),  //使用默认信息窗体框样式，显示信息内容
    size: 200
  });
  infoWindow.open(map, position);
};

//点击标注点发起跨域请求
let clickHandle = (e) => {
  
  let position = [e.lnglat.lng, e.lnglat.lat];
  let name = e.target.G.title;
  
  JSONP(`https://zh.wikipedia.org/w/api.php?action=query&titles=${name}&format=json&prop=revisions&rvprop=content`, {}, callback);
  function callback(err, data) {
    if (!err) {
      let originData = data.query.pages, result;
      for (let key in originData) {
        if (originData.hasOwnProperty(key)) {
          if (key && !isNaN(key)) {
            result = key == -1 ? '暂无' + name + '的相关信息' : originData[key].revisions[0];
          }
        }
      }
      if (result) {
        let res = JSON.parse(JSON.stringify(result['*']));
        let content = '';
        let startIndex = res.indexOf('\'\'\'');
        
        if (startIndex < 0) {
          content = '暂无' + name + '的相关信息'
        } else {
          let endIndex = res.indexOf('==历史');
          content = res.slice(startIndex, endIndex);
        }
        
        openInfo(position, name, content);
      }
    } else {
      alert('维基百科请求失败，稍后重试！');
    }
  }
};

let markers = [];
for (let i = 0; i < originLocations.length; i++) {
  let marker = createMarker(originLocations[i]);
  AMap.event.addListener(marker, 'click', function (e) {
    marker.setAnimation('AMAP_ANIMATION_DROP');
    clickHandle(e);
  });
  markers.push(marker);
}

export {markers}