(function() {
    'use strict';

    angular
        .module('app.medicine')
        .run(appRun);

    appRun.$inject = ['routerHelper'];
    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'listMedicine',
                config: {
                    url: '/medicine',
                    templateUrl: 'app/medicine/views/list.html',
                    controller: 'MedicineController',
                    controllerAs: 'vm',
                    title: 'List Medicines',
                    settings: {
                        nav: 3,
                        content: '<i class="fa fa-folder-open"></i> Medicines'
                    }
                }
            },
            {
                state: 'createMedicine',
                config: {
                    url: '/medicine/create',
                    templateUrl: 'app/medicine/views/create.html',
                    controller: 'MedicineController',
                    controllerAs: 'vm',
                    title: 'Create Medicine'
                }
            },
            {
                state: 'viewMedicine',
                config: {
                    url: '/medicine/:medicineId',
                    templateUrl: 'app/medicine/views/view.html',
                    controller: 'MedicineController',
                    controllerAs: 'vm',
                    title: 'View Medicine'
                }
            },
            {
                state: 'editMedicine',
                config: {
                    url: '/medicine/:medicineId/edit',
                    templateUrl: 'app/medicine/views/edit.html',
                    controller: 'MedicineController',
                    controllerAs: 'vm',
                    title: 'Edit Medicine'
                }
            }
        ];
    }
})();
