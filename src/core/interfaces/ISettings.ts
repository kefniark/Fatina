import { Log } from '../enum/log';

/**
 * Fatina Settings
 *
 * @export
 * @interface ISettings
 */
export interface ISettings {
	logLevel: Log;
	safe: boolean;
}
