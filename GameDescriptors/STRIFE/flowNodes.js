gameDescription.nodes.Flow = 
{
    main:{
        description: "Stryfe: Legacy Of The Ethernals",
        nodes:[
            {id:"initGame",nodeType:"Flow"},
            {id:"coreGame",nodeType:"Flow"},
            {id:"endGame",nodeType:"Flow"},
        ]
    },

    coreGame:{
        description: "Play the sucesive rounds",
        inputNames:[],
        outputNames:[],
        nodes:[
            {id:"playRound",nodeType:"Flow", control:  {type:"while", condition:{ operator:"<", operands:[ {type:"entityProperty",entity:"ROUND_COUNTER",attribute:"value"}, 2]}}},                  
        ]   
    },
    initGame:{
        description: "Setup initial game status",
        inputNames:[],
        outputNames:[],   
        nodes:[
            {nodeType:"Primitive", outputNames:["string:roundCounter"], value: "ROUND_COUNTER"},
            {nodeType:"Primitive", outputNames:["string:turnCounter"], value: "TURN_COUNTER"},
            {nodeType:"Primitive", outputNames:["value:cero"], value: 0},
            {id:"smartCounter",nodeType:"Create",inputNames:["string:roundCounter","value:cero"],outputNames:["roundCounter"]},
            {id:"smartCounter",nodeType:"Create",inputNames:["string:turnCounter","value:cero"],outputNames:["turnCounter"]},
            {id:"initPlayersDecks",nodeType:"Flow", control:  {type:"simultaneous", nodeSpecificInfo:{type:"game",attribute:"players"}}},
            {id:"initLocationsDeck",nodeType:"Flow"},
            {id:"initPlayersScrore",nodeType:"Flow"},
        ],
    },
    endGame:{description:"Count points and  decide the winner",nodes:[]},

    playRound:{
        description:"Play Round",
        inputNames:[],
        outputNames:[],
        nodes:[
            {id:"increaseRoundCounter",nodeType:"Modify"},
            {id:"resetTurnCounter",nodeType:"Modify"},
            {id:"playTurn",nodeType:"Flow", control:  {type:"while", condition:{ operator:"<", operands:[ {type:"entityProperty",entity:"TURN_COUNTER",attribute:"value"}, 3]}} },
        ]
    },

    playTurn:{
        description:"Play a complete Turn",
        inputNames:[],
        outputNames:[],
        nodes:[
             {id:"increaseTurnCounter",nodeType:"Modify"},
             {id:"selectChampion",nodeType:"Flow", control:  {type:"simultaneous", nodeSpecificInfo:{type:"game",attribute:"players"}}},
             {id:"battlePhase",nodeType:"Flow"},
             {id:"legacyPhase",nodeType:"Flow"},
             {id:"combatPhase",nodeType:"Flow"},
             {id:"cleanUp",nodeType:"Flow",},
        ]
    },

    selectChampion:{description:"selectChampion", inputNames:["player"], nodes:[
        {id:"selectChampionFromHand",nodeType:"Selector", inputNames:["player"],outputNames:["selectedChampion"]},
        {nodeType:"Primitive",inputNames:["player"], value: {type:"param",name:"player",attribute:"battleArea"}, outputNames:["battleArea"]},
        {id:"moveEntityTo",nodeType:"Modify", inputNames:["selectedChampion","battleArea"]},
    ]},
    battlePhase:{description:"battlePhase",nodes:[]},
    legacyPhase:{description:"legacyPhase",nodes:[]},
    combatPhase:{description:"combatPhase",nodes:[
        {nodeType:"Primitive", value: {type:"reduce", group :{type:"game",attribute:"players"}, 
            comparator:{ operator:"<", operands:[ {type:"param",name:"current",attribute:"battleArea.first.power"}, {type:"param",name:"candidate",attribute:"battleArea.first.power"}]}
        }, outputNames:["winnerPlayer"]},
            ///    
            /// How to compare players information?
            ///
    ]},
    cleanUp:{description:"cleanUp",nodes:[
        {id:"cleanBattleArea",nodeType:"Flow", control:  {type:"simultaneous", nodeSpecificInfo:{type:"game",attribute:"players"}}},

    ]},

    cleanBattleArea:{description:"clean Battle area ",inputNames:["player"],nodes:[
        {nodeType:"Primitive",inputNames:["player"], value: {type:"param",name:"player",attribute:"legacyArea"}, outputNames:["legacyArea"]},
        {nodeType:"Primitive",inputNames:["player"], value: {type:"param",name:"player",attribute:"battleArea.first"}, outputNames:["battleChampion"]},
        {id:"moveEntityTo",nodeType:"Modify", inputNames:["battleChampion","legacyArea"]},

    ]},



    initPlayersDecks:{description:"initPlayersDecks", inputNames:["player"],nodes:[
        {nodeType:"Primitive", outputNames:["string:hand"], value: "hand"},
        {id:"createPlayerHand",nodeType:"Flow", inputNames:["player"],outputNames:["playerhand"]},
        {id:"addProperty",nodeType:"Modify", inputNames:["player","string:hand","playerhand"]},
        
        {nodeType:"Primitive", outputNames:["string:battleArea"], value: "battleArea"},
        {id:"playerBattleArea",nodeType:"Create", inputNames:["player"],outputNames:["playerBattleArea"]},
        {id:"addProperty",nodeType:"Modify", inputNames:["player","string:battleArea","playerBattleArea"]},

        {nodeType:"Primitive", outputNames:["string:legacyArea"], value: "legacyArea"},
        {id:"playerLegacyArea",nodeType:"Create", inputNames:["player"],outputNames:["playerLegacyArea"]},
        {id:"addProperty",nodeType:"Modify", inputNames:["player","string:legacyArea","playerLegacyArea"]},
    ]},
    
    initLocationsDeck:{description:"initLocationsDeck",nodes:[
        {nodeType:"Primitive", outputNames:["neutralPlayer"], value: "neutralPlayer"},
        {id:"createLocationDeck",nodeType:"Flow", inputNames:["neutralPlayer"]},
    ]},

    initPlayersScrore:{description:"initPlayersScrore",nodes:[]},

    createPlayerHand:{
        description:"Create Player hand and its cards",
        inputNames:["playerOwner"],
        outputNames:["playerHand"],
        nodes:[
            {id:"playerHand",nodeType:"Create",inputNames:["playerOwner"],outputNames:["playerHand"]},
            {id:"champion1",nodeType:"Create",inputNames:["playerOwner","playerHand"],outputNames:["monk"]},
            {id:"champion2",nodeType:"Create",inputNames:["playerOwner","playerHand"],outputNames:["necromancer"]},
            {id:"champion3",nodeType:"Create",inputNames:["playerOwner","playerHand"],outputNames:["assasin"]},
            {id:"champion4",nodeType:"Create",inputNames:["playerOwner","playerHand"],outputNames:["wizard"]},
            {id:"champion5",nodeType:"Create",inputNames:["playerOwner","playerHand"],outputNames:["paladin"]},
            {id:"champion6",nodeType:"Create",inputNames:["playerOwner","playerHand"],outputNames:["ranger"]},
            {id:"champion7",nodeType:"Create",inputNames:["playerOwner","playerHand"],outputNames:["druid"]},
            {id:"champion8",nodeType:"Create",inputNames:["playerOwner","playerHand"],outputNames:["warrior"]},
            {id:"champion9",nodeType:"Create",inputNames:["playerOwner","playerHand"],outputNames:["knight"]},
            {id:"champion10",nodeType:"Create",inputNames:["playerOwner","playerHand"],outputNames:["barbarian"]},
        ]
    },

    createLocationDeck:{
        description:"Create the location Deck",
        inputNames:["neutralPlayer"],
        outputNames:["locationDeck"],
        nodes:[
            {id:"locationDeck",nodeType:"Create",inputNames:["neutralPlayer"],outputNames:["locationDeck"]},
            {id:"location1",nodeType:"Create",inputNames:["neutralPlayer","locationDeck"],outputNames:["location1"]},
            {id:"location2",nodeType:"Create",inputNames:["neutralPlayer","locationDeck"],outputNames:["location2"]},
            {id:"location3",nodeType:"Create",inputNames:["neutralPlayer","locationDeck"],outputNames:["location3"]},
            {id:"location4",nodeType:"Create",inputNames:["neutralPlayer","locationDeck"],outputNames:["location4"]},
            {id:"location5",nodeType:"Create",inputNames:["neutralPlayer","locationDeck"],outputNames:["location5"]},
            {id:"location6",nodeType:"Create",inputNames:["neutralPlayer","locationDeck"],outputNames:["location6"]},
            {id:"location7",nodeType:"Create",inputNames:["neutralPlayer","locationDeck"],outputNames:["location7"]},
            {id:"location8",nodeType:"Create",inputNames:["neutralPlayer","locationDeck"],outputNames:["location8"]},
            {id:"location9",nodeType:"Create",inputNames:["neutralPlayer","locationDeck"],outputNames:["location9"]},
            {id:"location10",nodeType:"Create",inputNames:["neutralPlayer","locationDeck"],outputNames:["location10"]},
        ]
    },

};