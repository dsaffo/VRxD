import { writable, readable } from 'svelte/store';
import * as d3 from "d3";
import { client } from './deepstream.js';


const urlParams = new URLSearchParams(window.location.search);
const isVR = urlParams.has('vr');
let doc;
let peerDoc;
if (!isVR){
    doc = "desktop";
    peerDoc = "vr";
} else {
    doc = "vr";
    peerDoc = "desktop";
}

const peer = client.record.getRecord("interactions");

export let definitions = writable({
               last_name: "Players last name.",
               first_name: "Players first name.",
               player_id: "Unique player identifier.",
               Player_Age: "Age of the player in years.",
               Games: "Number of games the player appeared in.",
               Innings_Pitched: "Number of innings the pitcher pitched in.",
               Plate_Appearances: "The number of batters the pitcher faced.",
               Hits: "The number of pitches that resulted in hits.",
               Home_Runs: "The number of pitches that resulted in a homerun.",
               Strikeouts: "The number of batters the player struckout.",
               Walks: "The number of batters the player walked",
               K_Percent: "The precentage of pitches that resulted in a strike.",
               BB_Percent: "The precentage of pitches that resulted in a batted ball.",
               Whiff_Percent: "The precentage of pitches that resulted in a swing and miss.",
               Runs: "The number of runs scored while the player was pitching.",
               Wins: "The number of wins credited to the player.",
               Losses: "The number of losses credited to the player.",
               Total_Balls: "The total number of pitches that resulted in a ball.",
               Total_Strikes: "The total number of pitches that resulted in a strike.",
               xba: "The expected batting average of batters facing this pitcher (lower is better).",
               xslg: "The expected slugging percentage, batted balls hit hard, of batters facing this pitcher (lower is better).",
               xwoba: "The expected weighted on base average, batted balls resulting in 1 or more bases, of batter facing this pitcher (lower is better).",
               xobp: "The expected on base percentage, batted balls resulting in 1 or more bases, of batter facing this pitcher (lower is better).",
               xiso: "The expected isoloated raw power of a batter facing this pitcher (lower is better).",
               Exit_Velocity: "The average exit velocity of batted balls facing this pitcher.",
               Launch_Angle: "The average launch angle of batted ball facing this pitcher.",
               Barrel_Percent: "The precentatge pitches resulting in barreled balls (well hit).",
               Offspeed: "The number of offspeed pitches thrown by this player.",
               Breaking: "The number of breaking pitches thrown by this player.",
               Fastball: "The number of fastball pitches thrown by this player.",
               Pitches: "The number of pitches thrown by this player.",
               Fastball_Speed: "The average speed (mph) of fastballs thrown by this player.",
               Fastball_Spin: "The average spin (rpm) of fastballs thrown by this player.",
               Breaking_Speed: "The average speed (mph) of breaking balls thrown by this player.",
               Breaking_Spin: "The average spin (rpm) of breaking balls thrown by this player.",
               Offspeed_Speed: "The average speed (mph) of offspeed balls thrown by this player.",
               Offspeed_Spin: "The average spin (rpm) of offspeed balls thrown by this player.", 
})

