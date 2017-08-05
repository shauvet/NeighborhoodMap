/**
 * Created by xiaowei on 2017/7/23.
 */
import data from './data.json';

let originLocations = data.originLocations;

let map = new AMap.Map('map', {
  resizeEnable: true,
  center: [120.079071, 30.153238],
  zoom: 15
});

let createMarker = (place) => {
  return new AMap.Marker({
    map: map,
    position: [place.lat, place.long],
    title: place.name,
    animation: 'AMAP_ANIMATION_DROP',
    visible: true
  });
};

let markers = [];
for (let i = 0; i < originLocations.length; i++) {
  markers.push(createMarker(originLocations[i]));
}

export {map, markers}