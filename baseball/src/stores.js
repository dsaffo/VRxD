import { writable } from 'svelte/store';
import * as d3 from "d3";
import { pitchTypeColorScale, speedScale, speedColorScale, pitchOutcomeColorScale}  from './colorScales.js';

function statsStore() {

    const {subscribe, set} = writable([]);

    return {
        subscribe,
        loadData: async() => set(await d3.csv("./OhtaniStats.csv", function(d){
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
        loadData: async() => set(await d3.csv("./OhtaniPercentiles.csv", function(d){
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

    return {
        subscribe,
        loadData: async() => set(await d3.csv("./OhtaniOneGame.csv", function(d){
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
                color: pitchTypeColorScale(d.pitch_name)
            }
        })),
        updateData: (index) => update(store => {
            store[index]['selected'] = !store[index]['selected'];
            const myEvent = new CustomEvent ('myEvent', { detail: store });
            console.log("dispatching event")
            document.body.dispatchEvent(myEvent);
            console.log("event dispatched")
            return store;
        }),

        updateColor: (scale) => update(store => {
            if (scale === "type"){
                store.forEach((pitch, index) => store[index]['color'] = pitchTypeColorScale(pitch.pitch_name));
            } 
            else if (scale === "speed"){
                store.forEach((pitch, index) => store[index]['color'] = speedColorScale(speedScale(pitch.effective_speed)));
            } 
            else if (scale === "outcome"){
                store.forEach((pitch, index) => store[index]['color'] = pitchOutcomeColorScale(pitch.description));
            } 

            return store;
        }),
        updateStore: (received_store) => {console.log("stored", received_store); set(received_store)}
    };

}


export const ohtani_stats_store = statsStore();
export const ohtani_percentile_store = percentileStore();
export const stored_data = pitchesStore();


export let page = writable(0);
export let filter_store = writable([]);



