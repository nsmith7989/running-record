angular.module( 'PassageSrvc', [] )
    .factory( 'Passages', function($http) {
        return {
            getAll: function() {
                return $http( {
                    method: 'GET',
                    url: 'passages'
                } );
            },
            getById: function(id) {
                return $http( {
                    method: 'GET',
                    url: 'passages/' + id
                } )
            }
        }
    } );