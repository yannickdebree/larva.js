import { Component } from 'components/types';

export function useNodeAsWebComponent(component: Component): void {
  window.customElements.define(
    `s-${component.__property('tag')}`,
    class extends HTMLElement {
      constructor() {
        super();
        this.innerHTML = 'Feature in progress.';
      }
    }
  );
}
