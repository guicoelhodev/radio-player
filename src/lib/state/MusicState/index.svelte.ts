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

	public static getInstance() {
		if (!this.INSTANCE) {
			this.INSTANCE = new MusicState();
		}
		return this.INSTANCE;
	}
}
