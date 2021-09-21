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

export const windowSizeRecord = client.record.getRecord("windowSize");
export const mousePosRecord = client.record.getRecord("mousePos");
export const cameraPosRecord = client.record.getRecord("cameraPos");
export const cameraRotRecord = client.record.getRecord("cameraRot");
export const desktopScreenRecord = client.record.getRecord("desktopScreen");



export const windowSize = readable({width:1920, height:1080}, function start(set) {
    const unsub = windowSizeRecord.subscribe("0", function(value) {
        set(value);
    });

    return function stop() {
        unsub;
    }
});

export const mousePos = readable({x: 0, y:0}, function start(set) {
    //const unsub = mousePosRecord.subscribe("0", function(value) {
       // set(value);
    //});

    return function stop() {
      //  unsub;
    }
});

export const cameraPos = readable({x: 0, y:0, z:0}, function start(set) {
    const unsub = cameraPosRecord.subscribe("0", function(value) {
        console.log(value)
        set(value);
    });

    return function stop() {
        unsub;
    }
});

export const cameraRot = readable({x: 0, y:0, z:0}, function start(set) {
    const unsub = cameraRotRecord.subscribe("0", function(value) {
        set(value);
    });

    return function stop() {
        unsub;
    }
});

export const screenRecord = readable("none", function start(set) {
    const unsub = desktopScreenRecord.subscribe("0", function(value) {
        set(value);
    });

    return function stop() {
        unsub;
    }
});


