import { createNode, Node, NodeData, NodePropertiesInput } from './node';

export interface Component extends Node {
  getTag(): string;
  useAsWebComponent(): void;
}

export function createComponent(tag: string, data?: NodeData): Component {
  const properties: NodePropertiesInput = {
    domElement: undefined,
    tag,
    scriptedTemplate: ''
  };

  return {
    ...createNode(properties, data),

    getTag(): string {
      return properties.tag;
    },

    useAsWebComponent(): void {
      window.customElements.define(
        `s-${properties.tag}`,
        class extends HTMLElement {
          constructor() {
            super();
            this.innerHTML = 'Feature in progress.';
          }
        }
      );
    }
  };
}
