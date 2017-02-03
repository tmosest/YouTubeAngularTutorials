// Notice the lack of [] b/c we already defined CalculatorApp in calculator.controller.js
angular.module('CalculatorApp')
    .controller('TodoController', TodoController);
    
    TodoController.$inject = [];

    function TodoController() {
        var vm = this;
        // variables
        vm.title = "Todo List";
        vm.count = 0;
        vm.todos = []; // empty array
        vm.task = {}; // empty object
        // methods
        vm.add = function () {
            vm.count++;
            vm.task = {
                id: vm.count,
                title: vm.taskTitle
            };
            vm.todos.push(vm.task);
        };
    }