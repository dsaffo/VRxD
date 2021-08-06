<script>
    import "aframe-curve-component";
    import { pitch_trajectory }  from "../pitchCalc.js";
    import { interaction_store, peerInteraction} from "../stores";
    import { colorScale } from "../colorScales";

    export let pitches = [];

    let interactions;

    const unsubscribe = interaction_store.subscribe((value) => {
        interactions = value;
    });

    function pathGen(data) {
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
        0.001
        )
        
        return pitch;
    };

</script>

{#each pitches as pitch, i}
<a-curve id="track{i}" type="CatmullRom" position="0 0 0" rotation="" scale="" visible="" curve="">
        {#each pathGen(pitch) as p}
		    <a-curve-point position="{-p.x} {p.z} {p.y}"></a-curve-point>
        {/each}
  </a-curve>
  <a-draw-curve curveref="#track{i}" material="shader: line; color: {colorScale(interactions.color_store, pitch)};"></a-draw-curve>

  <a-sphere position="{-pitch['plate_x']} {pitch['plate_z']} 0" radius='0.036' color={colorScale(interactions.color_store, pitch)}></a-sphere>
{/each}

  <!--<a-sphere position="{-data[index]['plate_x']} {data[index]['plate_z']} 0" radius='0.036'></a-sphere>-->