var gameDescription = {
    players:[],
    nodes:{}
}
gameDescription.nodes = Object.assign(gameDescription.nodes,
{
    smartCounter:{
        nodeType: "Create",
        name: "smartCounter",
        description: "smartCounter",
        inputNames:[{key:"name",name:"name"},{key:"value",name:"value"}],
        attributes:{
            type: "smartCounter",
            name: {type:"param",name:"name"},
            value: {type:"param",name:"value"}
        }
    },

     playerLegacyArea:{
         nodeType: "Create",
         name: "playerLegacyArea",
        description: "Player LegacyArea",
        inputNames:[{key:"playerOwner",name:"playerOwner"}],
        attributes:{
            type: "cardLegacyArea",
            name: {
                baseValue:  {type:"param",name:"playerOwner",attribute:"name"},
                operations: [  {operator:"+",operands:["_LegacyArea"]}   ]
            },
            owner: {type:"param",name:"playerOwner"},
            location: {type:"param",name:"playerOwner"}
        }
    },
 
     playerBattleArea:{
         nodeType: "Create",
         name: "playerBattleArea",
        description: "Player BattleArea",
        inputNames:[{key:"playerOwner",name:"playerOwner"}],
        attributes:{
            type: "cardBattleArea",
            name: {
                baseValue:  {type:"param",name:"playerOwner",attribute:"name"},
                operations: [  {operator:"+",operands:["_BattleArea"]}   ]
            },
            owner: {type:"param",name:"playerOwner"},
            location: {type:"param",name:"playerOwner"}
        }
    },
 

    playerHand:{
        nodeType: "Create",
        name: "playerHand",
        description: "Player Hand",
        inputNames:[{key:"playerOwner",name:"playerOwner"}],
        attributes:{
            type: "cardHand",
            name: {
                baseValue:  {type:"param",name:"playerOwner",attribute:"name"},
                operations: [  {operator:"+",operands:["_Hand"]}   ]
            },
            owner: {type:"param",name:"playerOwner"},
            location: {type:"param",name:"playerOwner"}
        }
    },
 
            champion1:{
                nodeType: "Create",
                name: "champion1",
                description: "Champion: Monk",
                inputNames:[{name:"playerOwner",key:"playerOwner"},{name:"parent",key:"parent"}],
                attributes:{
                    type: "card",
                    name: "MONK",
                    power: 0,
                    race: "human",
                    battleSkill: "NOT DEFINED YET FLOW NODE",
                    legacySkill: "NOT DEFINED YET FLOW NODE",
                    owner: {type:"param",name:"playerOwner"},
                    location: {type:"param",name:"parent"}
                }
            },
            champion2: {
                nodeType: "Create",
                name: "champion2",
                description: "Champion: Necromancer",
                inputNames:[{name:"playerOwner",key:"playerOwner"},{name:"parent",key:"parent"}],
                attributes:{
                    type: "card",
                    name: "NECROMANCER",
                    power: 1,
                    race: "undead",
                    battleSkill: "NOT DEFINED YET FLOW NODE",
                    legacySkill: "NOT DEFINED YET FLOW NODE",
                    owner: {type:"param",name:"playerOwner"},
                    location: {type:"param",name:"parent"}
                }
            },
            champion3: {
                nodeType: "Create",
                name: "champion3",
                description: "Champion: Assasin",
                inputNames:[{name:"playerOwner",key:"playerOwner"},{name:"parent",key:"parent"}],
                attributes:{
                    type: "card",
                    name: "ASSASIN",
                    power: 2,
                    race: "dark elf",
                    battleSkill: "NOT DEFINED YET FLOW NODE",
                    legacySkill: "NOT DEFINED YET FLOW NODE",
                    owner: {type:"param",name:"playerOwner"},
                    location: {type:"param",name:"parent"}
                }
            },
            champion4: {
                nodeType: "Create",
                name: "champion4",
                description: "Champion: Wizard",
                inputNames:[{name:"playerOwner",key:"playerOwner"},{name:"parent",key:"parent"}],
                attributes:{
                    type: "card",
                    name: "WIZARD",
                    power: 3,
                    race: "human",
                    battleSkill: "NOT DEFINED YET FLOW NODE",
                    legacySkill: "NOT DEFINED YET FLOW NODE",
                    owner: {type:"param",name:"playerOwner"},
                    location: {type:"param",name:"parent"}
                }
            },
            champion5: {
                nodeType: "Create",
                name: "champion5",
                description: "Champion: Paladin",
                inputNames:[{name:"playerOwner",key:"playerOwner"},{name:"parent",key:"parent"}],
                attributes:{
                    type: "card",
                    name: "PALADIN",
                    power: 4,
                    race: "human",
                    battleSkill: "NOT DEFINED YET FLOW NODE",
                    legacySkill: "NOT DEFINED YET FLOW NODE",
                    owner: {type:"param",name:"playerOwner"},
                    location: {type:"param",name:"parent"}
                }
            },
            champion6: {
                nodeType: "Create",
                name: "champion6",
                description: "Champion: Ranger",
                inputNames:[{name:"playerOwner",key:"playerOwner"},{name:"parent",key:"parent"}],
                attributes:{
                    type: "card",
                    name: "RANGER",
                    power: 5,
                    race: "human",
                    battleSkill: "NOT DEFINED YET FLOW NODE",
                    legacySkill: "NOT DEFINED YET FLOW NODE",
                    owner: {type:"param",name:"playerOwner"},
                    location: {type:"param",name:"parent"}
                }
            },
            champion7: {
                nodeType: "Create",
                name: "champion7",
                description: "Champion: Druid",
                inputNames:[{name:"playerOwner",key:"playerOwner"},{name:"parent",key:"parent"}],
                attributes:{
                    type: "card",
                    name: "DRUID",
                    power: 6,
                    race: "elf",
                    battleSkill: "NOT DEFINED YET FLOW NODE",
                    legacySkill: "NOT DEFINED YET FLOW NODE",
                    owner: {type:"param",name:"playerOwner"},
                    location: {type:"param",name:"parent"}
                }
            },
            champion8: {
                nodeType: "Create",
                name: "champion8",
                description: "Champion: Warrior",
                inputNames:[{name:"playerOwner",key:"playerOwner"},{name:"parent",key:"parent"}],
                attributes:{
                    type: "card",
                    name: "WARRIOR",
                    power: 7,
                    race: "dwarf",
                    battleSkill: "NOT DEFINED YET FLOW NODE",
                    legacySkill: "NOT DEFINED YET FLOW NODE",
                    owner: {type:"param",name:"playerOwner"},
                    location: {type:"param",name:"parent"}
                }
            },
            champion9: {
                nodeType: "Create",
                name: "champion9",
                description: "Champion: Knight",
                inputNames:[{name:"playerOwner",key:"playerOwner"},{name:"parent",key:"parent"}],
                attributes:{
                    type: "card",
                    name: "KNIGHT",
                    power: 8,
                    race: "human",
                    battleSkill: "NOT DEFINED YET FLOW NODE",
                    legacySkill: "NOT DEFINED YET FLOW NODE",
                    owner: {type:"param",name:"playerOwner"},
                    location: {type:"param",name:"parent"}
                }
            },
            champion10: {
                nodeType: "Create",
                name: "champion10",
                description: "Champion: Barbarian",
                inputNames:[{name:"playerOwner",key:"playerOwner"},{name:"parent",key:"parent"}],
                attributes:{
                    type: "card",
                    name: "BARBARIAN",
                    power: 9,
                    race: "ork",
                    battleSkill: "NOT DEFINED YET FLOW NODE",
                    legacySkill: "NOT DEFINED YET FLOW NODE",
                    owner: {type:"param",name:"playerOwner"},
                    location: {type:"param",name:"parent"}
                }
            },

    locationDeck:{
        nodeType: "Create",
        name: "locationDeck",
        description: "Location Deck",
        inputNames:[{key:"playerOwner",name:"playerOwner"}],
        attributes:{
            type: "cardDeck",
            name: "Locations Deck",
            owner: {type:"param",name:"playerOwner"},
        },
    },

            location1:{
                nodeType: "Create",
                name: "location1",
                description: "Location: Then Endless Green",
                inputNames:[{name:"playerOwner",key:"playerOwner"},{name:"parent",key:"parent"}],
                attributes:{
                    type: "card",
                    name: "The Endless Green",
                    reward: 1,
                    combatEffect: "NOT DEFINED YET FLOW NODE",
                    owner: {type:"param",name:"playerOwner"},
                    location: {type:"param",name:"parent"}
                }
            },
            location2:{
                nodeType: "Create",
                name: "location2",
                description: "Location: Cathedral Of Light",
                inputNames:[{name:"playerOwner",key:"playerOwner"},{name:"parent",key:"parent"}],
                attributes:{
                    type: "card",
                    name: "Cathedral Of Light",
                    reward: 2,
                    combatEffect: "NOT DEFINED YET FLOW NODE",
                    owner: {type:"param",name:"playerOwner"},
                    location: {type:"param",name:"parent"}
                }
            },
            location3:{
                nodeType: "Create",
                name: "location3",
                description: "Location: Shadow Keep",
                inputNames:[{name:"playerOwner",key:"playerOwner"},{name:"parent",key:"parent"}],
                attributes:{
                    type: "card",
                    name: "Shadow Keep",
                    reward: 2,
                    combatEffect: "NOT DEFINED YET FLOW NODE",
                    owner: {type:"param",name:"playerOwner"},
                    location: {type:"param",name:"parent"}
                }
            },
            location4:{
                nodeType: "Create",
                name: "location4",
                description: "Location: Camerion's Tower",
                inputNames:[{name:"playerOwner",key:"playerOwner"},{name:"parent",key:"parent"}],
                attributes:{
                    type: "card",
                    name: "Camerion's Tower",
                    reward: 2,
                    combatEffect: "NOT DEFINED YET FLOW NODE",
                    owner: {type:"param",name:"playerOwner"},
                    location: {type:"param",name:"parent"}
                }
            },
            location5:{
                nodeType: "Create",
                name: "location5",
                description: "Location: Nethil Yara",
                inputNames:[{name:"playerOwner",key:"playerOwner"},{name:"parent",key:"parent"}],
                attributes:{
                    type: "card",
                    name: "Nethil Yara",
                    reward: 3,
                    combatEffect: "NOT DEFINED YET FLOW NODE",
                    owner: {type:"param",name:"playerOwner"},
                    location: {type:"param",name:"parent"}
                }
            },
            location6:{
                nodeType: "Create",
                name: "location6",
                description: "Location: Temple Of Shin Ti Lal",
                inputNames:[{name:"playerOwner",key:"playerOwner"},{name:"parent",key:"parent"}],
                attributes:{
                    type: "card",
                    name: "Temple Of Shin Ti Lal",
                    reward: 4,
                    combatEffect: "NOT DEFINED YET FLOW NODE",
                    owner: {type:"param",name:"playerOwner"},
                    location: {type:"param",name:"parent"}
                }
            },
            location7:{
                nodeType: "Create",
                name: "location7",
                description: "Location: Baladon's Rock",
                inputNames:[{name:"playerOwner",key:"playerOwner"},{name:"parent",key:"parent"}],
                attributes:{
                    type: "card",
                    name: "Baladon's Rock",
                    reward: 3,
                    combatEffect: "NOT DEFINED YET FLOW NODE",
                    owner: {type:"param",name:"playerOwner"},
                    location: {type:"param",name:"parent"}
                }
            },
            location8:{
                nodeType: "Create",
                name: "location8",
                description: "Location: Ravager's Wastes",
                inputNames:[{name:"playerOwner",key:"playerOwner"},{name:"parent",key:"parent"}],
                attributes:{
                    type: "card",
                    name: "Ravager's Wastes",
                    reward: 1,
                    combatEffect: "NOT DEFINED YET FLOW NODE",
                    owner: {type:"param",name:"playerOwner"},
                    location: {type:"param",name:"parent"}
                }
            },
            location9:{
                nodeType: "Create",
                name: "location9",
                description: "Location: Kingdom Of Astaria",
                inputNames:[{name:"playerOwner",key:"playerOwner"},{name:"parent",key:"parent"}],
                attributes:{
                    type: "card",
                    name: "Kingdom Of Astaria",
                    reward: 3,
                    combatEffect: "NOT DEFINED YET FLOW NODE",
                    owner: {type:"param",name:"playerOwner"},
                    location: {type:"param",name:"parent"}
                }
            },
            location10:{
                nodeType: "Create",
                name: "location10",
                description: "Location: Pit Of Souls",
                inputNames:[{name:"playerOwner",key:"playerOwner"},{name:"parent",key:"parent"}],
                attributes:{
                    type: "card",
                    name: "Pit Of Souls",
                    reward: 1,
                    combatEffect: "NOT DEFINED YET FLOW NODE",
                    owner: {type:"param",name:"playerOwner"},
                    location: {type:"param",name:"parent"}
                }
            },
});
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
gameDescription.nodes = Object.assign(gameDescription.nodes, 
{
    increaseRoundCounter:{
        nodeType:"Modify",
        name:"increaseRoundCounter",
        description: "add one to the ROUND_COUNTER value",
        entity: {type:"entityByName",name:"ROUND_COUNTER"},
        attribute: "value",
        newValue: {
            baseValue: {type:"entityProperty",entity:"ROUND_COUNTER",attribute:"value"},
            operations: [
                {operator:"+",operands:[1]}
            ]
        }
    },
    increaseTurnCounter:{
        nodeType:"Modify",
        name:"increaseTurnCounter",
        description: "add one to the TURN_COUNTER value",
        entity: {type:"entityByName",name:"TURN_COUNTER"},
        attribute: "value",
        newValue: {
            baseValue: {type:"entityProperty",entity:"TURN_COUNTER",attribute:"value"},
            operations: [
                {operator:"+",operands:[1]}
            ]
        }
    },
    resetTurnCounter:{
        nodeType:"Modify",
        name:"resetTurnCounter",
        description: "set TURN_COUNTER value to 0",
        entity: {type:"entityByName",name:"TURN_COUNTER"},
        attribute: "value",
        newValue: {
            baseValue: 0,
        }
    },
    moveEntityTo:{
        nodeType:"Modify",
        name:"moveEntityTo",
        description: "move entity to other location",
        inputNames:[{name:"entity",key:"entity"},{name:"nextLocation",key:"nextLocation"}],
        outputNames:[],
        entity: {type:"param",name:"entity"},
        attribute: "location",
        newValue: {
            baseValue: {type:"param",name:"nextLocation"},
        }
    },

    addProperty:{
        nodeType:"Modify",
        name:"addProperty",
        description: "add Property to entity",
        inputNames:[{name:"entity",key:"entity"},{name:"propertyName",key:"propertyName"},{name:"propertyValue",key:"propertyValue"}],
        outputNames:[],
        entity: {type:"param",name:"entity"},
        attribute: {type:"param",name:"propertyName"},
        newValue:  {type:"param",name:"propertyValue"},
        
    }
});
gameDescription.players =[
    {
        description:"First Player",
        name:"Player A"
    },
    {
        description:"Second Player",
        name:"Player B"
    },
    ];
gameDescription.nodes = Object.assign(gameDescription.nodes, 
{
     selectChampionFromHand:{
         nodeType:"Selector",
         name:"selectChampionFromHand",
         description:"select Champion From a Player Hand", 
         inputNames:[{name:"player",key:"player"}], 
        whoSelect:{type:"param",name:"player"},
        options:[
            {scope:{type:"param",name:"player",attribute:"hand.children"},restrictions:[]}
        ]
    },
});export default gameDescription;