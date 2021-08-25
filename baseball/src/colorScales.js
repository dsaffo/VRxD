import { scaleSequential, scaleOrdinal, scaleLinear} from 'd3-scale';
import {schemeTableau10, interpolateYlOrRd, interpolateRdYlBu, interpolateTurbo, interpolateSpectral, schemeDark2, schemeSet1} from 'd3-scale-chromatic';

export let pitchTypeColorScale = scaleOrdinal(schemeTableau10).domain(["4-Seam Fastball", "Split-Finger", "Cutter", "Slider", "Curveball"]);
export let speedScale = scaleLinear().domain([60,100]).range([1,0]);
export let speedColorScale = scaleSequential(interpolateSpectral);
export let pitchOutcomeColorScale = scaleOrdinal(schemeSet1);
export let percentileScale = scaleLinear().domain([0,100]).range([1,0]);
export let percentileColorScale = scaleSequential(interpolateRdYlBu);

let pitchSpeeds = ["65-75", "75-85", "85-95", "95-105"];
let pitchSpeedValues = [70,80,90,100];


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