<script>
import { split } from 'aframe';
import { Form, FormGroup, FormText, Input, Label, Row, Col, Container } from 'sveltestrap';
import { form_store } from '../formStore.js';

 export let vr = false

 let width = window.innerWidth * 0.6;
 let height = window.innerHeight * 0.8;

$: value = $form_store;

const changeEvent = (e) => {
    form_store.emitChange(value);
};

</script>

{#if !vr}
<Container style="overflow: scroll; width: {width}px; height: {height}px; position: absolute; top: {window.innerHeight / 2 - height / 2}px; left: {window.innerWidth / 2 - width / 2}px; background: #333; border: solid grey;">

  <Row>
    <Col>
      <h3>Scouting Report</h3>
    </Col>
  </Row>

  <h5>Pitcher Information</h5>
  <Row>
    <Col>
      <FormGroup>
        <Label>Pitcher Name:</Label>
        <Input style="background: white; color: grey" plaintext bind:value={value.name} on:keyup={changeEvent} on:change={changeEvent}/>
      </FormGroup>
    </Col>
    
    <Col>
      <FormGroup>
      <Label>Pitcher Age</Label>
      <Input style="background: white; color: grey" plaintext bind:value={value.age} on:keyup={changeEvent}  on:change={changeEvent}/>
      </FormGroup>
    </Col>

    <Col>
      <FormGroup>
      <Label >Pitcher Throws</Label>
      <Input style="background: white; color: grey" plaintext bind:value={value.throws} on:keyup={changeEvent}  on:change={changeEvent}/>
      </FormGroup>
    </Col>
  </Row>

  <h5>Pitcher Stats and Percentiles</h5>
  <Row>
    <Col>
      <FormGroup>
        <Label>What do the stats and percentiles tell us about this pitchers; strengths, weaknesses, and overall abilities</Label>
        <Input type="textarea" name="text" id="exampleText"  bind:value={value.stats} on:keyup={changeEvent}  on:change={changeEvent}/>
      </FormGroup>
    </Col>
  </Row>

  <h5>Pitcher Pitching Arsenal</h5>
  <Label>Detail the characteristics of each pitch (i.e. movement, break, frequency, speed, outcome, etc.). What makes that pitch effective?</Label>
  <Row>
    <Col>
      <FormGroup>
        <Label>4-Seam Fast Ball</Label>
        <Input type="textarea" name="text" id="exampleText" bind:value={value.fastball} on:keyup={changeEvent}  on:change={changeEvent}/>
      </FormGroup>
    </Col>
    <Col>
      <FormGroup>
        <Label>Curve Ball</Label>
        <Input type="textarea" name="text" id="exampleText" bind:value={value.curveball} on:keyup={changeEvent}  on:change={changeEvent}/>
      </FormGroup>
    </Col>
  </Row>
  <Row>
    <Col>
      <FormGroup>
        <Label>Cutter</Label>
        <Input type="textarea" name="text" id="exampleText" bind:value={value.cutter} on:keyup={changeEvent}  on:change={changeEvent}/>
      </FormGroup>
    </Col>
    <Col>
      <FormGroup>
        <Label>Slider</Label>
        <Input type="textarea" name="text" id="exampleText" bind:value={value.slider} on:keyup={changeEvent}  on:change={changeEvent}/>
      </FormGroup>
    </Col>
  </Row>
  <Row>
    <Col>
      <FormGroup>
        <Label for="exampleText">Split-Finger</Label>
        <Input type="textarea" name="text" id="exampleText" bind:value={value.split} on:keyup={changeEvent}  on:change={changeEvent}/>
      </FormGroup>
    </Col>
    <Col>
      <FormGroup>
        <Label for="exampleText">Misc. Observations</Label>
        <Input type="textarea" name="text" id="exampleText" bind:value={value.misc} on:keyup={changeEvent}  on:change={changeEvent}/>
      </FormGroup>
    </Col>
  </Row>

  <h5>Summary</h5>
  <Row>
    <Col>
      <FormGroup>
        <Label>Summerize and conclude your findings.</Label>
        <Input type="textarea" name="text" id="exampleText" bind:value={value.summary} on:keyup={changeEvent}  on:change={changeEvent}/>
      </FormGroup>
    </Col>
  </Row>
</Container>
{/if}

{#if vr}
<Container style="overflow: scroll; width: 100%; height: 100%; background: #333; border: solid grey;">

  <Row>
    <Col>
      <h3>Scouting Report</h3>
    </Col>
  </Row>

  <h5>Pitcher Information</h5>
  <Row>
    <Col>
      <FormGroup>
        <Label>Pitcher Name:</Label>
        <div id="input" contenteditable>{$form_store.name}</div>
      </FormGroup>
    </Col>
    
    <Col>
      <FormGroup>
      <Label>Pitcher Age</Label>
      <div id="input" contenteditable>{$form_store.age}</div>
      </FormGroup>
    </Col>

    <Col>
      <FormGroup>
      <Label >Pitcher Throws</Label>
      <div id="input" contenteditable>{$form_store.throws}</div>
      </FormGroup>
    </Col>
  </Row>

  <h5>Pitcher Stats and Percentiles</h5>
  <Row>
    <Col>
      <FormGroup>
        <Label>What do the stats and percentiles tell us about this pitchers; strengths, weaknesses, and overall abilities</Label>
        <div id="textarea" contenteditable>{$form_store.stats}</div>
      </FormGroup>
    </Col>
  </Row>

  <h5>Pitcher Pitching Arsenal</h5>
  <Label>Detail the characteristics of each pitch (i.e. movement, break, frequency, speed, outcome, etc.). What makes that pitch effective?</Label>
  <Row>
    <Col>
      <FormGroup>
        <Label>4-Seam Fast Ball</Label>
        <div id="textarea" contenteditable>{$form_store.fastball}</div>
      </FormGroup>
    </Col>
    <Col>
      <FormGroup>
        <Label>Curve Ball</Label>
        <div id="textarea" contenteditable>{$form_store.curveball}</div>
      </FormGroup>
    </Col>
  </Row>
  <Row>
    <Col>
      <FormGroup>
        <Label>Cutter</Label>
        <div id="textarea" contenteditable>{$form_store.cutter}</div>
      </FormGroup>
    </Col>
    <Col>
      <FormGroup>
        <Label>Slider</Label>
        <div id="textarea" contenteditable>{$form_store.slider}</div>
      </FormGroup>
    </Col>
  </Row>
  <Row>
    <Col>
      <FormGroup>
        <Label for="exampleText">Split-Finger</Label>
        <div id="textarea" contenteditable>{$form_store.split}</div>
      </FormGroup>
    </Col>
    <Col>
      <FormGroup>
        <Label for="exampleText">Misc. Observations</Label>
        <div id="textarea" contenteditable>{$form_store.misc}</div>
      </FormGroup>
    </Col>
  </Row>

  <h5>Summary</h5>
  <Row>
    <Col>
      <FormGroup>
        <Label>Summerize and conclude your findings.</Label>
        <div id="textarea" contenteditable>{$form_store.summary}</div>
      </FormGroup>
    </Col>
  </Row>
</Container>
{/if}

<style>
#textarea {
    -moz-appearance: textfield-multiline;
    -webkit-appearance: textarea;
    background-color: white;
    background-color: -moz-field;
    border: 1px solid darkgray;
    box-shadow: 1px 1px 1px 0 lightgray inset;  
    font: -moz-field;
    font: -webkit-small-control;
    border: 1px solid gray;
    font: medium -moz-fixed;
    font: -webkit-small-control;
    color: black;
    height: 100%;
    word-wrap: break-word;
    word-break: break-all;
    width: 100%;
    white-space: pre-line
}


#input {
    -moz-appearance: textfield;
    -webkit-appearance: textfield;
    background-color: white;
    background-color: -moz-field;
    border: 1px solid darkgray;
    box-shadow: 1px 1px 1px 0 lightgray inset;  
    font: -moz-field;
    font: -webkit-small-control;
    width:  100%;    
    max-width:  100%;   
    height: 100%;
    color: black;
    word-wrap: break-word;
    word-break: break-all;
}


</style>