<script>
import { FormGroup, Input, Label, Row, Col, Container } from 'sveltestrap';
import { form_store } from '../formStore.js';
import { draggable } from 'svelte-drag';

 export let vr = false


 let windowH = window.innerHeight;
 let windowW = window.innerWidth;
 let width = window.innerHeight * 0.8;
 let height = window.innerHeight * 0.6;

$: value = $form_store;

const changeEvent = (e) => {
    form_store.emitChange(value);
};

</script>

{#if !vr}
<div class="resizable" style="width: 1000px; height: 600px; position:absolute; z-index: 500;" use:draggable={{ handle: '.handle', defaultPosition:  { x: (windowW - width)/2, y:  -windowH + (height/2)/2}}}>
<Container fluid style="background: #333; border: solid grey; width: 100%; height: 100%; overflow:auto">

  <Row>
    <Col  class="handle" style="text-align: center; background:tomato;">
      <h3>Scouting Report</h3>
    </Col>
  </Row>


  <Row>
    <Col>
      <FormGroup>
        <Label>Are there any disticint groups or clusters? If yes, what defines these groups.</Label>
        <Input type="textarea" name="text" id="exampleText"  bind:value={value.groups} on:keyup={changeEvent}  on:change={changeEvent}/>
      </FormGroup>
    </Col>
  </Row>

  <Row>
    <Col>
      <FormGroup>
        <Label>What data points correlate with expected batting average (xba)?</Label>
        <Input type="textarea" name="text" id="exampleText"  bind:value={value.xba} on:keyup={changeEvent}  on:change={changeEvent}/>
      </FormGroup>
    </Col>
  </Row>

  <Row>
    <Col>
      <FormGroup>
        <Label>Who is the top performing pitcher and why?</Label>
        <Input type="textarea" name="text" id="exampleText"  bind:value={value.top} on:keyup={changeEvent}  on:change={changeEvent}/>
      </FormGroup>
    </Col>
  </Row>

  <Row>
    <Col>
      <FormGroup>
        <Label>Who is the bottom performing pitcher and why?</Label>
        <Input type="textarea" name="text" id="exampleText"  bind:value={value.bottom} on:keyup={changeEvent}  on:change={changeEvent}/>
      </FormGroup>
    </Col>
  </Row>

  <Row>
    <Col>
      <FormGroup>
        <Label>Summerize and conclude your findings.</Label>
        <Input type="textarea" name="text" id="exampleText"  bind:value={value.summary} on:keyup={changeEvent}  on:change={changeEvent}/>
      </FormGroup>
    </Col>
  </Row>
</Container>
</div>
{/if}

{#if vr}
<Container style="overflow: scroll; width: 100%; height: 100%; background: #333; border: solid grey;">

  <Row>
    <Col>
      <h3>Scouting Report</h3>
    </Col>
  </Row>

  <Row>
    <Col>
      <FormGroup>
        <Label>Are there any disticint groups or clusters? If yes, what defines these groups.</Label>
        <div id="input" contenteditable>{$form_store.groups}</div>
      </FormGroup>
    </Col>
  </Row>

  <Row>
    <Col>
      <FormGroup>
        <Label>What data points correlate with expected batting average (xba)?</Label>
        <div id="textarea" contenteditable>{$form_store.xba}</div>
      </FormGroup>
    </Col>
  </Row>

  <Row>
    <Col>
      <FormGroup>
        <Label>Who is the top performing pitcher and why?</Label>
        <div id="textarea" contenteditable>{$form_store.top}</div>
      </FormGroup>
    </Col>
  </Row>

  <Row>
    <Col>
      <FormGroup>
        <Label>Who is the bottom performing pitcher and why?</Label>
        <div id="textarea" contenteditable>{$form_store.bottom}</div>
      </FormGroup>
    </Col>
  </Row>

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

.resizable {
  resize: both;
  overflow: auto;
  border: 1px solid black;
}

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
    height: 100%;
    color: black;
    word-wrap: break-word;
    word-break: break-all;
}


</style>