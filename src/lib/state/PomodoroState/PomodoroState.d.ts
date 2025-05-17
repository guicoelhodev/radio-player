export type TPomodoroSetup = {
	short: number;
	long: number;
	pomodoro: number;
	intervals: number;
};

type TStep = 'idle' | 'short' | 'long' | 'pomodoro' | 'completed';

export type TPomodoroUser = {
	currentStep: TStep;
	isRunning: boolean;
	intervalsLeft: number;
	isSetted: boolean;
};
