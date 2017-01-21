// Create a module
angular.module('CalculatorApp', [])
    // This is a bad way to declare a controller b/c it doesn't respect minification.
    .controller('CalculatorController', function ($scope) {
        // $scope is the old way of defining variables and methods on the controller.
        
        // Here is an example of adding a variable to the scope.
        $scope.title = 'AngularJS Calculator';
        $scope.a = 10;
        $scope.b = 5;
        $scope.operator = '+';
        // Here is an example of adding a method to the scope.
        $scope.result = function () {
            return calculate($scope.a, $scope.b, $scope.operator);
        };
        // Private functions
        function calculate(a, b, operator)
        {
            if (operator == '+') {
                return a + b;
            }
            if (operator == '-') {
                return a - b;
            }
            if (operator == '*') {
                return a * b;
            }
            if (operator == '/') {
                return a / b;
            }
            if (operator == '%') {
                return a % b;
            }
            return a + b;
        }
    });