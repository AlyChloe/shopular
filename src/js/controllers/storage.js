angular.module('app')
.service('storageService', function(localStorageService) {

  this.storeAllItems = function(allStoredItems) {
    localStorageService.set('item', allStoredItems);
  }

  this.getAllItems = function() {
    return localStorageService.get('item') || [];
  }
});
