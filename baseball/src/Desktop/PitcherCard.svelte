<script>
    import { Col,  Row, Table} from 'sveltestrap';
    import { pitchTypeColorScale, speedScale, speedColorScale, pitchOutcomeColorScale}  from '../colorScales.js';
    import { interaction_store } from '../stores.js';

    export let pitches = [];
    export let stats = {};

    let interactions;

    const unsubscribe = interaction_store.subscribe(value => {
        interactions = value;
    })

    function onChange(event) {
        console.log("changed");
		let selected = event.currentTarget.value;
        interaction_store.updateLocalColor(selected);
	}

    let pitchTypes = [...new Set(pitches.map(item => item.pitch_name))];
    let pitchOutcomes = [...new Set(pitches.map(item => item.description))];
    let pitchSpeeds = ["65-75", "75-85", "85-95", "95-105"];
    let pitchSpeedValues = [70,80,90,100];

    

    interaction_store.updateLocalFilter([].concat(pitchTypes,pitchOutcomes,pitchSpeeds));

    function onFilterChange(event) {
		var changed = event.currentTarget.value;
        let filters = $interaction_store.filter_store;
        if(!filters.includes(changed)){          //checking weather filtersay contain the id
            filters.push(changed);               //adding to filtersay because value doesnt exists
        }else{
            filters.splice(filters.indexOf(changed), 1);  //deleting
        }

        interaction_store.updateLocalFilter(filters);
	}

</script>

<div class="chart">
        <Row  style="height: 40%; border: 2px solid grey; border-bottom: none;"> 
            <Col sm='2' style="border-right: 2px solid grey;">
			
			</Col>
			<Col sm='10'>
				<Table borderless>
                    <tbody>
                      <tr>
                        <td>Name: {stats.name}</td>
                        <td>Age: {stats.age}</td>
                        <td>Team: {stats.team}</td>
                        <td>Country: {stats.country}</td>
                      </tr>
                      <tr>
                        <td>Throws: {stats.hand}</td>
                        <td>Games: {stats.games}</td>
                        <td>Wins: {stats.wins}</td>
                        <td>Losses: {stats.loss}</td>
                      </tr>
                    </tbody>
                  </Table>
			</Col>
        </Row>

        <Row  style="height: 60%; border: 2px solid grey;"> 
                <Col>
                    <label style="display: inline-flex;">
                        <h4>Pitch Type</h4>  <input checked={$interaction_store.color_store=="type"} on:change={onChange} type="radio" name="legend" value="type" /> 
                    </label>
                    {#each pitchTypes as pitch}
                    <Row style="margin-bottom: -1.8vh;">
                        <Col sm=4>
                            <div style="height: 1.5vh; width: 100%; background-color: {pitchTypeColorScale(pitch)}"></div>
                        </Col>
                        <Col>
                            <label>
                                <input type=checkbox name="filters" value={pitch} on:change={onFilterChange} checked={$interaction_store.filter_store.includes(pitch)}>
                                {pitch}
                            </label>
                        </Col>
                    </Row>   
                    {/each}
                </Col>
                <Col>
                    <label style="display: inline-flex;">
                        <h4>Pitch Outcome</h4>  <input checked={$interaction_store.color_store=="outcome"} on:change={onChange} type="radio" name="legend" value="outcome" /> 
                    </label>
                    {#each pitchOutcomes as pitch}
                    <Row style="margin-bottom: -1.8vh;">
                        <Col sm=4>
                            <div style="height: 1.5vh; width: 100%; background-color: {pitchOutcomeColorScale(pitch)}"></div>
                        </Col>
                        <Col>
                            <label>
                                <input type=checkbox name="filters" value={pitch} on:change={onFilterChange} checked={$interaction_store.filter_store.includes(pitch)}>
                                {pitch}
                            </label>
                        </Col>
                    </Row>   
                    {/each}
                </Col>
                <Col>
                    <label style="display: inline-flex;">
                        <h4>Pitch Speed (mph)</h4>  <input checked={$interaction_store.color_store=="speed"} on:change={onChange} type="radio" name="legend" value="speed" /> 
                    </label>
                    {#each pitchSpeeds as pitch , i}
                    <Row style="margin-bottom: -1.8vh;">
                        <Col sm=4>
                            <div style="height: 1.5vh; width: 100%; background-color: {speedColorScale(speedScale(pitchSpeedValues[i]))}"></div>
                        </Col>
                        <Col>
                            <label>
                                <input type=checkbox name="filters" value={pitch} on:change={onFilterChange} checked={$interaction_store.filter_store.includes(pitch)}>
                                {pitch}
                            </label>
                        </Col>
                    </Row>   
                    {/each}
                </Col>
        </Row>
   
</div>


<style>
    .chart, h2, p, img{
        width: 100%;
        height: 100%;
        font-size: 0.6vw;
        
    }

    h4 {
        font-size: 1.2vh;
        
    }

    input{
	width: 12px;
	height: 12px;
	font-size: 0.1vw;
	margin-top: 5px;
}

    input:checked {
        border-color:  rgba(0, 195, 255, 0.795);
        background-color: rgba(0, 195, 255, 0.795);
    }


    tbody{
        color: white;
        font-size: 0.7vw;
    }
</style>