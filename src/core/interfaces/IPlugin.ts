export interface IPlugin {
	readonly name: string;
	init(fatina: any): void;
}
