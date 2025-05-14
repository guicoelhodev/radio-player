import { RadioBrowserApi } from 'radio-browser-api';
import type * as T from './RadioBrowserContract';

export class RadioBrowser implements T.RadioBrowserContract {
	private static INSTANCE: RadioBrowser;
	private radioBrowser: RadioBrowserApi;

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
