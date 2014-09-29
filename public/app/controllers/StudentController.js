var students = angular.module( 'StudentCtrl', [] );

students.controller( 'StudentController', function($scope, Students) {

    //get all students
    Students.get().success(function(resp) {
        $scope.students = resp;
    });

} );