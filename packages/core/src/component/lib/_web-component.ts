import { Node } from '../../node';

export function useNodeAsWebComponent(node: Node): void {
  window.customElements.define(
    `s-${node.__property('tag')}`,
    class extends HTMLElement {
      constructor() {
        super();
        this.innerHTML = 'Feature in progress.';
      }
    }
  );
}
