<script lang="ts">
	import { RadioBrowser } from '$lib/services/RadioBrowser';
	import { MusicState } from '$lib/state/MusicState/index.svelte';
	import type { TRadioList } from '$lib/services/RadioBrowser/RadioBrowserContract';

	const radioBrowser = RadioBrowser.getInstance();
	const musicState = MusicState.getInstance();

	let stationsPromise: Promise<TRadioList> = $derived(
		radioBrowser.searchStations({
			name: musicState.getCurrentAudio().radioName,
			limit: 1
		})
	);
</script>

<div class="absolute right-2 bottom-2 flex gap-2 rounded-md bg-neutral-900 p-4 text-white">
	{#await stationsPromise}
		<article class="flex items-center gap-4">
			<p>Loading Radio station</p>
			<span class="animate-spin">
				<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
					<path fill="currentColor" d="M12 4V2A10 10 0 0 0 2 12h2a8 8 0 0 1 8-8" />
				</svg>
			</span>
		</article>
	{:then stations}
		{$inspect(stations)}
		<ul>
			{#each stations as station (station.id)}
				<audio autoplay controls src={station.urlResolved}></audio>
			{/each}
		</ul>
	{:catch error}
		<p>{error.message}</p>
	{/await}
</div>
