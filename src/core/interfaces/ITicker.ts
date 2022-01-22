import { IControl } from './IControl'

/**
 * Interface used by any ticker (ticker, sequence)
 *
 * @export
 * @interface ITicker
 * @extends {IControl}
 */
export interface ITicker extends IControl {
  addTick(cb: (dt: number) => void): void
  removeTick(cb: (dt: number) => void): void
  setTimescale(scale: number): void
}
