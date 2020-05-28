(function() {
'use strict';
 
angular.module('A1App', [])
.controller('A1Controller', A1Controller);

A1Controller.$inject = [$scope, $filter];
function A1Controller($scope, $filter) {
    $scope.dishes = "";
    $scope.dishCount = 0;
    $scope.orderMessage = "";
    $scope.messageColor = "";
    
    $scope.checkDishCount = function() {
        var list = $scope.dishes.split(',');
        $scope.dishCount = list.length;
        var cnt = $scope.dishCount;
        if (cnt == 1) {
            if (list[0] == "") cnt = 0;
        }
        
        $scope.dishCount = cnt;
        
        if (cnt == 0) {
            //nothing entered
            $scope.orderMessage = "Please enter data first!";
            $scope.messageColor = "red";
        }
        else if (cnt > 3) {
            //too many
            $scope.orderMessage = "Too much!";
            $scope.messageColor = "green";
        }
        else {
            //we're good!
            $scope.orderMessage = "Enjoy!";
            $scope.messageColor = "green";
        }
    }
    
}


})();