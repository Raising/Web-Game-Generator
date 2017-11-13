gameDescription.nodes = Object.assign(gameDescription.nodes, 
{
     selectChampionFromHand:{
         nodeType:"Selector",
         name:"selectChampionFromHand",
         description:"select Champion From a Player Hand", 
         inputNames:["player"], 
        whoSelect:{type:"param",name:"player"},
        options:[
            {scope:{type:"param",name:"player",attribute:"hand.children"},restrictions:[]}
        ]
    },
});