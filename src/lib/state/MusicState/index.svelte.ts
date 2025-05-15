import { RadioBrowser } from '$lib/services/RadioBrowser';

export class MusicState {
	private static INSTANCE: MusicState;

	public playlistName = $state();

	constructor() {
		this.playlistName = RadioBrowser.stationsList[0].name;
	}

	handlePlaylistName(newPlaylist: string) {
		this.playlistName = newPlaylist;
	}

	handleAudioAttrs(audio: HTMLMediaElement, attr: Partial<HTMLAudioElement>) {
		audio.src = ''; // reset audio
		audio.load();

		Object.assign(audio, attr);
		audio.play();
	}

	public static getInstance() {
		if (!this.INSTANCE) {
			this.INSTANCE = new MusicState();
		}
		return this.INSTANCE;
	}
}
