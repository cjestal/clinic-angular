(function() {
    'use strict';

    angular
        .module('app.medicine')
        .factory('Medicine', Medicine);

    Medicine.$inject = ['$resource', 'API_BASE_URL'];
    /* @ngInject */
    function Medicine($resource, API_BASE_URL) {

        var params = {
            medicineId: '@id'
        };

        var actions = {
            update: {
                method: 'PUT'
            }
        };

        var API_URL = API_BASE_URL + '/medicine/:medicineId';

        return $resource(API_URL, params, actions);

    }

})();
