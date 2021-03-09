export abstract class ManagedList<T> {
  removed: T[];
  newItems: T[];

  constructor(protected items: T[]) {
    this.newItems = [];
    this.removed = [];
  }

  get Items(): T[] {
    return Array.from(this.items);
  }

	get NewItems(): T[] {
    return this.newItems;	
	}

  public abstract compare(a: T, b: T): boolean;

  public abstract exist(arg: T): boolean;

  public addRemoved(toRemove: T): void {
    const exist = this.exist(toRemove);
    if (exist) {
      this.items = this.items.filter(
        (theItem) => !this.compare(theItem, toRemove)
      );
    }
    this.removed.push(toRemove);
  }

  public addItem(toAdd: T): void {
		if(this.isNew(toAdd)){
      this.newItems.push(toAdd);
		}
    this.items.push(toAdd);
  }

  public getItemsRemoved(): T[] {
    return this.removed;
  }

  public isNew(t: T): boolean {
    return this.newItems.filter((_t) => this.compare(_t, t)).length === 0;
  }
}
