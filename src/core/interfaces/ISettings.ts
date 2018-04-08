import { Log } from '../enum/log';

/**
 * Fatina Settings
 *
 * @export
 * @interface ISettings
 */
export interface ISettings {
	logLevel: Log;

	// try/catch events to avoid crash
	safe: boolean;

	// smooth dt over frames
	smooth: boolean;

	// maximum dt for one frames
	maxFrameDt: number;

	// number of frame which can be interpolated
	maxFrameNumber: number;

	// maximum dt limit
	maxDt: number;
}
