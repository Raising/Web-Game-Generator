export default {
  getCurrentElement : function() { 
    return this.gameModel.getPropertyDot(this.selectedElement.path) || {};   
  }
};