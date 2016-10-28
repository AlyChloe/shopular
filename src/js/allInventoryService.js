angular.module('app').factory('inventoryItems', allInventoryService);

function allInventoryService($http) {
  function fetchInventory() {
    return $http({
      method: 'GET',
      url: 'src/js/data/inventory.json'
    });
  };

  return { //users can't access fetch teams only the get which will not let them break code
    get: fetchInventory
  };
}
