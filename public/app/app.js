var runningRecordApp = angular.module( 'RunningRecord', [
    'ngRoute',
    'StudentCtrl',
    'StudentSrvc',
    'StudentDetailCtrl',
    'PassageSrvc',
    'PassagesCtrl'
] )
    .config( function($routeProvider) {
        $routeProvider
            .when( '/', {
                templateUrl: 'app/views/student-list.html'
            } )
            .when('/student/:studentId', {
                templateUrl: 'app/views/student-detail.html'
            })
            .when('/passages', {
                templateUrl: 'app/views/passage-list.html'
            })
            .when('/passages/:passageId', {
                templateUrl: 'app/views/passage-detail.html'
            })
    } );