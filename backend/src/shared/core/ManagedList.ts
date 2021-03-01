export abstract class ManagedList<T>{

  removed: T[];

  constructor(protected items: T[]) {
  }

  get Items(): T[] {
    return Array.from(this.items);
  }

  protected abstract compare(a: T, b: T): boolean;

  public abstract exist(arg: T): boolean;

  public remove(toRemove: T): void {
    const exist = this.exist(toRemove);
    if(exist){
      this.items = this.items.filter(theItem => !this.compare(theItem, toRemove))
			this.removed.push(toRemove);
    }
  }

  public add(toAdd: T): void {
    this.remove(toAdd);
    this.items.push(toAdd);
  }

  public getItemsRemoved(): T[] {
    return this.removed;
  }

}

