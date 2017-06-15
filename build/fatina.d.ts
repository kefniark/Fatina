export declare let time: number;
export declare function Elapsed(): number;
export declare function Init(disableAutoTick?: boolean): boolean;
export declare function SetTimescale(scale: number): void;
export declare function Pause(): void;
export declare function Resume(): void;
export declare function Destroy(): void;
export declare function Update(timestamp: number): any;
export declare function Tween(obj: any, properties: string[]): ITween;
export declare function Sequence(): ISequence;
export declare function Ticker(name: string): ITicker;
export declare class Ticker extends EventList implements ITicker {
    state: State;
    private timescale;
    elapsed: number;
    duration: number;
    private update;
    private eventToAdd;
    private eventToRemove;
    tick: {
        (dt: number): void;
    } | undefined;
    private parent;
    SetParent(parent: ITicker, tick: {
        (dt: number): void;
    }): void;
    SetTimescale(scale: number): void;
    AddTickListener(cb: (dt: number) => void): void;
    RemoveTickListener(cb: (dt: number) => void): void;
    private UpdateListener();
    Tick(dt: number): void;
    Start(): void;
    Pause(): void;
    Resume(): void;
    Kill(): void;
    Skip(): void;
    Reset(): void;
}
export declare abstract class EventList {
    first: INode | undefined;
    last: INode | undefined;
    length: number;
    Add(obj: any): void;
    Remove(obj: any): void;
    private GetNode(obj, previous, next, list);
}
export interface INode {
    node_valid: boolean;
    node_previous: INode | undefined;
    node_next: INode | undefined;
    node_list: EventList | undefined;
}
export declare enum State {
    Idle = 0,
    Run = 1,
    Pause = 2,
    Finished = 3,
    Killed = 4,
}
export interface IControl {
    elapsed: number;
    duration: number;
    state: State;
    Start(): void;
    Pause(): void;
    Resume(): void;
    Kill(): void;
    Reset(): void;
    Skip(): void;
}
export interface IPlayable extends IControl {
    state: State;
}
export interface ISequence extends IControl {
    Default(): void;
    Start(): ISequence;
    SetParent(ticker: ITicker): ISequence;
    SetTimescale(scale: number): ISequence;
    SetLoop(loop: number): ISequence;
    Append(tween: ITween | ISequence): ISequence;
    AppendCallback(cb: () => void): ISequence;
    AppendInterval(duration: number): ISequence;
    Prepend(tween: ITween | ISequence): ISequence;
    PrependCallback(cb: () => void): ISequence;
    PrependInterval(duration: number): ISequence;
    Join(tween: ITween | ISequence): ISequence;
    OnStart(cb: () => void): ISequence;
    OnStepStart(cb: (tween: ITween | IPlayable) => void): ISequence;
    OnStepEnd(cb: (index: ITween | IPlayable) => void): ISequence;
    OnUpdate(cb: (dt: number, progress: number) => void): ISequence;
    OnKilled(cb: () => void): ISequence;
    OnComplete(cb: () => void): ISequence;
}
export interface ITicker extends IControl {
    AddTickListener(cb: (dt: number) => void): void;
    RemoveTickListener(cb: (dt: number) => void): void;
    SetTimescale(scale: number): void;
}
export interface ITween extends IControl {
    Default(): void;
    Init(object: any, properties: string[]): void;
    Start(): ITween;
    From(from: any): ITween;
    To(to: any, duration: number): ITween;
    Modify(diff: any, updateTo: boolean): void;
    SetParent(ticker: ITicker): ITween;
    SetLoop(loop: number): ITween;
    SetRelative(relative: boolean): ITween;
    SetEasing(type: EasingType | string): ITween;
    SetTimescale(scale: number): ITween;
    ToSequence(): ISequence;
    OnStart(cb: () => void): ITween;
    OnUpdate(cb: (dt: number, progress: number) => void): ITween;
    OnKilled(cb: () => void): ITween;
    OnComplete(cb: () => void): ITween;
}
export declare let easeTypes: ((t: number, args?: any) => number)[];
export declare let easeNames: {
    [id: string]: (t: number, args?: any) => number;
};
export declare enum EasingType {
    Linear = 0,
    InQuad = 1,
    OutQuad = 2,
    InOutQuad = 3,
    InCubic = 4,
    OutCubic = 5,
    InOutCubic = 6,
    InQuart = 7,
    OutQuart = 8,
    InOutQuart = 9,
    InSine = 10,
    OutSine = 11,
    InOutSine = 12,
    InCirc = 13,
    OutCirc = 14,
    InOutCirc = 15,
    InQuint = 16,
    OutQuint = 17,
    InOutQuint = 18,
    InExponential = 19,
    OutExponential = 20,
    InOutExponential = 21,
    InElastic = 22,
    OutElastic = 23,
    InOutElastic = 24,
    InBack = 25,
    OutBack = 26,
    InOutBack = 27,
    InBounce = 28,
    OutBounce = 29,
    InOutBounce = 30,
}
export declare abstract class BaseTween {
    elapsed: number;
    duration: number;
    timescale: number;
    protected loop: number;
    protected parent: ITicker;
    protected tickCb: (dt: number) => void;
    state: State;
    protected eventStart: {
        (): void;
    }[] | undefined;
    protected eventUpdate: {
        (dt: number, progress: number): void;
    }[] | undefined;
    protected eventKill: {
        (): void;
    }[] | undefined;
    protected eventComplete: {
        (): void;
    }[] | undefined;
    private firstStart;
    Start(): void;
    Reset(): void;
    ResetAndStart(dtRemains: number): void;
    Pause(): void;
    Resume(): void;
    Skip(): void;
    protected Complete(): void;
    Kill(): void;
    protected CheckPosition(): void;
    protected Validate(): void;
    protected LoopInit(): void;
    SetParent(ticker: ITicker): void;
    Default(): void;
    private Emit(func, args);
    protected EmitEvent(listeners: any, args?: any): void;
}
export declare class Callback extends BaseTween implements IPlayable {
    private callback;
    constructor(cb: () => void);
    private Tick(dt);
}
export declare class Delay extends BaseTween implements IPlayable {
    constructor(duration: number);
    private Tick(dt);
}
export declare class Sequence extends BaseTween implements ISequence, ITicker, IPlayable {
    private eventTick;
    private tweens;
    private eventStepStart;
    private eventStepEnd;
    currentTween: (ITween | IPlayable)[] | undefined;
    private sequenceIndex;
    constructor();
    Start(): ISequence;
    protected LoopInit(): void;
    SetParent(ticker: ITicker): ISequence;
    AddTickListener(cb: (dt: number) => void): void;
    RemoveTickListener(cb: (dt: number) => void): void;
    private Tick(dt);
    private LocalTick(dt, remains?);
    private NextTween();
    Append(tween: ITween | ISequence): ISequence;
    AppendCallback(cb: () => void): ISequence;
    AppendInterval(duration: number): ISequence;
    Prepend(tween: ITween | ISequence): ISequence;
    PrependCallback(cb: () => void): ISequence;
    PrependInterval(duration: number): ISequence;
    Skip(): void;
    Kill(): void;
    Join(tween: ITween | ISequence): ISequence;
    SetTimescale(scale: number): ISequence;
    SetLoop(loop: number): ISequence;
    Default(): void;
    OnStart(cb: () => void): ISequence;
    OnUpdate(cb: (dt: number, progress: number) => void): ISequence;
    OnKilled(cb: () => void): ISequence;
    OnComplete(cb: () => void): ISequence;
    OnStepStart(cb: (index: ITween | IPlayable) => void): ISequence;
    OnStepEnd(cb: (index: ITween | IPlayable) => void): ISequence;
}
export declare class Tween extends BaseTween implements ITween {
    private object;
    private properties;
    private from;
    private to;
    private currentFrom;
    private currentTo;
    private remainsDt;
    private relative;
    private ease;
    constructor(object: any, properties: string[]);
    Init(object: any, properties: string[]): void;
    Start(): ITween;
    protected Validate(): void;
    protected CheckPosition(): void;
    private Tick(dt);
    SetParent(ticker: ITicker): ITween;
    From(from: any): ITween;
    To(to: any, duration: number): ITween;
    SetLoop(loop: number): ITween;
    SetRelative(relative: boolean): ITween;
    SetTimescale(scale: number): ITween;
    Modify(diff: any, updateTo: boolean): void;
    ToSequence(): ISequence;
    private Easing(type);
    SetEasing(type: EasingType | string): ITween;
    protected LoopInit(): void;
    Default(): void;
    OnStart(cb: () => void): ITween;
    OnUpdate(cb: (dt: number, progress: number) => void): ITween;
    OnKilled(cb: () => void): ITween;
    OnComplete(cb: () => void): ITween;
}




