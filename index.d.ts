export declare class AutoComplete {
    private _android;
    private _items;
    private _textColor;
    private _threshold;
    static itemTapEvent: string;
    static onClose: string;
    constructor();
    android: any;
    items: Array<any>;
    threshold: number;
    textColor: string;
    _createUI(): void;
    itemsUpdate(items: any): void;
    showDropDown(): void;
    dismissDropDown(): void;
    clearListSelection(): void;
    setDropDownHorizontalOffset(offset: number): void;
    setDropDownVerticalOffset(offset: number): void;
    setDropDownWidth(width: number): void;
    setListSelection(index: number): void;
}
export interface ItemTap {
    eventName: string;
    object: any;
    index: number;
    view: any;
    data: string;
}
