export abstract class ObjectBase<TObject> {
  constructor(object: Partial<TObject>) {
    Object.assign(this, object);
  }
}
