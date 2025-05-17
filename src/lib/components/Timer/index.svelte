<script lang="ts">
	import { PomodoroState } from '$lib/state/PomodoroState/index.svelte';
	import ButtonTimer from './ButtonTimer.svelte';
	import MessageStep from './MessageStep.svelte';
	import TimerViewer from './TimerViewer.svelte';

	type TKeySetup = keyof typeof setup;
	const pomodoroState = PomodoroState.getInstance();

	const pomodoro = pomodoroState.getPomodoroUser();
	const setup = $derived(pomodoroState.getSetupPomodoro());

	let timerSeconds = $state(pomodoroState.getSetupPomodoro().pomodoro * 60);
	let stage = $derived(getStage());

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

	function getStage() {
		if (pomodoro.intervalsLeft === 0) return 'CHANGE_CYCLE';

		const isTimerInit = setup[pomodoro.currentStep as TKeySetup] === timerSeconds / 60;

		if (pomodoro.isPausedByUser) return 'USER_HAS_PAUSED';
		if (!pomodoro.isRunning && isTimerInit) return 'USER_CAN_START';

		return 'USER_CAN_PAUSE';
	}

	$inspect(stage);
	$inspect(pomodoro);

	$effect(() => {
		if (!pomodoro.isRunning) return;

		if (timerSeconds === 0) {
			pomodoroState.nextStep();
			getTimerByStep();
		} else if (!pomodoro.isPausedByUser) {
			const intervalId = setInterval(() => (timerSeconds -= 1), 1000);

			return () => {
				clearInterval(intervalId);
			};
		}
	});
</script>

<section class="ml-20 flex flex-col gap-4 text-neutral-300">
	<TimerViewer seconds={timerSeconds} />

	{#if stage === 'USER_CAN_START'}
		<article class="flex flex-col items-center justify-center gap-4 font-semibold">
			<MessageStep currentStep={pomodoro.currentStep} />

			<div class="flex flex-col gap-4">
				<ButtonTimer onclick={startStep}>Press to start</ButtonTimer>
			</div>
		</article>
	{/if}

	{#if stage === 'USER_CAN_PAUSE'}
		<article class="flex flex-col items-center justify-center gap-4 font-semibold">
			<MessageStep currentStep={pomodoro.currentStep} />

			<div class="grid grid-cols-2 gap-4">
				<ButtonTimer
					onclick={() =>
						pomodoroState.handlePomodoroUser({
							isRunning: false,
							isPausedByUser: true
						})}
				>
					Pause
				</ButtonTimer>

				<ButtonTimer
					onclick={() => {
						pomodoroState.nextStep();
						return (timerSeconds = setup[pomodoro.currentStep as TKeySetup] * 60);
					}}>Next step</ButtonTimer
				>
			</div>
		</article>
	{/if}

	{#if stage === 'USER_HAS_PAUSED'}
		<article class="grid w-full grid-cols-1 justify-center gap-4 font-semibold">
			<p class="text-center">Ready to coninue?</p>
			<ButtonTimer
				onclick={() => pomodoroState.handlePomodoroUser({ isRunning: true, isPausedByUser: false })}
			>
				Continue
			</ButtonTimer>
		</article>
	{/if}

	{#if stage === 'CHANGE_CYCLE'}
		<article class="flex flex-col items-center justify-center gap-4 font-semibold">
			<p>Well done, you've completed a full cycle!</p>

			<ButtonTimer onclick={() => pomodoroState.nextStep()}>
				{#if pomodoro.cyclesLeft === 0}
					<p>I want to restart all</p>
				{:else}
					<p>Next cycle</p>
				{/if}
			</ButtonTimer>
		</article>
	{/if}
</section>
