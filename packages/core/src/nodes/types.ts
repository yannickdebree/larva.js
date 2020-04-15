import { Component } from '../components';
import { Injectable, InjectableDictionnay } from '../injectables';

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

export interface Node<D = any> {
  __closeOneDomElementsInjectionOperation(): void;
  __data(): D;
  __injectContentToBindedDomElement(content: string, uid: string): void;
  __property(key: NodePropertyKey): NodeProperties[NodePropertyKey];
  __setTemplateInjectionUsing(value: boolean): void;
  __setViewAsLoaded(): void;
  registerComponent(component: Component): Node<D>;
  registerComponents(...components: Array<Component>): Node<D>;
  registerInjectable(injectable: Injectable): Node<D>;
  registerInjectables(...injectables: Array<Injectable>): Node<D>;
  render(): Node<D>;
  setTemplate(template: string): Node<D>;
}
