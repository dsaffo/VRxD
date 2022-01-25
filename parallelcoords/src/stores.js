import { writable, readable } from 'svelte/store';
import * as d3 from "d3";
import { client } from './deepstream.js';

export let page = writable(0);
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
               last_name: " ",
               first_name: " ",
               player_id: "",
               Player_Age: "hello",
               Games: "",
               Innings_Pitched: "",
               Plate_Appearances: "",
               Hits: "",
               Home_Runs: "",
               Strikeouts: "",
               Walks: "",
               K_Percent: "",
               BB_Percent: "",
               Whiff_Percent: "",
               Runs: "",
               Wins: "",
               Losses: "",
               Total_Balls: "",
               Total_Strikes: "",
               xba: "",
               xslg: "",
               xwoba: "",
               xobp: "",
               xiso: "",
               Exit_Velocity: "",
               Launch_Angle: "",
               Barrel_Percent: "",
               Offspeed: "",
               Breaking: "",
               Fastball: "",
               Pitches: "",
               Fastball_Speed: "",
               Fastball_Spin: "",
               Breaking_Speed: "",
               Breaking_Spin: "",
               Offspeed_Speed: "",
               Offspeed_Spin: "", 
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
    const {subscribe, update, set} = writable({filter_store: [], color_store: "absolute", hover_store: null});
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
            return store;
        }),

        updateLocalHover: (hover) => update(store => {
            console.log(hover);
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

export const peerInteraction = readable({filter_store: ['4-Seam Fastball', 'called_strike', '95-105'], color_store: "type", hover_store: null}, function start(set) {

    const unsub = peer.subscribe(peerDoc, function(value) {
        set(JSON.parse(JSON.stringify(value)));
    });

    return function stop() {
        unsub();
    }
});



let tempLocalInteractionStore = {filter_store: [], color_store: "type", hover_store: null};

export const stats_store = statsStore();
export const interaction_store = interactionStore();







