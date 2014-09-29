angular.module( 'StudentDetailCtrl', [] )
    .controller( 'StudentDetailController', function($scope, $routeParams, Students) {

        Students.getById( $routeParams.studentId ).success( function(resp) {
            $scope.details = resp;
        } );

    } );