<template>
  <button @click="utpClick" ref="_ref" class="utp-button" :class="{
    'is-plain': plain,
    'is-round': round,
    'is-circle': circle,
    'is-disabled': disabled,
    [`utp-button--${type}`]: type,
    [`utp-button--${size}`]: size,
  }" :disabled="disabled" :autofocus="autofocus" :type="nativeType">
    <span>
      <slot></slot>
    </span>
  </button>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { ButtonProps } from './types'

defineOptions({
  name: 'utp-button',
})

defineProps(ButtonProps) // 声明按钮的一系列属性变量
// 优化事件
const emit = defineEmits(['click'])
const utpClick = () => {
  emit('click')
}

// 对外暴露dom节点
const _ref = ref<HTMLButtonElement>()
defineExpose({
  ref: _ref,
})
</script>

<style></style>
