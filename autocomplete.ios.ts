import {ContentView} from "ui/content-view";

declare var MLPAutoCompleteTextField, MLPAutoCompleteTextFieldDelegate, MLPAutoCompletionObject, MLPAutoCompleteTextFieldDataSource, UITextBorderStyleBezel, UITextBorderStyleLine, UITextBorderStyleNone, UITextBorderStyleRoundedRect;

class ACObject extends NSObject {
  public static ObjCProtocols = [MLPAutoCompletionObject];

  public autocompleteString: string;
}

class ACDataSource extends NSObject {
  public static ObjCProtocols = [MLPAutoCompleteTextFieldDataSource];
  public items: Array<any>;
  
  public autoCompleteTextFieldPossibleCompletionsForString(textField, inputString) {
    console.log(`autoCompleteTextFieldPossibleCompletionsForString`);
    console.log(inputString);
    return this.items;
  }

  public autoCompleteTextFieldPossibleCompletionsForStringCompletionHandler(textField, inputString, handler) {
    console.log(`autoCompleteTextFieldPossibleCompletionsForStringCompletionHandler`);
    let completions = ['test', 'test 2', 'test 3'];
    handler(completions);
  }
}

class ACDelegate extends NSObject {
  public static ObjCProtocols = [MLPAutoCompleteTextFieldDelegate];

  public autoCompleteTextFieldShouldConfigureCellWithAutoCompleteStringWithAttributedStringForAutoCompleteObjectForRowAtIndexPath(textField, cell, autocompleteString, boldedString, autocompleteObject, indexPath) {
    console.log(`autoCompleteTextFieldShouldConfigureCellWithAutoCompleteStringWithAttributedStringForAutoCompleteObjectForRowAtIndexPath...`);
    console.log(textField);
    console.log(cell);
    console.log(autocompleteString);
    console.log(boldedString);
    console.log(autocompleteObject);
    console.log(indexPath);
    return true;
  }

  public autoCompleteTextFieldDidSelectAutoCompleteStringWithAutoCompleteObjectForRowAtIndexPath(textField, selectedString, selectedObject, indexPath) {
    console.log(`autoCompleteTextFieldDidSelectAutoCompleteStringWithAutoCompleteObjectForRowAtIndexPath...`);
    if (selectedObject) {
      console.log(`selected object from autocomplete menu ${selectedObject} with string ${selectedObject.autocompleteString}`);
    } else {
      console.log(`selected string ${selectedString} from autocomplete menu`);
    }
  }
}

export class AutoComplete extends ContentView {
  private _ios: any;
  private _borderStyle: string;
  private _items: any;

  constructor() {
		super();

    this._ios = MLPAutoCompleteTextField.alloc().initWithFrame(CGRectMake(0,0,100,50));
    console.log(this._ios);
    this._ios.delegate = new ACDelegate();
    this._ios.dataSource = new ACDataSource();
  }
  
  get _nativeView(): any {
		return this._ios;
	}

	get ios(): any {
		return this._ios;
  }

  set items(value: any) {
    if (this._ios) {
      this._ios.dataSource.items = value;
    } else {
      this._items = value;
    }
  }
  
  set borderStyle(value: string) {
    if (this._ios && value) {
      let style:any;
      switch (value) {
        case 'bezel':
          style = UITextBorderStyleBezel;
          break;
        case 'line':
          style = UITextBorderStyleLine;
          break;
        case 'none':
          style = UITextBorderStyleNone;
          break;
        case 'rounded':
          style = UITextBorderStyleRoundedRect;
          break;
      }
      this._ios.borderStyle = style;
    } else {
      this._borderStyle = value;
    }
  }

  onLoaded() {
    // ensure a default is set at least on size
    if (!this.width) this.width = 100;
    if (!this.height) this.height = 50;
    this._ios.frame = CGRectMake(0, 0, this.width, this.height);

    if (this._borderStyle) this.borderStyle = this._borderStyle;

	}
}