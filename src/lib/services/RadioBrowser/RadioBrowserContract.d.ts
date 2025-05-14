import { Station, StationSearchOrder } from 'radio-browser-api';

export class RadioBrowserContract {
	searchStations: (query: TQuery) => Promise<TRadioList>;
}

export type TQuery = StationSearchOrder;
export type TRadioList = Station[];
