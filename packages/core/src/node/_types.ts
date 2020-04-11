import { Component } from '../component';
import { Injectable, InjectableDictionnay } from '../injectable';

export interface NodePropertiesInput {
  domElement: Element;
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

export interface Node<N = any> {
  __closeOneDomElementsInjectionOperation(): void;
  __data(): N;
  __injectContentToBindedDomElement(content: string, uid: string): void;
  __property(key: NodePropertyKey): NodeProperties[NodePropertyKey];
  __setTemplateInjectionUsing(value: boolean): void;
  __setViewAsLoaded(): void;
  registerInjectable(injectable: Injectable): Node<N>;
  registerComponent(component: Component): Node<N>;
  render(): Node<N>;
  setTemplate(template: string): Node<N>;
}
