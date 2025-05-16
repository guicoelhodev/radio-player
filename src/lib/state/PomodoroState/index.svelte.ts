import type * as T from "./PomodoroState";

export class PomodoroState {

	private SETUP_DEFAULT: T.TPomodoroSetup = {
		longPause: 15,
		shortPause: 5,
		pomodoro: 25,
		intervals: 4,
	};

	private POMODORO_USER_DEFAULT: T.TPomodoroUser = {
		currentStep: 'pomodoro',
		intervalsLeft: this.SETUP_DEFAULT.intervals,
		running: false
	}

	private setup = $state<T.TPomodoroSetup>(this.SETUP_DEFAULT);
	private pomodoroUser = $state<T.TPomodoroUser>(this.POMODORO_USER_DEFAULT);

	getSetupPomodoro() {
		return this.setup;
	};

	handleSetup(attr: Partial<T.TPomodoroSetup>) {
		this.setup = Object.assign(this.setup, attr);
	}

	handlePomodoroUser(attr: Partial<T.TPomodoroUser>) {
		this.pomodoroUser = Object.assign(this.pomodoroUser, attr);
	}
}
