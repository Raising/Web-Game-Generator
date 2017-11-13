gameDescription.nodes = Object.assign(gameDescription.nodes, 
{
    main:{
        nodeType:"Flow",
        name:"main",
        description: "Stryfe: Legacy Of The Ethernals",
        nodes:[
            {id:"initGame"},
            {id:"coreGame"},
            {id:"endGame"},
        ]
    },

    coreGame:{
        nodeType:"Flow",
        name:"coreGame",
        description: "Play the sucesive rounds",
        inputNames:[],
        outputNames:[],
        nodes:[
            {id:"playRound", control:  {type:"while", condition:{ operator:"<", operands:[ {type:"entityProperty",entity:"ROUND_COUNTER",attribute:"value"}, 2]}}},                  
        ]   
    },
    initGame:{
        nodeType:"Flow",
        name:"initGame",
        description: "Setup initial game status",
        inputNames:[],
        outputNames:[],   
        nodes:[
            {nodeType:"Primitive", outputNames:["string:roundCounter"], value: "ROUND_COUNTER"},
            {nodeType:"Primitive", outputNames:["string:turnCounter"], value: "TURN_COUNTER"},
            {nodeType:"Primitive", outputNames:["value:cero"], value: 0},
            {id:"smartCounter",nodeType:"Create",inputNames:["string:roundCounter","value:cero"],outputNames:["roundCounter"]},
            {id:"smartCounter",nodeType:"Create",inputNames:["string:turnCounter","value:cero"],outputNames:["turnCounter"]},
            {id:"initPlayersDecks", control:  {type:"simultaneous", nodeSpecificInfo:{type:"game",attribute:"players"}}},
            {id:"initLocationsDeck"},
            {id:"initPlayersScrore"},
        ],
    },
    endGame:{
        nodeType:"Flow",
        name:"endGame",description:"Count points and  decide the winner",nodes:[]},

    playRound:{
        nodeType:"Flow",
        name:"playRound",
        description:"Play Round",
        inputNames:[],
        outputNames:[],
        nodes:[
            {id:"increaseRoundCounter",nodeType:"Modify"},
            {id:"resetTurnCounter",nodeType:"Modify"},
            {id:"playTurn", control:  {type:"while", condition:{ operator:"<", operands:[ {type:"entityProperty",entity:"TURN_COUNTER",attribute:"value"}, 3]}} },
        ]
    },

    playTurn:{
        nodeType:"Flow",
        name:"playTurn",
        description:"Play a complete Turn",
        inputNames:[],
        outputNames:[],
        nodes:[
             {id:"increaseTurnCounter",nodeType:"Modify"},
             {id:"selectChampion", control:  {type:"simultaneous", nodeSpecificInfo:{type:"game",attribute:"players"}}},
             {id:"battlePhase"},
             {id:"legacyPhase"},
             {id:"combatPhase"},
             {id:"cleanUp",},
        ]
    },

    selectChampion:{
        nodeType:"Flow",
        name:"selectChampion",description:"selectChampion", inputNames:["player"], nodes:[
        {id:"selectChampionFromHand",nodeType:"Selector", inputNames:["player"],outputNames:["selectedChampion"]},
        {nodeType:"Primitive",inputNames:["player"], value: {type:"param",name:"player",attribute:"battleArea"}, outputNames:["battleArea"]},
        {id:"moveEntityTo",nodeType:"Modify", inputNames:["selectedChampion","battleArea"]},
    ]},
    battlePhase:{
        nodeType:"Flow",
        name:"battlePhase",description:"battlePhase",nodes:[]},
    legacyPhase:{
        nodeType:"Flow",
        name:"legacyPhase",description:"legacyPhase",nodes:[]},
    combatPhase:{
        nodeType:"Flow",
        name:"combatPhase",description:"combatPhase",nodes:[
        {nodeType:"Primitive", value: {type:"reduce", group :{type:"game",attribute:"players"}, 
            comparator:{ operator:"<", operands:[ {type:"param",name:"current",attribute:"battleArea.first.power"}, {type:"param",name:"candidate",attribute:"battleArea.first.power"}]}
        }, outputNames:["winnerPlayer"]},
            ///    
            /// How to compare players information?
            ///
    ]},
    cleanUp:{
        nodeType:"Flow",
        name:"cleanUp",description:"cleanUp",nodes:[
        {id:"cleanBattleArea", control:  {type:"simultaneous", nodeSpecificInfo:{type:"game",attribute:"players"}}},

    ]},

    cleanBattleArea:{
        nodeType:"Flow",
        name:"cleanBattleArea",description:"clean Battle area ",inputNames:["player"],nodes:[
        {nodeType:"Primitive",inputNames:["player"], value: {type:"param",name:"player",attribute:"legacyArea"}, outputNames:["legacyArea"]},
        {nodeType:"Primitive",inputNames:["player"], value: {type:"param",name:"player",attribute:"battleArea.first"}, outputNames:["battleChampion"]},
        {id:"moveEntityTo",nodeType:"Modify", inputNames:["battleChampion","legacyArea"]},

    ]},



    initPlayersDecks:{
        nodeType:"Flow",
        name:"initPlayersDecks",description:"initPlayersDecks", inputNames:["player"],nodes:[
        {nodeType:"Primitive", outputNames:["string:hand"], value: "hand"},
        {id:"createPlayerHand", inputNames:["player"],outputNames:["playerhand"]},
        {id:"addProperty",nodeType:"Modify", inputNames:["player","string:hand","playerhand"]},
        
        {nodeType:"Primitive", outputNames:["string:battleArea"], value: "battleArea"},
        {id:"playerBattleArea",nodeType:"Create", inputNames:["player"],outputNames:["playerBattleArea"]},
        {id:"addProperty",nodeType:"Modify", inputNames:["player","string:battleArea","playerBattleArea"]},

        {nodeType:"Primitive", outputNames:["string:legacyArea"], value: "legacyArea"},
        {id:"playerLegacyArea",nodeType:"Create", inputNames:["player"],outputNames:["playerLegacyArea"]},
        {id:"addProperty",nodeType:"Modify", inputNames:["player","string:legacyArea","playerLegacyArea"]},
    ]},
    
    initLocationsDeck:{
        nodeType:"Flow",
        name:"initLocationsDeck",description:"initLocationsDeck",nodes:[
        {nodeType:"Primitive", outputNames:["neutralPlayer"], value: "neutralPlayer"},
        {id:"createLocationDeck", inputNames:["neutralPlayer"]},
    ]},

    initPlayersScrore:{
        nodeType:"Flow",
        name:"initPlayersScrore",description:"initPlayersScrore",nodes:[]},

    createPlayerHand:{
        nodeType:"Flow",
        name:"createPlayerHand",
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
        nodeType:"Flow",
        name:"createLocationDeck",
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

});