gameDescription.nodes.Selector = 
{
     selectChampionFromHand:{description:"select Champion From a Player Hand", inputNames:["player"], 
        whoSelect:{type:"param",name:"player"},
        options:[
            {scope:{type:"param",name:"player",attribute:"hand.children"},restrictions:[]}
        ]
    },
};