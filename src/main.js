/**
 * Created by xiaowei on 2017/7/22.
 */
import ko from 'knockout';
import data from './map/data.json';
import {map, markers} from './map/mapService';

let originLocations = data.originLocations;

let ViewModel = function() {
  let vm = this;
  vm.searchVal = ko.observable('');
  vm.placeList = ko.observableArray([]);
  vm.filteredPlaces = ko.observableArray([]);

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
  
  vm.selectOneHotel = function (hotel) {
    vm.searchVal(hotel.name);
    vm.filteredPlaces([]);
    vm.filteredPlaces.push(hotel);
    markers.forEach((marker) => {
      if (marker.Qi.title === hotel.name) {
        marker.show();
      } else {
        marker.hide();
      }
    });
  }
};

ko.applyBindings(new ViewModel());