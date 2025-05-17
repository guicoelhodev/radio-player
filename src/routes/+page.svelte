<script lang="ts">
	import Menu from '$lib/components/Menu/index.svelte';
	import ImageView from '$lib/components/ImageView.svelte';
	import RadioPlayer from '$lib/components/RadioPlayer/index.svelte';
	import Timer from '$lib/components/Timer/index.svelte';
</script>

<div class="relative">
	<main class="relative grid h-[100dvh] w-screen grid-cols-[1fr_5rem] grid-rows-[1fr_5rem]">
		<section class="flex items-center justify-center">
			<a
				class="absolute top-4 left-4 text-xl font-extrabold text-white sm:text-2xl"
				aria-label="link to github project"
				href="https://github.com/guicoelhodev/radio-player"
				target="_blank"
			>
				&lt;guicoelhodev /&gt;
			</a>
			<Timer />
		</section>
		<section class="flex justify-center p-2 sm:items-center">
			<Menu />
		</section>
		<section class="col-span-2 flex sm:justify-end sm:p-2">
			<RadioPlayer />
		</section>
	</main>
	<ImageView />
</div>
