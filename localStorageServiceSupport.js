function localStorageServiceSupport($scope, localStorageService) {
    if(localStorageService.isSupported) {
        if(localStorageService.get('tasks') === null) {
            $scope.tasks = [];
            localStorageService.set('tasks', []);
        }
        else{
            $scope.tasks = localStorageService.get('tasks');
        }
        if(localStorageService.get('noTrueChecks') === null) {
            $scope.noTrueChecks = true;
            localStorageService.set('noTrueChecks', true);
        }
        else{
            $scope.noTrueChecks = localStorageService.get('noTrueChecks');
        }
        $scope.saveLocally = function() {
            localStorageService.set('noTrueChecks', $scope.noTrueChecks);
            return localStorageService.set('tasks', $scope.tasks);
        };
    }else{
        $scope.tasks = [];
    }
}
