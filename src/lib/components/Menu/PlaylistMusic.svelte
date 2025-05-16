<script lang="ts">
	import { RadioBrowser } from '$lib/services/RadioBrowser';
	import { MusicState } from '$lib/state/MusicState/index.svelte';
	import type { PlaylistName } from '$lib/state/types/playlist.enum';

	import RadioIcon from '$lib/assets/svg/icons/radio.svg?raw';
	import GuitarIcon from '$lib/assets/svg/icons/guitar.svg?raw';
	import Pencil from '$lib/assets/svg/icons/pencil.svg?raw';
	import Coffee from '$lib/assets/svg/icons/coffee.svg?raw';
	import House from '$lib/assets/svg/icons/house.svg?raw';
	import Moon from '$lib/assets/svg/icons/moon.svg?raw';

	const props = $props<{ classMenu: string }>();
	const defaultStations = RadioBrowser.stationsList;

	const musicState = MusicState.getInstance();

	function toggleMusicName(newPlaylist: string) {
		return musicState.handlePlaylistAttrs({ name: newPlaylist });
	}

	const icons: Record<PlaylistName, string> = {
		Chillofi: RadioIcon,
		'Houston Blues Radio': GuitarIcon,
		'lofi girl': Pencil,
		'Splash Coffee': Coffee,
		'Synthwave City FM - New': House,
		'Nightride FM': Moon
	};
</script>

<div class={props.classMenu}>
	<ul class="flex w-64 flex-col gap-2">
		{#each defaultStations as station (station.name)}
			<button
				class="grid w-full cursor-pointer grid-cols-[1.5rem_1fr] items-center gap-4 rounded-md p-2 filter hover:backdrop-contrast-200"
				onclick={() => toggleMusicName(station.name)}
			>
				<!-- eslint-disable-next-line svelte/no-at-html-tags -->
				<span>{@html icons[station.name]}</span>
				<p class="text-left">{station.slug}</p>
			</button>
		{/each}
	</ul>
</div>
