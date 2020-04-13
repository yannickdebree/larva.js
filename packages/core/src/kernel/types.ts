export type Dependency = {
  [key: string]: any;
};

export type DataAccessor<D> = (...dependencies: Array<Dependency>) => D;
