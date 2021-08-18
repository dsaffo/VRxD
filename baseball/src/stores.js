import { writable, readable } from 'svelte/store';
import * as d3 from "d3";
import { pitchTypeColorScale, speedScale, speedColorScale, pitchOutcomeColorScale}  from './colorScales.js';

function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * 
 charactersLength));
   }
   return result;
}

export let clientId = makeid(10);

function statsStore() {

    const {subscribe, set} = writable([]);

    return {
        subscribe,
        loadData: async(file) => set(await d3.csv(file, function(d){
            return {
                wins: parseInt(d.W),
                loss: parseInt(d.L),
                games: parseInt(d.G),
                ERA: parseFloat(d.ERA),
                IP: parseFloat(d.IP),
                SO: parseFloat(d.SO),
                WHIP: parseFloat(d.WHIP),
                pitches: parseInt(d.Pitches),
                BB: parseInt(d.Batted_Balls),
                barrel: parseInt(d.Barrel),
                barrelPer: parseFloat(d.Barrel_Perc),
                EV: parseFloat(d.Exit_Velocity),
                maxEV: parseFloat(d.Max_EV),
                LA: parseFloat(d.Launch_Angle),
                SSP: parseFloat(d.Sweet_Spot_Perc),
                XBA: parseFloat(d.XBA),
                XSLG: parseFloat(d.XSLG),
                WOBA: parseFloat(d.WOBA),
                XWOBA: parseFloat(d.XWOBA),
                XWOBACON: parseFloat(d.XWOBACON),
                HHP: parseFloat(d.Hard_Hit_Perc),
                KP: parseFloat(d.K_Perc),
                BBP: parseFloat(d.BB_Perc),
                XERA: parseFloat(d.xERA),
                hand: d.Hand,
                age: parseInt(d.Age),
                team: d.Team,
                name: d.Name,
                country: d.Country
            }
        }))
    }
}

function percentileStore() {

    const {subscribe, set} = writable([]);
    return {
        subscribe,
        loadData: async(file) => set(await d3.csv(file, function(d){
            return {
                xwOBA: parseFloat(d.xwOBA),
                xBA: parseFloat(d.xBA),
                xSLG: parseFloat(d.xSLG),
                xISO: parseFloat(d.xISO),
                xOBP: parseFloat(d.xOBP),
                Brl: parseFloat(d.Brl),
                BrlP: parseFloat(d.Brl_Perc),
                EV: parseFloat(d.EV),
                HHP: parseFloat(d.HardHit_Perc),
                KP: parseFloat(d.K_Perc),
                BBP: parseFloat(d.BB_Perc),
                WP: parseFloat(d.Whiff_Perc),
                xERA: parseFloat(d.xERA),
                FB_V: parseFloat(d.FB_V),
                FB_Spin: parseFloat(d.FB_Spin),
                CB_Spin: parseFloat(d.CB_Spin),
            }
        }))
    }
}

