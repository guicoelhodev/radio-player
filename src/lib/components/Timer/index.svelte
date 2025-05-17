<script lang="ts">
	import { PomodoroState } from '$lib/state/PomodoroState/index.svelte';
	import ButtonTimer from './ButtonTimer.svelte';
	import MessageStep from './MessageStep.svelte';
	import TimerViewer from './TimerViewer.svelte';

	type TKeySetup = keyof typeof setup;
	const pomodoroState = PomodoroState.getInstance();

	const pomodoro = pomodoroState.getPomodoroUser();
	const setup = pomodoroState.getSetupPomodoro();

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

		if (pomodoro.isRunning && !isTimerInit) return 'USER_CAN_PAUSE';
		if (!pomodoro.isRunning && isTimerInit) return 'USER_CAN_START';

		return '';
	}

	$effect(() => {
		if (!pomodoro.isSetted || !pomodoro.isRunning) return;

		if (timerSeconds === 0) {
			pomodoroState.nextStep();
			getTimerByStep();
		} else {
			const intervalId = setInterval(() => (timerSeconds -= 1), 100);

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

			<div>
				<ButtonTimer
					onclick={() =>
						pomodoroState.handlePomodoroUser({
							isRunning: false
						})}
				>
					Pause
				</ButtonTimer>

				<ButtonTimer onclick={() => pomodoroState.nextStep()}>Next step</ButtonTimer>
			</div>
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
