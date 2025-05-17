<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLButtonAttributes } from 'svelte/elements';

	type TProps = HTMLButtonAttributes & {
		children: Snippet;
	};

	let props: TProps = $props();
</script>

<button
	class="rounded-md border-2 p-4 font-bold text-white filter backdrop-blur-sm transition-all hover:bg-white hover:text-neutral-800"
	{...props}
>
	{@render props.children()}
</button>
