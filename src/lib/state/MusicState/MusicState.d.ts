type TSound = {
	play: boolean;
	audioRange: number;
};

export type MusicStateDate = {
	currentRadio: TSound & { radioName: string };
};
