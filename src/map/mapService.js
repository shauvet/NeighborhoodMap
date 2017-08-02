/**
 * Created by xiaowei on 2017/7/23.
 */
import data from './data.json';

let originLocations = data.originLocations;

export default function () {
  let map = new AMap.Map('map', {
    resizeEnable: true,
    center: [120.079071, 30.155238],
    zoom: 15
  });

  let initMap = () => {
    let createMarker = (place) => {
      new AMap.Marker({
        map: map,
        position: [place.lat, place.long],
        title: place.name,
        animation: 'AMAP_ANIMATION_DROP'
        // content: '<div>' + place.name + '</div>'
      });
    };

    for (let i = 0; i < originLocations.length; i++) {
      createMarker(originLocations[i]);
    }
  };

  initMap();
}