angular.module('app.services', ['ngResource','LocalStorageModule'])

.factory('BlankFactory', [function(){

}])

.service('BlankService', [function($http){
    
}])
.factory('ProductList', function($resource) {
    var hostUrl = 'http://staging12.getpriceapp.com';
    
    return $resource(hostUrl + '/item/list/'); // Note the full endpoint address
})
.factory('Product',function($resource) {
        var hostUrl = 'http://staging12.getpriceapp.com';
    
    return $resource(hostUrl + '/item-details/:id/'); // Note the full endpoint address

})
.factory('Favorites',function(localStorageService) {
    if(!localStorageService.get('favs'))
        localStorageService.set('favs',[]);
   return {
        get: function() {
            return localStorageService.get('favs')
        },
        add: function(item) { 
            console.log('added item!');
           var favs = localStorageService.get('favs');
           favs.push(item);
           localStorageService.set('favs',favs);
        },
        delete: function(item) {
            var favs = localStorageService.get('favs');
            var index = favs.indexOf(item);
            favs.splice(index, 1);
            localStorageService.set('favs',favs);
        },
        contains: function(item) {
            console.log('trying to get favorites!');
            var favs = localStorageService.get('favs');
            return favs.indexOf(item) != -1;
        }
       }
});