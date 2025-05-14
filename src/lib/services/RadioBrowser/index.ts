import { RadioBrowserApi } from 'radio-browser-api';

export class RadioBrowser {
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
}
