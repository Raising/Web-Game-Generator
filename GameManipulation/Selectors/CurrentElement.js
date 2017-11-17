export default {
    _lastCurrentElement : {name: "No ElementSelected"},  
    _lastElementPath : "",  
    getCurrentElement : function() { 
    if (this.selectedElement.path !== this._lastElementPath){
        this._lastElementPath = this.selectedElement.path;
        if (this.selectedElement.path === ""){
            this._lastCurrentElement = {name: "No ElementSelected"};
        }else{
            this._lastCurrentElement = this.gameModel.getPropertyDot(this.selectedElement.path);   
        }
    }    
    return this._lastCurrentElement;
    }
};