<script>
	import { page, stored_data } from './stores.js';
	import { onMount } from 'svelte';
	import VirtualEnv from './VR/VirtualEnv.svelte';
	import DesktopEnv from './Desktop/DesktopEnv.svelte';
	import { pitch_trajectory }  from './pitchCalc.js';


	
	onMount(async () => {
		stored_data.loadData();
	})


	


	

	/* Example of event listener that updates the data when UpdateData is called from store.js
	document.body.addEventListener('myEvent', (e) => { stored_data.updateStore(e.detail) });
	*/

	let page_value;

	const unsubscribe = page.subscribe(value => {
		page_value = value;
	});

	//when data is loaded print to console 
	//$: console.log($stored_data);

	//console.log(pitch_trajectory(-0.328,50.000,5.978,1.827,-135.807,-8.338,3.125,28.682,-12.443, 0.001));


</script>


{#if page_value == 0}

	<DesktopEnv></DesktopEnv>

{/if}


{#if page_value == 1}

	<VirtualEnv></VirtualEnv>

{/if}





