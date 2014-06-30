//Model
(function(){
    function appModel(){
        this.valueArr = [];
        //Initialize
        this.init = function(){
            for(var i=0;i<9;i++){
                var item = {};
                item.number = i+1;
                item.color = "";
                this.valueArr[i] = item;
            }
        }; 
        //Randomize
        this.randomize = function(){
            var i,j,randomNumber,tempItem,itemList = this.valueArr ;            
            for(i =1, j= itemList.length; j > i; i++){
                randomNumber = Math.floor(Math.random() *j);
                tempItem = itemList[i];
                this.valueArr[i] = itemList[randomNumber];
                this.valueArr[randomNumber] = tempItem;
            }
        }
    }
    window.appModel = new appModel();    
})();

//View
(function(){
    function appView(){
        var $displayContainer = $("#innerContainer"),
            $selectionContainer = $("input[name=choice]"),
            color;

        this.init = function(values){
            $selectionContainer.on("click",function() {
                color = this.value;
            });
            
            $displayContainer.on("click",".column",function(){
                var item = $(this).data('column'),
                    itemVal = parseInt($(this).html()),
                    index,
                    checkColor;
                if(!color){
                    alert("Please select a color before clicking on boxes.");
                    return false;
                }
                //get index
                for (var key in values){
                    if(values[key].number === itemVal){
                        index = key;
                        break;
                    }
                }
                checkColor = values[index].color;
                if(checkColor && checkColor !== color){
                    alert("Already applied "+checkColor+" color");
                }
                else{
                    $(this).addClass(color);
                    values[index].color = color;
                }
                
            });
            display(values);
        };
        
        this.reset = function(values){
            $selectionContainer.attr("checked",false);
            color = "";
            display(values);
        };

        this.randomize = function(values){
            display(values);
        };
        
        var display = function(data){
            var i,
                len,
                colorText ="",
                templText="";
            $displayContainer.empty();
            for(i=0,len=data.length;i<len;i++){
                colorText = data[i].color ? " "+data[i].color:"";
                if(i%3===0){
                    templText+= '<div class="row">';
                }
                templText+='<div class="column'+colorText+'" data-column='+(i+1)+'>'+data[i].number+'</div>';
                if(i%3===2){
                    templText+= '</div>';
                }
            }
            $displayContainer.html(templText);
        };
    }
    window.appView = new appView();
})();

//Controller
(function(model,view){
    function appController(){
        this.init = function(){
           model.init();             
           view.init(model.valueArr);            
        };
        this.reset = function(){
            model.init();
            view.reset(model.valueArr);
        }
        this.randomize = function(){
            model.randomize();
            view.randomize(model.valueArr);
        }
    }
    window.appController = new appController();    
})(appModel,appView);
//Initialize Controller
appController.init();