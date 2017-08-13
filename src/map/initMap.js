/**
 * Created by xiaowei on 2017/8/9.
 */
import axios from 'axios';

axios.get('https://webapi.amap.com/maps?v=1.3&key=497e9a3a2fb3d7109aafd780a0807059')
  .then(function (response) {
    initMapObj(response);
  })
  .catch(function (error) {
    alert(error);
  });

export function initMapObj(res) {
  // 此处API返回的是一个纯HTML, 不过其实是一个可执行的JS匿名函数
// 动态插入script
  let scriptElem = document.createElement('script');
  scriptElem.innerHTML = res.data;
  document.body.appendChild(scriptElem);
// 添加之后就可以删除了, 有点类似jsonp。
  if (scriptElem.parentNode) scriptElem.parentNode.removeChild(scriptElem);
// 测试是否获得了AMap类
  if (typeof AMap !== 'object'){
    alert('无法获得高德地图API地图类');
    return null;

  }
  else {
    // console.log(AMap);
    console.log('欢迎使用高德地图API');
  }

  return AMap;
}