import { writable, readable } from 'svelte/store';
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

const windowSizeRecord = client.record.getRecord("windowSize");
const mousePosRecord = client.record.getRecord("mousePos");
const cameraPosRecord = client.record.getRecord("cameraPos");
const camerarotRecord = client.record.getRecord("cameraRot");



export const windowSize = readable({width:0, height:0}, function start(set) {
    const unsub = windowSizeRecord.subscribe("0", function(value) {
        set(JSON.parse(JSON.stringify(value)));
    });

    return function stop() {
        unsub();
    }
});

export const mousePos = readable({x: 0, y:0}, function start(set) {
    const unsub = mousePosRecord.subscribe("0", function(value) {
        set(value);
    });

    return function stop() {
        unsub();
    }
});


