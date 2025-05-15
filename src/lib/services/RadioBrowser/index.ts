import { RadioBrowserApi } from 'radio-browser-api';
import { PlaylistName } from '$lib/state/types/playlist.enum';
import type * as T from './RadioBrowserContract';

export class RadioBrowser implements T.RadioBrowserContract {
	private static INSTANCE: RadioBrowser;
	private radioBrowser: RadioBrowserApi;

	public static stationsList: { slug: string; name: PlaylistName }[] = [
		{ slug: 'Lofi - Chill & relax', name: PlaylistName.Chillofi },
		{ slug: 'Splash Coffee station', name: PlaylistName.SplashCoffee },
		{ slug: 'Lofi Girl - Relax and study', name: PlaylistName.LofiGirl },
		{ slug: 'Synthwave City beat', name: PlaylistName.Synthwave },
		{ slug: 'Night ride vibe', name: PlaylistName.Nightride },
		{ slug: 'Houston Blues Radio', name: PlaylistName.HoustonBlues }
	];

	private constructor() {
		this.radioBrowser = new RadioBrowserApi('radiobrowser');
	}

	public static getInstance() {
		if (!this.INSTANCE) {
			this.INSTANCE = new RadioBrowser();
		}

		return this.INSTANCE;
	}

	async searchStations(query: T.TQuery): Promise<T.TRadioList> {
		return await this.radioBrowser.searchStations(query);
	}
}
