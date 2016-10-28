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
;angular.module('app', ['LocalStorageModule'])
.controller('ShopInventory', function(inventoryItems, $q, storageService) { // $q is a promise q system
  var self = this;
  this.Color = "Color";
  this.moneySymbol = "$"
  this.orderByField = 'name';
  this.reverseSort = false;
  this.totalInventory;

  $q.when(inventoryItems.get()).then(function(response) {
    self.totalInventory = response.data;
  });

  this.showDiscount = function(price, discount) {
      var discountedPrice;
      var tax = (5.75 / 100) * price;
      if(discount) {
        discountedPrice = (price - discount) + tax;
        return discountedPrice.toFixed(2);
      } else {
        price = price + tax
        return price.toFixed(2);
      }
  }

  this.languageConverter = function() {
    this.Color = "Colour";
    this.moneySymbol = "£";
  }

});
