export class Status {
  _id: string;
  color: string;
  name: string;
  order: string;

  constructor(_id?: string, color?: string, name?: string, order?: string) {
    this._id = _id || null;
    this.color = color || null;
    this.name = name || null;
    this.order = order || null;
  }
}
