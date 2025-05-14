<script lang="ts">
	import { RadioBrowser } from '$lib/services/RadioBrowser';
	import type { TRadioList } from '$lib/services/RadioBrowser/RadioBrowserContract';

	const radioBrowser = RadioBrowser.getInstance();

	const defaultStations = radioBrowser.stationsList;

	let selectedRadio = $state(defaultStations[0]);

	let stationsPromise: Promise<TRadioList> = $derived(
		radioBrowser.searchStations({
			name: selectedRadio.name,
			limit: 1
		})
	);

</script>

{#each defaultStations as radio (radio.name)}
	<button class="border bg-blue-200 p-4" onclick={() => (selectedRadio = radio)}
		>{radio.slug}</button
	>
{/each}

{#await stationsPromise}
	<p>Carregando estações...</p>
{:then stations}
	<ul>
		{#each stations as station (station.id)}
			<audio autoplay src={station.urlResolved}></audio>
		{/each}
	</ul>
{:catch error}
	<p>Erro ao carregar: {error.message}</p>
{/await}
