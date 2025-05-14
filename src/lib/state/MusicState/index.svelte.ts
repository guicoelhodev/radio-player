import { RadioBrowser } from '$lib/services/RadioBrowser';
import type { MusicStateDate } from './MusicState';

export class MusicState {
	private static INSTANCE: MusicState;

	private attr: MusicStateDate = $state({
		currentRadio: {
			radioName: RadioBrowser.stationsList[0].name,
			play: true,
			audioRange: 50
		}
	});

	getCurrentAudio() {
		return this.attr.currentRadio;
	}

	handleCurrentAudio(args: Partial<MusicStateDate['currentRadio']>) {
		const tmpCurrentAudio = Object.assign(this.attr.currentRadio, args);
		return (this.attr.currentRadio = tmpCurrentAudio);
	}

	public static getInstance() {
		if (!this.INSTANCE) {
			this.INSTANCE = new MusicState();
		}
		return this.INSTANCE;
	}
}
