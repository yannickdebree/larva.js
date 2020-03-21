import { createNode, Node } from './node';
import { Data } from './shared';

export interface Component extends Node {
  getId(): string;
  useAsWebComponent(): void;
}

export function createComponent(id: string, data?: (...dependencies: Array<any>) => Data): Component {
  const properties = {
    domElement: undefined,
    id,
    template: ''
  };

  return {
    ...createNode(properties, data),

    getId(): string {
      return properties.id;
    },

    useAsWebComponent(): void {
      window.customElements.define(
        `s-${properties.id}`,
        class extends HTMLElement {
          constructor() {
            super();
            // TODO : Implements Web components use
            this.innerHTML = 'Web components use in progress...';
          }
        }
      );
    }
  };
}
