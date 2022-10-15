<template>
  <validation-provider
    :rules="rules"
    :name="name"
    v-bind="$attrs"
    v-slot="{ errors, valid, invalid, validated }"
    class="w-100"
  >
    <b-form-group>
      <slot name="label">
        <div class="input-title-wrapper">
          <label v-if="label" :class="labelClasses">
            {{ label }}
          </label>
          <label class="required-text" v-if="inputRequired">[必須]</label>
          <label class="number-caption-text" v-if="numberCaption">[ハイフンなし]</label>
        </div>
      </slot>
      <div
        :class="[
          { 'input-group d-flex align-items-center': hasIcon },
          { 'input-group-alternative': alternative },
          { 'has-label': label || $slots.label },
          inputGroupClasses,
        ]"
      >
        <slot v-bind="slotData">
          <input
            :value="value"
            :type="type"
            v-on="listeners"
            v-bind="$attrs"
            :valid="valid"
            :required="required"
            class="form-control"
            :class="[
              { 'is-valid': valid && validated && successMessage },
              { 'is-invalid': invalid && validated },
              inputClasses,
            ]"
            :disabled="disabled"
          />
        </slot>
        <div v-if="prependIcon" class="input-group-prepend">
          <span class="input-group-text">
            <slot>
              <div style="cursor: pointer" @click="iconClick" :class="prependIcon">
                {{ textContent }}
              </div>
            </slot>
          </span>
        </div>
      </div>
      <slot name="success">
        <div class="valid-feedback" v-if="valid && validated && successMessage">
          {{ successMessage }}
        </div>
      </slot>
      <slot name="error">
        <div v-if="errors[0]" class="invalid-feedback" style="display: block">
          {{ errors[0] }}
        </div>
      </slot>
      <slot name="note">
        <div v-if="note" style="display: block" class="note">
          {{ note }}
        </div>
      </slot>
    </b-form-group>
  </validation-provider>
</template>
<script>
export default {
  inheritAttrs: false,
  name: 'base-input',
  props: {
    note: {
      type: String,
      description: 'Note',
    },
    required: {
      type: Boolean,
      description: 'Whether input is required (adds an asterix *)',
    },
    group: {
      type: Boolean,
      description: 'Whether input is an input group (manual override in special cases)',
    },
    alternative: {
      type: Boolean,
      description: 'Whether input is of alternative layout',
    },
    label: {
      type: String,
      description: 'Input label (text before input)',
    },
    error: {
      type: String,
      description: 'Input error (below input)',
    },
    successMessage: {
      type: String,
      description: 'Input success message',
      default: '',
    },
    labelClasses: {
      type: String,
      description: 'Input label css classes',
      default: 'form-control-label',
    },
    inputClasses: {
      type: String,
      description: 'Input css classes',
    },
    inputGroupClasses: {
      type: String,
      description: 'Input group css classes',
    },
    value: {
      type: [String, Number],
      description: 'Input value',
    },
    type: {
      type: String,
      description: 'Input type',
      default: 'text',
    },
    appendIcon: {
      type: String,
      description: 'Append icon (right)',
    },
    prependIcon: {
      type: String,
      description: 'Prepend icon (left)',
    },
    rules: {
      type: [String, Array, Object],
      description: 'Vee validate validation rules',
      default: '',
    },
    name: {
      type: String,
      description: 'Input name (used for validation)',
      default: '',
    },
    disabled: {
      type: Boolean,
      description: 'Disable input text',
    },
    inputRequired: {
      type: Boolean,
      description: 'Required input field',
    },
    numberCaption: {
      type: Boolean,
      description: 'Show number caption input field',
    },
    textContent: {
      type: String,
      description: 'Text content',
    },
  },
  data() {
    return {
      focused: false,
    };
  },
  computed: {
    listeners() {
      return {
        ...this.$listeners,
        input: this.updateValue,
        focus: this.onFocus,
        blur: this.onBlur,
      };
    },
    slotData() {
      return {
        focused: this.focused,
        error: this.error,
        ...this.listeners,
      };
    },
    hasIcon() {
      const { append, prepend } = this.$slots;
      return (
        append !== undefined ||
        prepend !== undefined ||
        this.appendIcon !== undefined ||
        this.prependIcon !== undefined ||
        this.group
      );
    },
  },
  methods: {
    updateValue(evt) {
      let value = evt.target.value;
      this.$emit('input', value);
    },
    onFocus(evt) {
      this.focused = true;
      this.$emit('focus', evt);
    },
    onBlur(evt) {
      this.focused = false;
      this.$emit('blur', evt);
    },
    iconClick() {
      this.$emit('on-icon-click');
    },
  },
};
</script>
<style>
.custom-form-input-label {
  font-family: NotoSansJPBold;
  font-size: 14px !important;
  color: #808080;
  margin: 0;
}

.required-text {
  color: #38497c;
  font-size: 9px;
  margin-left: 8px;
  font-family: NotoSansJPBold;
  margin-bottom: 0;
}

.number-caption-text {
  color: #808080;
  font-size: 9px;
  margin-left: 8px;
  font-family: NotoSansJPBold;
  margin-bottom: 0;
}

.custom-input-class {
  background-color: #f7f8f8 !important;
  height: 32px !important;
  box-shadow: none !important;
  font-size: 12px !important;
  font-family: NotoSansJPRegular;
}
.copy-btn {
  width: 140px;
  height: 27px;
  background-color: #808080;
  color: #ffff;
  border-radius: 13.5px;
  font-size: 14px;
  font-family: NotoSansJPRegular;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
