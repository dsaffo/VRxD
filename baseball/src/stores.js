import { writable } from 'svelte/store';
import * as d3 from "d3";

function createStore() {

    const { subscribe, set, update} = writable(null);

    return {
        subscribe,
        loadData: async() => set(await d3.csv("./shohei_test.csv", function(d){

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
                pfx_x: parseFloat(d.pfx_x) / 3.2808,
                pfx_z: parseFloat(d.pfx_z) / 3.2808,
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
                zone: parseInt(d.zone)
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
        updateStore: (received_store) => {console.log("stored", received_store); set(received_store)}
    };

}

export const stored_data = createStore();

export let page = writable(0);


