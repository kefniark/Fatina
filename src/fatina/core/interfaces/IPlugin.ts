export interface IPlugin {
	readonly name: string;
	Init(fatina: any): void;
}
