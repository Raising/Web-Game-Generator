"use strict";
PYC.Describe("Game",{
  attributes:{
    "zones": {},
    "players":{},
    "entitiesId":{},
    "entitiesName":{},
    "nodes":{},
  },
  builder: function(me,{players = {}, zones = {}, entities = {}, nodes = {}}){  
    me.createPlayers(players);
    me.createZones(zones);
    me.createEntities(entities);
    me.nodes = nodes;
    me.entities = entities;    
  },
  publ: function(me){ 
    me.startGame = async function(firstFlowNodeName){
      var me = this;
      await PYC.Create(me)("FlowNode",Object.assign({game:me},me.nodes.Flow[firstFlowNodeName])).execute();
      //return me.runFlow(me.nodes.Flow[firstFlowNodeName]);
    };

    me.createPlayers = function (players){
      var me = this;
      for (var playerIndex in players){
        let player = PYC.Create(me)("Entity",players[playerIndex]); // Replace Entity for player
        me.players[player.$Id()] = player;
      }
    };

    me.createZones = function (zones){
      var me = this;
      for (var zoneIndex in zones){
        let zone = PYC.Create(me)("Zone",zones[zoneIndex]);
        me.zones[zone.Id] = zone;
      }
    };
    

    me.createEntities = function (entities){
      var me = this;
      for (var entityIndex in entities){
        me.addEntity( PYC.Create(me)("Entity",entities[entityIndex]));
      }
    };

    me.createEntity = async function (createNode,inputParams){
      var me = this;
      let entity = await (PYC.Create(me)("Entity",createNode));
      await me.addEntity( entity); //REDUX
      return entity;
    };


    me.addEntity = async function (entity){
      var me = this;
      me.entitiesId[entity.$Id()] = entity;
      //me.entitiesName[entity.name] = entity;
      await PYC.store.nodeAction({
          type:"ModifyAttribute",
          payload:{
            entity:me.entitiesName,
            attibute:entity.name,
            value:entity
          }
        });
    };

    me.getEntityByName = function (entityName){
      var me = this;
      return me.entitiesName[entityName];
    };
  }
});