import { IPlayable } from './IPlayable'
import { ITween } from './ITween'

export interface ITransition {
  /**
   * Method used to set the values at the end of the tween
   */
  to(to: any, duration?: number): ITween
  /**
   * Method used to set the values at the end of the tween
   */
  toSpeed(to: any, speed?: number): ITween
  /**
   * Create a delay tween
   */
  delay(duration: number): IPlayable
  /**
   * Method used to set the values at the end of the tween
   */
  promiseTo(to: any, duration: number): Promise<ITween>
  /**
   * Method used to set the values at the end of the tween
   */
  promiseToSpeed(to: any, speed: number): Promise<ITween>
  /**
   * Create a delay tween
   */
  promiseDelay(duration: number): Promise<IPlayable>
  /**
   * Method used to Stop/Kill a tween or a sequence
   */
  kill(): void
}
