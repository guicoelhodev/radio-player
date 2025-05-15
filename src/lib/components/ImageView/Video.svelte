<script lang="ts">
	const { src } = $props<{ src: string }>();
</script>

{#key src}
	<video
		autoplay
		muted
		loop
		playsinline
		class="absolute top-0 left-0 z-[-1] size-full object-cover brightness-75"
	>
		<source {src} type="video/mp4" />
	</video>
{/key}
