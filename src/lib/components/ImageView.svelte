<script lang="ts">
	import { MusicState } from '$lib/state/MusicState/index.svelte';
	import type { PlaylistName } from '$lib/state/types/playlist.enum';
	import { fade } from 'svelte/transition';

	const musicState = MusicState.getInstance();
	const playlistAttrs = $derived(musicState.getPlaylistAttrs());

	const videoImage: Record<PlaylistName, { src: string }> = {
		'Houston Blues Radio': {
			src: '/videos/rain_night.mp4'
		},
		'Synthwave City FM - New': {
			src: '/videos/girl_cyberpunk.mp4'
		},
		'Splash Coffee': {
			src: '/videos/morning_coffee.mp4'
		},
		'lofi girl': {
			src: '/videos/lofi_saylor.mp4'
		},
		Chillofi: {
			src: '/videos/nature_house.mp4'
		},
		'Nightride FM': {
			src: '/videos/mountain_ride.mp4'
		}
	};

	let videoSelected = $derived(videoImage[playlistAttrs.name as PlaylistName]);
</script>

{#key videoSelected.src}
	<div transition:fade>
		<video
			autoplay
			muted
			loop
			playsinline
			class="fixed top-0 left-0 z-[-1] h-screen w-full object-cover brightness-50"
		>
			<source src={videoSelected.src} type="video/mp4" />
		</video>
	</div>
{/key}
