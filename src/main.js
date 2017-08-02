/**
 * Created by xiaowei on 2017/7/22.
 */
import data from './map/data.json';
// import SearchBar from './components/searchBar';
// import List from './components/list';
import MapInit from './map/mapService';

let originLocations = data.originLocations;

// SearchBar();
// List();
MapInit();

let ViewModel = function() {
  let vm = this;
  vm.searchVal = ko.observable('');
  vm.placeList = ko.observableArray([]);
  vm.filteredPlaces = ko.observableArray([]);

  for (let i = 0; i < originLocations.length; i++) {
    vm.placeList.push(originLocations[i]);
  }

  vm.filterPlaces = () => {
    if (!vm.searchVal()) return;
    let searchVal = vm.searchVal().trim().toLowerCase();
    
    vm.placeList.forEach(function (place) {
      if (place.name.toLowerCase().includes(searchVal)) {
      }
    });
  };

  AMap.plugin(['AMap.ToolBar'], () => {
    //设置地位标记为自定义标记
    let toolBar = new AMap.ToolBar();
    map.addControl(toolBar);
  });
};

ko.applyBindings(new ViewModel());