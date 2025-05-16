<script lang="ts">
	import { PomodoroState } from '$lib/state/PomodoroState/index.svelte';
	import { getTimeFormat } from '$lib/utils/getTimeFormat';

	let timerSeconds = $state(3600);

	const pomodoroState = PomodoroState.getInstance();

	let pomodoro = $derived(pomodoroState.getPomodoroUser());

	$effect(() => {
		if (!pomodoro.isSetted || !pomodoro.isRunning) return;

		if (timerSeconds > 0) {
			const intervalId = setInterval(() => (timerSeconds -= 1), 1000);

			return () => {
				clearInterval(intervalId);
			};
		} else {
			pomodoroState.handlePomodoroUser({
				isRunning: false
			});
		}
	});

	$inspect(pomodoro);

	const buttonStyle =
		'p-4 text-white font-bold border-2 rounded-md filter backdrop-blur-sm hover:bg-white hover:text-neutral-800 transition-all';

	const t = $derived(getTimeFormat(timerSeconds));
</script>

<section class="ml-20 flex flex-col gap-4 text-neutral-300">
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
	<article>
		{#if pomodoro.currentStep === 'idle'}
			<button
				onclick={() =>
					pomodoroState.handlePomodoroUser({ currentStep: 'pomodoro', isRunning: true })}
				class={buttonStyle}>START</button
			>
		{/if}
	</article>
</section>
