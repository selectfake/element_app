<template>
  <div class="text-group">
    <div class="input-group">
      <input
        :type="type"
        :value="modelValue"
        :placeholder="placeholder"
        @input="$emit('update:modelValue', $event.target.value)"
      />
      <button v-if="btnTitle" :disabled="disabled" @click="$emit('btnClick')">
        {{ btnTitle }}
      </button>
    </div>
    <div v-if="error" class="invalid-feedback">{{ error }}</div>
  </div>
</template>

<script setup="props,content">
import {ref,watch } from "@vue/runtime-core";
const props = defineProps({
  type: {
    type: String,
    default: "text",
  },
  value: String,
  placeholder: String,
  btnTitle: String,
  disabled: Boolean,
  error: String,
  modelValue: String,
});

</script>

<style lang="less" scope>
.input-group {
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 13px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  input {
    width: 60%;
    outline: none;
    border: none;
  }
  button {
    border: none;
    outline: none;
    background: #fff;
  }
  button[disabled] {
    color: #aaa;
  }
}
is-invalid {
  border: 1px solid red;
}
.invalid-feedback {
  color: red;
  padding-top: 5px;
}
</style>