function statsStore() {

    const {subscribe, set} = writable([]);

    return {
        subscribe,
        loadData: async(file) => set(await d3.csv(file, function(d){
            return {
               last_name: d.last_name,
               first_name: d.first_name,
               player_id: d.player_id,
               Player_Age: parseInt(d.Player_Age),
               Games: parseInt(d.Games),
               Innings_Pitched: parseInt(d.Innings_Pitched),
               Plate_Appearances: parseInt(d.Plate_Appearances),
               Hits: parseInt(d.Hits),
               Home_Runs: parseInt(d.Home_Runs),
               Strikeouts: parseInt(d.Strikeouts),
               Walks: parseInt(d.Walks),
               K_Percent: parseFloat(d.K_Percent),
               BB_Percent: parseFloat(d.BB_Percent),
               Whiff_Percent: parseFloat(d.Whiff_Percent),
               Runs: parseInt(d.Runs),
               Wins: parseInt(d.Wins),
               Losses: parseInt(d.Losses),
               Total_Balls: parseInt(d.Total_Balls),
               Total_Strikes: parseInt(d.Total_Strikes),
               xba: parseFloat(d.xba),
               xslg: parseFloat(d.xslg),
               xwoba: parseFloat(d.xwoba),
               xobp: parseFloat(d.xobp),
               xiso: parseFloat(d.xiso),
               Exit_Velocity: parseFloat(d.Exit_Velocity),
               Launch_Angle: parseFloat(d.Launch_Angle),
               Barrel_Percent: parseFloat(d.Barrel_Percent),
               Offspeed: parseInt(d.Offspeed),
               Breaking: parseInt(d.Breaking),
               Fastball: parseInt(d.Fastball),
               Pitches: parseInt(d.Pitches),
               Fastball_Speed: parseFloat(d.Fastball_Speed),
               Fastball_Spin: parseFloat(d.Fastball_Spin),
               Breaking_Speed: parseFloat(d.Breaking_Speed),
               Breaking_Spin: parseFloat(d.Breaking_Spin),
               Offspeed_Speed: parseFloat(d.Offspeed_Speed),
               Offspeed_Spin: parseFloat(d.Offspeed_Spin),
            }
        }))
    }
}

function updatePeer(store){
    peer.set(doc, store);
}

export function updateMousePos(pos){
    const updateEvent = new CustomEvent ('mouse_update', {detail: {mousePos:pos, id:clientId}});
    document.body.dispatchEvent(updateEvent);
}

export function updateCameraPos(pos){
    const updateEvent = new CustomEvent ('camera_update', {detail: {camera:pos, id:clientId}});
    document.body.dispatchEvent(updateEvent);
}

let peeking = false;

function interactionStore (){
    const {subscribe, update, set} = writable({filter_store: ['Games','Hits','Runs'], color_store: "absolute", hover_store: null});
    let peerInterval = null;
    let peer_store;
    let unsub = peerInteraction.subscribe(value => peer_store = value);

    return{
        subscribe,
        updateLocalColor: (color) => update(store => {
            store.color_store = color;
            updatePeer(store);
            return store;
        }),

        updateLocalFilter: (filter) => update(store => {
            if(!store.filter_store.includes(filter)){          //checking weather filtersay contain the id
                store.filter_store.push(filter);               //adding to filtersay because value doesnt exists
            }else{
                store.filter_store.splice(store.filter_store.indexOf(filter), 1);  //deleting
            }
            updatePeer(store);
            return store;
        }),

        setFilterStore: (filters) => update(store => {
            store.filter_store = filters;
            updatePeer(store);
            return store;
        }),

        updateLocalHover: (hover) => update(store => {
            store.hover_store = hover;
            updatePeer(store);
            return store;
        }),

        peekStart: () => update(store => {
            peeking = true;
            tempLocalInteractionStore = store;
            peerInterval = setInterval(() => {set(JSON.parse(JSON.stringify(peer_store)));}, 0.05);
            return JSON.parse(JSON.stringify(peer_store));
        }),

        peekEnd: () => update(store => {
            if (peeking == true){
                clearInterval(peerInterval);
                return  tempLocalInteractionStore
            } 

            return store
        }),

        copy: () => {
            set(JSON.parse(JSON.stringify(peer_store)));
        },
    }
}

export const peerInteraction = readable({filter_store: ['Games','Hits','Runs'], color_store: "absolute", hover_store: null}, function start(set) {

    const unsub = peer.subscribe(peerDoc, function(value) {
        set(JSON.parse(JSON.stringify(value)));
    });

    return function stop() {
        unsub();
    }
});



let tempLocalInteractionStore = {filter_store: [], color_store: "type", hover_store: null};

export const tooltip_store = writable(" ");
export const stats_store = statsStore();
export const interaction_store = interactionStore();







