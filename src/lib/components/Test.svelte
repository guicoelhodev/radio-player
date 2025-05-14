<script lang="ts">
	import { RadioBrowserApi } from 'radio-browser-api';

	const api = new RadioBrowserApi('My radio app');

	let stationsPromise: Promise<any[]>;

	// Chama o carregamento ao montar o componente
	stationsPromise = api.searchStations({
		language: 'english',
		tag: 'lofi',
		name: 'lofi'
	});
</script>

{#await stationsPromise}
	<p>Carregando estações...</p>
{:then stations}
	<ul>
		{#each stations as station}
			<li>
				<strong>{station.name}</strong><br />
				<audio controls src={station.urlResolved}></audio>
			</li>
		{/each}
	</ul>
{:catch error}
	<p>Erro ao carregar: {error.message}</p>
{/await}
