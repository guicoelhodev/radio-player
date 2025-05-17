import type * as T from './PomodoroState';

export class PomodoroState {
	private static INSTANCE: PomodoroState;

	private SETUP_DEFAULT: T.TPomodoroSetup = {
		long: 0.5,
		short: 0.25,
		pomodoro: 0.5,
		intervals: 2
	};

	private POMODORO_USER_DEFAULT: T.TPomodoroUser = {
		currentStep: 'pomodoro',
		intervalsLeft: this.SETUP_DEFAULT.intervals,
		isRunning: true,
		isSetted: true
	};

	private setup = $state<T.TPomodoroSetup>(this.SETUP_DEFAULT);
	private pomodoroUser = $state<T.TPomodoroUser>(this.POMODORO_USER_DEFAULT);

	getSetupPomodoro() {
		return this.setup;
	}

	getPomodoroUser() {
		return this.pomodoroUser;
	}

	handleSetup(attr: Partial<T.TPomodoroSetup>) {
		this.setup = Object.assign(this.setup, attr);
	}

	handlePomodoroUser(attr: Partial<T.TPomodoroUser>) {
		this.pomodoroUser = Object.assign(this.pomodoroUser, attr);
	}

	nextStep() {
		if (this.pomodoroUser.intervalsLeft === 0) return

		const step = this.pomodoroUser.currentStep;
		const tmpPomodoro = this.pomodoroUser;

		tmpPomodoro.isRunning = false;

		if (step === 'idle') {
			tmpPomodoro.currentStep = 'pomodoro';
			return (this.pomodoroUser = Object.assign(this.pomodoroUser, tmpPomodoro));
		} else if (step === 'short' || step === 'long') {
			tmpPomodoro.currentStep = 'pomodoro';
			tmpPomodoro.intervalsLeft -= 1;

			return (this.pomodoroUser = Object.assign(this.pomodoroUser, tmpPomodoro));
		}

		if (tmpPomodoro.intervalsLeft === 1) {
			tmpPomodoro.currentStep = 'long';
		} else {
			tmpPomodoro.currentStep = 'short';
		}

		return (this.pomodoroUser = Object.assign(this.pomodoroUser, tmpPomodoro));
	}

	resetPomodoro() {
		this.pomodoroUser = this.POMODORO_USER_DEFAULT;
		this.setup = this.SETUP_DEFAULT;
	}

	public static getInstance() {
		if (!this.INSTANCE) {
			this.INSTANCE = new PomodoroState();
		}

		return this.INSTANCE;
	}
}
