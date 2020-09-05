
var  uiController = (function(){
    var DomStrings = {
        inputType: ".add__type",
        inputDescription: ".add__description",
        inputValue: ".add__value",
        addBtn: ".add__btn",
    }
    return {
        getInput: function(){
            return {
                type: document.querySelector(DomStrings.inputType).value,
                description: document.querySelector(DomStrings.inputDescription).value,
                value: document.querySelector(DomStrings.inputValue).value,
            }
        },
        getDomStrings: function(){
            return DomStrings;
        }
    }
})();


// ================ END USER CONTROLLER ================


var  financeController = (function(){
    
        var inCome = function(id, description, value){
            this.id = id;
            this.description = description;
            this.value = value;
        }

        var Expense = function(id, description, value){
            this.id = id;
            this.description = description;
            this.value = value;
        }

        var i1 = new inCome(1, 'цалин', 200000);
        var i2 = new inCome(1, 'Сугалаа хожсон', 200000);

        var data = {
            allItems: {
                inc = [],
                exp = [],
            },
            totals: {
                inc = 0,
                exp = 0,
            }
        }
       
       // incomes.push(i1);
       // incomes.push(i2);
})();

// ================ END FINANCE CONTROLLER ================

var  appController = (function(uiController,financeController){

    var ctrlAddItem = function(){
       console.log(uiController.getInput());
       // 1. Оруулах өгөгдлийг дэлгэцээс олж авах
       // 2. Олж авсан өгөгдлүүдийн санхүүгийн контроллерт дамжуулж тэнд хадгална
       // 3. Олж авсан өгөгдлүүдийн вэб сайтын тохирох хэсэгт гаргана
       // 4. Төсвийг тооцоолно
       // 5. Эцсийн үлдэглийг тооцоог дэлгэцэнд харуулна
    };

    
    var setupEventListeners = function(){

        var DOM = uiController.getDomStrings();
        document.querySelector(DOM.addBtn).addEventListener("click", function(){
            ctrlAddItem();
        });
    
        document.querySelector(DOM.addBtn).addEventListener("keypress", function(event){   
           // 
           if(event.keyCode === 13){
            console.log(event.keyCode);
            ctrlAddItem();
           }
        });
    }

    return {
        init: function(){
            console.log('Application started .......');
            setupEventListeners();
        }
    }
})(
    uiController, 
    financeController,
);

appController.init();
// ================ END APP CONTROLLER ================

