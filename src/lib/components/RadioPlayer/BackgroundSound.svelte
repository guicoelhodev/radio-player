<script lang="ts">
	import { MusicState } from '$lib/state/MusicState/index.svelte';
	import { onDestroy, onMount } from 'svelte';

	const musicState = MusicState.getInstance();

	let attrs = $derived(musicState.getMusicAttrs());
	let { paused } = $derived(musicState.getPlaylistAttrs());

	let rainSound = $state<null | HTMLAudioElement>(null);
	let restaurantSound = $state<null | HTMLAudioElement>(null);

	function handleVolume(audio: HTMLMediaElement, range: number) {
		audio.volume = range / 100;
	}

	function destroyAudio(audio: HTMLMediaElement | null) {
		if (!audio) return;

		audio.pause();
		audio.src = '';
		audio = null;
	}

	$effect(() => {
		if (!rainSound) return;
		if (attrs.rain.range !== rainSound.volume * 100) {
			handleVolume(rainSound, attrs.rain.range);
		}
	});

	$effect(() => {
		if (!restaurantSound) return;
		if (attrs.city.range !== restaurantSound.volume * 100) {
			handleVolume(restaurantSound, attrs.city.range);
		}
	});

	$effect(() => {
		if (!rainSound || !restaurantSound) return;
		if (paused) {
			rainSound.pause();
			restaurantSound.pause();
		} else {
			rainSound.play();
			restaurantSound.play();
		}
	});

	onMount(() => {
		rainSound = new Audio('/mp3/rain_falling.mp3');
		restaurantSound = new Audio('/mp3/coffee_noise.mp3');

		rainSound.loop = true;
		restaurantSound.loop = true;

		handleVolume(rainSound, attrs.rain.range);
		handleVolume(restaurantSound, attrs.city.range);

		rainSound.play();
		restaurantSound.play();
	});

	onDestroy(() => {
		destroyAudio(rainSound);
		destroyAudio(restaurantSound);
	});
</script>
