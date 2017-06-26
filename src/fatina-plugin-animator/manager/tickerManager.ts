// import { ITicker } from '../../fatina/core/interfaces/ITicker';
// import { IPluginAnimator } from '../index';

// export class TickerManager {
// 	private plugin: IPluginAnimator;
// 	private tickers: { [id: string]: ITicker } = {};

// 	constructor(plugin: IPluginAnimator) {
// 		this.plugin = plugin;
// 	}

// 	public Get(name: string): ITicker {
// 		if (this.tickers[name]) {
// 			return this.tickers[name];
// 		}

// 		this.tickers[name] = (this.plugin as any).fatina.Ticker();
// 		return this.tickers[name]
// 	}

// 	public PauseAll(name: string): void {
// 		if (this.tickers[name]) {
// 			this.tickers[name].Pause();
// 		}
// 	}

// 	public ResumeAll(name: string): void {
// 		if (this.tickers[name]) {
// 			this.tickers[name].Resume();
// 		}
// 	}

// 	public KillAll(name: string): void {
// 		if (this.tickers[name]) {
// 			this.tickers[name].Kill();
// 			delete this.tickers[name];
// 		}
// 	}
// }
