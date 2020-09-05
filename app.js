var  uiController = (function(){
   
})();

var  financeController = (function(){
    console.log('hello');
})();



var  appController = (function(uiController,financeController){

    var ctrlAddItem = function(){
       console.log('addItem');
       // 1. Оруулах өгөгдлийг дэлгэцээс олж авах
       // 2. Олж авсан өгөгдлүүдийн санхүүгийн контроллерт дамжуулж тэнд хадгална
       // 3. Олж авсан өгөгдлүүдийн вэб сайтын тохирох хэсэгт гаргана
       // 4. Төсвийг тооцоолно
       // 5. Эцсийн үлдэглийг тооцоог дэлгэцэнд харуулна
    };

    document.querySelector('.add__btn').addEventListener("click", function(){
        ctrlAddItem();
    });

    document.querySelector('.add__value').addEventListener("keypress", function(event){   
       // 
       if(event.keyCode === 13){
        console.log(event.keyCode);
        ctrlAddItem();
       }
    });

})(
    uiController, 
    financeController,
);