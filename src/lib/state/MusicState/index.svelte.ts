import { RadioBrowser } from '$lib/services/RadioBrowser';
import type * as T from './MusicState.d.ts';

export class MusicState {
	private static INSTANCE: MusicState;

	public playlistName = $state();

	private musicAttrs: T.TMusicRange = $state({
		rain: { range: 50, slug: 'Rain effects' },
		city: { range: 0, slug: 'City effects' },
		music: { range: 50, slug: 'Music sound' }
	});

	constructor() {
		this.playlistName = RadioBrowser.stationsList[0].name;
	}

	getMusicAttrs() {
		return this.musicAttrs;
	}

	public static getInstance() {
		if (!this.INSTANCE) {
			this.INSTANCE = new MusicState();
		}
		return this.INSTANCE;
	}

	handlePlaylistName(newPlaylist: string) {
		this.playlistName = newPlaylist;
	}

	handleMusicAttrs(key: T.TMusicType, attrs: Partial<T.TMusicRange[T.TMusicType]>) {
		const tmpKeyAttrs = Object.assign(this.musicAttrs[key], attrs);

		this.musicAttrs = Object.assign(this.musicAttrs, { [key]: tmpKeyAttrs });
	}
}
