import { scaleSequential, scaleOrdinal, scaleLinear} from 'd3-scale';
import {schemeTableau10, interpolateRdYlBu, interpolateSpectral, schemeSet1, interpolateRdYlGn} from 'd3-scale-chromatic';
import { extent } from 'd3';

export let pitchTypeColorScale = scaleOrdinal(schemeTableau10).domain(["4-Seam Fastball", "Split-Finger", "Cutter", "Slider", "Curveball"]);
export let speedScale = scaleLinear().domain([60,100]).range([1,0]);
export let speedColorScale = scaleSequential(interpolateSpectral);
export let pitchOutcomeColorScale = scaleOrdinal(schemeSet1);
export let percentileScale = scaleLinear().domain([0,100]).range([1,0]);
export let percentileColorScale = scaleSequential(interpolateRdYlBu);

let pitchSpeeds = ["65-75", "75-85", "85-95", "95-105"];
let pitchSpeedValues = [70,80,90,100];


export function colorScale(scale, data, index, n){
    if (scale === "absolute"){
        let cScale = scaleLinear().domain(extent(data[0]['data'])).range([1,0]);
        return speedColorScale(cScale(data[0]['data'][n]));
    } else if (scale === "relative"){
        let coord1 = data[index]['data'];
        let coord2 = data[index + 1]['data'];
        let relVal = [];
        for (let i = 0; i < coord1.length; i++){
            relVal.push(coord1[i] - coord2[i]);
        }
        
        let cScale = scaleLinear().domain(extent(relVal)).range([1,0]);
        return percentileColorScale(cScale(relVal[n]));
    }
    return 'black';
}

export function colorScaleVR(scale, data0, data1, data2, index){
    if (scale === "absolute"){
        let cScale = scaleLinear().domain(extent(data0)).range([1,0]);
        return speedColorScale(cScale(data0[index]));
    } else if (scale === "relative"){
        let relVal = [];
        for (let i = 0; i < data1.length; i++){
            relVal.push(data1[i] - data2[i]);
        }
        let cScale = scaleLinear().domain(extent(relVal)).range([1,0]);
        return percentileColorScale(cScale(relVal[index]));
    }

    return 'black'
}

/*
export function colorScale(scale, pitch){
    if (scale === "type"){
        return pitchTypeColorScale(pitch.pitch_name);
    } 
    else if (scale === "speed"){
        return speedColorScale(speedScale(pitch.effective_speed));
    } 
    else if (scale === "outcome"){
       return pitchOutcomeColorScale(pitch.description);
    } 
    return 'black';
}

export function colorScaleKey(scale, key){
    if (scale === "type"){
        return pitchTypeColorScale(key);
    } 
    else if (scale === "speed"){
        return speedColorScale(speedScale(pitchSpeedValues[pitchSpeeds.indexOf(key)]));
    } 
    else if (scale === "outcome"){
       return pitchOutcomeColorScale(key);
    } 
    return 'black';
}
*/