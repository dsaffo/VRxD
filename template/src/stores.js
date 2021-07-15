import { writable } from 'svelte/store';
import * as d3 from "d3";

function createStore() {

    const { subscribe, set, update} = writable(null);

    return {
        subscribe,
        loadData: async() => set(await d3.csv("./iris.csv", function(d){
            return {
                sepal_length: parseFloat(d.sepal_length),
                sepal_width: parseFloat(d.sepal_width),
                petal_length: parseFloat(d.petal_length),
                petal_width: parseFloat(d.petal_width),
                class: d.class,
                selected: d.selected = false
            };
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


