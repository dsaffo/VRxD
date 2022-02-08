<script>
    import { interaction_store, definitions, tooltip_store} from "../stores";
    import { Tooltip } from 'sveltestrap';

    export let name = "undefined";
    export let value = "undefined";
    export let emb = false;
    export let vrMode;

</script>

<div class="lengend-header">
    {#if vrMode === "false"}
        <button id={value} class:selected="{$interaction_store.filter_store.includes(value)}" on:click="{() => interaction_store.updateLocalFilter(value)}" disabled={emb}>{name}</button>
        <Tooltip target={value}>{$definitions[value]}</Tooltip>
    {:else}
        <!-- svelte-ignore a11y-mouse-events-have-key-events -->
        <button id={value} 
                class:selected="{$interaction_store.filter_store.includes(value)}" 
                on:click="{() => interaction_store.updateLocalFilter(value)}" 
                on:mouseover="{() => tooltip_store.set(name + ": " + $definitions[value])}"
                on:mouseout="{() => tooltip_store.set(" ")}"
                disabled={emb}>{name}</button>
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