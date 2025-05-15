<script lang="ts">
	import { MusicState } from '$lib/state/MusicState/index.svelte';
	import type { PlaylistName } from '$lib/state/types/playlist.enum';
	import Video from './Video.svelte';

	const musicState = MusicState.getInstance();
	const currentMusic = musicState.getCurrentAudio();

	const videoImage: Record<PlaylistName, { src: string }> = {
		'Houston Blues Radio': {
			src: '/videos/jake_music.mp4'
		},
		'Synthwave City FM - New': {
			src: '/videos/cyberpunk_night.mp4'
		},
		'Splash Coffee': {
			src: '/videos/morning_coffee.mp4'
		},
		'lofi girl': {
			src: '/videos/lofi_girl.mp4'
		},
		Chillofi: {
			src: '/videos/cozy_room.mp4'
		}
	};

	let videoSelected = $derived(videoImage[currentMusic.radioName as PlaylistName]);

	$inspect(videoSelected);
</script>

{#key videoSelected}
	<video
		autoplay
		muted
		loop
		playsinline
		class="absolute top-0 left-0 z-[-1] size-full object-cover brightness-75"
	>
		<source src={videoSelected.src} type="video/mp4" />
	</video>
{/key}
