import { Component } from '@_components';
import { Injectable, InjectableDictionnay } from '@_injectables';

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
