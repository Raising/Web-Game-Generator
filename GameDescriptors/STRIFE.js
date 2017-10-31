/*
 * web_game_generator 2.0.0
 * Platform to play and create tabletoplike games
 *
 * 
 *
 * Copyright 2017, Ignacio Medina Castillo 
 *
 * Released on: October 30, 2017
*/
import PYC from '..\\..\\module\\PrototypeClass';
import React, { Component } from "react";
/*gameDescription.js:0    */ var gameDescription = {
/*gameDescription.js:1    */     players:[],
/*gameDescription.js:2    */     nodes:{
/*gameDescription.js:3    */         Create:{},
/*gameDescription.js:4    */         Flow:{},
/*gameDescription.js:5    */         Modify:{},
/*gameDescription.js:6    */         Select:{}
/*gameDescription.js:7    */     }
/*gameDescription.js:8    */ }
/*createNodes.js:0        */ gameDescription.nodes.Create = 
/*createNodes.js:1        */ {
/*createNodes.js:2        */     smartCounter:{
/*createNodes.js:3        */         description: "smartCounter",
/*createNodes.js:4        */         inputNames:["name","value"],
/*createNodes.js:5        */         attributes:{
/*createNodes.js:6        */             type: "smartCounter",
/*createNodes.js:7        */             name: {type:"param",name:"name"},
/*createNodes.js:8        */             value: {type:"param",name:"value"}
/*createNodes.js:9        */         },
/*createNodes.js:10       */     },
/*createNodes.js:11       */ 
/*createNodes.js:12       */      playerLegacyArea:{
/*createNodes.js:13       */         description: "Player LegacyArea",
/*createNodes.js:14       */         inputNames:["playerOwner"],
/*createNodes.js:15       */         attributes:{
/*createNodes.js:16       */             type: "cardLegacyArea",
/*createNodes.js:17       */             name: {
/*createNodes.js:18       */                 baseValue:  {type:"param",name:"playerOwner",attribute:"name"},
/*createNodes.js:19       */                 operations: [  {operator:"+",operands:["_LegacyArea"]}   ]
/*createNodes.js:20       */             },
/*createNodes.js:21       */             owner: {type:"param",name:"playerOwner"},
/*createNodes.js:22       */             location: {type:"param",name:"playerOwner"}
/*createNodes.js:23       */         },
/*createNodes.js:24       */     },
/*createNodes.js:25       */  
/*createNodes.js:26       */      playerBattleArea:{
/*createNodes.js:27       */         description: "Player BattleArea",
/*createNodes.js:28       */         inputNames:["playerOwner"],
/*createNodes.js:29       */         attributes:{
/*createNodes.js:30       */             type: "cardBattleArea",
/*createNodes.js:31       */             name: {
/*createNodes.js:32       */                 baseValue:  {type:"param",name:"playerOwner",attribute:"name"},
/*createNodes.js:33       */                 operations: [  {operator:"+",operands:["_BattleArea"]}   ]
/*createNodes.js:34       */             },
/*createNodes.js:35       */             owner: {type:"param",name:"playerOwner"},
/*createNodes.js:36       */             location: {type:"param",name:"playerOwner"}
/*createNodes.js:37       */         },
/*createNodes.js:38       */     },
/*createNodes.js:39       */  
/*createNodes.js:40       */ 
/*createNodes.js:41       */     playerHand:{
/*createNodes.js:42       */         description: "Player Hand",
/*createNodes.js:43       */         inputNames:["playerOwner"],
/*createNodes.js:44       */         attributes:{
/*createNodes.js:45       */             type: "cardHand",
/*createNodes.js:46       */             name: {
/*createNodes.js:47       */                 baseValue:  {type:"param",name:"playerOwner",attribute:"name"},
/*createNodes.js:48       */                 operations: [  {operator:"+",operands:["_Hand"]}   ]
/*createNodes.js:49       */             },
/*createNodes.js:50       */             owner: {type:"param",name:"playerOwner"},
/*createNodes.js:51       */             location: {type:"param",name:"playerOwner"}
/*createNodes.js:52       */         },
/*createNodes.js:53       */     },
/*createNodes.js:54       */  
/*createNodes.js:55       */             champion1: {
/*createNodes.js:56       */                 description: "Champion: Monk",
/*createNodes.js:57       */                 inputNames:["playerOwner","parent"],
/*createNodes.js:58       */                 attributes:{
/*createNodes.js:59       */                     type: "card",
/*createNodes.js:60       */                     name: "MONK",
/*createNodes.js:61       */                     power: 0,
/*createNodes.js:62       */                     race: "human",
/*createNodes.js:63       */                     battleSkill: "NOT DEFINED YET FLOW NODE",
/*createNodes.js:64       */                     legacySkill: "NOT DEFINED YET FLOW NODE",
/*createNodes.js:65       */                     owner: {type:"param",name:"playerOwner"},
/*createNodes.js:66       */                     location: {type:"param",name:"parent"}
/*createNodes.js:67       */                 }
/*createNodes.js:68       */             },
/*createNodes.js:69       */             champion2: {
/*createNodes.js:70       */                 description: "Champion: Necromancer",
/*createNodes.js:71       */                 inputNames:["playerOwner","parent"],
/*createNodes.js:72       */                 attributes:{
/*createNodes.js:73       */                     type: "card",
/*createNodes.js:74       */                     name: "NECROMANCER",
/*createNodes.js:75       */                     power: 1,
/*createNodes.js:76       */                     race: "undead",
/*createNodes.js:77       */                     battleSkill: "NOT DEFINED YET FLOW NODE",
/*createNodes.js:78       */                     legacySkill: "NOT DEFINED YET FLOW NODE",
/*createNodes.js:79       */                     owner: {type:"param",name:"playerOwner"},
/*createNodes.js:80       */                     location: {type:"param",name:"parent"}
/*createNodes.js:81       */                 }
/*createNodes.js:82       */             },
/*createNodes.js:83       */             champion3: {
/*createNodes.js:84       */                 description: "Champion: Assasin",
/*createNodes.js:85       */                 inputNames:["playerOwner","parent"],
/*createNodes.js:86       */                 attributes:{
/*createNodes.js:87       */                     type: "card",
/*createNodes.js:88       */                     name: "ASSASIN",
/*createNodes.js:89       */                     power: 2,
/*createNodes.js:90       */                     race: "dark elf",
/*createNodes.js:91       */                     battleSkill: "NOT DEFINED YET FLOW NODE",
/*createNodes.js:92       */                     legacySkill: "NOT DEFINED YET FLOW NODE",
/*createNodes.js:93       */                     owner: {type:"param",name:"playerOwner"},
/*createNodes.js:94       */                     location: {type:"param",name:"parent"}
/*createNodes.js:95       */                 }
/*createNodes.js:96       */             },
/*createNodes.js:97       */             champion4: {
/*createNodes.js:98       */                 description: "Champion: Wizard",
/*createNodes.js:99       */                 inputNames:["playerOwner","parent"],
/*createNodes.js:100      */                 attributes:{
/*createNodes.js:101      */                     type: "card",
/*createNodes.js:102      */                     name: "WIZARD",
/*createNodes.js:103      */                     power: 3,
/*createNodes.js:104      */                     race: "human",
/*createNodes.js:105      */                     battleSkill: "NOT DEFINED YET FLOW NODE",
/*createNodes.js:106      */                     legacySkill: "NOT DEFINED YET FLOW NODE",
/*createNodes.js:107      */                     owner: {type:"param",name:"playerOwner"},
/*createNodes.js:108      */                     location: {type:"param",name:"parent"}
/*createNodes.js:109      */                 }
/*createNodes.js:110      */             },
/*createNodes.js:111      */             champion5: {
/*createNodes.js:112      */                 description: "Champion: Paladin",
/*createNodes.js:113      */                 inputNames:["playerOwner","parent"],
/*createNodes.js:114      */                 attributes:{
/*createNodes.js:115      */                     type: "card",
/*createNodes.js:116      */                     name: "PALADIN",
/*createNodes.js:117      */                     power: 4,
/*createNodes.js:118      */                     race: "human",
/*createNodes.js:119      */                     battleSkill: "NOT DEFINED YET FLOW NODE",
/*createNodes.js:120      */                     legacySkill: "NOT DEFINED YET FLOW NODE",
/*createNodes.js:121      */                     owner: {type:"param",name:"playerOwner"},
/*createNodes.js:122      */                     location: {type:"param",name:"parent"}
/*createNodes.js:123      */                 }
/*createNodes.js:124      */             },
/*createNodes.js:125      */             champion6: {
/*createNodes.js:126      */                 description: "Champion: Ranger",
/*createNodes.js:127      */                 inputNames:["playerOwner","parent"],
/*createNodes.js:128      */                 attributes:{
/*createNodes.js:129      */                     type: "card",
/*createNodes.js:130      */                     name: "RANGER",
/*createNodes.js:131      */                     power: 5,
/*createNodes.js:132      */                     race: "human",
/*createNodes.js:133      */                     battleSkill: "NOT DEFINED YET FLOW NODE",
/*createNodes.js:134      */                     legacySkill: "NOT DEFINED YET FLOW NODE",
/*createNodes.js:135      */                     owner: {type:"param",name:"playerOwner"},
/*createNodes.js:136      */                     location: {type:"param",name:"parent"}
/*createNodes.js:137      */                 }
/*createNodes.js:138      */             },
/*createNodes.js:139      */             champion7: {
/*createNodes.js:140      */                 description: "Champion: Druid",
/*createNodes.js:141      */                 inputNames:["playerOwner","parent"],
/*createNodes.js:142      */                 attributes:{
/*createNodes.js:143      */                     type: "card",
/*createNodes.js:144      */                     name: "DRUID",
/*createNodes.js:145      */                     power: 6,
/*createNodes.js:146      */                     race: "elf",
/*createNodes.js:147      */                     battleSkill: "NOT DEFINED YET FLOW NODE",
/*createNodes.js:148      */                     legacySkill: "NOT DEFINED YET FLOW NODE",
/*createNodes.js:149      */                     owner: {type:"param",name:"playerOwner"},
/*createNodes.js:150      */                     location: {type:"param",name:"parent"}
/*createNodes.js:151      */                 }
/*createNodes.js:152      */             },
/*createNodes.js:153      */             champion8: {
/*createNodes.js:154      */                 description: "Champion: Warrior",
/*createNodes.js:155      */                 inputNames:["playerOwner","parent"],
/*createNodes.js:156      */                 attributes:{
/*createNodes.js:157      */                     type: "card",
/*createNodes.js:158      */                     name: "WARRIOR",
/*createNodes.js:159      */                     power: 7,
/*createNodes.js:160      */                     race: "dwarf",
/*createNodes.js:161      */                     battleSkill: "NOT DEFINED YET FLOW NODE",
/*createNodes.js:162      */                     legacySkill: "NOT DEFINED YET FLOW NODE",
/*createNodes.js:163      */                     owner: {type:"param",name:"playerOwner"},
/*createNodes.js:164      */                     location: {type:"param",name:"parent"}
/*createNodes.js:165      */                 }
/*createNodes.js:166      */             },
/*createNodes.js:167      */             champion9: {
/*createNodes.js:168      */                 description: "Champion: Knight",
/*createNodes.js:169      */                 inputNames:["playerOwner","parent"],
/*createNodes.js:170      */                 attributes:{
/*createNodes.js:171      */                     type: "card",
/*createNodes.js:172      */                     name: "KNIGHT",
/*createNodes.js:173      */                     power: 8,
/*createNodes.js:174      */                     race: "human",
/*createNodes.js:175      */                     battleSkill: "NOT DEFINED YET FLOW NODE",
/*createNodes.js:176      */                     legacySkill: "NOT DEFINED YET FLOW NODE",
/*createNodes.js:177      */                     owner: {type:"param",name:"playerOwner"},
/*createNodes.js:178      */                     location: {type:"param",name:"parent"}
/*createNodes.js:179      */                 }
/*createNodes.js:180      */             },
/*createNodes.js:181      */             champion10: {
/*createNodes.js:182      */                 description: "Champion: Barbarian",
/*createNodes.js:183      */                 inputNames:["playerOwner","parent"],
/*createNodes.js:184      */                 attributes:{
/*createNodes.js:185      */                     type: "card",
/*createNodes.js:186      */                     name: "BARBARIAN",
/*createNodes.js:187      */                     power: 9,
/*createNodes.js:188      */                     race: "ork",
/*createNodes.js:189      */                     battleSkill: "NOT DEFINED YET FLOW NODE",
/*createNodes.js:190      */                     legacySkill: "NOT DEFINED YET FLOW NODE",
/*createNodes.js:191      */                     owner: {type:"param",name:"playerOwner"},
/*createNodes.js:192      */                     location: {type:"param",name:"parent"}
/*createNodes.js:193      */                 }
/*createNodes.js:194      */             },
/*createNodes.js:195      */ 
/*createNodes.js:196      */     locationDeck:{
/*createNodes.js:197      */         description: "Location Deck",
/*createNodes.js:198      */         inputNames:["playerOwner"],
/*createNodes.js:199      */         attributes:{
/*createNodes.js:200      */             type: "cardDeck",
/*createNodes.js:201      */             name: "Locations Deck",
/*createNodes.js:202      */             owner: {type:"param",name:"playerOwner"},
/*createNodes.js:203      */         },
/*createNodes.js:204      */     },
/*createNodes.js:205      */ 
/*createNodes.js:206      */             location1:{
/*createNodes.js:207      */                 description: "Location: Then Endless Green",
/*createNodes.js:208      */                 inputNames:["playerOwner","parent"],
/*createNodes.js:209      */                 attributes:{
/*createNodes.js:210      */                     type: "card",
/*createNodes.js:211      */                     name: "The Endless Green",
/*createNodes.js:212      */                     reward: 1,
/*createNodes.js:213      */                     combatEffect: "NOT DEFINED YET FLOW NODE",
/*createNodes.js:214      */                     owner: {type:"param",name:"playerOwner"},
/*createNodes.js:215      */                     location: {type:"param",name:"parent"}
/*createNodes.js:216      */                 }
/*createNodes.js:217      */             },
/*createNodes.js:218      */             location2:{
/*createNodes.js:219      */                 description: "Location: Cathedral Of Light",
/*createNodes.js:220      */                 inputNames:["playerOwner","parent"],
/*createNodes.js:221      */                 attributes:{
/*createNodes.js:222      */                     type: "card",
/*createNodes.js:223      */                     name: "Cathedral Of Light",
/*createNodes.js:224      */                     reward: 2,
/*createNodes.js:225      */                     combatEffect: "NOT DEFINED YET FLOW NODE",
/*createNodes.js:226      */                     owner: {type:"param",name:"playerOwner"},
/*createNodes.js:227      */                     location: {type:"param",name:"parent"}
/*createNodes.js:228      */                 }
/*createNodes.js:229      */             },
/*createNodes.js:230      */             location3:{
/*createNodes.js:231      */                 description: "Location: Shadow Keep",
/*createNodes.js:232      */                 inputNames:["playerOwner","parent"],
/*createNodes.js:233      */                 attributes:{
/*createNodes.js:234      */                     type: "card",
/*createNodes.js:235      */                     name: "Shadow Keep",
/*createNodes.js:236      */                     reward: 2,
/*createNodes.js:237      */                     combatEffect: "NOT DEFINED YET FLOW NODE",
/*createNodes.js:238      */                     owner: {type:"param",name:"playerOwner"},
/*createNodes.js:239      */                     location: {type:"param",name:"parent"}
/*createNodes.js:240      */                 }
/*createNodes.js:241      */             },
/*createNodes.js:242      */             location4:{
/*createNodes.js:243      */                 description: "Location: Camerion's Tower",
/*createNodes.js:244      */                 inputNames:["playerOwner","parent"],
/*createNodes.js:245      */                 attributes:{
/*createNodes.js:246      */                     type: "card",
/*createNodes.js:247      */                     name: "Camerion's Tower",
/*createNodes.js:248      */                     reward: 2,
/*createNodes.js:249      */                     combatEffect: "NOT DEFINED YET FLOW NODE",
/*createNodes.js:250      */                     owner: {type:"param",name:"playerOwner"},
/*createNodes.js:251      */                     location: {type:"param",name:"parent"}
/*createNodes.js:252      */                 }
/*createNodes.js:253      */             },
/*createNodes.js:254      */             location5:{
/*createNodes.js:255      */                 description: "Location: Nethil Yara",
/*createNodes.js:256      */                 inputNames:["playerOwner","parent"],
/*createNodes.js:257      */                 attributes:{
/*createNodes.js:258      */                     type: "card",
/*createNodes.js:259      */                     name: "Nethil Yara",
/*createNodes.js:260      */                     reward: 3,
/*createNodes.js:261      */                     combatEffect: "NOT DEFINED YET FLOW NODE",
/*createNodes.js:262      */                     owner: {type:"param",name:"playerOwner"},
/*createNodes.js:263      */                     location: {type:"param",name:"parent"}
/*createNodes.js:264      */                 }
/*createNodes.js:265      */             },
/*createNodes.js:266      */             location6:{
/*createNodes.js:267      */                 description: "Location: Temple Of Shin Ti Lal",
/*createNodes.js:268      */                 inputNames:["playerOwner","parent"],
/*createNodes.js:269      */                 attributes:{
/*createNodes.js:270      */                     type: "card",
/*createNodes.js:271      */                     name: "Temple Of Shin Ti Lal",
/*createNodes.js:272      */                     reward: 4,
/*createNodes.js:273      */                     combatEffect: "NOT DEFINED YET FLOW NODE",
/*createNodes.js:274      */                     owner: {type:"param",name:"playerOwner"},
/*createNodes.js:275      */                     location: {type:"param",name:"parent"}
/*createNodes.js:276      */                 }
/*createNodes.js:277      */             },
/*createNodes.js:278      */             location7:{
/*createNodes.js:279      */                 description: "Location: Baladon's Rock",
/*createNodes.js:280      */                 inputNames:["playerOwner","parent"],
/*createNodes.js:281      */                 attributes:{
/*createNodes.js:282      */                     type: "card",
/*createNodes.js:283      */                     name: "Baladon's Rock",
/*createNodes.js:284      */                     reward: 3,
/*createNodes.js:285      */                     combatEffect: "NOT DEFINED YET FLOW NODE",
/*createNodes.js:286      */                     owner: {type:"param",name:"playerOwner"},
/*createNodes.js:287      */                     location: {type:"param",name:"parent"}
/*createNodes.js:288      */                 }
/*createNodes.js:289      */             },
/*createNodes.js:290      */             location8:{
/*createNodes.js:291      */                 description: "Location: Ravager's Wastes",
/*createNodes.js:292      */                 inputNames:["playerOwner","parent"],
/*createNodes.js:293      */                 attributes:{
/*createNodes.js:294      */                     type: "card",
/*createNodes.js:295      */                     name: "Ravager's Wastes",
/*createNodes.js:296      */                     reward: 1,
/*createNodes.js:297      */                     combatEffect: "NOT DEFINED YET FLOW NODE",
/*createNodes.js:298      */                     owner: {type:"param",name:"playerOwner"},
/*createNodes.js:299      */                     location: {type:"param",name:"parent"}
/*createNodes.js:300      */                 }
/*createNodes.js:301      */             },
/*createNodes.js:302      */             location9:{
/*createNodes.js:303      */                 description: "Location: Kingdom Of Astaria",
/*createNodes.js:304      */                 inputNames:["playerOwner","parent"],
/*createNodes.js:305      */                 attributes:{
/*createNodes.js:306      */                     type: "card",
/*createNodes.js:307      */                     name: "Kingdom Of Astaria",
/*createNodes.js:308      */                     reward: 3,
/*createNodes.js:309      */                     combatEffect: "NOT DEFINED YET FLOW NODE",
/*createNodes.js:310      */                     owner: {type:"param",name:"playerOwner"},
/*createNodes.js:311      */                     location: {type:"param",name:"parent"}
/*createNodes.js:312      */                 }
/*createNodes.js:313      */             },
/*createNodes.js:314      */             location10:{
/*createNodes.js:315      */                 description: "Location: Pit Of Souls",
/*createNodes.js:316      */                 inputNames:["playerOwner","parent"],
/*createNodes.js:317      */                 attributes:{
/*createNodes.js:318      */                     type: "card",
/*createNodes.js:319      */                     name: "Pit Of Souls",
/*createNodes.js:320      */                     reward: 1,
/*createNodes.js:321      */                     combatEffect: "NOT DEFINED YET FLOW NODE",
/*createNodes.js:322      */                     owner: {type:"param",name:"playerOwner"},
/*createNodes.js:323      */                     location: {type:"param",name:"parent"}
/*createNodes.js:324      */                 }
/*createNodes.js:325      */             },
/*createNodes.js:326      */ 
/*createNodes.js:327      */ 
/*createNodes.js:328      */ };
/*flowNodes.js:0          */ gameDescription.nodes.Flow = 
/*flowNodes.js:1          */ {
/*flowNodes.js:2          */     main:{
/*flowNodes.js:3          */         description: "Stryfe: Legacy Of The Ethernals",
/*flowNodes.js:4          */         nodes:[
/*flowNodes.js:5          */             {id:"initGame",nodeType:"Flow"},
/*flowNodes.js:6          */             {id:"coreGame",nodeType:"Flow"},
/*flowNodes.js:7          */             {id:"endGame",nodeType:"Flow"},
/*flowNodes.js:8          */         ]
/*flowNodes.js:9          */     },
/*flowNodes.js:10         */ 
/*flowNodes.js:11         */     coreGame:{
/*flowNodes.js:12         */         description: "Play the sucesive rounds",
/*flowNodes.js:13         */         inputNames:[],
/*flowNodes.js:14         */         outputNames:[],
/*flowNodes.js:15         */         nodes:[
/*flowNodes.js:16         */             {id:"playRound",nodeType:"Flow", control:  {type:"while", condition:{ operator:"<", operands:[ {type:"entityProperty",entity:"ROUND_COUNTER",attribute:"value"}, 2]}}},                  
/*flowNodes.js:17         */         ]   
/*flowNodes.js:18         */     },
/*flowNodes.js:19         */     initGame:{
/*flowNodes.js:20         */         description: "Setup initial game status",
/*flowNodes.js:21         */         inputNames:[],
/*flowNodes.js:22         */         outputNames:[],   
/*flowNodes.js:23         */         nodes:[
/*flowNodes.js:24         */             {nodeType:"Primitive", outputNames:["string:roundCounter"], value: "ROUND_COUNTER"},
/*flowNodes.js:25         */             {nodeType:"Primitive", outputNames:["string:turnCounter"], value: "TURN_COUNTER"},
/*flowNodes.js:26         */             {nodeType:"Primitive", outputNames:["value:cero"], value: 0},
/*flowNodes.js:27         */             {id:"smartCounter",nodeType:"Create",inputNames:["string:roundCounter","value:cero"],outputNames:["roundCounter"]},
/*flowNodes.js:28         */             {id:"smartCounter",nodeType:"Create",inputNames:["string:turnCounter","value:cero"],outputNames:["turnCounter"]},
/*flowNodes.js:29         */             {id:"initPlayersDecks",nodeType:"Flow", control:  {type:"simultaneous", nodeSpecificInfo:{type:"game",attribute:"players"}}},
/*flowNodes.js:30         */             {id:"initLocationsDeck",nodeType:"Flow"},
/*flowNodes.js:31         */             {id:"initPlayersScrore",nodeType:"Flow"},
/*flowNodes.js:32         */         ],
/*flowNodes.js:33         */     },
/*flowNodes.js:34         */     endGame:{description:"Count points and  decide the winner",nodes:[]},
/*flowNodes.js:35         */ 
/*flowNodes.js:36         */     playRound:{
/*flowNodes.js:37         */         description:"Play Round",
/*flowNodes.js:38         */         inputNames:[],
/*flowNodes.js:39         */         outputNames:[],
/*flowNodes.js:40         */         nodes:[
/*flowNodes.js:41         */             {id:"increaseRoundCounter",nodeType:"Modify"},
/*flowNodes.js:42         */             {id:"resetTurnCounter",nodeType:"Modify"},
/*flowNodes.js:43         */             {id:"playTurn",nodeType:"Flow", control:  {type:"while", condition:{ operator:"<", operands:[ {type:"entityProperty",entity:"TURN_COUNTER",attribute:"value"}, 3]}} },
/*flowNodes.js:44         */         ]
/*flowNodes.js:45         */     },
/*flowNodes.js:46         */ 
/*flowNodes.js:47         */     playTurn:{
/*flowNodes.js:48         */         description:"Play a complete Turn",
/*flowNodes.js:49         */         inputNames:[],
/*flowNodes.js:50         */         outputNames:[],
/*flowNodes.js:51         */         nodes:[
/*flowNodes.js:52         */              {id:"increaseTurnCounter",nodeType:"Modify"},
/*flowNodes.js:53         */              {id:"selectChampion",nodeType:"Flow", control:  {type:"simultaneous", nodeSpecificInfo:{type:"game",attribute:"players"}}},
/*flowNodes.js:54         */              {id:"battlePhase",nodeType:"Flow"},
/*flowNodes.js:55         */              {id:"legacyPhase",nodeType:"Flow"},
/*flowNodes.js:56         */              {id:"combatPhase",nodeType:"Flow"},
/*flowNodes.js:57         */              {id:"cleanUp",nodeType:"Flow",},
/*flowNodes.js:58         */         ]
/*flowNodes.js:59         */     },
/*flowNodes.js:60         */ 
/*flowNodes.js:61         */     selectChampion:{description:"selectChampion", inputNames:["player"], nodes:[
/*flowNodes.js:62         */         {id:"selectChampionFromHand",nodeType:"Selector", inputNames:["player"],outputNames:["selectedChampion"]},
/*flowNodes.js:63         */         {nodeType:"Primitive",inputNames:["player"], value: {type:"param",name:"player",attribute:"battleArea"}, outputNames:["battleArea"]},
/*flowNodes.js:64         */         {id:"moveEntityTo",nodeType:"Modify", inputNames:["selectedChampion","battleArea"]},
/*flowNodes.js:65         */     ]},
/*flowNodes.js:66         */     battlePhase:{description:"battlePhase",nodes:[]},
/*flowNodes.js:67         */     legacyPhase:{description:"legacyPhase",nodes:[]},
/*flowNodes.js:68         */     combatPhase:{description:"combatPhase",nodes:[
/*flowNodes.js:69         */         {nodeType:"Primitive", value: {type:"reduce", group :{type:"game",attribute:"players"}, 
/*flowNodes.js:70         */             comparator:{ operator:"<", operands:[ {type:"param",name:"current",attribute:"battleArea.first.power"}, {type:"param",name:"candidate",attribute:"battleArea.first.power"}]}
/*flowNodes.js:71         */         }, outputNames:["winnerPlayer"]},
/*flowNodes.js:72         */             ///    
/*flowNodes.js:73         */             /// How to compare players information?
/*flowNodes.js:74         */             ///
/*flowNodes.js:75         */     ]},
/*flowNodes.js:76         */     cleanUp:{description:"cleanUp",nodes:[
/*flowNodes.js:77         */         {id:"cleanBattleArea",nodeType:"Flow", control:  {type:"simultaneous", nodeSpecificInfo:{type:"game",attribute:"players"}}},
/*flowNodes.js:78         */ 
/*flowNodes.js:79         */     ]},
/*flowNodes.js:80         */ 
/*flowNodes.js:81         */     cleanBattleArea:{description:"clean Battle area ",inputNames:["player"],nodes:[
/*flowNodes.js:82         */         {nodeType:"Primitive",inputNames:["player"], value: {type:"param",name:"player",attribute:"legacyArea"}, outputNames:["legacyArea"]},
/*flowNodes.js:83         */         {nodeType:"Primitive",inputNames:["player"], value: {type:"param",name:"player",attribute:"battleArea.first"}, outputNames:["battleChampion"]},
/*flowNodes.js:84         */         {id:"moveEntityTo",nodeType:"Modify", inputNames:["battleChampion","legacyArea"]},
/*flowNodes.js:85         */ 
/*flowNodes.js:86         */     ]},
/*flowNodes.js:87         */ 
/*flowNodes.js:88         */ 
/*flowNodes.js:89         */ 
/*flowNodes.js:90         */     initPlayersDecks:{description:"initPlayersDecks", inputNames:["player"],nodes:[
/*flowNodes.js:91         */         {nodeType:"Primitive", outputNames:["string:hand"], value: "hand"},
/*flowNodes.js:92         */         {id:"createPlayerHand",nodeType:"Flow", inputNames:["player"],outputNames:["playerhand"]},
/*flowNodes.js:93         */         {id:"addProperty",nodeType:"Modify", inputNames:["player","string:hand","playerhand"]},
/*flowNodes.js:94         */         
/*flowNodes.js:95         */         {nodeType:"Primitive", outputNames:["string:battleArea"], value: "battleArea"},
/*flowNodes.js:96         */         {id:"playerBattleArea",nodeType:"Create", inputNames:["player"],outputNames:["playerBattleArea"]},
/*flowNodes.js:97         */         {id:"addProperty",nodeType:"Modify", inputNames:["player","string:battleArea","playerBattleArea"]},
/*flowNodes.js:98         */ 
/*flowNodes.js:99         */         {nodeType:"Primitive", outputNames:["string:legacyArea"], value: "legacyArea"},
/*flowNodes.js:100        */         {id:"playerLegacyArea",nodeType:"Create", inputNames:["player"],outputNames:["playerLegacyArea"]},
/*flowNodes.js:101        */         {id:"addProperty",nodeType:"Modify", inputNames:["player","string:legacyArea","playerLegacyArea"]},
/*flowNodes.js:102        */     ]},
/*flowNodes.js:103        */     
/*flowNodes.js:104        */     initLocationsDeck:{description:"initLocationsDeck",nodes:[
/*flowNodes.js:105        */         {nodeType:"Primitive", outputNames:["neutralPlayer"], value: "neutralPlayer"},
/*flowNodes.js:106        */         {id:"createLocationDeck",nodeType:"Flow", inputNames:["neutralPlayer"]},
/*flowNodes.js:107        */     ]},
/*flowNodes.js:108        */ 
/*flowNodes.js:109        */     initPlayersScrore:{description:"initPlayersScrore",nodes:[]},
/*flowNodes.js:110        */ 
/*flowNodes.js:111        */     createPlayerHand:{
/*flowNodes.js:112        */         description:"Create Player hand and its cards",
/*flowNodes.js:113        */         inputNames:["playerOwner"],
/*flowNodes.js:114        */         outputNames:["playerHand"],
/*flowNodes.js:115        */         nodes:[
/*flowNodes.js:116        */             {id:"playerHand",nodeType:"Create",inputNames:["playerOwner"],outputNames:["playerHand"]},
/*flowNodes.js:117        */             {id:"champion1",nodeType:"Create",inputNames:["playerOwner","playerHand"],outputNames:["monk"]},
/*flowNodes.js:118        */             {id:"champion2",nodeType:"Create",inputNames:["playerOwner","playerHand"],outputNames:["necromancer"]},
/*flowNodes.js:119        */             {id:"champion3",nodeType:"Create",inputNames:["playerOwner","playerHand"],outputNames:["assasin"]},
/*flowNodes.js:120        */             {id:"champion4",nodeType:"Create",inputNames:["playerOwner","playerHand"],outputNames:["wizard"]},
/*flowNodes.js:121        */             {id:"champion5",nodeType:"Create",inputNames:["playerOwner","playerHand"],outputNames:["paladin"]},
/*flowNodes.js:122        */             {id:"champion6",nodeType:"Create",inputNames:["playerOwner","playerHand"],outputNames:["ranger"]},
/*flowNodes.js:123        */             {id:"champion7",nodeType:"Create",inputNames:["playerOwner","playerHand"],outputNames:["druid"]},
/*flowNodes.js:124        */             {id:"champion8",nodeType:"Create",inputNames:["playerOwner","playerHand"],outputNames:["warrior"]},
/*flowNodes.js:125        */             {id:"champion9",nodeType:"Create",inputNames:["playerOwner","playerHand"],outputNames:["knight"]},
/*flowNodes.js:126        */             {id:"champion10",nodeType:"Create",inputNames:["playerOwner","playerHand"],outputNames:["barbarian"]},
/*flowNodes.js:127        */         ]
/*flowNodes.js:128        */     },
/*flowNodes.js:129        */ 
/*flowNodes.js:130        */     createLocationDeck:{
/*flowNodes.js:131        */         description:"Create the location Deck",
/*flowNodes.js:132        */         inputNames:["neutralPlayer"],
/*flowNodes.js:133        */         outputNames:["locationDeck"],
/*flowNodes.js:134        */         nodes:[
/*flowNodes.js:135        */             {id:"locationDeck",nodeType:"Create",inputNames:["neutralPlayer"],outputNames:["locationDeck"]},
/*flowNodes.js:136        */             {id:"location1",nodeType:"Create",inputNames:["neutralPlayer","locationDeck"],outputNames:["location1"]},
/*flowNodes.js:137        */             {id:"location2",nodeType:"Create",inputNames:["neutralPlayer","locationDeck"],outputNames:["location2"]},
/*flowNodes.js:138        */             {id:"location3",nodeType:"Create",inputNames:["neutralPlayer","locationDeck"],outputNames:["location3"]},
/*flowNodes.js:139        */             {id:"location4",nodeType:"Create",inputNames:["neutralPlayer","locationDeck"],outputNames:["location4"]},
/*flowNodes.js:140        */             {id:"location5",nodeType:"Create",inputNames:["neutralPlayer","locationDeck"],outputNames:["location5"]},
/*flowNodes.js:141        */             {id:"location6",nodeType:"Create",inputNames:["neutralPlayer","locationDeck"],outputNames:["location6"]},
/*flowNodes.js:142        */             {id:"location7",nodeType:"Create",inputNames:["neutralPlayer","locationDeck"],outputNames:["location7"]},
/*flowNodes.js:143        */             {id:"location8",nodeType:"Create",inputNames:["neutralPlayer","locationDeck"],outputNames:["location8"]},
/*flowNodes.js:144        */             {id:"location9",nodeType:"Create",inputNames:["neutralPlayer","locationDeck"],outputNames:["location9"]},
/*flowNodes.js:145        */             {id:"location10",nodeType:"Create",inputNames:["neutralPlayer","locationDeck"],outputNames:["location10"]},
/*flowNodes.js:146        */         ]
/*flowNodes.js:147        */     },
/*flowNodes.js:148        */ 
/*flowNodes.js:149        */ };
/*modifyNodes.js:0        */ gameDescription.nodes.Modify = 
/*modifyNodes.js:1        */ {
/*modifyNodes.js:2        */     increaseRoundCounter:{
/*modifyNodes.js:3        */         description: "add one to the ROUND_COUNTER value",
/*modifyNodes.js:4        */         entity: {type:"entityByName",name:"ROUND_COUNTER"},
/*modifyNodes.js:5        */         attribute: "value",
/*modifyNodes.js:6        */         newValue: {
/*modifyNodes.js:7        */             baseValue: {type:"entityProperty",entity:"ROUND_COUNTER",attribute:"value"},
/*modifyNodes.js:8        */             operations: [
/*modifyNodes.js:9        */                 {operator:"+",operands:[1]}
/*modifyNodes.js:10       */             ]
/*modifyNodes.js:11       */         }
/*modifyNodes.js:12       */     },
/*modifyNodes.js:13       */     increaseTurnCounter:{
/*modifyNodes.js:14       */         description: "add one to the TURN_COUNTER value",
/*modifyNodes.js:15       */         entity: {type:"entityByName",name:"TURN_COUNTER"},
/*modifyNodes.js:16       */         attribute: "value",
/*modifyNodes.js:17       */         newValue: {
/*modifyNodes.js:18       */             baseValue: {type:"entityProperty",entity:"TURN_COUNTER",attribute:"value"},
/*modifyNodes.js:19       */             operations: [
/*modifyNodes.js:20       */                 {operator:"+",operands:[1]}
/*modifyNodes.js:21       */             ]
/*modifyNodes.js:22       */         }
/*modifyNodes.js:23       */     },
/*modifyNodes.js:24       */     resetTurnCounter:{
/*modifyNodes.js:25       */         description: "set TURN_COUNTER value to 0",
/*modifyNodes.js:26       */         entity: {type:"entityByName",name:"TURN_COUNTER"},
/*modifyNodes.js:27       */         attribute: "value",
/*modifyNodes.js:28       */         newValue: {
/*modifyNodes.js:29       */             baseValue: 0,
/*modifyNodes.js:30       */         }
/*modifyNodes.js:31       */     },
/*modifyNodes.js:32       */     moveEntityTo:{
/*modifyNodes.js:33       */         description: "move entity to other location",
/*modifyNodes.js:34       */         inputNames:["entity","nextLocation"],
/*modifyNodes.js:35       */         outputNames:[],
/*modifyNodes.js:36       */         entity: {type:"param",name:"entity"},
/*modifyNodes.js:37       */         attribute: "location",
/*modifyNodes.js:38       */         newValue: {
/*modifyNodes.js:39       */             baseValue: {type:"param",name:"nextLocation"},
/*modifyNodes.js:40       */         }
/*modifyNodes.js:41       */     },
/*modifyNodes.js:42       */ 
/*modifyNodes.js:43       */     addProperty:{
/*modifyNodes.js:44       */         description: "add Property to entity",
/*modifyNodes.js:45       */         inputNames:["entity","propertyName","propertyValue"],
/*modifyNodes.js:46       */         outputNames:[],
/*modifyNodes.js:47       */         entity: {type:"param",name:"entity"},
/*modifyNodes.js:48       */         attribute: {type:"param",name:"propertyName"},
/*modifyNodes.js:49       */         newValue:  {type:"param",name:"propertyValue"},
/*modifyNodes.js:50       */         
/*modifyNodes.js:51       */     }
/*modifyNodes.js:52       */ };
/*players.js:0            */ gameDescription.players =[
/*players.js:1            */         {name:"Player A"},
/*players.js:2            */         {name:"Player B"},
/*players.js:3            */ 	];
/*selectorNodes.js:0      */ gameDescription.nodes.Selector = 
/*selectorNodes.js:1      */ {
/*selectorNodes.js:2      */      selectChampionFromHand:{description:"select Champion From a Player Hand", inputNames:["player"], 
/*selectorNodes.js:3      */         whoSelect:{type:"param",name:"player"},
/*selectorNodes.js:4      */         options:[
/*selectorNodes.js:5      */             {scope:{type:"param",name:"player",attribute:"hand.children"},restrictions:[]}
/*selectorNodes.js:6      */         ]
/*selectorNodes.js:7      */     },
/*selectorNodes.js:8      */ };