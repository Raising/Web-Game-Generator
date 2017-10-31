"use strict";
PYC.Describe("NodeSelector",{
  attributes:{
  },
  builder: function(me,params){   
  },
  publ: function(me,params){
  },
  react: function(props) {
    const BaseNode = PYC.React("BaseNode");

    return (
      <ul className="col-md-3 list-group">
        { Object.keys(props.nodes).map( (nodeType, index) => (
          <li 
            key={ index } >
            <a>{nodeType}</a>
            <ul className="list-group">
              { Object.keys(props.nodes[nodeType]).map( (nodeName, index) => (
                <li 
                  key={ index } >
                  <a>{nodeName}</a>
                </li>
              ))}
            </ul>
          </li>
          ))}
      </ul>
    );
    
  }
});