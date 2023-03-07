<script setup lang='ts'>
import { computed, onMounted, onUnmounted, reactive, ref } from 'vue'

interface Props {
  native?: string;
  direction?: string;
  wrapClass?: string;
  wrapStyle?: string;
  viewClass?: string;
  viewStyle?: string;
}

interface ScrollbarParams {
  wrapWidth: number;
  wrapHeight: number;
  viewWidth: number;
  viewHeight: number;
  vThumbHeightPercent: number;
  hThumbWidthPercent: number;
  vThumbHeight?: string;
  hThumbWidth?: string;
  vThumbTransform?: string;
  hThumbTransform?: string;
}

const props = withDefaults(defineProps<Props>(), {
  native: 'false',
  direction: '',
  wrapClass: '',
  wrapStyle: '',
  viewClass: '',
  viewStyle: '',
})
const native: boolean = props.native !== 'false'
const direction = ref(props.direction)
const _wrapStyle = computed(() => {
  let style = ''
  if (direction.value === 'x') {
    style += `overflow-y: hidden;margin-bottom: ${ !native ? '-15px' : 0 };`
  } else if (direction.value === 'y') {
    style += `overflow-x: hidden;margin-right: ${ !native ? '-15px' : 0 };`
  } else {
    style += `margin-bottom: ${ !native ? '-15px' : 0 };margin-right: ${ !native ? '-15px' : 0 };`
  }
  return style + props.wrapStyle
})

const showV = computed(() => {
  return (direction.value === 'y' || direction.value === '') && !native
})
const showH = computed(() => {
  return (direction.value === 'x' || direction.value === '') && !native
})
const wrapRef = ref<Element>()
const viewRef = ref<Element>()
const vRef = ref<Element>()
const hRef = ref<Element>()
const vThumbRef = ref<Element>()
const hThumbRef = ref<Element>()
const scrollbarParams = reactive<ScrollbarParams>({
  wrapWidth: 0,
  wrapHeight: 0,
  viewWidth: 0,
  viewHeight: 0,
  vThumbHeightPercent: 0,
  hThumbWidthPercent: 0
})

const domObserver = (dom: Element) => {
  const config = {
    attributes: true,
    attributeFilter: undefined,
    attributeOldValue: true,
    characterData: true,
    characterDataOldValue: true,
    childList: true,
    subtree: true

  };
  // DOMNodeInserted
  dom.addEventListener('DOMNodeInserted', scrollbarParamsReset)
  // MutationObserver
  const observer = new MutationObserver(scrollbarParamsReset)
  observer.observe(dom, config)
  // ResizeObserver
  const resizeObserver = new ResizeObserver(scrollbarParamsReset)
  resizeObserver.observe(dom)
}
const scrollbarParamsReset = () => {
  scrollbarParams.wrapWidth = wrapRef.value?.clientWidth || 0
  scrollbarParams.viewWidth = viewRef.value?.scrollWidth || 0
  scrollbarParams.wrapHeight = wrapRef.value?.clientHeight || 0
  scrollbarParams.viewHeight = viewRef.value?.scrollHeight || 0
  scrollbarParams.vThumbHeightPercent = (scrollbarParams.wrapHeight / scrollbarParams.viewHeight) > 1 ? 1 : (scrollbarParams.wrapHeight / scrollbarParams.viewHeight)
  scrollbarParams.hThumbWidthPercent = (scrollbarParams.wrapWidth / scrollbarParams.viewWidth) > 1 ? 1 : (scrollbarParams.wrapWidth / scrollbarParams.viewWidth)
  scrollbarParams.vThumbHeight = (scrollbarParams.vThumbHeightPercent * 100).toFixed(2) + '%'
  scrollbarParams.hThumbWidth = (scrollbarParams.hThumbWidthPercent * 100).toFixed(2) + '%'
  const dir = {
    x: direction.value === '' || direction.value === 'x',
    y: direction.value === '' || direction.value === 'y',
  }
  if (scrollbarParams.vThumbHeightPercent === 1) dir.y = false
  if (scrollbarParams.hThumbWidthPercent === 1) dir.x = false
  if (dir.x && dir.y) {
    direction.value = ''
  } else if (dir.x) {
    direction.value = 'x'
  } else if (dir.y) {
    direction.value = 'y'
  }
}
const scrollHandle = () => {
  const { scrollTop = 0, scrollLeft = 0 } = wrapRef.value || {}
  scrollbarParams.vThumbTransform = `translateY(${ (scrollTop * 100 / scrollbarParams.wrapHeight).toFixed(2) }%)`
  scrollbarParams.hThumbTransform = `translateX(${ (scrollLeft * 100 / scrollbarParams.wrapWidth).toFixed(2) }%)`
}
const vThumbMoveHandle = (e: MouseEvent) => {
  const offset = e.clientY - (vRef.value as Element).getBoundingClientRect().y
  const { clientHeight = 0 } = vThumbRef.value || {}
  wrapRef.value?.scrollTo({
    left: wrapRef.value.scrollLeft,
    top: (offset - clientHeight / 2) / scrollbarParams.vThumbHeightPercent,
  })
}

