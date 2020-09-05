
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
            }
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
            }
        }
})();

// ================ END FINANCE CONTROLLER ================

var  appController = (function(uiController,financeController){
       // 1. Оруулах өгөгдлийг дэлгэцээс олж авах
       // 2. Олж авсан өгөгдлүүдийн санхүүгийн контроллерт дамжуулж тэнд хадгална
       // 3. Олж авсан өгөгдлүүдийн вэб сайтын тохирох хэсэгт гаргана
       // 4. Төсвийг тооцоолно
       // 5. Эцсийн үлдэглийг тооцоог дэлгэцэнд харуулна
    var ctrlAddItem = function(){
      var input = uiController.getInput();
      var item = financeController.addItem(input.type, input.description, input.value);
     console.log(financeController.data());
     uiController.addListItem(item, input.type);
       
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

