/**
 * Created by xiaowei on 2017/7/22.
 */
import ko from 'knockout';
import data from './map/data.json';
import {markers} from './map/mapService';

let originLocations = data.originLocations;

let ViewModel = function() {
  let vm = this;
  vm.searchVal = ko.observable('');
  vm.placeList = ko.observableArray([]);
  vm.filteredPlaces = ko.observableArray([]);

  //过滤景点和标注点
  vm.filterPlaces = ko.computed(function() {
    if (vm.searchVal() === '') {
      vm.filteredPlaces([]);
      for (let i = 0; i < originLocations.length; i++) {
        vm.filteredPlaces.push(originLocations[i]);
      }
      markers.forEach((marker) => {
        marker.show();
      });
      return;
    }
    let searchVal = vm.searchVal().trim().toLowerCase();
    vm.filteredPlaces([]);

    originLocations.forEach((place) => {
      console.log(place.name.indexOf(searchVal));
      if (place.name.indexOf(searchVal) >= 0) {
        vm.filteredPlaces.push(place);
      }
    });
    
    markers.forEach((marker) => {
      if (marker.Qi.title.indexOf(searchVal) >= 0) {
        marker.show();
      } else {
        marker.hide();
      }
    });
  });
  
  //单击选择某个景点
  vm.selectOnePlace = function (place) {
    vm.searchVal(place.name);
    vm.filteredPlaces([]);
    vm.filteredPlaces.push(place);
    markers.forEach((marker) => {
      if (marker.Qi.title === place.name) {
        marker.show();
      } else {
        marker.hide();
      }
    });
  }
};

ko.applyBindings(new ViewModel());