<script>
import { pitch_trajectory }  from "../pitchCalc.js";
import { interaction_store, peerInteraction} from "../stores";
import { colorScale } from "../colorScales";
import simplify from "simplify-3d";
import "./meshline";
import "./ball";
import "aframe-curve-component";
import "aframe-alongpath-component";

export let pitches = [];
export let interactions;
export let filtered = [];

function pathGen (data) {
        var pitch = pitch_trajectory(
        data["release_pos_x"],
        data["release_pos_y"],
        data["release_pos_z"],
        data["vx0"],
        data["vy0"],
        data["vz0"],
        data["ax"],
        data["ay"],
        data["az"],
        data["release_spin_rate"],
        0.001
        );
        pitch = pitch.map(p => { return {x: p.x, y: p.y, z: p.z, t: p.t}});
        pitch = simplify(pitch, 0.01);
        return pitch; 
  };


let pitchObjs = []
let pitchPaths = []
let pitchIDs = []

for (let i =0; i < pitches.length; i++){
    var pitch = pathGen(pitches[i]);
    pitchObjs.push(pitch)
    pitchPaths.push(`${pitch.map((p) => `${-p.x} ${p.z} ${p.y}`)}`);
    pitchIDs.push(pitches[i]['id']);
}

    
    $: radius = function(id) {
        if (interactions.hover_store == id || $peerInteraction.hover_store == id){
        return "0.05"
        } 
        return "0.036"
        }
    

    $: opacity = function(id) {
        if (interactions.hover_store == id || $peerInteraction.hover_store == id){
            return "1"
        } 
        else if (interactions.hover_store == null){
            return "0.8"
        }
            return "0.1"
        }

    $: visible = function(id) {
        if (filtered.includes(id)){
            return "true"
        } 
        return "false"
    }

    $: classed = function(id) {
        if (filtered.includes(id)){
            return "collidable"
        } 
        return "none"
    }
    
    function mouseOver(id){
        interaction_store.updateLocalHover(id);
    }

    function mouseOut(){
        interaction_store.updateLocalHover(null);
    }

    /*
    let animatedIDs = [];
    function animate(id){
        var index = pitchIDs.indexOf(id);
        if(!animatedIDs.includes(index)){
            animatedIDs.push(index);
            setTimeout(function(){
                animatedIDs = animatedIDs.splice(index, 1);
            }, pitchObjs[index][pitchObjs[index].length - 1].t * 1000 + 5);     
        }    
      
    }

    $: played = function(id) {
        if (filtered.includes(id) && animatedIDs.includes(id)){
            return "true"
        } 
        return "false"
    }
    */


</script>
<a-entity>
    {#each pitches as pitch, i}
    <a-entity 
    class={classed(pitch.id)}
    visible={visible(pitch.id)}
    meshline="lineWidth: {1}; 
            path: {pitchPaths[pitchIDs.indexOf(pitch.id)]}; 
            color: {colorScale(interactions.color_store, pitch)};
            opacity: {opacity(pitch.id)};
            radius: {radius(pitch.id)};
            ballX: {-pitch['plate_x']};
            ballY: {pitch['plate_z']};"
    on:mouseenter={() => mouseOver(pitch.id)}
    on:mouseleave={() => mouseOut()}>
    </a-entity>
    <!--
    <a-curve visible={played(pitch.id)} id="pitchtrack{pitch.id}">
        {#each pitchObjs[i] as p}
            <a-curve-point position="{-p.x} {p.z} {p.y}"></a-curve-point>
        {/each}
    </a-curve>

    <a-sphere visible={played(pitch.id)} radius="0.0365" alongpath="curve: #pitchtrack{pitch.id}; loop: true; 
    dur: {pitchObjs[i][pitchObjs[i].length - 1].t * 1000}"></a-sphere>
    -->
   {/each}
</a-entity>
