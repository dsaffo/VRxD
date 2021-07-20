<script>
  import { page, stored_data } from '../stores.js';

  //subscribe to stored_data and assign its value to data
  let data;
  const unsubscribe = stored_data.subscribe(value => {
		data = value;
	});
  //print its result for testing
  //$: console.log(data);


</script>

<button on:click="{() => page.update(n => n = 1)}">switch</button>