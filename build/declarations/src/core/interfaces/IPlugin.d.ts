/**
 * Interface used to extend functionalities through plugin
 *
 * @export
 * @interface IPlugin
 */
export interface IPlugin {
    readonly name: string;
    init(fatina: any): void;
}
