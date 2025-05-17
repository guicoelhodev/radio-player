export type TPomodoroSetup = {
	short: number;
	long: number;
	pomodoro: number;
	intervals: number;
	cycles: number;
};

type TStep = 'idle' | 'short' | 'long' | 'pomodoro';

export type TPomodoroUser = {
	currentStep: TStep;
	isRunning: boolean;
	isSetted: boolean;
	intervalsLeft: number;
	cyclesLeft: number;
};
