export type Dependency = {
  [key: string]: any;
};

export type DataAccessor<D> = (...dependencies: Array<Dependency>) => D;

export enum EventTypes {
  click,
  keypress,
  keydown,
  keyup,
  mouseover,
  submit
}
