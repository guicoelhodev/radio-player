<script lang="ts">
	import { RadioBrowser } from '$lib/services/RadioBrowser';
	import { MusicState } from '$lib/state/MusicState/index.svelte';

	const defaultStations = RadioBrowser.stationsList;

	const musicState = MusicState.getInstance();

	function toggleMusicName(newName: string) {
		return musicState.handleCurrentAudio({ radioName: newName });
	}
</script>

<ul class="flex w-64 flex-col gap-4">
	{#each defaultStations as station (station.name)}
		<button
			class="w-full rounded-md p-2 hover:bg-neutral-700"
			onclick={() => toggleMusicName(station.name)}>{station.slug}</button
		>
	{/each}
</ul>
