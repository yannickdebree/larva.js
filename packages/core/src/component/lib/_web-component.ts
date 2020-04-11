import { Node } from '../../node';

export function useNodeAsWebComponent(node: Node): void {
  console.log('test');
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
