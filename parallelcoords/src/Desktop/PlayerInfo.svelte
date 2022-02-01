<script>
export let interactions;
export let data;

let m = { x: 0, y: 0 };

function handleMousemove(event) {
  m.x = event.clientX;
  m.y = event.clientY;
}

$: index = data.findIndex(object => {
  return object.player_id == interactions.hover_store;
});

$: player = data[index];


</script>

<div class="flex" on:mousemove={handleMousemove} style="transform: translate3d({m.x}px, {m.y}px, 0px);">
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
    position: absolute;
    height: 200px;
    width: 200px;
    display: flex;
    flex-direction: column; 
    flex-wrap:wrap;
  }

</style>