import { writable, readable } from 'svelte/store';
import { client } from './deepstream.js';


const formRecord = client.record.getRecord("form");

function formStore() {

    const {subscribe, set, update} = writable({groups: " ", 
                                                xba: " ", 
                                                top: " ", 
                                                bottom: " ", 
                                                summary: " "});

    return {
        subscribe,
        emitChange: (store) => {formRecord.set("0", store);},
        updateFormStore: (store) => {set(store);}
    }
}

export const form_store = formStore();

const unsub = formRecord.subscribe("0", function(value) {
    form_store.updateFormStore(JSON.parse(JSON.stringify(value).replaceAll(';', ':')));
});