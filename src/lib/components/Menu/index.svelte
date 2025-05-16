<script lang="ts">
	import PlaylistMusic from './PlaylistMusic.svelte';
	import SoundSettings from './SoundSettings.svelte';
	import Pomodoro from './Pomodoro/index.svelte';
	import { handlers } from 'svelte/legacy';

	const className =
		'p-4 text-white rounded-full cursor-pointer filter backdrop-contrast-125 hover:backdrop-contrast-200 transition-all';

	type TStep = 'idle' | 'changePlaylist' | 'soundSettings' | 'pomodoro';

	let step: TStep = $state('pomodoro');

	function handleStep(newStep: TStep) {
		if (newStep === step) return (step = 'idle');
		return (step = newStep);
	}

	const componentsStep: Record<TStep, any> = {
		idle: null,
		changePlaylist: PlaylistMusic,
		soundSettings: SoundSettings,
		pomodoro: Pomodoro
	};

	const CurrentStep = $derived(componentsStep[step]);

	const classMenu =
		'fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-md p-4 text-white filter backdrop-blur-md backdrop-contrast-125 sm:right-20 sm:left-auto sm:translate-x-0';
</script>

<ul class="flex flex-col items-center gap-2">
	<button
		onclick={() => handleStep('changePlaylist')}
		aria-label="Change radio"
		class={className}
		title="Change playlist"
	>
		<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
			><path
				fill="currentColor"
				d="M20 2H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2m-2 5h-3v5.5a2.5 2.5 0 0 1-5 0a2.5 2.5 0 0 1 2.5-2.5c.57 0 1.08.19 1.5.51V5h4zM4 6H2v14c0 1.1.9 2 2 2h14v-2H4z"
			/></svg
		>
	</button>

	<button
		class={className}
		aria-label="Sound settings"
		title="Sound settings"
		onclick={() => handleStep('soundSettings')}
	>
		<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
			<g fill="currentColor" fill-rule="evenodd" stroke-width="1.5" clip-rule="evenodd">
				<path
					d="M16.97 6.97a.75.75 0 0 1 1.06 0l-.53.53l.53-.53h.001l.001.002l.003.002l.007.007l.02.02l.062.069c.05.057.12.138.201.241A6.87 6.87 0 0 1 19.75 11.5a6.87 6.87 0 0 1-1.425 4.189a5 5 0 0 1-.264.31l-.02.02l-.006.007l-.003.002v.001h-.001l-.51-.508l.51.51a.75.75 0 1 1-1.061-1.061l.53.53l-.53-.53h-.001v.001l-.002.001l.005-.005l.033-.036q.048-.052.139-.167a5.37 5.37 0 0 0 .448-5.843a5 5 0 0 0-.448-.685a3 3 0 0 0-.172-.203l-.005-.005a.75.75 0 0 1 .003-1.058"
				/>
				<path
					d="M19.97 3.97a.75.75 0 0 1 1.06 0l-.53.53l.53-.53h.001l.002.002l.003.003l.009.01a2 2 0 0 1 .124.134c.079.089.188.218.316.385c.257.333.594.823.929 1.46c.67 1.274 1.336 3.143 1.336 5.536s-.666 4.262-1.336 5.537a10 10 0 0 1-.929 1.46a7 7 0 0 1-.44.518l-.01.01l-.002.003l-.002.001l-.531-.529l.53.53a.75.75 0 0 1-1.061-1.06v.001h-.001l.001-.001l.014-.014l.063-.07q.089-.098.25-.304c.212-.276.5-.693.79-1.244c.58-1.1 1.164-2.731 1.164-4.838s-.584-3.738-1.164-4.838a8.7 8.7 0 0 0-.79-1.244a6 6 0 0 0-.313-.374l-.014-.014l-.001-.002v.002h.001a.75.75 0 0 1 0-1.06m-7.932-.574c1.163-.767 2.713.068 2.713 1.461v14.286c0 1.394-1.55 2.228-2.713 1.461l-6-3.955a.25.25 0 0 0-.137-.042H3a2.75 2.75 0 0 1-2.75-2.75v-3.714A2.75 2.75 0 0 1 3 7.393h2.9a.25.25 0 0 0 .138-.041z"
				/>
			</g>
		</svg>
	</button>

	<button
		onclick={() => handleStep('pomodoro')}
		aria-label="Pomodoro"
		class={className}
		title="Pomodoro"
	>
		<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 512 512">
			<path
				fill="currentColor"
				d="M256 91.088c-111.453 0-202.122 88.575-202.122 197.456C53.878 397.426 144.548 486 256 486s202.122-88.574 202.122-197.456S367.452 91.089 256 91.089zm0 375.866c-100.942 0-183.076-80.039-183.076-178.41S155.058 110.134 256 110.134s183.076 80.04 183.076 178.41c0 98.371-82.134 178.41-183.076 178.41m-.571-178.41l128.558 99.55A165.6 165.6 0 0 1 256 447.908c-90.467 0-164.03-71.493-164.03-159.365c0-87.681 73.266-159.055 163.447-159.352v159.352zM256 72.043a224.7 224.7 0 0 0-66.66 10.07V56.354A30.354 30.354 0 0 1 219.694 26h72.695a30.354 30.354 0 0 1 30.27 30.354v25.76A224.7 224.7 0 0 0 256 72.042zm128.939 40.71l20.117-19.748c8.797-8.642 21.272-10.463 27.878-4.083l20.403 19.748c6.594 6.38 4.761 18.558-3.988 27.2l-19.438 19.045a221 221 0 0 0-44.96-42.162zM82.435 154.51l-19.391-19.046c-8.797-8.642-10.713-20.724-4.202-26.985L78.875 89.1c6.476-6.26 18.856-4.344 27.652 4.298l20.046 19.688a221 221 0 0 0-44.138 41.425z"
			/>
		</svg>
	</button>
</ul>

{#if step !== 'idle'}
	<CurrentStep {classMenu} closeModal={() => handleStep('idle')} />
{/if}
