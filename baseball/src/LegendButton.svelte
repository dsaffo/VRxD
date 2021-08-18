<script>
    import { interaction_store } from './stores.js';

    export let value = 'undefiend';
    export let color = 'red';
    export let vrMode = false;
    export let interactions;

 
    
</script>


<div class="legend-header">
    <button 
        class:selected="{interactions.filter_store.includes(value)}" 
        on:click="{() => interaction_store.updateLocalFilter(value)}" 
        style="background-color: {color};"
        disabled={vrMode}>
    </button>
    <span>{value}</span>
</div>

<style>
    .lengend-header {
        display: inline-block;
        text-align: center;
        vertical-align: middle;
        align-items: center;
    }
   
    button {
        padding: 0px;
        margin: 0px;
        border: none;
       opacity: 20%;
       color: white;
       width: 30px;
       height: 15px;
    }
   
    .selected {
           color: white;
           opacity: 100%;
       }

    span {
        font-size: 12px;
    }
   </style>