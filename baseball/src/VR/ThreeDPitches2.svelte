<script>
import { pitch_trajectory }  from "../pitchCalc.js";
import { interaction_store, peerInteraction} from "../stores";
import { colorScale } from "../colorScales";
import simplify from "simplify-3d";
import "./meshline";
import "./ball";

export let pitches = [];
export let interactions;

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
        pitch = pitch.map(p => { return {x: p.x, y: p.y, z: p.z}});
        pitch = simplify(pitch, 0.009);
    return `${pitch
      .map((p) => `${-p.x} ${p.z} ${p.y}`)}`;
  };
let pitchPaths = []
let pitchIDs = []
for (let i =0; i < pitches.length; i++){
    pitchPaths.push(pathGen(pitches[i]));
    pitchIDs.push(pitches[i]['id']);
}

   $: radius = (id) => {
        if (interactions.hover_store == id || $peerInteraction.hover_store == id){
        return "0.05"
        } 
        return "0.036"
        }

    $: opacity = (id) => {
        if (interactions.hover_store == id || $peerInteraction.hover_store == id){
        return "1"
        } 
        else if (interactions.hover_store == null){
        return "0.8"
        }
        return "0.1"
        }
    
    function mouseOver(id){
            interaction_store.updateLocalHover(id);
        }

    function mouseOut(){
        interaction_store.updateLocalHover(null);
    }

</script>
<a-entity>
    {#each pitches as pitch, i}
    <a-entity 
        position="0 0 0"
        class="collidable"
        meshline= "lineWidth: {1}; 
                path: {pitchPaths[pitchIDs.indexOf(pitch.id)]}; 
                color: {colorScale(interactions.color_store, pitch)};
                opacity: {opacity(pitch.id)};"
        on:mouseenter={() => mouseOver(pitch.id)}
        on:mouseleave={() => mouseOut()}>
    </a-entity>
  

    <a-entity 
        position="{-pitch['plate_x']} {pitch['plate_z']} 0" 
        class="collidable"
        ball="color: {colorScale(interactions.color_store, pitch)};
            ballX: {-pitch['plate_x']};
            ballY: {pitch['plate_z']};
            opacity: {opacity(pitch.id)};"
    
        on:mouseenter={() => mouseOver(pitch.id)}
        on:mouseleave={() => mouseOut()}>
    </a-entity>

    {/each}
</a-entity>
