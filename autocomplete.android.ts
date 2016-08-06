import * as view from 'ui/core/view';
import {TextView} from 'ui/text-view'
import app = require('application');
import {Color} from 'color';
declare var android: any;
declare var Array: any;
export class AutoComplete extends view.View {
	private _android: android.widget.AutoCompleteTextView;
	private _items: Array<any>;
	private _textColor: string;
	private _threshold: number;
	public static itemTapEvent = "itemTap";
	public static onClose = "onClose";
	constructor() {
		super();
	}
	get android(): android.widget.AutoCompleteTextView {
		return this._android;
	}
	set items(value: Array<any>) {
		this._items = value;
		if (value) {
			this.itemsUpdate(value);
		}
	}
	get items() {
		return this._items;
	}
	set threshold(value: number) {
		this._threshold = value;
	}
	get threshold() {
		return this._threshold;
	}
	set textColor(value) {
		this._textColor = value;
	}
	get textColor() {
		return this._textColor;
	}

	_createUI() {
		this._android = new android.widget.AutoCompleteTextView(app.android.context);
		if (!this.threshold) {
			this._android.setThreshold(1);
		} else {
			this._android.setThreshold(this.threshold);
		}

		if (!this.textColor) {
			this._android.setTextColor(new Color('black').android);
		} else {
			this._android.setTextColor(new Color(this.textColor).android);
		}

		const that = new WeakRef(this);
		this._android.setOnItemClickListener(new android.widget.AdapterView.OnItemClickListener({
			onItemClick(parent: any, view: android.widget.TextView, index: number, id: number) {
				let owner = that.get();
				if (owner) {
					owner.notify({ eventName: AutoComplete.itemTapEvent, object: owner, index: index, view: view, data: view.getText() });
				}

			}
		}));

		this._android.setOnDismissListener(new android.widget.AutoCompleteTextView.OnDismissListener({
			onDismiss() {
				let owner = that.get();
				if (owner) {
					owner.notify({ eventName: AutoComplete.onClose, object: owner });
				}
			}
		}));


	}
	itemsUpdate(items) {
		const arr = Array.create(java.lang.String, this.items.length);
		this.items.forEach((item, index) => {
			arr[index] = item;
		});
		let ad = new android.widget.ArrayAdapter(app.android.context, android.R.layout.simple_list_item_1, arr);
		this._android.setAdapter(ad);
	}
	showDropDown() {
		this._android.showDropDown();
	}
	dismissDropDown() {
		this._android.dismissDropDown();
	}
	clearListSelection() {
		this._android.clearListSelection();
	}
	setDropDownHorizontalOffset(offset: number) {
		this._android.setDropDownHorizontalOffset(offset);
	}
	setDropDownVerticalOffset(offset: number) {
		this._android.setDropDownVerticalOffset(offset);
	}
	setDropDownWidth(width: number) {
		this._android.setDropDownWidth(width);
	}
	setListSelection(index: number) {
		this._android.setListSelection(index);
	}
}

export interface ItemTap{
	eventName:string
	object: view.View
	index: number
	view: android.widget.AutoCompleteTextView
	data: string
}