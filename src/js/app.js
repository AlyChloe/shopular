angular.module('app', ['LocalStorageModule'])
.controller('ShopInventory', function(inventoryItems, $q, storageService) { // $q is a promise q system
  var self = this;
  this.Color = "Color";
  this.moneySymbol = "$"
  this.orderByField = 'name';
  this.reverseSort = false;
  this.totalInventory;
  this.allStoredItems = [];

  $q.when(inventoryItems.get()).then(function(response) {

    if(storageService.getAllItems() === null) {
      self.totalInventory = response.data;
      storageService.storeAllItems(self.totalInventory);
    } else {
      self.totalInventory = storageService.getAllItems()
    }

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

  this.newItem = function() {
    if(!this.discount) {
      this.discount = 0;
    }
    this.allStoredItems = storageService.getAllItems();

    this.allStoredItems.push({
      'name': this.name,
      'price': parseInt(this.price),
      'quantity': parseInt(this.quantity),
      'color': this.color,
      'discount': parseInt(this.discount)
    });
    // Clearing out form fields after submit
    this.name = null;
    this.price = null;
    this.quantity = null;
    this.color = null;
    this.discount = null;

    storageService.storeAllItems(this.allStoredItems);

    this.totalInventory = storageService.getAllItems();
  }

});
