import {Observable} from 'data/observable';

export class HelloWorldModel extends Observable {
  
  constructor() {
    super();
    this.set('list', ['home', 'work', 'walker', 'witch', 'which', 'school', 'women', 'nativescript', 'none', 'brad', 'stuff', 'holland'])
  }

  public itemTapped(e: any) {
    console.log(e);
  }
}