const hThumbMoveHandle = (e: MouseEvent) => {
  const offset = e.clientX - (hRef.value as Element).getBoundingClientRect().x
  const { clientWidth = 0 } = hThumbRef.value || {}
  wrapRef.value?.scrollTo({
    left: (offset - clientWidth / 2) / scrollbarParams.hThumbWidthPercent,
    top: wrapRef.value.scrollTop,
  })
}
const vThumbMousedownHandle = () => {
  window.addEventListener('mousemove', vThumbMoveHandle)
}
const hThumbMousedownHandle = () => {
  window.addEventListener('mousemove', hThumbMoveHandle)
}
const windowMouseupHandle = () => {
  window.removeEventListener('mousemove', vThumbMoveHandle)
  window.removeEventListener('mousemove', hThumbMoveHandle)
}
onMounted(() => {
  scrollbarParamsReset()
  wrapRef.value && domObserver(wrapRef.value)
  viewRef.value && domObserver(viewRef.value)
  window.addEventListener('mouseup', windowMouseupHandle)
})
onUnmounted(() => {
  window.removeEventListener('mouseup', windowMouseupHandle)
})
</script>

<template>
  <div class="scrollbar">
    <div
        ref="wrapRef"
        :class="`scrollbar__wrap ${wrapClass}`"
        :style="_wrapStyle"
        @scroll="scrollHandle"
    >
      <div
          ref="viewRef"
          :class="`scrollbar__view ${viewClass}`"
          :style="viewStyle"
      >
        <slot></slot>
      </div>
    </div>
    <div
        ref="vRef"
        class="scrollbar__bar is-vertical"
        v-if="showV"
        @click="vThumbMoveHandle"
    >
      <div
          ref="vThumbRef"
          class="scrollbar__thumb"
          :style="{
            height: scrollbarParams.vThumbHeight,
            transform: scrollbarParams.vThumbTransform
          }"
          @mousedown.prevent="vThumbMousedownHandle"
      ></div>
    </div>
    <div
        ref="hRef"
        class="scrollbar__bar is-horizontal"
        v-if="showH"
        @click="hThumbMoveHandle"
    >
      <div
          ref="hThumbRef"
          class="scrollbar__thumb"
          :style="{
            width: scrollbarParams.hThumbWidth,
            transform: scrollbarParams.hThumbTransform
          }"
          @mousedown.prevent="hThumbMousedownHandle"
      ></div>
    </div>
  </div>
</template>

<style>
.scroll-bar * {
  box-sizing: border-box;
}

.scrollbar {
  overflow: hidden;
  position: relative;
}

.scrollbar__wrap {
  overflow: scroll;
  height: 100%;
}

.scrollbar__bar {
  position: absolute;
  right: 2px;
  bottom: 2px;
  z-index: 1;
  border-radius: 4px;
  opacity: 0;
  transition: opacity .12s ease-out;
}

.scrollbar__bar.is-horizontal {
  height: 6px;
  left: 2px;
}

.scrollbar__bar.is-vertical {
  width: 6px;
  top: 2px;
}

.scrollbar__thumb {
  position: relative;
  display: block;
  width: 0;
  height: 0;
  cursor: pointer;
  border-radius: inherit;
  background-color: rgba(144, 147, 153, .3);
  transition: background-color .3s;
}

.scrollbar__bar.is-horizontal .scrollbar__thumb {
  height: 100%;
}

.scrollbar__bar.is-vertical .scrollbar__thumb {
  width: 100%;
}

.scrollbar__thumb:hover {
  background-color: rgba(144, 147, 153, .5);
}

.scrollbar:active > .scrollbar__bar,
.scrollbar:focus > .scrollbar__bar,
.scrollbar:hover > .scrollbar__bar {
  opacity: 1;
  transition: opacity .34s ease-out;
}
</style>
