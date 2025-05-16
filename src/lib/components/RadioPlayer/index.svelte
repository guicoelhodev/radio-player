<script lang="ts">
	import { RadioBrowser } from '$lib/services/RadioBrowser';
	import { MusicState } from '$lib/state/MusicState/index.svelte';
	import type { TRadioList } from '$lib/services/RadioBrowser/RadioBrowserContract';
	import WaveSound from './WaveSound.svelte';
	import { onMount } from 'svelte';

	const radioBrowser = RadioBrowser.getInstance();
	const musicState = MusicState.getInstance();

	let playlist: Promise<TRadioList[number]> = $derived(getPlaylistName());

	let audio = $state<HTMLMediaElement | null>(null);
	let isPaused = $derived(audio?.paused ?? true);

	async function getPlaylistName() {
		const playlist = await radioBrowser
			.searchStations({
				name: musicState.playlistName as string,
				limit: 1
			})
			.then((r) => r[0]);

		if (!audio) {
			return playlist;
		} else {
			audio.src = ''; // reset audio
			audio.load();
		}

		audio.src = playlist.urlResolved;
		audio.play();

		isPaused = false;
		return playlist;
	}

	function playMusic() {
		if (!audio) return;

		if (audio.paused) {
			audio.play();
		} else {
			audio.pause();
		}

		return (isPaused = !isPaused);
	}

	const musicAttrs = musicState.getMusicAttrs().music;

	$effect(() => {
		if (audio) {
			const volume = musicAttrs.range / 100;
			audio.volume = volume;
		}
	});

	onMount(() => {
		audio = new Audio();
	});
</script>

<section class="flex w-auto gap-2 text-white filter backdrop-contrast-200 sm:rounded-md">
	{#await playlist}
		<article class="flex w-screen items-center gap-4 p-4 sm:w-auto">
			<p>Loading Radio station</p>
			<span class="animate-spin">
				<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
					<path fill="currentColor" d="M12 4V2A10 10 0 0 0 2 12h2a8 8 0 0 1 8-8" />
				</svg>
			</span>
		</article>
	{:then playlist}
		<article class="flex w-screen items-center gap-4 px-4 sm:w-auto">
			<button
				class="cursor-pointer rounded-full p-2 filter transition-colors hover:bg-white hover:text-neutral-800"
				onclick={() => playMusic()}
			>
				<span>
					{#if isPaused}
						<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
							<path fill="currentColor" d="M8 5.14v14l11-7z" />
						</svg>
					{:else}
						<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
							<path
								fill="currentColor"
								d="M16 19q-.825 0-1.412-.587T14 17V7q0-.825.588-1.412T16 5t1.413.588T18 7v10q0 .825-.587 1.413T16 19m-8 0q-.825 0-1.412-.587T6 17V7q0-.825.588-1.412T8 5t1.413.588T10 7v10q0 .825-.587 1.413T8 19"
							/>
						</svg>
					{/if}
				</span>
			</button>

			<div class="flex-1">
				<p>{playlist.name}</p>
				<a class="text-sm text-neutral-300 underline" href={playlist.homepage} target="_blank"
					>visit homepage</a
				>
			</div>

			{#if playlist.urlResolved}
				<WaveSound />
			{/if}
		</article>
	{:catch error}
		<p class="p-4">{error.message}</p>
	{/await}
</section>
