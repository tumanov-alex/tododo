var App = angular.module("App", ['LocalStorageModule']);
App.config(function (localStorageServiceProvider) {
    localStorageServiceProvider.setPrefix('tododo');
});

App.controller('AppCtrl', function ($scope, localStorageService) {
    if(localStorageService.isSupported) {
        $scope.tasks = localStorageService.get('tasks');
        $scope.noTrueChecks = localStorageService.get('noTrueChecks');
        if($scope.tasks.length == 0) {
            $scope.tasks = [];
        }
        if($scope.noTrueChecks == undefined) {
            $scope.noTrueChecks = true;
        }
        $scope.saveLocally = function() {
            localStorageService.set('noTrueChecks', $scope.noTrueChecks);
            return localStorageService.set('tasks', $scope.tasks);
        };
    }else{
        $scope.tasks = [];
    }

    $scope.mainCheck = false;
    $scope.newTask = function () {
        if($scope.tasks.length == 0) {
            $scope.mainCheck = false;
        }
        if ($scope.text) {
            $scope.tasks.push({text: this.text, checked: false, display: true});
            $scope.text = '';
        }
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
            if($scope.tasks[check].checked == true) {
                $scope.noTrueChecks = false;
                return;
            }
        }
        $scope.noTrueChecks = true;
        $scope.saveLocally();
    };
    $scope.allChecksAreTrue = function() {
        for(task in $scope.tasks) {
            if($scope.tasks[task].checked == false) {
                $scope.allChecksAre = false;
                return;
            }
        }
        $scope.allChecksAre = true;
    };
    $scope.mainCheckUndo = function() {
        if($scope.mainCheck) {
            $scope.mainCheck = false;
        }
        $scope.isThereAnyTrueCheck();
        $scope.saveLocally();
    };
    $scope.clearCompleted = function() {
        for(var task = 0; task < $scope.tasks.length; ++task) {
            if($scope.tasks[task].checked == true) {
                $scope.tasks.splice(task, 1);
                --task;
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