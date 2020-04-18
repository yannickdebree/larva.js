import { Component } from '../components';
import { Injectable, InjectableDictionnay } from '../injectables';

export interface Input {
  get(key: string): any;
}

export interface Output {
  emit(key: string, value: any): void;
}

export interface NodePropertiesInput {
  domElement: Element | undefined;
  scriptedTemplate: string;
  tag: string;
}

export interface NodeProperties extends NodePropertiesInput {
  bindedDomElements: { [key: string]: ChildNode };
  components: Array<Component>;
  domElementsInjectionOperationTread: number;
  injectableDictionnay: InjectableDictionnay;
  isViewLoaded: boolean;
  scriptedData: { [key: string]: string };
  templateInjectionUsing: boolean;
}

export type NodePropertyKey = keyof NodeProperties;
export type NodePropertyValue = NodeProperties[NodePropertyKey];

export interface Node<T = any, D = any> {
  __closeOneDomElementsInjectionOperation(): void;
  __data(): D;
  __injectContentToBindedDomElement(content: string, uid: string): void;
  __property(key: NodePropertyKey): NodeProperties[NodePropertyKey];
  __setTemplateInjectionUsing(value: boolean): void;
  __setViewAsLoaded(): void;
  registerComponent(component: Component): T;
  registerComponents(...components: Array<Component>): T;
  registerInjectable(injectable: Injectable): T;
  registerInjectables(...injectables: Array<Injectable>): T;
  render(): T;
  setTemplate(template: string): T;
}
