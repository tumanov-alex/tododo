var App = angular.module("App", ['LocalStorageModule']);
App.config(function (localStorageServiceProvider) {
    localStorageServiceProvider.setPrefix('tododo');
});

App.controller('AppCtrl', function ($scope, localStorageService) {
    localStorageServiceSupport($scope, localStorageService);

    $scope.newTask = function () {
        if($scope.tasks.length) {
            $scope.mainCheck = false;
        }
        if ($scope.text) {
            $scope.tasks.push({text: this.text, checked: false, display: true});
            $scope.text = '';
        }
        $scope.mainCheckState();
        $scope.saveLocally();
    };
    $scope.checkAll = function() {
        $scope.allChecksAreTrue();
        for(task in $scope.tasks) {
            $scope.tasks[task].checked = !$scope.allChecksAre;
        }
        $scope.isThereAnyTrueCheck();
        $scope.saveLocally();
    };
    $scope.isThereAnyTrueCheck = function() {
        for(check in $scope.tasks) {
            if($scope.tasks[check].checked) {
                $scope.noTrueChecks = false;
                return;
            }
        }
        $scope.noTrueChecks = true;
        $scope.saveLocally();
    };
    ($scope.mainCheckState = function() {
        for(check in $scope.tasks) {
            if(!$scope.tasks[check].checked){
                $scope.mainCheck = false;
                break;
            }
            else{
                $scope.mainCheck = true;
            }
        }
        $scope.isThereAnyTrueCheck();
        $scope.saveLocally();
    })();
    $scope.allChecksAreTrue = function() {
        for(task in $scope.tasks) {
            if(!$scope.tasks[task].checked) {
                $scope.allChecksAre = false;
                return;
            }
        }
        $scope.allChecksAre = true;
    };
    $scope.clearCompleted = function() {
        for(var task = 0, length = $scope.tasks.length; task < length; ++task) {
            if($scope.tasks[task].checked) {
                $scope.tasks.splice(task, 1);
                --task;
                --length;
            }
        }
        $scope.isThereAnyTrueCheck();
        $scope.saveLocally();
    };
    $scope.deleteItem = function(item) {
        for(task in $scope.tasks) {
            if($scope.tasks[task].$$hashKey == item.$$hashKey) {
                $scope.tasks.splice(task, 1);
                localStorageService.remove('tasks');
                $scope.isThereAnyTrueCheck();
                $scope.mainCheckState();
                $scope.saveLocally();
                return;
            }
        }
    };
    $scope.displayControl = function(flag) {
        for(task in $scope.tasks) {
            $scope.tasks[task].display = true;
            if($scope.tasks[task].checked != flag) {
                $scope.tasks[task].display = false;
            }
        }
    };
    $scope.showAll = function() {
        for(task in $scope.tasks) {
            $scope.tasks[task].display = true;
        }
    };
});