function pitchesStore() {

    const { subscribe, set, update } = writable([]);
    let id = -1;
    return {
        subscribe,
        loadData: async(file) => set(await d3.csv(file, function(d){
            return {
                ax: parseFloat(d.ax) / 3.2808,
                ay: parseFloat(d.ay) / 3.2808,
                az: parseFloat(d.az) / 3.2808,
                balls: parseInt(d.balls),
                batter: d.batter,
                bb_type: d.bb_type,
                des: d.des,
                description: d.description,
                effective_speed: parseFloat(d.effective_speed),
                events: d.events,
                game_date: d.game_date,
                game_pk: d.game_pk,
                game_year: d.game_year,
                hit_location: parseInt(d.hit_location),
                inning: parseInt(d.inning),
                inning_topbot: d.inning_topbot,
                outs_when_up: parseInt(d.outs_when_up),
                p_throws: d.p_throws,
                pfx_x: parseFloat(d.pfx_x),
                pfx_z: parseFloat(d.pfx_z),
                pitch_name: d.pitch_name,
                pitch_number: parseInt(d.pitch_number),
                pitch_type: d.pitch_type,
                pitcher: d.pitcher,
                plate_x: parseFloat(d.plate_x) / 3.2808,
                plate_z: parseFloat(d.plate_z) / 3.2808,
                player_name: d.player_name,
                release_extension: parseFloat(d.plate_extension),
                release_pos_x: parseFloat(d.release_pos_x) / 3.2808,
                release_pos_y: parseFloat(d.release_pos_y) / 3.2808,
                release_pos_z: parseFloat(d.release_pos_z) / 3.2808,
                release_speed: parseFloat(d.release_speed),
                release_spin_rate: parseInt(d.release_spin_rate),
                spin_axis: parseInt(d.spin_axis),
                stand: d.stand,
                strikes: parseInt(d.strikes),
                sz_bot: parseFloat(d.sz_bot),
                sz_top: parseFloat(d.sz_top),
                type: d.type,
                vx0: parseFloat(d.vx0) / 3.2808,
                vy0: parseFloat(d.vy0) / 3.2808,
                vz0: parseFloat(d.vz0) / 3.2808,
                zone: parseInt(d.zone),
                id: id += 1
            }
        })),
    };
}

function updatePeer(store){
    const updateEvent = new CustomEvent ('interaction_update', {detail: {interactions:store, id:clientId}});
   //console.log("dispatching event", store)
    document.body.dispatchEvent(updateEvent);
   // console.log("event dispatched")
}

export function updateMousePos(pos){
    const updateEvent = new CustomEvent ('mouse_update', {detail: {mousePos:pos, id:clientId}});
    document.body.dispatchEvent(updateEvent);
}

function interactionStore (){
    const {subscribe, update, set} = writable({pitcher_store: "pitcher1", filter_store: [], color_store: "type", hover_store: null, windowSize: [0,0]});
    let peerInterval = null;
    let peer_store;
    let unsub = peerInteraction.subscribe(value => peer_store = value);

    return{
        subscribe,

        updateWindowSize: (window) => update(store => {
            store.windowSize = window;
            updatePeer(store);
            return store;
        }),

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
            tempLocalInteractionStore = store;
            peerInterval = setInterval(() => {set(JSON.parse(JSON.stringify(peer_store)));}, 0.05);
            return JSON.parse(JSON.stringify(peer_store));
        }),

        peekEnd: () => update(store => {
            clearInterval(peerInterval);
            return  tempLocalInteractionStore
        }),

        copy: () => {
            set(JSON.parse(JSON.stringify(peer_store)));
        },
    }
}


function peerInteractionStore (){
    const {subscribe, update, set} = writable({pitcher_store: "pitcher1", filter_store: ['4-Seam Fastball', 'called_strike', '95-105'], color_store: "type", hover_store: null, windowSize: [0,0]});

    return {
    subscribe,
    updateData: (detail) => update(store => {
        //console.log("recieved");
        if (detail.id != clientId){
            //console.log("accepted");
            store = detail.interactions;
            return store;
        } else {
            //console.log("rejected");
            return store;
        }
    })
}
}

function peerMousePosition (){
    const {subscribe, update, set} = writable([0,0]);

    return {
    subscribe,
    updateData: (detail) => update(store => {
     
        if (detail.id != clientId){
       
            store = detail.mousePos;
            return store;
        } else {
         
            return store;
        }
    })
    }
}


export const peerInteraction = peerInteractionStore();
export const mousePosition = peerMousePosition();

let tempLocalInteractionStore = {pitcher_store: "pitcher1", filter_store: [], color_store: "type", hover_store: null};

export const ohtani_stats_store = statsStore();
export const ohtani_percentile_store = percentileStore();
export const stored_data = pitchesStore();
export const interaction_store = interactionStore();
export let page = writable(0);






