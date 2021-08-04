import { scaleSequential, scaleOrdinal, scaleLinear} from 'd3-scale';
import {schemeTableau10, interpolateYlOrRd, interpolateRdYlBu, interpolateTurbo, interpolateSpectral, schemeDark2, schemeSet1} from 'd3-scale-chromatic';

export let pitchTypeColorScale = scaleOrdinal(schemeTableau10);
export let speedScale = scaleLinear().domain([60,100]).range([1,0]);
export let speedColorScale = scaleSequential(interpolateSpectral);
export let pitchOutcomeColorScale = scaleOrdinal(schemeSet1);
export let percentileScale = scaleLinear().domain([0,100]).range([1,0]);
export let percentileColorScale = scaleSequential(interpolateRdYlBu);