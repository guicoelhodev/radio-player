export type TPomodoroSetup = {
	shortPause: number;
	longPause: number;
	pomodoro: number;
	intervals: number;
};

type TStep = 'short' | 'long' | 'pomodoro';

export type TPomodoroUser = {
	currentStep: TStep;
	running: boolean;
	intervalsLeft: number;
};
