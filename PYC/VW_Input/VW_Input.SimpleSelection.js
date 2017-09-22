PYC.Describe('VW_Input.SimpleSelection',{
  builder: function(obj,params){   
  	 obj.whenResolved = null;

     obj.container = $('<div style="position:absolute;left:20%;width:250px;padding:25px;border-radius:10px;top:200px;text-align:right;background-color:grey;" class="" id=""></div>');
     params.options.forEach((element)=>{
      obj.container.append("<button name='"+element.key+"'>"+element.title+"</button> ");
     });


     obj.container.on('click',(e)=>{
        var result = $(e.target).attr("name");
        // TODO any kind of validation;

        obj.whenResolved(result);
        obj.container.remove();
     });
     obj.container.append(obj.submit);
  },
  publ: function(obj,params){    
   
      obj.onAction = function(fun){
        var obj = this;
        obj.whenResolved = fun;
      };

      obj.renderTo = function(element){
        var obj = this;
        element.append(obj.container);
      }
  }
});
