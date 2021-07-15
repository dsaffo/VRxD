<script>
	import { page } from './stores.js';
	import VirtualEnv from './VR/VirtualEnv.svelte';
	import DesktopEnv from './Desktop/DesktopEnv.svelte';

	/* How to load data from store.js
	onMount(async () => {
		stored_data.loadData();
	})
	*/

	/* Example of event listener that updates the data when UpdateData is called from store.js
	document.body.addEventListener('myEvent', (e) => { stored_data.updateStore(e.detail) });
	*/

	let page_value;

	const unsubscribe = page.subscribe(value => {
		page_value = value;
	});

</script>

{#if page_value == 0}

	<DesktopEnv></DesktopEnv>

{/if}


{#if page_value == 1}

	<VirtualEnv></VirtualEnv>

{/if}





