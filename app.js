
var  uiController = (function(){
    var DomStrings = {
        inputType: ".add__type",
        inputDescription: ".add__description",
        inputValue: ".add__value",
        addBtn: ".add__btn",
        total: ".budget__value",
        precent: ".budget__expenses--percentage",
        totalInc: ".budget__income--value",
        totalExp: ".budget__expenses--value",
    }
    return {
        getInput: function(){
            return {
                type: document.querySelector(DomStrings.inputType).value,
                description: document.querySelector(DomStrings.inputDescription).value,
                value: parseInt(document.querySelector(DomStrings.inputValue).value),
            }
        },

        getDomStrings: function(){
            return DomStrings;
        },

        clearFields: function(){
            var fields = document.querySelectorAll(DomStrings.inputDescription + "," + DomStrings.inputValue);
            // Convert list to Array
            var fieldsArr = Array.prototype.slice.call(fields);
            fieldsArr.forEach(function(el, index, array){
                el.value = "";
            });
            fieldsArr[0].focus();
            /*for(var i = 0; i < fieldsArr.length; i++){
                fieldsArr[i].value = "";
            }*/
        },
        
        banalcePrint: function(dataBanalce){
            document.querySelector(DomStrings.total).textContent = dataBanalce.total;
            document.querySelector(DomStrings.precent).textContent = dataBanalce.precent+'%';
            document.querySelector(DomStrings.totalInc).textContent = '+ '+dataBanalce.totalInc;
            document.querySelector(DomStrings.totalExp).textContent = '- '+dataBanalce.totalExp;
        },

        addListItem: function(item, type){
            // Орлого зарлагын элементийг агуулсан html -ийг бэлтгэнэ
            var html, list;
            if(type === "inc"){
                list = '.income__list';
                html = '<div class="item clearfix" id="income-%id%"><div class="item__description">%desc%</div><div class="right clearfix"><div class="item__value">+ %value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            } else{
                list = '.expenses__list';
                html = '<div class="item clearfix" id="expense-%id%"><div class="item__description">%desc%</div><div class="right clearfix"><div class="item__value">- %value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            }

            // Тэр HTML дотроо зарлагийн утгуудыг REPLACE ашиглаж өөрчилж өгнө
            html = html.replace('%id%', item.id);
            html = html.replace('%desc%', item.description);
            html = html.replace('%value%', item.value);
            // Бэлтгэсэн HTML ээ DOM руу хийж өгнө
            document.querySelector(list).insertAdjacentHTML('beforeend', html);
        }
    }
})();


// ================ END USER CONTROLLER ================


var  financeController = (function(){

        var calculateTotal = function(type){
            var sum = 0;
            data.items[type].forEach(function(el, index, array){
                sum = sum + el.value;
            });
            return data.totals[type] = sum;
        }

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
            items: {
                inc : [],
                exp : [],
            },
            totals: {
                inc : 0,
                exp : 0,
            },
            total: 0,
            precent: 0,
        };

        return {
            addItem: function(type, desc, value){
                var item, id;
                if(data.items[type].length === 0) id =1;
                else{
                    id = data.items[type][data.items[type].length- 1].id+1;
                }
                if(type == 'inc'){
                    item = new inCome(id, desc, value);
                } else {
                    item = new Expense(id, desc, value);
                }
                data.items[type].push(item);
                return item;
               // console.log(data);
            },

            data: function(){
                return data;
            },

            calculate: function(){
                calculateTotal('inc');
                calculateTotal('exp');
                data.total = data.totals.inc - data.totals.exp;
                data.precent = Math.round((data.totals.exp / data.totals.inc) * 100);
            },

            resultCalculate: function(){
                return {
                    total : data.total,
                    precent: data.precent,
                    totalInc : data.totals.inc,
                    totalExp: data.totals.exp,
                }
            }
        }
})();

// ================ END FINANCE CONTROLLER ================

var  appController = (function(uiController,financeController){
       // 1. Оруулах өгөгдлийг дэлгэцээс олж авах
       // 2. Олж авсан өгөгдлүүдийн санхүүгийн контроллерт дамжуулж тэнд хадгална
       // 3. Олж авсан өгөгдлүүдийн вэб сайтын тохирох хэсэгт гаргана
       
       // 5. Эцсийн үлдэглийг тооцоог дэлгэцэнд харуулна
    var ctrlAddItem = function(){
      var input = uiController.getInput();

      if(input.description !== "" && input.value !== ""){
        var item = financeController.addItem(input.type, input.description, input.value);
        uiController.addListItem(item, input.type);
        uiController.clearFields();
        // 4. Төсвийг тооцоолно
        financeController.calculate();
        // 5. Эцсийн үлдэглийг тооцоог дэлгэцэнд харуулна
        var resultCalculate = financeController.resultCalculate();
        // 6. Төсвийн дэлгэцэнд харуулах
        uiController.banalcePrint(resultCalculate);
      }

    };

    
    var setupEventListeners = function(){

        var DOM = uiController.getDomStrings();
        document.querySelector(DOM.addBtn).addEventListener("click", function(){
            ctrlAddItem();
        });
    
        document.querySelector(DOM.addBtn).addEventListener("keypress", function(event){   
           // 
           if(event.keyCode === 13){
            ctrlAddItem();
           }
        });
    }

    return {
        init: function(){
            console.log('Application started .......');
            uiController.banalcePrint({
                total : 0,
                precent: 0,
                totalInc : 0,
                totalExp: 0,
            });
            setupEventListeners();
        }
    }
})(
    uiController, 
    financeController,
);

appController.init();
// ================ END APP CONTROLLER ================

