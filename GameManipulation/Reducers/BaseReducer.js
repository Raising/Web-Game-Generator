const translateString = (string,state,action) => {
  let startingCharacter = string.substring(0,1);
  switch (startingCharacter){
    case "$":
      return state[string.substring(1)]();
    break;
    case "#":
      return state.getPropertyDot(string.substring(1));
    break;
    case "%":
      return action.getPropertyDot(string.substring(1));
    break;
    default:
      return string;
    break;
  }
};


export default {
  getStateNode: function(state,action){
    let splitedStateNode = this.stateNode.split(":");
    let translatedString = "";

    if (splitedStateNode.length === 1){
      return translateString(splitedStateNode[0],state,action);
    }
    for (let subPath of splitedStateNode){
      if (translatedString !== "") translatedString += ".";
      translatedString += translateString(subPath,state,action);
    }
    return translatedString;
  }
}