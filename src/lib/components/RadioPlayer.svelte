<script lang="ts">
	import { RadioBrowser } from '$lib/services/RadioBrowser';
	import { MusicState } from '$lib/state/MusicState/index.svelte';
	import type { TRadioList } from '$lib/services/RadioBrowser/RadioBrowserContract';

	const radioBrowser = RadioBrowser.getInstance();
	const musicState = MusicState.getInstance();

	let playlist: Promise<TRadioList[number]> = $derived(getAudio());
	let audio = $state<HTMLAudioElement | null>(null);

	async function getAudio() {
		const playlist = await radioBrowser
			.searchStations({
				name: musicState.playlistName as string,
				limit: 1
			})
			.then((r) => r[0]);

		if (!audio) {
			audio = new Audio();
		} else {
			audio.src = '';
		}

		audio.src = playlist.urlResolved;
		audio.play();

		return playlist;
	}
</script>

<div class="absolute right-2 bottom-2 flex gap-2 rounded-md bg-neutral-900 p-4 text-white">
	{#await playlist}
		<article class="flex items-center gap-4">
			<p>Loading Radio station</p>
			<span class="animate-spin">
				<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
					<path fill="currentColor" d="M12 4V2A10 10 0 0 0 2 12h2a8 8 0 0 1 8-8" />
				</svg>
			</span>
		</article>
	{:then playlist}
		<article>
			<p>{playlist.name}</p>
		</article>
	{:catch error}
		<p>{error.message}</p>
	{/await}
</div>
