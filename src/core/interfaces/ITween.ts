import { EasingType } from '../../easing/easingType'
import { IControl } from './IControl'
import { ISequence } from './ISequence'
import { ISettings } from './ISettings'
import { ITicker } from './ITicker'

/**
 * Interface used by tweens
 *
 * @export
 * @interface ITween
 * @extends {IControl}
 */
export interface ITween extends IControl {
  /**
   * Used to define the object and the properties modified by this tween
   */
  init(object: any): void
  /**
   * @inheritdoc
   */
  start(): ITween
  /**
   * Method used to set the values at the beginning of the tween
   */
  from(from: any): ITween
  /**
   * Method used to set the values at the end of the tween
   */
  to(to: any, duration: number): ITween
  /**
   * Method used to set the values at the end of the tween
   * Compute the duration based on the distance between the position and target
   */
  toSpeed(to: any, speed: number): ITween
  /**
   * To apply a modifier on a current tween (like gravity)
   */
  modify(diff: any, updateTo: boolean): void
  /**
   * Method used to reverse the tween
   */
  reverse(): void
  /**
   * Method used to reverse the tween N times at the end
   */
  yoyo(time: number): ITween
  /**
   * Method used to define the ticker of this tween
   * When Fatina.Tween is used, the main ticker is automatically defined as parent
   */
  setParent(ticker: ITicker): ITween
  /**
   * Method used to define how many time the tween has to loop
   * Extra: if -1 the tween will loop forever
   *
   * @param {number} loop Number of loop to do
   */
  setLoop(loop: number): ITween
  /**
   * Method used to Quantify the tween value to a certain amount of steps
   */
  setSteps(steps: number): ITween
  /**
   * Method used to define if the tween as to work in relative or not
   */
  setRelative(relative: boolean): ITween
  /**
   * Method used to set the type of easing wanted.
   *
   * @param {(EasingType | string)} type
   */
  setEasing(type: EasingType | string): ITween
  /**
   * Method used to set the type of easing for this tween
   */
  setSettings(settings: ISettings): ITween
  /**
   * Method used to change the timescale of the tween
   *
   * @param {number} scale
   */
  setTimescale(scale: number): ITween
  /**
   * Method used to create a sequence with this tween as first value.
   * Usually used with .AppendInterval(1250) or .PrependInterval(160) to add a delay
   */
  toSequence(): ISequence

  /**
   * Callback called when the tween is starting
   *
   * @param {() => void} cb
   */
  onStart(cb: () => void): ITween
  /**
   * Callback called when the tween is updated
   *
   * @param {(dt: number, progress: number) => void} cb
   */
  onUpdate(cb: (dt: number, progress: number) => void): ITween
  /**
   * Callback called when the tween is restarted
   *
   * @param {() => void} cb
   */
  onRestart(cb: () => void): ITween
  /**
   * Callback called when the tween is killed
   *
   * @param {() => void} cb
   */
  onKilled(cb: () => void): ITween
  /**
   * Callback called when the tween is complete
   *
   * @param {() => void} cb
   */
  onComplete(cb: () => void): ITween
  /**
   * Transform this ITween into a Promise<ITween>
   */
  toPromise(): Promise<ITween>
}
