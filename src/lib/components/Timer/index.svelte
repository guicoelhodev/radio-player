<script lang="ts">
	import { PomodoroState } from '$lib/state/PomodoroState/index.svelte';
	import type { TStep } from '$lib/state/PomodoroState/PomodoroState';
	import { getTimeFormat } from '$lib/utils/getTimeFormat';

	const pomodoroState = PomodoroState.getInstance();
	const pomodoro = $derived(pomodoroState.getPomodoroUser());
	const setup = $derived(pomodoroState.getSetupPomodoro());

	let timerSeconds = $state(pomodoroState.getSetupPomodoro().pomodoro * 60);

	function getTimerByStep() {
		const newTImer = setup[pomodoro.currentStep as keyof typeof setup] * 60;
		return (timerSeconds = newTImer);
	}

	$effect(() => {
		if (!pomodoro.isSetted || !pomodoro.isRunning) return;

		if (timerSeconds === 0) {
			pomodoroState.nextStep();
			getTimerByStep();
		} else {
			const intervalId = setInterval(() => (timerSeconds -= 1), 200);

			return () => {
				clearInterval(intervalId);
			};
		}
	});

	$inspect(pomodoro);

	const buttonStyle =
		'p-4 text-white font-bold border-2 rounded-md filter backdrop-blur-sm hover:bg-white hover:text-neutral-800 transition-all';

	const t = $derived(getTimeFormat(timerSeconds));

	function startStep() {
		if (pomodoro.currentStep === 'idle') {
			pomodoroState.nextStep();
		}
		return pomodoroState.handlePomodoroUser({ isRunning: true });
	}

	const messageByStep = {
		pomodoro: 'work time',
		short: 'Great job, take a rest',
		long: 'Breath deep, its time to get a long rest'
	};

	const message = $derived(messageByStep[pomodoro.currentStep as keyof typeof messageByStep]);
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

	{#if message && pomodoro.intervalsLeft !== 0}
		<article class="flex flex-col items-center justify-center gap-4 font-semibold">
			<p>{message}</p>

			{#if !pomodoro.isRunning}
				<div class="flex flex-col gap-4">
					<button class={buttonStyle} onclick={startStep}>Start</button>
				</div>
			{/if}
		</article>
	{/if}
</section>
