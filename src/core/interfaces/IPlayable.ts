import { State } from '../enum/state'
import { IControl } from './IControl'
import { ISettings } from './ISettings'
import { ITicker } from './ITicker'

/**
 * Interface used for pseudo tween (delay / callbacks)
 *
 * @export
 * @interface IPlayable
 * @extends {IControl}
 */
export interface IPlayable extends IControl {
  /**
   * @inheritdoc
   */
  readonly state: State

  /**
   * Method used to define the ticker of this tween
   * When Fatina.Tween is used, the main ticker is automatically defined as parent
   */
  setParent(ticker: ITicker): IPlayable
  /**
   * @inheritdoc
   */
  start(): IPlayable
  /**
   * Method used to define how many time the tween has to loop
   * Extra: if -1 the tween will loop forever
   *
   * @param {number} loop Number of loop to do
   */
  setLoop(loop: number): IPlayable
  /**
   * Method used to change fatina settings
   *
   * @param {ISettings} settings
   */
  setSettings(settings: ISettings): IPlayable

  /**
   * Callback called when the tween is starting
   *
   * @param {() => void} cb
   */
  onStart(cb: () => void): IPlayable
  /**
   * Callback called when the tween is restarted
   *
   * @param {() => void} cb
   */
  onRestart(cb: () => void): IPlayable
  /**
   * Callback called when the tween is updated
   *
   * @param {(dt: number, progress: number) => void} cb
   */
  onUpdate(cb: (dt: number, progress: number) => void): IPlayable
  /**
   * Callback called when the tween is killed
   *
   * @param {() => void} cb
   */
  onKilled(cb: () => void): IPlayable
  /**
   * Callback called when the tween is complete
   *
   * @param {() => void} cb
   */
  onComplete(cb: () => void): IPlayable
}
