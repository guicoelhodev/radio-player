import { RadioBrowserApi } from 'radio-browser-api';
import type * as T from './RadioBrowserContract';

export class RadioBrowser implements T.RadioBrowserContract {
	private static INSTANCE: RadioBrowser;
	private radioBrowser: RadioBrowserApi;

	public static stationsList = [
		{ slug: 'Lofi - Chill & relax', name: 'Chillofi' },
		{ slug: 'Splash Coffee station', name: 'Splash Coffee' },
		{ slug: 'Lofi Girl - beats to relax and study', name: 'lofi girl' },
		{ slug: 'Synthwave City beat', name: 'Synthwave City FM - New' },
		{ slug: 'Night ride vibe', name: 'Nightride FM' },
		{ slug: 'Houston Blues Radio', name: 'Houston Blues Radio' }
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
