<script>
    import { colorScaleKey }  from './colorScales.js';
    import { interaction_store } from './stores.js';
    import LegendButton from './LegendButton.svelte';

    export let name = "undefined";
    export let keys = [];
    export let value = "undefined";
</script>

<div class="lengend-header">
    <button class:selected="{$interaction_store.color_store === value}" on:click="{() => interaction_store.updateLocalColor(value)}">{name}</button>
    {#each keys as key}
        <LegendButton value={key} color={colorScaleKey(value,key)}></LegendButton>
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
    padding: 2px;
    font-size: 15px;
 }

 .selected {
		background-color: #ad880d;
		color: white;
	}
</style>