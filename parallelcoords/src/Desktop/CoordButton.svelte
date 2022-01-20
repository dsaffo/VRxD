<script>
    import { interaction_store } from "../stores";

    export let name = "undefined";
    export let value = "undefined";
    export let vrMode = false;
    export let interactions;

</script>

<div class="lengend-header">
    <button class:selected="{$interaction_store.filter_store.includes(value)}" on:click="{() => interaction_store.updateLocalFilter(value)}" disabled={vrMode}>{name}</button>
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