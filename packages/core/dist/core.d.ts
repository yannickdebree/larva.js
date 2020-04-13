declare module snake.js.core
{
	export function createComponent<C>(tag: string, dataAccessor?: DataAccessor<C>): Component<C>;

	export interface Component<C = any> extends Node<C> {
	    useAsWebComponent(): void;
	}

	export function createInjectable<I>(id: InjectableId, dataAccessor: DataAccessor<I>): Injectable<I>;

	export type InjectableId = string;
	export interface Injectable<I = any> {
	    id(): InjectableId;
	    dataAccessor(): DataAccessor<I>;
	    injectablesIds(): Array<InjectableId>;
	}
	export interface InjectableDictionnay {
	    [injectableId: string]: Injectable;
	}

	export type Dependency = {
	    [key: string]: any;
	};
	export type DataAccessor<D> = (...dependencies: Array<Dependency>) => D;

	export interface NodePropertiesInput {
	    domElement: Element | undefined;
	    scriptedTemplate: string;
	    tag: string;
	}
	export interface NodeProperties extends NodePropertiesInput {
	    bindedDomElements: {
	        [key: string]: ChildNode;
	    };
	    components: Array<Component>;
	    domElementsInjectionOperationTread: number;
	    injectableDictionnay: InjectableDictionnay;
	    isViewLoaded: boolean;
	    scriptedData: {
	        [key: string]: string;
	    };
	    templateInjectionUsing: boolean;
	}
	export type NodePropertyKey = keyof NodeProperties;
	export type NodePropertyValue = NodeProperties[NodePropertyKey];
	export interface Node<N = any> {
	    __closeOneDomElementsInjectionOperation(): void;
	    __data(): N;
	    __injectContentToBindedDomElement(content: string, uid: string): void;
	    __property(key: NodePropertyKey): NodeProperties[NodePropertyKey];
	    __setTemplateInjectionUsing(value: boolean): void;
	    __setViewAsLoaded(): void;
	    registerComponent(component: Component): Node<N>;
	    registerComponents(...components: Array<Component>): Node<N>;
	    registerInjectable(injectable: Injectable): Node<N>;
	    registerInjectables(...injectables: Array<Injectable>): Node<N>;
	    render(): Node<N>;
	    setTemplate(template: string): Node<N>;
	}

	export function snake<S>(_selector: string, _data?: DataAccessor<S>): Snake<S>;

	export interface Snake<S> extends Node<S> {
	    enableTemplateInjection(): Snake<S>;
	}



}