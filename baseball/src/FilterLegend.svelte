<script>
    import { colorScaleKey }  from './colorScales.js';
    import { interaction_store } from './stores.js';
    import LegendButton from './LegendButton.svelte';

    export let name = "undefined";
    export let keys = [];
    export let value = "undefined";
    export let vrMode = false;
    export let interactions;

</script>

<div class="lengend-header">
    <button class:selected="{interactions.color_store === value}" on:click="{() => interaction_store.updateLocalColor(value)}" disabled={vrMode}>{name}</button>
    {#each keys as key}
        <LegendButton value={key} color={colorScaleKey(value,key)} interactions={interactions}></LegendButton>
    {/each}
</div>


<style>
 .lengend-header {
     display: inline-block;
     width: 100%;
     height: 100%;
 }

 button {
    background-color: #2c2928;
	color: white;
    margin: 1px;
    padding: 5px;
    font-size: medium;
 }

 .selected {
		background-color: #ad880d;
		color: white;
	}
</style>