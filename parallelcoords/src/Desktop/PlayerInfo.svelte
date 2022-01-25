<script>
export let interactions;
export let data;

$: index = data.findIndex(object => {
  return object.player_id == interactions.hover_store;
});

$: player = data[index];

</script>

<div class="flex">
  {#if index === -1}
    <div>Player Name: Hover line to display stats</div>
  {:else}
  <div>Player Name: {player.first_name} {player.last_name}</div>
  {#each interactions.filter_store as coord}    
    <div>{coord}: {player[coord]}</div>
  {/each}
  {/if}
</div>


<style>
  .flex {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column; 
    flex-wrap:wrap;
  }

</style>