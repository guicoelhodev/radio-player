<script lang="ts">
	import Menu from '$lib/components/Menu/index.svelte';
	import ImageView from '$lib/components/ImageView.svelte';
	import RadioPlayer from '$lib/components/RadioPlayer/index.svelte';
</script>

<div class="relative">
	<main class="relative grid h-screen w-screen grid-cols-[1fr_auto] grid-rows-[1fr_auto]">
		<section>1</section>
		<section class="flex justify-center p-2 sm:items-center">
			<Menu />
		</section>
		<section class="col-span-2 flex sm:justify-end sm:p-2">
			<RadioPlayer />
		</section>
	</main>
	<ImageView />
</div>
