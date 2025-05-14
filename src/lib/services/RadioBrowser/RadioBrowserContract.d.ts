import { Station, AdvancedStationQuery } from 'radio-browser-api';

export class RadioBrowserContract {
	searchStations: (query: TQuery) => Promise<TRadioList>;
}

export type TQuery = AdvancedStationQuery;
export type TRadioList = Station[];
