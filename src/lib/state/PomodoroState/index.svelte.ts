import type * as T from './PomodoroState';

export class PomodoroState {
	private static INSTANCE: PomodoroState;

	private SETUP_DEFAULT: T.TPomodoroSetup = {
		longBreak: 15,
		shortBreak: 5,
		pomodoro: 25,
		intervals: 3
	};

	private POMODORO_USER_DEFAULT: T.TPomodoroUser = {
		currentStep: 'idle',
		intervalsLeft: this.SETUP_DEFAULT.intervals,
		isRunning: false,
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

	resetPomodoro() {
		this.pomodoroUser = this.POMODORO_USER_DEFAULT;
		this.setup = this.SETUP_DEFAULT
	}

	public static getInstance() {
		if (!this.INSTANCE) {
			this.INSTANCE = new PomodoroState();
		}

		return this.INSTANCE;
	}
}
