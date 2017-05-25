import { Tween as tween } from './tweens/tween';
import { Sequence as sequence } from './tweens/sequence';
import { Ticker as ticker } from './ticker';
import { ITween } from './core/interfaces/ITween';
import { ISequence } from './core/interfaces/ISequence';
import { AutoTick } from './autoTick';
import { ITicker } from './core/interfaces/ITicker';

// Update Loop (auto tick)
let tickerManager: ITicker | undefined;
let autoTicker: AutoTick | undefined;
let initialized = false;

export function Init(disableAutoTick?: boolean): any {
	if (!tickerManager) {
		tickerManager = new ticker();
	}

	if (!disableAutoTick) {
		autoTicker = new AutoTick((dt: number) => this.manager.Tick(dt));
		autoTicker.Start();
	}

	initialized = true;
}

export function Deinit() {
	if (autoTicker) {
		autoTicker.Stop();
		autoTicker = undefined;
	}

	if (tickerManager) {
		tickerManager.Kill();
		tickerManager = undefined;
	}

	initialized = false;
}

export function Ticker2(): ITicker | undefined {
	return tickerManager;
}

// Helpers
export function Tween22(obj: any, properties: string[]): ITween {
	if (!initialized) {
		Init();
	}
	return new tween(obj, properties).SetParent(tickerManager as ITicker);
}

export function Sequence2(): ISequence {
	if (!initialized) {
		Init();
	}
	return new sequence().SetParent(tickerManager as ITicker);
}
