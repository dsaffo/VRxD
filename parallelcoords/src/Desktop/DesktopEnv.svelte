<script>
	import { Col, Container, Row } from 'sveltestrap';
	import { stats_store } from '../stores.js';
	import ParallelCoords2D from './ParallelCoords2D.svelte';

	
	let data

	const urlParams = new URLSearchParams(window.location.search);
    const isVR = urlParams.has('vr');

	let vrView = false;
  	const vrViewToggle = () => (vrView = !vrView);

	let report = false;
  	const reportToggle = () => (report = !report);

	const stats_unsub = stats_store.subscribe(value => {
		data = value;
	});


	//$: console.log(data);


</script>

{#if data.length > 0}

	<ParallelCoords2D data={data}></ParallelCoords2D>

{/if}
