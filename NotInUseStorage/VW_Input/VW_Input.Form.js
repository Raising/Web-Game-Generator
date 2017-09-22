PYC.Describe('VW_Input.Form',{
  builder: function(obj,params){   
  	 obj.whenResolved = null;
     //obj.fields = [];
     obj.container = $('<div style="position:absolute;left:20%;width:250px;padding:25px;border-radius:10px;top:200px;text-align:right;background-color:grey;" class="" id=""></div>');
     params.fields.forEach((element)=>{
      obj.container.append(element.title+": <input type='"+element.type+"' name='"+element.key+"'><br> ");
     });
     
     obj.submit = $("<button >ok</button>");
     obj.submit.on('click',(e)=>{
        var result = {};
        obj.container.children('input').each(function(el){
          var element = $(this);
          result[element.attr('name')] = element.val();
        });
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
