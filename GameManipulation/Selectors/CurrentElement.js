const currentElement = {

 getCurrentElement : function() { 
        if (this.selectedElement.path === ""){
            return {name: "No ElementSelected"};
        } 
        let selectedElement = this.gameModel;    
        for (let subPathId of this.selectedElement.splitedPath){
            selectedElement = selectedElement[subPathId];
        }
        return selectedElement;
    }
}

export default currentElement;