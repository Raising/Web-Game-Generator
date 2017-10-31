"use strict";
PYC.Describe("NodeDefinitionApp",{
  attributes:{
  },
  builder: function(me,params){   
  },
  publ: function(me,params){
  },
  react: function(params) {
    let NodeSelector = PYC.React("NodeSelector");
    let NodeManipulator = PYC.React("NodeManipulator");

    return (
      <div>
        <NodeSelector />
        <NodeManipulator />
      </div>
    );
  }
});