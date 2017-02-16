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
    /** 
     * Method to add items from our task list 
     */
    vm.add = function () {
        vm.count++;
        vm.task = {
            id: vm.count,
            title: vm.taskTitle,
            checked: false,
            important: false
        };
        vm.todos.push(vm.task);
        // Reset the taskTitle:
        vm.taskTitle = null;
    };
    /** 		
    * Method to delete items from our task list 		
    */
    vm.delete = function (id) {
        if (id > 0) {
            index = -1;
            for (var i = 0; i < vm.todos.length; i++) {
                if (vm.todos[i].id == id) {
                    index = i;
                    break;
                }
            }
            if (index != -1) {
                vm.todos.splice(index, 1);
                vm.count--;
            }
        }
    };
}