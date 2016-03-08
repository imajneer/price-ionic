angular.module('app.services', ['ngResource'])

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

});