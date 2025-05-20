<script lang="ts">
	import { PomodoroState } from '$lib/state/PomodoroState/index.svelte';
	import type { TPomodoroSetup } from '$lib/state/PomodoroState/PomodoroState';
	import { twMerge } from 'tailwind-merge';

	const pomodoroState = PomodoroState.getInstance();
	const timers = {
		pomodoro: 'Pomodoro',
		short: 'Short',
		long: 'Long'
	};

	let props = $props<{ closeModal: VoidFunction }>();
	let setup = $derived(pomodoroState.getSetupPomodoro());
	let tmpPomodoroSetup = $state<TPomodoroSetup>(JSON.parse(JSON.stringify(setup)));

	let pomodoro = $derived(pomodoroState.getPomodoroUser());
</script>

<div
	class="fixed top-1/2 left-1/2 z-30 max-h-dvh w-[calc(100%-1rem)] -translate-x-1/2 -translate-y-1/2 overflow-auto
rounded-md p-4 filter backdrop-blur-3xl backdrop-contrast-200 sm:w-full sm:max-w-96"
>
	<section class="flex flex-col items-center gap-4 text-white">
		<header>
			<h2 class="text-2xl font-bold">Pomodoro timer</h2>
		</header>

		<article class="grid grid-cols-3 gap-4">
			{#each Object.entries(timers) as [key, label] (key)}
				<div class="flex flex-col items-center justify-center gap-2 p-2">
					<label class="text-center text-sm font-semibold" for={`label_${key}`}>
						{label}
					</label>
					<input
						type="number"
						inputmode="numeric"
						id={`label_${key}`}
						max="60"
						min="1"
						bind:value={tmpPomodoroSetup[key as keyof typeof setup]}
						class="w-20 rounded-md border p-2 text-center"
					/>
				</div>
			{/each}
		</article>

		<article class="flex flex-col gap-4">
			<p>How many intervals before a long break?</p>

			<div class="flex justify-center gap-4">
				{#each Array.from({ length: 4 }, (_, i) => Number(i + 2)) as interval (interval)}
					<button
						onclick={() => (tmpPomodoroSetup.intervals = interval)}
						class={twMerge(
							'h-8 w-8 cursor-pointer rounded-full border transition-colors',
							interval === tmpPomodoroSetup.intervals
								? 'border-neutral-200 bg-neutral-200 text-neutral-800'
								: ''
						)}
					>
						{interval}
					</button>
				{/each}
			</div>

			<span class="text-center text-sm text-neutral-400">
				1 interval = pomodoro + short break
			</span>
		</article>

		<article class="flex flex-col gap-4">
			<p>How many cycles do you want?</p>

			<div class="flex justify-center gap-4">
				{#each Array.from({ length: 3 }, (_, i) => Number(i + 1)) as cycles (cycles)}
					<button
						onclick={() => (tmpPomodoroSetup.cycles = cycles)}
						class={twMerge(
							'h-8 w-8 cursor-pointer rounded-full border transition-colors',
							cycles === tmpPomodoroSetup.cycles
								? 'border-neutral-200 bg-neutral-200 text-neutral-800'
								: ''
						)}
					>
						{cycles}
					</button>
				{/each}
			</div>
		</article>

		<article class="col-gap-4 grid w-full grid-cols-[1fr_auto] p-2 text-neutral-400">
			<p>intervals remain</p>
			<p>{pomodoro.intervalsLeft}</p>
			<p>cycles remain</p>
			<p>{pomodoro.cyclesLeft}</p>
		</article>

		<footer class="flex w-full items-center justify-between pt-4">
			<button
				aria-label="close modal"
				title="Close pomodoro"
				class="rounded-full p-2 transition-all hover:bg-white hover:text-neutral-800"
				onclick={props.closeModal}
			>
				<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
					<path
						fill="currentColor"
						d="M18.3 5.71a.996.996 0 0 0-1.41 0L12 10.59L7.11 5.7A.996.996 0 1 0 5.7 7.11L10.59 12L5.7 16.89a.996.996 0 1 0 1.41 1.41L12 13.41l4.89 4.89a.996.996 0 1 0 1.41-1.41L13.41 12l4.89-4.89c.38-.38.38-1.02 0-1.4"
					/>
				</svg>
			</button>

			<button
				class="p-2 hover:underline"
				onclick={() => {
					pomodoroState.resetPomodoro();
					return props.closeModal();
				}}>reset</button
			>

			<button
				aria-label="Setup pomodoro"
				title="Setup pomodoro"
				class="rounded-full p-2 transition-all hover:bg-white hover:text-neutral-800"
				onclick={() => {
					const isInvalidInput = Object.keys(tmpPomodoroSetup).some((i) => {
						const value = tmpPomodoroSetup[i as keyof typeof tmpPomodoroSetup];
						return value < 1 || value > 60;
					});

					if (isInvalidInput) {
						return alert(`The input needs to be a number between 1 and 60`);
					}

					pomodoroState.handleSetup(tmpPomodoroSetup);
					pomodoroState.handlePomodoroUser({
						cyclesLeft: tmpPomodoroSetup.cycles - 1,
						intervalsLeft: tmpPomodoroSetup.intervals,
						isRunning: false,
						isPausedByUser: false
					});
					return props.closeModal();
				}}
			>
				<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
					<path
						fill="currentColor"
						d="m9.55 15.15l8.475-8.475q.3-.3.7-.3t.7.3t.3.713t-.3.712l-9.175 9.2q-.3.3-.7.3t-.7-.3L4.55 13q-.3-.3-.288-.712t.313-.713t.713-.3t.712.3z"
					/>
				</svg>
			</button>
		</footer>
	</section>
</div>
