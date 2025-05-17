<script lang="ts">
	const messageByStep = {
		pomodoro: 'work time',
		short: 'Great job, take a rest',
		long: 'Breath deep, its time to get a long rest'
	};

	type TProps = {
		currentStep: string;
	};

	type TMessage = keyof typeof messageByStep;

	let props: TProps = $props();

	const message = $derived(messageByStep[props.currentStep as TMessage]);
</script>

{#if message}
	<p>{message}</p>
{/if}
