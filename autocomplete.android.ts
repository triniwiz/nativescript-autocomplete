import * as view from 'ui/core/view';
import app = require('application');
export class AutoComplete extends view.View{
_android:android.widget.AutoCompleteTextView;
list:Array<any>;
get android(){
    return this._android;
}
_createUI(){
const arr = Array.create(java.lang.String,this.list.length);
this.list.forEach((item,index)=>{
    arr[index] = item;
});
const ad = new android.widget.ArrayAdapter(app.android.context,android.R.layout.simple_list_item_1,arr);
this._android = new android.widget.AutoCompleteTextView(app.android.context);
this._android.setAdapter(ad);
}
}