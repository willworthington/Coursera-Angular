(function() {
  'use strict';

  angular.module('ShoppingListCheckOffApp', [])
  .controller('ToBuyController', ToBuyController)
  .controller('AlreadyBoughtController', AlreadyBoughtController)
  .provider('ShoppingListCheckOffService', ShoppingListCheckOffServiceProvider);
  // .config(Config);
  //
  // //Do we need the config?
  // Config.$inject = ['ShoppingListCheckOffService'];
  // function Config(ShoppingListProvider) {
  //   ShoppingListCheckOffService.defaults.maxItems = 5;
  // }

  ToBuyController.$inject = ['ShoppingListCheckOffService'];
  function ToBuyController(ShoppingListCheckOffService) {
    var list = this;

    list.items = ShoppingListCheckOffService.getItemsToBuy();

    list.itemName = "";
    list.itemQuantity = "";
    list.inputError = "";

    list.addItem = function() {
      try {
        ShoppingListCheckOffService.addItemToBuy(list.itemName, list.itemQuantity);
        list.itemName = "";
        list.itemQuantity = "";
      }
      catch(error) {
        list.inputError = error.message;
        console.log(error.message);
      }
    }

    list.buyItem = function(itemIndex) {
      console.log("Bought Item");
      var item = ShoppingListCheckOffService.removeItemToBuy(itemIndex);
      ShoppingListCheckOffService.addItemAlreadyBought(item);
    };

    list.removeItem = function(itemIndex) {
      ShoppingListCheckOffService.removeItemToBuy(itemIndex);
    };

  }


  AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
  function AlreadyBoughtController(ShoppingListCheckOffService) {
    var list = this;
    list.items = ShoppingListCheckOffService.getItemsAlreadyBought();
  }

  function ShoppingListCheckOffService() {
    var service = this;
    var itemsToBuy = [];
    var itemsAlreadyBought = [];

    service.addItemToBuy = function(itemName, quantity) {
      if (isNaN(parseInt(quantity, 10))) {
          throw new Error("Quantity must be a number.");
      }
      var item = {
        name: itemName,
        quantity: quantity
      };
      itemsToBuy.push(item);
    };

    service.removeItemToBuy = function(itemIndex) {
      return (itemsToBuy.splice(itemIndex, 1))[0];
    };

    service.addItemAlreadyBought = function(item) {
      itemsAlreadyBought.push(item);
    };

    service.getItemsToBuy = function() {
      console.log("Got items to buy");
      return itemsToBuy;
    };

    service.getItemsAlreadyBought = function() {
      return itemsAlreadyBought;
    };
  };


  function ShoppingListCheckOffServiceProvider() {
    var provider = this;

    provider.$get = function () {
      var shoppingListCheckOff = new ShoppingListCheckOffService();

      return shoppingListCheckOff;
    };
  }
})();
