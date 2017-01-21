// Create a module
angular.module('CalculatorApp', [])
    // This is a bad way to declare a controller b/c it doesn't respect minification.
    .controller('CalculatorController', function ($scope) {
        // $scope is the old way of defining variables and methods on the controller.
        
        // Here is an example of adding a variable to the scope.
        $scope.title = 'AngularJS Calculator';
        
        // Here is an example of adding a method to the scope.
        $scope.result = function () {
            if ($scope.operator == '+') {
                return $scope.a + $scope.b;
            }
            if ($scope.operator == '-') {
                return $scope.a - $scope.b;
            }
            if ($scope.operator == '*') {
                return $scope.a * $scope.b;
            }
            if ($scope.operator == '/') {
                return $scope.a / $scope.b;
            }
            if ($scope.operator == '%') {
                return $scope.a % $scope.b;
            }
        };
    });