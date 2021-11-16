<script>
    import "aframe";
    import "aframe-forcegraph-component";


   

    function color(id) {
		if (id.includes("ingredient")){
			return 'green'
		} else if (id.includes("recipe_american")) {
			return 'red'; 
		} else if (id.includes("recipe_italian")) {
			return 'blue'; 
		} else if (id.includes("recipe_italamer")) {
			return 'orange'; 
		} 
		return 0;
	}

</script>

<a-scene>
    <a-entity>
        <a-entity forcegraph="json-url: bipartite_graph.json; node-rel-size: 2;"></a-entity>
    </a-entity>
</a-scene>
