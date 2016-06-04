(function () {
    'use strict';

    angular
        .module('app.medicine')
        .controller('MedicineController', MedicineController);

    MedicineController.$inject = ['logger',
        '$stateParams',
        '$location',
        'Medicine',
        'TableSettings',
        'MedicineForm'];
    /* @ngInject */
    function MedicineController(logger,
        $stateParams,
        $location,
        Medicine,
        TableSettings,
        MedicineForm) {

        var vm = this;

        vm.tableParams = TableSettings.getParams(Medicine);
        vm.medicine = {};

        vm.setFormFields = function(disabled) {
            vm.formFields = MedicineForm.getFormFields(disabled);
        };

        vm.create = function() {
            // Create new Medicine object
            var medicine = new Medicine(vm.medicine);

            // Redirect after save
            medicine.$save(function(response) {
                logger.success('Medicine created');
                $location.path('medicine/' + response.id);
            }, function(errorResponse) {
                vm.error = errorResponse.data.summary;
            });
        };

        // Remove existing Medicine
        vm.remove = function(medicine) {

            if (medicine) {
                medicine = Medicine.get({medicineId:medicine.id}, function() {
                    medicine.$remove(function() {
                        logger.success('Medicine deleted');
                        vm.tableParams.reload();
                    });
                });
            } else {
                vm.medicine.$remove(function() {
                    logger.success('Medicine deleted');
                    $location.path('/medicine');
                });
            }

        };

        // Update existing Medicine
        vm.update = function() {
            var medicine = vm.medicine;

            medicine.$update(function() {
                logger.success('Medicine updated');
                $location.path('medicine/' + medicine.id);
            }, function(errorResponse) {
                vm.error = errorResponse.data.summary;
            });
        };

        vm.toViewMedicine = function() {
            vm.medicine = Medicine.get({medicineId: $stateParams.medicineId});
            vm.setFormFields(true);
        };

        vm.toEditMedicine = function() {
            vm.medicine = Medicine.get({medicineId: $stateParams.medicineId});
            vm.setFormFields(false);
        };

        activate();

        function activate() {
            //logger.info('Activated Medicine View');
        }
    }

})();
