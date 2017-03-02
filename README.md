# Autocomplete for NativeScript

##Install
```
npm install nativescript-autocomplete
```

##Usage

IMPORTANT: Make sure you include `xmlns:ac="nativescript-autocomplete"` on the Page element

e.g

```
item:Array<string> = ['1','2','3','4']
```
```
itemTapped(args){
    const eventName = args.eventName;
    const data = args.data;
    const view = args.view;
    const index = args.index;
    const object = args.object;
}
```
```xml
<ac:Autocomplete  items="{{list}}" itemTap="itemTapped"/>
```

#Angular
```TS
import * as elementRegistryModule from 'nativescript-angular/element-registry';
elementRegistryModule.registerElement("AutoComplete", () => require("nativescript-autocomplete").AutoComplete);

public item:Array<string> = ['1','2','3','4']
itemTapped(args){
    const eventName = args.eventName;
    const data = args.data;
    const view = args.view;
    const index = args.index;
    const object = args.object;
}
```
```XML
<AutoComplete [items]="list" (itemTap)="itemTapped($event)"> </AutoComplete>
```



#ScreenShots
Android |
--------|
![Android](screenshots/autocomplete.gif?raw=true)