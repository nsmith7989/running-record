angular.module( 'PassagesCtrl', [] )
    .controller( 'PassagesController', function($scope, Passages) {
        Passages.getAll().success( function(resp) {
            $scope.passages = resp;
        } )
    } ).
    controller( 'PassagesDetailController', function($scope, Passages, $routeParams) {
        Passages.getById($routeParams.passageId ).success(function(resp) {
            $scope.passage = resp;
        })
    } );