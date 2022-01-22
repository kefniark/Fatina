import { State } from '../enum/state'

/**
 * Base interface almost shared by everything (ticker, tween, sequence, ...)
 *
 * @export
 * @interface IControl
 */
export interface IControl {
  /**
   * Time elapsed
   * @readonly
   * @type {number}
   */
  readonly elapsed: number
  /**
   * Total duration of the tween
   * @readonly
   * @type {number}
   */
  readonly duration: number
  /**
   * Current state of the tween
   * @readonly
   * @type {State}
   */
  readonly state: State
  /**
   * Is this tween idle (based on state)
   * @readonly
   * @type {boolean}
   */
  readonly isIdle: boolean
  /**
   * Is this tween runs (based on state)
   * @readonly
   * @type {boolean}
   */
  readonly isRunning: boolean
  /**
   * Is this tween over (based on state)
   * @readonly
   * @type {boolean}
   */
  readonly isFinished: boolean
  /**
   * Is this tween paused (based on state)
   * @readonly
   * @type {boolean}
   */
  readonly isPaused: boolean

  /**
   * Start the tween
   */
  start(): void
  /**
   * Method used to pause a tween or a sequence (only work if the tween runs)
   */
  pause(): void
  /**
   * Method used to resume a tween or a sequence (only work if the tween is paused)
   */
  resume(): void
  /**
   * Method used to Stop/Kill a tween or a sequence
   */
  kill(): void
  /**
   * Method used to reinitialize the tweet
   */
  reset(): void
  /**
   * Method used to Skip this tween or sequence and directly finish it
   * @param {boolean} [finalValue] does the object is let as it is or set to his final values
   */
  skip(finalValue?: boolean): void
}
