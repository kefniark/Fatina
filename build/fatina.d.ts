

    private targetSize;
    private tweens;
    private sequences;
    private created;
    private poped;
    private pushed;
    constructor(size: number);
    private CreateTween();
    PopTween(): ITween;
    PushTween(tween: ITween): void;
    private CreateSequence();
    PopSequence(): ISequence;
    PushSequence(sequence: ISequence): void;
}

    readonly Type: TweenType;
    private state;
    private timescale;
    private elapsed;
    private eventToAdd;
    private eventToRemove;
    private cleanUpdate;
    private cleanTweens1;
    private cleanTweens2;
    GetCleanTweens(): (ITween | ISequence)[];
    SetTimescale(scale: number): void;
    readonly Elapsed: number;
    readonly Duration: number;
    AddTickListener(cb: (dt: number) => void): void;
    RemoveTickListener(cb: (dt: number) => void): void;
    private UpdateListener();
    Tick(dt: number): void;
    IsCompleted(): boolean;
    IsRunning(): boolean;
    IsKilled(): boolean;
    Start(): void;
    Pause(): void;
    Resume(): void;
    Kill(): void;
    Reset(): void;
    Clean(data: (ITween | ISequence)[]): void;
}

    first: INode | undefined;
    last: INode | undefined;
    length: number;
    Add(obj: any): void;
    Remove(obj: any): void;
    Clear(): void;
    private GetNode(obj, previous, next, list);
}
    node_valid: boolean;
    node_previous: INode | undefined;
    node_next: INode | undefined;
    node_list: EventList | undefined;
}

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

    Idle = 0,
    Run = 1,
    Pause = 2,
    Finished = 3,
    Killed = 4,
}

    Ticker = 0,
    Sequence = 1,
    Tween = 2,
    Callback = 3,
    Delay = 4,
    None = 5,
}

    Type: TweenType;
    Elapsed: number;
    Duration: number;
    IsRunning(): boolean;
    IsCompleted(): boolean;
    IsKilled(): boolean;
    Start(): void;
    Pause(): void;
    Resume(): void;
    Kill(): void;
    Reset(): void;
}

    OnStart(cb: () => void): void;
    OnUpdate(cb: (dt: number, progress: number) => void): void;
    OnKilled(cb: () => void): void;
    OnComplete(cb: () => void): void;
}

    Default(): void;
    Start(): ISequence;
    SetParent(ticker: ITicker): ISequence;
    SetTimescale(scale: number): ISequence;
    SetLoop(loop: number): ISequence;
    Append(tween: ITween): ISequence;
    AppendCallback(cb: () => void): ISequence;
    AppendInterval(duration: number): ISequence;
    Prepend(tween: ITween): ISequence;
    PrependCallback(cb: () => void): ISequence;
    PrependInterval(duration: number): ISequence;
    Join(tween: ITween): ISequence;
    OnStart(cb: () => void): ISequence;
    OnStepStart(cb: (tween: ITween | IPlayable) => void): ISequence;
    OnStepEnd(cb: (index: ITween | IPlayable) => void): ISequence;
    OnUpdate(cb: (dt: number, progress: number) => void): ISequence;
    OnKilled(cb: () => void): ISequence;
    OnComplete(cb: () => void): ISequence;
}

    AddTickListener(cb: (dt: number) => void): void;
    RemoveTickListener(cb: (dt: number) => void): void;
    Clean(data: (ITween | ISequence)[]): void;
}

    Default(): void;
    Init(object: any, properties: string[]): void;
    Start(): ITween;
    From(from: any): ITween;
    To(to: any, duration: number): ITween;
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

    [id: string]: (t: number, args?: any) => number;
};

    elapsed: number;
    duration: number;
    timescale: number;
    protected loop: number;
    readonly abstract Type: TweenType;
    readonly Elapsed: number;
    readonly Duration: number;
    protected parent: ITicker;
    protected tickCb: (dt: number) => void;
    protected state: State;
    private eventStart;
    private eventUpdate;
    private eventKill;
    private eventComplete;
    private firstStart;
    protected abstract Validate(): void;
    protected abstract LoopInit(): void;
    SetParent(ticker: ITicker): void;
    IsRunning(): boolean;
    IsCompleted(): boolean;
    IsKilled(): boolean;
    Start(): void;
    Reset(resetloop?: boolean): void;
    ResetAndStart(resetloop?: boolean): void;
    Pause(): void;
    Resume(): void;
    Kill(): void;
    protected abstract Cleanup(): void;
    Default(): void;
    protected Complete(): void;
    protected Started(): void;
    protected Updated(dt: number, progress: number): void;
    protected Killed(): void;
    protected Completed(): void;
    OnStart(cb: () => void): void;
    OnUpdate(cb: (dt: number, progress: number) => void): void;
    OnKilled(cb: () => void): void;
    OnComplete(cb: () => void): void;
}

    readonly Type: TweenType;
    constructor(cb: () => void);
    protected Validate(): void;
    protected LoopInit(): void;
    protected Cleanup(): void;
}

    readonly Type: TweenType;
    constructor(duration: number);
    protected Validate(): void;
    protected LoopInit(): void;
    protected Cleanup(): void;
}

    readonly Type: TweenType;
    private eventTick;
    private eventStepStart;
    private eventStepEnd;
    private tweens;
    private currentTween;
    private sequenceIndex;
    private cleanTweens;
    readonly CurrentTween: (ITween | IPlayable)[] | undefined;
    constructor();
    Start(): ISequence;
    protected Validate(): void;
    protected LoopInit(): void;
    SetParent(ticker: ITicker): ISequence;
    AddTickListener(cb: (dt: number) => void): void;
    RemoveTickListener(cb: (dt: number) => void): void;
    private Tick(dt, remains?);
    private StepStarted(tween);
    private StepEnded(tween);
    Append(tween: ITween): ISequence;
    AppendCallback(cb: () => void): ISequence;
    AppendInterval(duration: number): ISequence;
    Prepend(tween: ITween): ISequence;
    PrependCallback(cb: () => void): ISequence;
    PrependInterval(duration: number): ISequence;
    Kill(): void;
    Join(tween: ITween): ISequence;
    SetTimescale(scale: number): ISequence;
    SetLoop(loop: number): ISequence;
    Default(): void;
    Cleanup(): void;
    Clean(data: (ITween | ISequence)[]): void;
    OnStart(cb: () => void): ISequence;
    OnUpdate(cb: (dt: number, progress: number) => void): ISequence;
    OnKilled(cb: () => void): ISequence;
    OnComplete(cb: () => void): ISequence;
    OnStepStart(cb: (index: ITween | IPlayable) => void): ISequence;
    OnStepEnd(cb: (index: ITween | IPlayable) => void): ISequence;
}

    readonly Type: TweenType;
    private object;
    private properties;
    private from;
    private to;
    private relative;
    private ease;
    constructor(object: any, properties: string[]);
    Init(object: any, properties: string[]): void;
    Start(): ITween;
    protected Validate(): void;
    protected LoopInit(): void;
    private Update(dt, progress);
    SetParent(ticker: ITicker): ITween;
    Cleanup(): void;
    Default(): void;
    From(from: any): ITween;
    To(to: any, duration: number): ITween;
    SetLoop(loop: number): ITween;
    SetRelative(relative: boolean): ITween;
    SetTimescale(scale: number): ITween;
    ToSequence(): ISequence;
    private Easing(type);
    SetEasing(type: EasingType | string): ITween;
    OnStart(cb: () => void): ITween;
    OnUpdate(cb: (dt: number, progress: number) => void): ITween;
    OnKilled(cb: () => void): ITween;
    OnComplete(cb: () => void): ITween;
}









