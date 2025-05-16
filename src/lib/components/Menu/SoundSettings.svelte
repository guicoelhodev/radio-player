<script lang="ts">
	import { MusicState } from '$lib/state/MusicState/index.svelte';

	const props = $props<{ classMenu: string }>();
	const musicState = MusicState.getInstance();
	let musicAttrs = $derived(musicState.getMusicAttrs());

</script>

<div class={props.classMenu}>
	<ul class="flex flex-col gap-4">
		{#each Object.entries(musicAttrs) as [musicType, attrs] (musicType)}
			<li class="w-48">
				<label for={musicType}>{attrs.slug}</label>
				<input
					type="range"
					step="10"
					class="range-slider"
					id={musicType}
					bind:value={attrs.range}
				/>
			</li>
		{/each}
	</ul>
</div>
