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
            {nodeType:"Primitive", outputNames:[{value:"string:roundCounter",name:"string:roundCounter"}], value: "ROUND_COUNTER"},
            {nodeType:"Primitive", outputNames:[{value:"string:turnCounter",name:"string:turnCounter"}], value: "TURN_COUNTER"},
            {nodeType:"Primitive", outputNames:[{value:"value:cero",name:"value:cero"}], value: 0},
            {id:"smartCounter",nodeType:"Create",inputNames:[{value:"string:roundCounter",name:"string:roundCounter"},{value:"value:cero",name:"value:cero"}],outputNames:[{value:"roundCounter",name:"roundCounter"}]},
            {id:"smartCounter",nodeType:"Create",inputNames:[{value:"string:turnCounter",name:"string:turnCounter"},{value:"value:cero",name:"value:cero"}],outputNames:[{value:"turnCounter",name:"turnCounter"}]},
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
        name:"selectChampion",description:"selectChampion", inputNames:[{value:"player",name:"player"}], nodes:[
        {id:"selectChampionFromHand",nodeType:"Selector", inputNames:[{value:"player",name:"player"}],outputNames:[{value:"selectedChampion",name:"selectedChampion"}]},
        {nodeType:"Primitive",inputNames:[{value:"player",name:"player"}], value: {type:"param",name:"player",attribute:"battleArea"}, outputNames:[{value:"battleArea",name:"battleArea"}]},
        {id:"moveEntityTo",nodeType:"Modify", inputNames:[{value:"selectedChampion",name:"selectedChampion"},{value:"battleArea",name:"battleArea"}]},
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
        }, outputNames:[{value:"winnerPlayer",name:"winnerPlayer"}]},
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
        name:"cleanBattleArea",description:"clean Battle area ",inputNames:[{value:"player",name:"player"}],nodes:[
        {nodeType:"Primitive",inputNames:[{value:"player",name:"player"}], value: {type:"param",name:"player",attribute:"legacyArea"}, outputNames:[{value:"legacyArea",name:"legacyArea"}]},
        {nodeType:"Primitive",inputNames:[{value:"player",name:"player"}], value: {type:"param",name:"player",attribute:"battleArea.first"}, outputNames:[{value:"battleChampion",name:"battleChampion"}]},
        {id:"moveEntityTo",nodeType:"Modify", inputNames:[{value:"battleChampion",name:"battleChampion"},{value:"legacyArea",name:"legacyArea"}]},

    ]},



    initPlayersDecks:{
        nodeType:"Flow",
        name:"initPlayersDecks",description:"initPlayersDecks", inputNames:[{value:"player",name:"player"}],nodes:[
            {nodeType:"Primitive", outputNames:[{value:"string:hand",name:"string:hand"}], value: "hand"},
            {id:"createPlayerHand", inputNames:[{value:"player",name:"player"}],outputNames:[{value:"playerhand",name:"playerhand"}]},
            {id:"addProperty",nodeType:"Modify", inputNames:[{value:"player",name:"player"},{value:"string:hand",name:"string:hand"},{value:"playerhand",name:"playerhand"}]},
            
            {nodeType:"Primitive", outputNames:[{name:"string:battleArea",value:"string:battleArea"}], value: "battleArea"},
            {id:"playerBattleArea",nodeType:"Create", inputNames:[{value:"player",name:"player"}],outputNames:[{name:"playerBattleArea",value:"playerBattleArea"}]},
            {id:"addProperty",nodeType:"Modify", inputNames:[{value:"player",name:"player"},{name:"string:battleArea",value:"string:battleArea"},{name:"playerBattleArea",value:"playerBattleArea"}]},

            {nodeType:"Primitive", outputNames:[{name:"string:legacyArea",value:"string:legacyArea"}], value: "legacyArea"},
            {id:"playerLegacyArea",nodeType:"Create", inputNames:[{value:"player",name:"player"}],outputNames:[{name:"playerLegacyArea",value:"playerLegacyArea"}]},
            {id:"addProperty",nodeType:"Modify", inputNames:[{value:"player",name:"player"},{name:"string:legacyArea",value:"string:legacyArea"},{name:"playerLegacyArea",value:"playerLegacyArea"}]},
    ]},
    
    initLocationsDeck:{
        nodeType:"Flow",
        name:"initLocationsDeck",description:"initLocationsDeck",nodes:[
            {nodeType:"Primitive", outputNames:[{value:"neutralPlayer",name:"neutralPlayer"}], value: "neutralPlayer"},
            {id:"createLocationDeck", inputNames:[{value:"neutralPlayer",name:"neutralPlayer"}]},
    ]},

    initPlayersScrore:{
        nodeType:"Flow",
        name:"initPlayersScrore",description:"initPlayersScrore",nodes:[]},

    createPlayerHand:{
        nodeType:"Flow",
        name:"createPlayerHand",
        description:"Create Player hand and its cards",
        inputNames:[{name:"playerOwner",value:"playerOwner"}],
        outputNames:[{name:"playerHand",value:"playerHand"}],
        nodes:[
            {id:"playerHand",nodeType:"Create",inputNames:[{name:"playerOwner",value:"playerOwner"}],outputNames:[{name:"playerHand",value:"playerHand"}]},
            {id:"champion1",nodeType:"Create",inputNames:[{name:"playerOwner",value:"playerOwner"},{name:"playerHand",value:"playerHand"}],outputNames:[{name:"monk",value:"monk"}]},
            {id:"champion2",nodeType:"Create",inputNames:[{name:"playerOwner",value:"playerOwner"},{name:"playerHand",value:"playerHand"}],outputNames:[{name:"necromancer",value:"necromancer"}]},
            {id:"champion3",nodeType:"Create",inputNames:[{name:"playerOwner",value:"playerOwner"},{name:"playerHand",value:"playerHand"}],outputNames:[{name:"assasin",value:"assasin"}]},
            {id:"champion4",nodeType:"Create",inputNames:[{name:"playerOwner",value:"playerOwner"},{name:"playerHand",value:"playerHand"}],outputNames:[{name:"wizard",value:"wizard"}]},
            {id:"champion5",nodeType:"Create",inputNames:[{name:"playerOwner",value:"playerOwner"},{name:"playerHand",value:"playerHand"}],outputNames:[{name:"paladin",value:"paladin"}]},
            {id:"champion6",nodeType:"Create",inputNames:[{name:"playerOwner",value:"playerOwner"},{name:"playerHand",value:"playerHand"}],outputNames:[{name:"ranger",value:"ranger"}]},
            {id:"champion7",nodeType:"Create",inputNames:[{name:"playerOwner",value:"playerOwner"},{name:"playerHand",value:"playerHand"}],outputNames:[{name:"druid",value:"druid"}]},
            {id:"champion8",nodeType:"Create",inputNames:[{name:"playerOwner",value:"playerOwner"},{name:"playerHand",value:"playerHand"}],outputNames:[{name:"warrior",value:"warrior"}]},
            {id:"champion9",nodeType:"Create",inputNames:[{name:"playerOwner",value:"playerOwner"},{name:"playerHand",value:"playerHand"}],outputNames:[{name:"knight",value:"knight"}]},
            {id:"champion10",nodeType:"Create",inputNames:[{name:"playerOwner",value:"playerOwner"},{name:"playerHand",value:"playerHand"}],outputNames:[{name:"barbarian",value:"barbarian"}]},
        ]
    },

    createLocationDeck:{
        nodeType:"Flow",
        name:"createLocationDeck",
        description:"Create the location Deck",
        inputNames:[{name:"neutralPlayer",value:"neutralPlayer"}],
        outputNames:[{name:"locationDeck",value:"locationDeck"}],
        nodes:[
            {id:"locationDeck",nodeType:"Create",inputNames:[{name:"neutralPlayer",value:"neutralPlayer"}],outputNames:[{name:"locationDeck",value:"locationDeck"}]},
            {id:"location1",nodeType:"Create",inputNames:[{name:"neutralPlayer",value:"neutralPlayer"},{name:"locationDeck",value:"locationDeck"}],outputNames:[{name:"location1",value:"location1"}]},
            {id:"location2",nodeType:"Create",inputNames:[{name:"neutralPlayer",value:"neutralPlayer"},{name:"locationDeck",value:"locationDeck"}],outputNames:[{name:"location2",value:"location2"}]},
            {id:"location3",nodeType:"Create",inputNames:[{name:"neutralPlayer",value:"neutralPlayer"},{name:"locationDeck",value:"locationDeck"}],outputNames:[{name:"location3",value:"location3"}]},
            {id:"location4",nodeType:"Create",inputNames:[{name:"neutralPlayer",value:"neutralPlayer"},{name:"locationDeck",value:"locationDeck"}],outputNames:[{name:"location4",value:"location4"}]},
            {id:"location5",nodeType:"Create",inputNames:[{name:"neutralPlayer",value:"neutralPlayer"},{name:"locationDeck",value:"locationDeck"}],outputNames:[{name:"location5",value:"location5"}]},
            {id:"location6",nodeType:"Create",inputNames:[{name:"neutralPlayer",value:"neutralPlayer"},{name:"locationDeck",value:"locationDeck"}],outputNames:[{name:"location6",value:"location6"}]},
            {id:"location7",nodeType:"Create",inputNames:[{name:"neutralPlayer",value:"neutralPlayer"},{name:"locationDeck",value:"locationDeck"}],outputNames:[{name:"location7",value:"location7"}]},
            {id:"location8",nodeType:"Create",inputNames:[{name:"neutralPlayer",value:"neutralPlayer"},{name:"locationDeck",value:"locationDeck"}],outputNames:[{name:"location8",value:"location8"}]},
            {id:"location9",nodeType:"Create",inputNames:[{name:"neutralPlayer",value:"neutralPlayer"},{name:"locationDeck",value:"locationDeck"}],outputNames:[{name:"location9",value:"location9"}]},
            {id:"location10",nodeType:"Create",inputNames:[{name:"neutralPlayer",value:"neutralPlayer"},{name:"locationDeck",value:"locationDeck"}],outputNames:[{name:"location10",value:"location10"}]},
        ]
    },

});