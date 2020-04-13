export declare type Dependency = {
    [key: string]: any;
};
export declare type DataAccessor<D> = (...dependencies: Array<Dependency>) => D;
