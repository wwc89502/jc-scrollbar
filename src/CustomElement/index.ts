import { defineCustomElement } from 'vue'
import VueScrollbar from './index.ce.vue'

// Vue generates a new HTML element class from the component definition.
export const Scrollbar = defineCustomElement(VueScrollbar)

// Register the custom element so that it can be used as <dark-mode-switch>.
export function register (tagName: string = 'scroll-bar') {
  customElements.define(tagName, Scrollbar)
}
