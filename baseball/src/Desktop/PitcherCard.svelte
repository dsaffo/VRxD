<script>
    import { Col,  Row, Table} from 'sveltestrap';
    import { pitchTypeColorScale, speedScale, speedColorScale, pitchOutcomeColorScale}  from '../colorScales.js';
    import {stored_data } from '../stores.js';

    export let pitches = [];
    export let stats = {};

    let selected = "type";

    function onChange(event) {
		selected = event.currentTarget.value;
        stored_data.updateColor(selected);
	}


    let pitchTypes = [...new Set(pitches.map(item => item.pitch_name))];
    let pitchOutcomes = [...new Set(pitches.map(item => item.description))];
    let pitchSpeeds = ["65-75", "75-85", "85-95", "95-105"];
    let pitchSpeedValues = [70,80,90,100];

    console.log(pitchTypes);

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
                        <h4>Pitch Type</h4>  <input checked={selected==="type"} on:change={onChange} type="radio" name="legend" value="type" /> 
                    </label>
                    {#each pitchTypes as pitch}
                    <Row style="margin-bottom: -1.8vh;">
                        <Col sm=4>
                            <div style="height: 1.5vh; width: 100%; background-color: {pitchTypeColorScale(pitch)}"></div>
                        </Col>
                        <Col>
                            <p style="margin-left: 5px;">{pitch}</p>
                        </Col>
                    </Row>   
                    {/each}
                </Col>
                <Col>
                    <label style="display: inline-flex;">
                        <h4>Pitch Outcome</h4>  <input checked={selected==="outcome"} on:change={onChange} type="radio" name="legend" value="outcome" /> 
                    </label>
                    {#each pitchOutcomes as pitch}
                    <Row style="margin-bottom: -1.8vh;">
                        <Col sm=4>
                            <div style="height: 1.5vh; width: 100%; background-color: {pitchOutcomeColorScale(pitch)}"></div>
                        </Col>
                        <Col>
                            <p style="margin-left: 5px;">{pitch}</p>
                        </Col>
                    </Row>   
                    {/each}
                </Col>
                <Col>
                    <label style="display: inline-flex;">
                        <h4>Pitch Speed (mph)</h4>  <input checked={selected==="speed"} on:change={onChange} type="radio" name="legend" value="speed" /> 
                    </label>
                    {#each pitchSpeeds as pitch , i}
                    <Row style="margin-bottom: -1.8vh;">
                        <Col sm=4>
                            <div style="height: 1.5vh; width: 100%; background-color: {speedColorScale(speedScale(pitchSpeedValues[i]))}"></div>
                        </Col>
                        <Col>
                            <p style="margin-left: 5px;">{pitch}</p>
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

    tbody{
        color: white;
        font-size: 0.7vw;
    }
</style>