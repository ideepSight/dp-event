import { EventEmitter } from 'events';
export type DPEventsDefinition = {
    [event: string]: (...args: any[]) => void;
};
type DPAny<T> = {
    [key: string]: T;
};
type DPValueType<T> = T extends DPAny<infer U> ? U : never;
type DPUnionToIntersection<Union> = (Union extends any ? (argument: Union) => void : never) extends (argument: infer Intersection) => void ? Intersection : never;
type DPEventsWithoutAny<T extends {
    [event: string]: (...args: any[]) => void;
}> = {
    on: DPUnionToIntersection<DPValueType<{
        [K in keyof T]: (event: K, listener: T[K]) => any;
    }>>;
    emit: DPUnionToIntersection<DPValueType<{
        [K in keyof T]: (event: K, ...args: Parameters<T[K]>) => boolean;
    }>>;
};
export type DPEvents<T extends DPEventsDefinition> = DPEventsWithoutAny<T> & {
    on(event: string, listener: (...args: any[]) => void): any;
    emit(event: string, ...args: any[]): any;
};
export type DPConstructor<T> = Function & {
    prototype: T;
};
export declare const SERIALIZE_DATA: unique symbol;
export declare abstract class DPEvent<T extends DPEventsDefinition = {}> extends EventEmitter {
    on: DPEvents<T>['on'];
    off: DPEvents<T>['on'];
    once: DPEvents<T>['on'];
    addListener: DPEvents<T>['on'];
    removeListener: DPEvents<T>['on'];
    emit: DPEvents<T>['emit'];
    protected [SERIALIZE_DATA]: {};
}
export declare function observe<T extends DPEvent | DPConstructor<DPEvent> | (new (...args: any[]) => DPEvent)>(target: T, property: string): void;
export declare function autoUpdate(target: any, propertyKey: any, descriptor: any): void;
export {};
