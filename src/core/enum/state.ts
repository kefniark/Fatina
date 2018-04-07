/**
 * Possible states of a Tween / Sequence
 *
 * @export
 * @enum {number}
 */
export enum State {
	Idle = 0,
	Run = 1,
	Pause = 2,
	Finished = 3,
	Killed = 4
}
