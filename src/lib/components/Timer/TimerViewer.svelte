<script lang="ts">
	import { getTimeFormat } from '$lib/utils/getTimeFormat';

	const props = $props<{ seconds: number }>();

	const t = $derived(getTimeFormat(props.seconds));
</script>

<header class="flex flex-col items-center gap-2 text-7xl font-bold sm:text-9xl">
	<div class="flex flex-col items-center text-neutral-500">
		{#if t.days !== '00'}
			<aside class="flex items-center gap-4 text-base">
				<p>days</p>
				<p>{t.hours}</p>
			</aside>
		{/if}
		{#if t.hours !== '00'}
			<aside class="flex items-center gap-4 text-base">
				<p>hours</p>
				<p>{t.hours}</p>
			</aside>
		{/if}
	</div>

	<div class="flex">
		<p>{t.minutes}</p>
		<span class="-translate-y-2">:</span>
		<p>{t.seconds}</p>
	</div>
</header>
