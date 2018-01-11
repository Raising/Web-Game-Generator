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
            {id:"playRound", control:  {type:"while", condition:{ operator:"<", operands:[ {type:"entityByName",name:"ROUND_COUNTER",attribute:"value"}, 2]}}},                  
        ]   
    },
    initGame:{
        nodeType:"Flow",
        name:"initGame",
        description: "Setup initial game status",
        inputNames:[],
        outputNames:[],   
        nodes:[
            {nodeType:"Primitive", outputNames:[{key:"string:roundCounter",name:"string:roundCounter"}], value: "ROUND_COUNTER"},
            {nodeType:"Primitive", outputNames:[{key:"string:turnCounter",name:"string:turnCounter"}], value: "TURN_COUNTER"},
            {nodeType:"Primitive", outputNames:[{key:"value:cero",name:"value:cero"}], value: 0},
            {id:"smartCounter",nodeType:"Create",inputNames:[{key:"string:roundCounter",name:"string:roundCounter"},{key:"value:cero",name:"value:cero"}],outputNames:[{key:"roundCounter",name:"roundCounter"}]},
            {id:"smartCounter",nodeType:"Create",inputNames:[{key:"string:turnCounter",name:"string:turnCounter"},{key:"value:cero",name:"value:cero"}],outputNames:[{key:"turnCounter",name:"turnCounter"}]},
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
            {id:"playTurn", control:  {type:"while", condition:{ operator:"<", operands:[ {type:"entityByName",name:"TURN_COUNTER",attribute:"value"}, 3]}} },
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
        name:"selectChampion",description:"selectChampion", inputNames:[{key:"player",name:"player"}], nodes:[
        {id:"selectChampionFromHand",nodeType:"Selector", inputNames:[{key:"player",name:"player"}],outputNames:[{key:"selectedChampion",name:"selectedChampion"}]},
        {nodeType:"Primitive",inputNames:[{key:"player",name:"player"}], value: {type:"param",name:"player",attribute:"battleArea"}, outputNames:[{key:"battleArea",name:"battleArea"}]},
        {id:"moveEntityTo",nodeType:"Modify", inputNames:[{key:"selectedChampion",name:"selectedChampion"},{key:"battleArea",name:"battleArea"}]},
    ]},
    battlePhase:{
        nodeType:"Flow",
        name:"battlePhase",description:"battlePhase",nodes:[]},
    legacyPhase:{
        nodeType:"Flow",
        name:"legacyPhase",description:"legacyPhase",nodes:[]},
    combatPhase:{
        nodeType:"Flow",
        name:"combatPhase",
        description:"combatPhase",
        nodes:[
        {nodeType:"Primitive", value: {type:"reduce", group :{type:"game",attribute:"players"}, 
            comparator:{ operator:"<", operands:[ {type:"param",name:"current",attribute:"battleArea.first.power"}, {type:"param",name:"candidate",attribute:"battleArea.first.power"}]}
        }, outputNames:[{key:"winnerPlayer",name:"winnerPlayer"}]},
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
        name:"cleanBattleArea",description:"clean Battle area ",inputNames:[{key:"player",name:"player"}],nodes:[
        {nodeType:"Primitive",inputNames:[{key:"player",name:"player"}], value: {type:"param",name:"player",attribute:"legacyArea"}, outputNames:[{key:"legacyArea",name:"legacyArea"}]},
        {nodeType:"Primitive",inputNames:[{key:"player",name:"player"}], value: {type:"param",name:"player",attribute:"battleArea.first"}, outputNames:[{key:"battleChampion",name:"battleChampion"}]},
        {id:"moveEntityTo",nodeType:"Modify", inputNames:[{key:"battleChampion",name:"battleChampion"},{key:"legacyArea",name:"legacyArea"}]},

    ]},



    initPlayersDecks:{
        nodeType:"Flow",
        name:"initPlayersDecks",description:"initPlayersDecks", inputNames:[{key:"player",name:"player"}],nodes:[
            {nodeType:"Primitive", outputNames:[{key:"string:hand",name:"string:hand"}], value: "hand"},
            {id:"createPlayerHand", inputNames:[{key:"player",name:"player"}],outputNames:[{key:"playerhand",name:"playerhand"}]},
            {id:"addProperty",nodeType:"Modify", inputNames:[{key:"player",name:"player"},{key:"string:hand",name:"string:hand"},{key:"playerhand",name:"playerhand"}]},
            
            {nodeType:"Primitive", outputNames:[{name:"string:battleArea",key:"string:battleArea"}], value: "battleArea"},
            {id:"playerBattleArea",nodeType:"Create", inputNames:[{key:"player",name:"player"}],outputNames:[{name:"playerBattleArea",key:"playerBattleArea"}]},
            {id:"addProperty",nodeType:"Modify", inputNames:[{key:"player",name:"player"},{name:"string:battleArea",key:"string:battleArea"},{name:"playerBattleArea",key:"playerBattleArea"}]},

            {nodeType:"Primitive", outputNames:[{name:"string:legacyArea",key:"string:legacyArea"}], value: "legacyArea"},
            {id:"playerLegacyArea",nodeType:"Create", inputNames:[{key:"player",name:"player"}],outputNames:[{name:"playerLegacyArea",key:"playerLegacyArea"}]},
            {id:"addProperty",nodeType:"Modify", inputNames:[{key:"player",name:"player"},{name:"string:legacyArea",key:"string:legacyArea"},{name:"playerLegacyArea",key:"playerLegacyArea"}]},
    ]},
    
    initLocationsDeck:{
        nodeType:"Flow",
        name:"initLocationsDeck",description:"initLocationsDeck",nodes:[
            {nodeType:"Primitive", outputNames:[{key:"neutralPlayer",name:"neutralPlayer"}], value: "neutralPlayer"},
            {id:"createLocationDeck", inputNames:[{key:"neutralPlayer",name:"neutralPlayer"}]},
    ]},

    initPlayersScrore:{
        nodeType:"Flow",
        name:"initPlayersScrore",description:"initPlayersScrore",nodes:[]},

    createPlayerHand:{
        nodeType:"Flow",
        name:"createPlayerHand",
        description:"Create Player hand and its cards",
        inputNames:[{name:"playerOwner",key:"playerOwner"}],
        outputNames:[{name:"playerHand",key:"playerHand"}],
        nodes:[
            {id:"playerHand",nodeType:"Create",inputNames:[{name:"playerOwner",key:"playerOwner"}],outputNames:[{name:"playerHand",key:"playerHand"}]},
            {id:"champion1",nodeType:"Create",inputNames:[{name:"playerOwner",key:"playerOwner"},{name:"playerHand",key:"playerHand"}],outputNames:[{name:"monk",key:"monk"}]},
            {id:"champion2",nodeType:"Create",inputNames:[{name:"playerOwner",key:"playerOwner"},{name:"playerHand",key:"playerHand"}],outputNames:[{name:"necromancer",key:"necromancer"}]},
            {id:"champion3",nodeType:"Create",inputNames:[{name:"playerOwner",key:"playerOwner"},{name:"playerHand",key:"playerHand"}],outputNames:[{name:"assasin",key:"assasin"}]},
            {id:"champion4",nodeType:"Create",inputNames:[{name:"playerOwner",key:"playerOwner"},{name:"playerHand",key:"playerHand"}],outputNames:[{name:"wizard",key:"wizard"}]},
            {id:"champion5",nodeType:"Create",inputNames:[{name:"playerOwner",key:"playerOwner"},{name:"playerHand",key:"playerHand"}],outputNames:[{name:"paladin",key:"paladin"}]},
            {id:"champion6",nodeType:"Create",inputNames:[{name:"playerOwner",key:"playerOwner"},{name:"playerHand",key:"playerHand"}],outputNames:[{name:"ranger",key:"ranger"}]},
            {id:"champion7",nodeType:"Create",inputNames:[{name:"playerOwner",key:"playerOwner"},{name:"playerHand",key:"playerHand"}],outputNames:[{name:"druid",key:"druid"}]},
            {id:"champion8",nodeType:"Create",inputNames:[{name:"playerOwner",key:"playerOwner"},{name:"playerHand",key:"playerHand"}],outputNames:[{name:"warrior",key:"warrior"}]},
            {id:"champion9",nodeType:"Create",inputNames:[{name:"playerOwner",key:"playerOwner"},{name:"playerHand",key:"playerHand"}],outputNames:[{name:"knight",key:"knight"}]},
            {id:"champion10",nodeType:"Create",inputNames:[{name:"playerOwner",key:"playerOwner"},{name:"playerHand",key:"playerHand"}],outputNames:[{name:"barbarian",key:"barbarian"}]},
        ]
    },

    createLocationDeck:{
        nodeType:"Flow",
        name:"createLocationDeck",
        description:"Create the location Deck",
        inputNames:[{name:"neutralPlayer",key:"neutralPlayer"}],
        outputNames:[{name:"locationDeck",key:"locationDeck"}],
        nodes:[
            {id:"locationDeck",nodeType:"Create",inputNames:[{name:"neutralPlayer",key:"neutralPlayer"}],outputNames:[{name:"locationDeck",key:"locationDeck"}]},
            {id:"location1",nodeType:"Create",inputNames:[{name:"neutralPlayer",key:"neutralPlayer"},{name:"locationDeck",key:"locationDeck"}],outputNames:[{name:"location1",key:"location1"}]},
            {id:"location2",nodeType:"Create",inputNames:[{name:"neutralPlayer",key:"neutralPlayer"},{name:"locationDeck",key:"locationDeck"}],outputNames:[{name:"location2",key:"location2"}]},
            {id:"location3",nodeType:"Create",inputNames:[{name:"neutralPlayer",key:"neutralPlayer"},{name:"locationDeck",key:"locationDeck"}],outputNames:[{name:"location3",key:"location3"}]},
            {id:"location4",nodeType:"Create",inputNames:[{name:"neutralPlayer",key:"neutralPlayer"},{name:"locationDeck",key:"locationDeck"}],outputNames:[{name:"location4",key:"location4"}]},
            {id:"location5",nodeType:"Create",inputNames:[{name:"neutralPlayer",key:"neutralPlayer"},{name:"locationDeck",key:"locationDeck"}],outputNames:[{name:"location5",key:"location5"}]},
            {id:"location6",nodeType:"Create",inputNames:[{name:"neutralPlayer",key:"neutralPlayer"},{name:"locationDeck",key:"locationDeck"}],outputNames:[{name:"location6",key:"location6"}]},
            {id:"location7",nodeType:"Create",inputNames:[{name:"neutralPlayer",key:"neutralPlayer"},{name:"locationDeck",key:"locationDeck"}],outputNames:[{name:"location7",key:"location7"}]},
            {id:"location8",nodeType:"Create",inputNames:[{name:"neutralPlayer",key:"neutralPlayer"},{name:"locationDeck",key:"locationDeck"}],outputNames:[{name:"location8",key:"location8"}]},
            {id:"location9",nodeType:"Create",inputNames:[{name:"neutralPlayer",key:"neutralPlayer"},{name:"locationDeck",key:"locationDeck"}],outputNames:[{name:"location9",key:"location9"}]},
            {id:"location10",nodeType:"Create",inputNames:[{name:"neutralPlayer",key:"neutralPlayer"},{name:"locationDeck",key:"locationDeck"}],outputNames:[{name:"location10",key:"location10"}]},
        ]
    },

});