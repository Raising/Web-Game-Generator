"use strict";
PYC.Describe("NodeDefinitionApp",{
  attributes:{
  },
  builder: function(me,params){   
  },
  publ: function(me,params){
  },
  react: function(props) {
    const NodeSelector = PYC.React("NodeSelector");
    const NodeManipulator = PYC.React("NodeManipulator");

    return (
      <div>
        <NodeSelector 
          nodes={props.nodes}
        />
        <NodeManipulator />
      </div>
    );
  }
});