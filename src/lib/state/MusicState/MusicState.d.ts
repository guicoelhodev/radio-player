type TSound = {
	play: boolean;
	audioRange: number;
};

type TMusicType = 'rain' | 'city' | 'music'

export type TMusicTypeAttrs = {
	slug: string;
	range: number
}

export type TPlaylistAttrs = {
	name: string;
	paused: boolean;
}

export type TMusicRange = Record<TMusicType, TMusicTypeAttrs>
