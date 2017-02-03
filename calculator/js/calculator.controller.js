// Create a module
angular.module('CalculatorApp', [])
    .controller('CalculatorController', CalculatorController);
    
    CalculatorController.$inject = [];

    function CalculatorController() {
        var vm = this;        
        // Here is an example of adding a variable to the scope.
        vm.title = 'AngularJS Calculator';
        vm.a = 10;
        vm.b = 5;
        vm.operator = '+';
        // Here is an example of adding a method to the scope.
        vm.result = function () {
            return calculate(vm.a, vm.b, vm.operator);
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
    } 
