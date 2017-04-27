//类型约束
export interface KeyList{
    Dispose:Array<common>;
    Event:Array<common>;
    Data:Array<common>;
    Expand:Array<common>;
}
export interface common{
    name:string;
    value:string;
}

//Keyword类型约束
export interface postKeyWord{
    if:Array<KeyWordMain>;
    for:Array<KeyWordMain>;
    Variables:Array<KeyWordMain>;
    Constant:Array<KeyWordMain>;
}
export interface KeyWordMain{
    name:string;
    value:string;
    type :string;
}

