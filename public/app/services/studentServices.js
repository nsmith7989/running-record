var students = angular.module( 'StudentSrvc', [] );

students.factory( 'Students', function($http) {
    return {
        get: function() {
            var students = $http( { method: 'Get', url: 'students' } );
            return students;
        },

        getById: function(id) {
            return $http({method: 'GET', url: 'students/' + id });
        }
    }
} );