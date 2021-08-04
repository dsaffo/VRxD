import { writable } from 'svelte/store';
import * as d3 from "d3";

function createStore() {

    const { subscribe, set, update } = writable(null);

    return {
        subscribe,
        loadData: async() => set(await d3.json("./recipes.json", function(d){
            return d;
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


