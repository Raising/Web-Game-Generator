gameDescription.nodes = Object.assign(gameDescription.nodes,
{
    smartCounter:{
        nodeType: "Create",
        name: "smartCounter",
        description: "smartCounter",
        inputNames:["name","value"],
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
        inputNames:["playerOwner"],
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
        inputNames:["playerOwner"],
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
        inputNames:["playerOwner"],
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
                inputNames:["playerOwner","parent"],
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
                inputNames:["playerOwner","parent"],
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
                inputNames:["playerOwner","parent"],
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
                inputNames:["playerOwner","parent"],
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
                inputNames:["playerOwner","parent"],
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
                inputNames:["playerOwner","parent"],
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
                inputNames:["playerOwner","parent"],
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
                inputNames:["playerOwner","parent"],
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
                inputNames:["playerOwner","parent"],
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
                inputNames:["playerOwner","parent"],
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
        inputNames:["playerOwner"],
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
                inputNames:["playerOwner","parent"],
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
                inputNames:["playerOwner","parent"],
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
                inputNames:["playerOwner","parent"],
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
                inputNames:["playerOwner","parent"],
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
                inputNames:["playerOwner","parent"],
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
                inputNames:["playerOwner","parent"],
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
                inputNames:["playerOwner","parent"],
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
                inputNames:["playerOwner","parent"],
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
                inputNames:["playerOwner","parent"],
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
                inputNames:["playerOwner","parent"],
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