export interface ITweenControl {
	Elapsed: number;
	Duration: number;

	IsCompleted(): boolean;
	Start(): void;
	Pause(): void;
	Resume(): void;
	Kill(): void;
}
