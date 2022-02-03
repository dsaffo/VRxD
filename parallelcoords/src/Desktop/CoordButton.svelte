<script>
    import { interaction_store, definitions} from "../stores";
    import { Tooltip } from 'sveltestrap';

    export let name = "undefined";
    export let value = "undefined";
    export let emb = false;
    export let vrMode;

</script>

<div class="lengend-header">
    <button id={value} class:selected="{$interaction_store.filter_store.includes(value)}" on:click="{() => interaction_store.updateLocalFilter(value)}" disabled={emb}>{name}</button>
    {#if vrMode === "false"}
        <Tooltip target={value}>{$definitions[value]}</Tooltip>
    {/if}
    
</div>


<style>
 .lengend-header {
     width: min-content;
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