
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
        containerDiv: ".container",
        expPercentageLabel: ".item__percentage",
        dateLabel : ".budget__title--month",
    }

    var nodeListForeach = function(list, callback){
        for(var i=0; i < list.length; i++){
            callback(list[i], i);
        }
    };
    
    var formatPrice = function(number, type){
        var number = ''+number;
        var x = number.split("").reverse().join("");
        var y = '';
        var count = 1;
        for(var i=0; i < x.length; i++)
        {
          y = y + x[i];
          if( count%3 === 0 ) y = y + ',';
          count ++;
        }
        var z = y.split("").reverse().join("");
        if(z[0] === ',') z = z.substr(1, z.length - 1);
        if(type === 'inc'){ z = '+ '+z;} else {z = '- '+z;}
        return z;
    };


    return {
        changeType:  function(){
            var fields  = document.querySelectorAll(DomStrings.inputType+', '+DomStrings.inputDescription+', '+DomStrings.inputValue);
            nodeListForeach(fields, function(el,i){
                el.classList.toggle('red-focus');
            });
            document.querySelector(DomStrings.addBtn).classList.toggle('red');
        },

        getInput: function(){
            return {
                type: document.querySelector(DomStrings.inputType).value,
                description: document.querySelector(DomStrings.inputDescription).value,
                value: parseInt(document.querySelector(DomStrings.inputValue).value),
            }
        },

        displayPercentages: function(allPercentages){
            var element = document.querySelectorAll(DomStrings.expPercentageLabel);
            console.log(element);
            nodeListForeach(element, 
                function(el, index){
                    el.textContent = allPercentages[index];
                }
            );
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
            if(dataBanalce.total > 0){ var type = 'inc'; } else {var type = 'exp';}
            document.querySelector(DomStrings.total).textContent = formatPrice(dataBanalce.total, type);
            document.querySelector(DomStrings.precent).textContent = dataBanalce.precent+'%';
            document.querySelector(DomStrings.totalInc).textContent = '+ '+dataBanalce.totalInc;
            document.querySelector(DomStrings.totalExp).textContent = '- '+dataBanalce.totalExp;
        },

        addListItem: function(item, type){
            // Орлого зарлагын элементийг агуулсан html -ийг бэлтгэнэ
            var html, list;
            if(type === "inc"){
                list = '.income__list';
                html = '<div class="item clearfix" id="inc-%id%"><div class="item__description">%desc%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            } else{
                list = '.expenses__list';
                html = '<div class="item clearfix" id="exp-%id%"><div class="item__description">%desc%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            }

            // Тэр HTML дотроо зарлагийн утгуудыг REPLACE ашиглаж өөрчилж өгнө
            html = html.replace('%id%', item.id);
            html = html.replace('%desc%', item.description);
            html = html.replace('%value%', formatPrice(item.value, type));
            // Бэлтгэсэн HTML ээ DOM руу хийж өгнө
            document.querySelector(list).insertAdjacentHTML('beforeend', html);
        },

        deleteListItem : function(id){
            console.log(id);
            var el = document.getElementById(id);
            el.parentNode.removeChild(el);
        },

        displayDate : function(){
            var today = new Date();
            document.querySelector(DomStrings.dateLabel).textContent = today.getMonth()+'-р сар';
        },
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
            this.precentage = -1;
        }

        Expense.prototype.calcPrecentage = function(totalIncome){
            if(totalIncome > 0){
                this.precentage = Math.round((this.value / totalIncome)*100)
            } else {
                this.precentage = 0;  
            }
            
        };

        Expense.prototype.getPercentage = function(){
            return this.precentage;
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
                if(data.totals.inc > 0){
                    data.precent = Math.round((data.totals.exp / data.totals.inc) * 100);
                } else {
                    data.precent = 0;
                }
                
            },

            resultCalculate: function(){
                return {
                    total : data.total,
                    precent: data.precent,
                    totalInc : data.totals.inc,
                    totalExp: data.totals.exp,
                }
            },

            deleteItem: function(type, id){
                var ids = data.items[type].map(function(el){
                    return el.id;
                });
                var index = ids.indexOf(id);
                if(index !== -1){
                    data.items[type].splice(index, 1);
                }  
            
            },

            calculatePercentages: function(){
                data.items.exp.forEach(function(el){
                    el.calcPrecentage(data.totals.inc);
                });
                console.log(data.items.exp);
            },

            getPercentage: function(){
                var allPercentages = data.items.exp.map(function(el){
                    return el.getPercentage();
                });
                return allPercentages;
            },
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
        calBalance();
      }

    };

    var calBalance =  function(){
       // 4. Төсвийг тооцоолно
       financeController.calculate();
       // 5. Эцсийн үлдэглийг тооцоог дэлгэцэнд харуулна
       var resultCalculate = financeController.resultCalculate();
       // 6. Төсвийн дэлгэцэнд харуулах
       uiController.banalcePrint(resultCalculate); 

       // Төсвийн хувь тооцоолох
        financeController.calculatePercentages();
       // 8.Тооцоолсон хувийг хүлээж авах
        var allPercentages = financeController.getPercentage();
       // 9.Тооцолсон хувийг дэлгэцэнд харуулах
       uiController.displayPercentages(allPercentages);
    }

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
        
        document.querySelector(DOM.inputType).addEventListener('change', uiController.changeType);

        document
            .querySelector(DOM.containerDiv)
            .addEventListener('click', function(event){
              //  console.log(event.target.id);
              var id = event.target.parentNode.parentNode.parentNode.parentNode.id;
              if(id !== ""){
                var arr = id.split('-');
                var type = arr[0], itemId = parseInt(arr[1]);
              }
              financeController.deleteItem(type, itemId);
              uiController.deleteListItem(id);
              calBalance();
            });
    }

    return {
        init: function(){
            console.log('Application started .......');
            uiController.displayDate();
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

