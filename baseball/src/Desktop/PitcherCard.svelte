<script>
    import { Col,  Row, Table} from 'sveltestrap';
    import { pitchTypeColorScale, speedScale, speedColorScale, pitchOutcomeColorScale}  from '../colorScales.js';
    import { interaction_store } from '../stores.js';
    import FilterLegend from '../FilterLegend.svelte';
import { index } from 'aframe';

    export let pitches = [];
    export let stats = {};
    export let vrMode = false;
    export let interactions;

    const distinct = (value, index, self) => {
        return self.indexOf(value) === index;
    }

    let pitchTypes = pitches.map(item => item.pitch_name).filter(distinct);
    let pitchOutcomes = pitches.map(item => item.description).filter(distinct);
    let pitchSpeeds = ["65-75", "75-85", "85-95", "95-105"];
    let pitchSpeedValues = [70,80,90,100];

    interaction_store.setFilterStore([].concat(pitchTypes,pitchOutcomes,pitchSpeeds));

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
        <Row  style="height: 30%; border: 2px solid grey; border-bottom: none;"> 
            <Col sm='2' style="border-right: 2px solid grey;">
			
			</Col>
			<Col sm='10' style='padding-top: 5px;'>
				<Table borderless style="margin: -15px;">
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

        <Row  style="height: 70%; border: 2px solid grey;"> 
            <Col>
                <FilterLegend name="Pitch Type" value="type" keys={pitchTypes} vrMode={vrMode} interactions={interactions}></FilterLegend>
            </Col>

            <Col>
                <FilterLegend name="Outcome" value="outcome"  keys={pitchOutcomes} vrMode={vrMode} interactions={interactions}></FilterLegend>
            </Col>

            <Col>
                <FilterLegend name="Pitch Speed" value="speed"  keys={pitchSpeeds} vrMode={vrMode} interactions={interactions}></FilterLegend>
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
        font-size: 12px;
    }
</style>