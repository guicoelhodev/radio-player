import { RadioBrowser } from '$lib/services/RadioBrowser';
import type * as T from './MusicState.d.ts';

export class MusicState {
	private static INSTANCE: MusicState;

	private playlistAttrs = $state<T.TPlaylistAttrs>({
		name: '',
		paused: false,
	});

	private musicAttrs: T.TMusicRange = $state({
		rain: { range: 50, slug: 'Rain effects' },
		city: { range: 0, slug: 'City effects' },
		music: { range: 50, slug: 'Music sound' }
	});

	constructor() {
		this.playlistAttrs = {
			name: RadioBrowser.stationsList[0].name,
			paused: false
		}
	}

	getMusicAttrs() {
		return this.musicAttrs;
	}

	getPlaylistAttrs() {
		return this.playlistAttrs
	}

	public static getInstance() {
		if (!this.INSTANCE) {
			this.INSTANCE = new MusicState();
		}
		return this.INSTANCE;
	}

	handlePlaylistAttrs(attrs: Partial<T.TPlaylistAttrs>) {
		this.playlistAttrs = Object.assign(this.playlistAttrs, attrs);
	}

	handleMusicAttrs(key: T.TMusicType, attrs: Partial<T.TMusicRange[T.TMusicType]>) {
		const tmpKeyAttrs = Object.assign(this.musicAttrs[key], attrs);

		this.musicAttrs = Object.assign(this.musicAttrs, { [key]: tmpKeyAttrs });
	}
}
