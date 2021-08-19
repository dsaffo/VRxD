<script>
    //import "aframe-curve-component";
    import "aframe-meshline-component";
    import { pitch_trajectory }  from "../pitchCalc.js";
    import { interaction_store, peerInteraction} from "../stores";
    import { colorScale } from "../colorScales";
    import simplify from "simplify-3d";

    export let pitches = [];

    export let interactions;

    /*function pathGen2(data) {
        console.log("pathGen")
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
        0.005 //calculate less freq to have less curve point dom elements (hurts performance)
        )
        
        return pitch.slice(1,-1);
    };*/

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
        pitch = simplify(pitch, 0.001);

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
        if (interactions.hover_store == id){
        return "1"
        } 
        else if (interactions.hover_store == null){
        return "0.8"
        }
        return "0.1"
        }

    $: stroke = (id) => {
        if (interactions.hover_store == id || $peerInteraction.hover_store == id){
        return "8"
        } 
        else if (interactions.hover_store == null){
        return "2"
        }
        return "0"
    }

    function mouseOver(id){
        interaction_store.updateLocalHover(id);
    }

    function mouseOut(){
        interaction_store.updateLocalHover(null);
    }

</script>

<a-entity id="pitch-paths">
{#each pitches as pitch, i}
    <a-entity>
        <!--
        <a-curve id="track{i}" type="CatmullRom" position="0 0 0" rotation="" scale="" visible="" curve="">
            {#each pathGen(pitch) as p}
                <a-curve-point position="{-p.x} {p.z} {p.y}"></a-curve-point>
            {/each}
        </a-curve>
        
        <a-draw-curve curveref="#track{i}" material="shader: line; color: {colorScale(interactions.color_store, pitch)}; opacity: {opacity(pitch.id)};"></a-draw-curve>-->

        <!-- svelte-ignore a11y-mouse-events-have-key-events -->

        <a-entity meshline="lineWidth: {stroke(pitch.id)}; path: {pitchPaths[pitchIDs.indexOf(pitch.id)]}; color: {colorScale(interactions.color_store, pitch)};"></a-entity>
  
        <a-sphere 
            class="collidable"
            position="{-pitch['plate_x']} {pitch['plate_z']} 0" 
            radius={radius(pitch.id)}
            opacity={opacity(pitch.id)}
            color={colorScale(interactions.color_store, pitch)}
            on:mouseenter={() => mouseOver(pitch.id)}
            on:mouseleave={() => mouseOut()}
        ></a-sphere>
    </a-entity>
{/each}
</a-entity>

  <!--<a-sphere position="{-data[index]['plate_x']} {data[index]['plate_z']} 0" radius='0.036'></a-sphere>-->