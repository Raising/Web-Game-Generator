PYC.Describe.Template('SimpleDiv' ,{

  builder: function(params){
    var stringDescriptor = '<div ';
    
    if (params.style !== undefined){
      stringDescriptor += ' style="';
      for (var atribute in params.style){
        stringDescriptor += atribute + ' : ' + params.style[atribute] + ';';
      }
      stringDescriptor += '"';
    }
    
    if (params.classes !== undefined){
      stringDescriptor += ' class="'+ params.classes +'" ';
    }

    if (params.id !== undefined){
      stringDescriptor += ' id="'+ params.id +'" ';
    } 
    
    stringDescriptor += '>';
    stringDescriptor += (params.content?params.content:'');
    stringDescriptor += '</div>';
    return stringDescriptor;
  }
});

PYC.Describe.Template('LoginForm' ,{

  builder: function(params){
    var stringDescriptor = '<div>User<input style="" value=""></div>'; 
   
    return stringDescriptor;
  }
});