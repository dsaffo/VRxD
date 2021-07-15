<script>
  import { page } from '../stores.js';
</script>

<button on:click="{() => page.update(n => n = 1)}">switch</button>