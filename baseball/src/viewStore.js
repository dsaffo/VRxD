import { readable } from 'svelte/store';
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
export const chartRecord = client.record.getRecord("chartRecs");
export const controlRecord = client.record.getRecord("controlRecs");
export const formRecord = client.record.getRecord("formRecs");



export const windowSize = readable({width:1920, height:1080}, function start(set) {
    const unsub = windowSizeRecord.subscribe("0", function(value) {
        set(value);
    });

    return function stop() {
        unsub;
    }
});

export const mousePos = readable({x: 0, y:0}, function start(set) {
    const unsub = mousePosRecord.subscribe("0", function(value) {
        set(value);
    });

    return function stop() {
        unsub;
    }
});

export const cameraPos = readable({x: 0, y:-1, z:0}, function start(set) {
    const unsub = cameraPosRecord.subscribe("0", function(value) {
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

export const chartRecs = readable({pos: {x: 0, y: 0, z: 0}, rot: {x: 0, y: 0, z: 0}}, function start(set) {
    const unsub = chartRecord.subscribe("0", function(value) {
        set(value);
    });

    return function stop() {
        unsub;
    }
});

export const controlRecs = readable({pos: {x: 0, y: 0, z: 0}, rot: {x: 0, y: 0, z: 0}}, function start(set) {
    const unsub = controlRecord.subscribe("0", function(value) {
        set(value);
    });

    return function stop() {
        unsub;
    }
});

export const formRecs = readable({pos: {x: 0, y: 0, z: 0}, rot: {x: 0, y: 0, z: 0}, height: 0}, function start(set) {
    const unsub = formRecord.subscribe("0", function(value) {
        set(value);
    });

    return function stop() {
        unsub;
    }
});




