<script lang="ts">
	import PlaylistMusic from './PlaylistMusic.svelte';

	const className =
		'p-4 text-white rounded-full cursor-pointer filter backdrop-contrast-125 hover:backdrop-contrast-200 transition-all';

	type TStep = 'idle' | 'changePlaylist';

	let step: TStep = $state('changePlaylist');

	function handleStep(newStep: TStep) {
		if (newStep === step) return (step = 'idle');
		return (step = newStep);
	}

	const componentsStep: Record<TStep, any> = {
		idle: null,
		changePlaylist: PlaylistMusic
	};

	const CurrentStep = $derived(componentsStep[step]);
</script>

<div class="fixed top-4 right-1 sm:top-1/2 sm:right-4 sm:-translate-y-1/2">
	<section class="relative">
		<ul class="p-2">
			<button
				onclick={() => handleStep('changePlaylist')}
				aria-label="Change radio"
				class={className}
				title="Change playlist"
			>
				<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
					><path
						fill="currentColor"
						d="M20 2H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2m-2 5h-3v5.5a2.5 2.5 0 0 1-5 0a2.5 2.5 0 0 1 2.5-2.5c.57 0 1.08.19 1.5.51V5h4zM4 6H2v14c0 1.1.9 2 2 2h14v-2H4z"
					/></svg
				>
			</button>
		</ul>

		{#if step !== 'idle'}
			<article
				class="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-md p-4 text-white filter backdrop-blur-md backdrop-contrast-125 sm:absolute sm:right-20 sm:left-auto sm:translate-x-0"
			>
				<CurrentStep />
			</article>
		{/if}
	</section>
</div>
