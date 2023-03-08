import { defineCustomElement } from 'vue'
import Scrollbar from './index.ce.vue'

// Vue generates a new HTML element class from the component definition.
export const JcScrollbar = defineCustomElement(Scrollbar)

// Register the custom element so that it can be used as <dark-mode-switch>.
export function register (tagName: string = 'jc-scrollbar') {
  customElements.define(tagName, JcScrollbar)
}
