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


function statsStore() {

    const {subscribe, set} = writable([]);

    return {
        subscribe,
        loadData: async(file) => set(await d3.csv(file, function(d){
            return {
               last_name: d.last_name,
               first_name: d.first_name,
               player_id: d.player_id,
               year: d.year,
               player_age: parseInt(d.player_age),
               p_game: parseInt(d.p_game),
               p_total_pa: parseInt(d.p_total_pa),
               p_total_hits: parseInt(d.p_total_hits),
               p_home_run: parseInt(d.p_home_run),
               p_strikeout: parseInt(d.p_strikeout),
               p_walk: parseInt(d.p_walk),
               p_run: parseInt(d.p_run),
               p_out: parseInt(d.p_out),
               p_win: parseInt(d.p_win),
               p_loss: parseInt(d.p_loss),
               p_wild_pitch: parseInt(d.p_wild_pitch),
               p_ball: parseInt(d.p_ball),
               p_called_strike: parseInt(d.p_called_strike),
               p_hit_scoring: parseInt(d.p_hit_scoring),
               p_swinging_strike: parseInt(d.p_swinging_strike),
               p_total_ball: parseInt(d.p_total_ball),
               p_total_bases: parseInt(d.p_total_bases),
               p_total_strike: parseInt(d.p_total_strike),
               xba: parseFloat(d.xba),
               xslg: parseFloat(d.xslg),
               xwoba: parseFloat(d.xwoba),
               xobp: parseFloat(d.xobp),
               xiso: parseFloat(d.xiso),
               exit_velocity_avg: parseFloat(d.exit_velocity_avg),
               launch_angle_avg: parseFloat(d.launch_angle_avg),
               barrel_batted_rate: parseFloat(d.barrel_batted_rate),
               whiff_percent: parseFloat(d.whiff_percent),
               n_fastball_formatted: parseFloat(d.n_fastball_formatted),
               fastball_avg_speed: parseFloat(d.fastball_avg_speed),
               fastball_avg_spin: parseFloat(d.fastball_avg_spin),
               fastball_avg_break_x: parseFloat(d.fastball_avg_break_x),
               fastball_avg_break_z: parseFloat(d.fastball_avg_break_z),
               fastball_avg_break: parseFloat(d.fastball_avg_break),
               fastball_range_speed: parseFloat(d.fastball_range_speed),
               n_breaking_formatted: parseFloat(d.n_fastball_formatted),
               breaking_avg_speed: parseFloat(d.fastball_avg_speed),
               breaking_avg_spin: parseFloat(d.fastball_avg_spin),
               breaking_avg_break_x: parseFloat(d.fastball_avg_break_x),
               breaking_avg_break_z: parseFloat(d.fastball_avg_break_z),
               breaking_avg_break: parseFloat(d.fastball_avg_break),
               breaking_range_speed: parseFloat(d.fastball_range_speed),
               n_offspeed_formatted: parseFloat(d.n_fastball_formatted),
               offspeed_avg_speed: parseFloat(d.fastball_avg_speed),
               offspeed_avg_spin: parseFloat(d.fastball_avg_spin),
               offspeed_avg_break_x: parseFloat(d.fastball_avg_break_x),
               offspeed_avg_break_z: parseFloat(d.fastball_avg_break_z),
               offspeed_avg_break: parseFloat(d.fastball_avg_break),
               offspeed_range_speed: parseFloat(d.fastball_range_speed)
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
    const {subscribe, update, set} = writable({pitcher_store: "pitcher1", filter_store: [], color_store: "type", hover_store: null});
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
            store.hover_store = hover;
            updatePeer(store);
            return store;
        }),

        updateLocalPitcher: (pitcher) => update(store => {
            store.pitcher_store = pitcher;
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

export const peerInteraction = readable({pitcher_store: "pitcher1", filter_store: ['4-Seam Fastball', 'called_strike', '95-105'], color_store: "type", hover_store: null}, function start(set) {

    const unsub = peer.subscribe(peerDoc, function(value) {
        set(JSON.parse(JSON.stringify(value)));
    });

    return function stop() {
        unsub();
    }
});



let tempLocalInteractionStore = {pitcher_store: "pitcher1", filter_store: [], color_store: "type", hover_store: null};

export const stats_store = statsStore();
export const interaction_store = interactionStore();







