<script lang="ts">
	import { RadioBrowser } from '$lib/services/RadioBrowser';
	import type { TRadioList } from '$lib/services/RadioBrowser/RadioBrowserContract';

	const radioBrowser = RadioBrowser.getInstance();

	let stationsPromise: Promise<TRadioList>;

	stationsPromise = radioBrowser.searchStations({
		language: 'english',
		name: 'Chillofi'
	});
</script>

{#await stationsPromise}
	<p>Carregando estações...</p>
{:then stations}
	<ul>
		{#each stations as station (station.id)}
			<li>
				<strong>{station.name}</strong><br />
				<audio controls src={station.urlResolved}></audio>
			</li>
		{/each}
	</ul>
{:catch error}
	<p>Erro ao carregar: {error.message}</p>
{/await}
