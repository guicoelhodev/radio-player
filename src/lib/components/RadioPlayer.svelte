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

{#await stationsPromise}
	<p>Carregando estações...</p>
{:then stations}
	<ul>
		{#each stations as station (station.id)}
			<audio autoplay controls src={station.urlResolved}></audio>
		{/each}
	</ul>
{:catch error}
	<p>Erro ao carregar: {error.message}</p>
{/await}
