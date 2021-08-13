<script>
    import { interaction_store } from './stores.js';

    export let value = 'undefiend';
    export let color = 'red';

 
    
</script>


<div class="legend-header">
    <button 
        class:selected="{$interaction_store.filter_store.includes(value)}" 
        on:click="{() => interaction_store.updateLocalFilter(value)}" 
        style="background-color: {color};">
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