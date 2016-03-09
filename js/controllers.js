angular.module('app.controllers', ['app.services','angular-stripe','ngLodash','truncate'])
  
.controller('feedCtrl', function($scope,ProductList,Product,$rootScope,$stateParams,$location,$state,$ionicModal,$q,$filter,Favorites,lodash) {
    $rootScope.products = [];
    var productsQuery = ProductList.query(function(data) {
        $rootScope.products = lodash.map(data[0].products,function(product) {
            product.isFavorite = Favorites.contains(product);
            return product;
            });
        
        console.log($rootScope.products);
    });
    $scope.openProduct = function(product) {
        Product.get({id: product.id},function(data) {
            console.log('should have gotten data')
        console.log(data);
        $scope.product = data;
        $scope.modal.show();
        });
        
    };
    
    $scope.favs = Favorites.get();
    
    $scope.favoriteStyle = function(item) {
        return Favorites.contains(item) ? "assertive" : "dark";
    };
    $scope.toggleFav = function(product) {
        if(Favorites.contains(product.fields)) {
            Favorites.delete(product.fields);
            product.isFavorite = false;
        } else {
            Favorites.add(product.fields);
            product.isFavorite = true;
        }
        $scope.favs = Favorites.get();
    };

    $ionicModal.fromTemplateUrl('templates/productDetails.html', function($ionicModal) {
        $scope.modal = $ionicModal;
    }, {
        // Use our scope for the scope of the modal to keep it simple
        scope: $scope,
        // The animation we want to use for the modal entrance
        animation: 'slide-in-up'
    }); 

})
   
.controller('favoritesCtrl', function($scope,Favorites) {
    console.log('loaded favs!');
    $scope.products = [];
    $scope.products = Favorites.get();
    console.log($scope.products);
})
   
.controller('accountCtrl', function($scope) {
    
})
    
.controller('itemViewCtrl',['$stateParams',function($scope,$stateParams,stripe) {
    $scope.card = {
        number: '4242424242424242',
        cvc: '123',
        exp_month: '12',
        exp_year: '19'
    };
    
    $scope.buyNow = function() {
        console.log('buying now!');
    }
    console.log('loaded item view controller');
    
}]);