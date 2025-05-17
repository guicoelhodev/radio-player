<script lang="ts">
	import { PomodoroState } from '$lib/state/PomodoroState/index.svelte';
	import TimerViewer from './TimerViewer.svelte';

	const messageByStep = {
		pomodoro: 'work time',
		short: 'Great job, take a rest',
		long: 'Breath deep, its time to get a long rest'
	};

	const pomodoroState = PomodoroState.getInstance();
	const pomodoro = $derived(pomodoroState.getPomodoroUser());
	let setup = $derived(pomodoroState.getSetupPomodoro());

	const message = $derived(messageByStep[pomodoro.currentStep as keyof typeof messageByStep]);

	let timerSeconds = $state(pomodoroState.getSetupPomodoro().pomodoro * 60);

	function getTimerByStep() {
		const newTImer = setup[pomodoro.currentStep as keyof typeof setup] * 60;
		return (timerSeconds = newTImer);
	}

	function startStep() {
		if (pomodoro.currentStep === 'idle') {
			pomodoroState.nextStep();
		}
		return pomodoroState.handlePomodoroUser({ isRunning: true });
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
</script>

<section class="ml-20 flex flex-col gap-4 text-neutral-300">
	<TimerViewer seconds={timerSeconds} />

	{#if message && pomodoro.intervalsLeft !== 0}
		<article class="flex flex-col items-center justify-center gap-4 font-semibold">
			<p>{message}</p>

			{#if !pomodoro.isRunning}
				<div class="flex flex-col gap-4">
					<button
						class="rounded-md border-2 p-4 font-bold text-white filter backdrop-blur-sm transition-all hover:bg-white hover:text-neutral-800"
						onclick={startStep}>Press to start</button
					>
				</div>
			{/if}
		</article>
	{/if}

	{#if pomodoro.intervalsLeft === 0}
		<article class="flex flex-col items-center justify-center gap-4 font-semibold">
			<p>Well done, you've completed a full cycle!</p>

			<button
				class="rounded-md border-2 p-4 font-bold text-white filter backdrop-blur-sm transition-all hover:bg-white hover:text-neutral-800"
				onclick={() => pomodoroState.nextStep()}
			>
				{#if pomodoro.cyclesLeft === 0}
					<p>I want to restart all</p>
				{:else}
					<p>Next cycle</p>
				{/if}
			</button>
		</article>
	{/if}
</section>
