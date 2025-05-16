export type TPomodoroSetup = {
	shortBreak: number;
	longBreak: number;
	pomodoro: number;
	intervals: number;
};

type TStep = 'idle' | 'short' | 'long' | 'pomodoro';

export type TPomodoroUser = {
	currentStep: TStep;
	isRunning: boolean;
	intervalsLeft: number;
	isSetted: boolean;
};
