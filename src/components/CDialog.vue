<template>
  <Teleport to="body">
    <div
        data-modal="wrapper"
        @click="handleOuterClick"
        :class="[
            'dialog-wrapper',
            show ? 'dialog-visible' : 'dialog-hidden',
            wrapperClass
        ]"
    >
      <Transition name="modal" mode="out-in">
        <div
            v-if="show"
            class="dialog-box"
            :class="customClass ? customClass : 'lg:max-w-xl'"
        >
          <div
              class="dialog-box-item"
              :class="[
              bodyClass,
              { animated: animationIn },
              { 'overflow-y-auto': !isFlow },
            ]"
          >
            <div
                v-if="!noHeader"
                class="boxTitle"
                :class="[headerStyle]"
            >
              <slot name="header">
                <h3
                    :class="titleStyle"
                >
                  {{ title }}
                </h3>
                <button
                    class="btnItem"
                    :class="closeIconClass"
                    @click="$emit('close')"
                >
                  <Icon
                      class="text-black group-hover:text-icon-brand-secondary"
                      icon-name="close"
                  />
                </button>
              </slot>
            </div>
            <button
                v-if="noHeader && hasCloseIcon"
                class="w-8 h-8 border border-field-stroke-secondary cursor-pointer flex items-center justify-center absolute top-3 right-4 rounded-full shrink-0 flex-center transition-300 group active:scale-95 z-40"
                :class="closeIconClass"
                @click="$emit('close')"
            >
              <Icon
                  class="text-black group-hover:text-icon-brand-secondary"
                  icon-name="close"
              />
            </button>
            <slot />
            <slot name="footer" />
          </div>
          <slot name="afterBody" />
        </div>
      </Transition>
    </div>

  </Teleport>
</template>

<script lang="ts" setup>
import { onMounted, ref, watch } from "vue";
import Icon from './Icon.vue';

interface Props {
  show?: boolean;
  isFlow?: boolean;
  title?: string;
  wrapperClass?: string | string[];
  modalClass?: string | string[];
  noHeader?: boolean;
  disableOuterClose?: boolean;
  bodyClass?: string | string[];
  hasCloseIcon?: boolean;
  titleStyle?: string;
  headerStyle?: string;
  customClass?: string;
  closeIconClass?: string;
}

const props = withDefaults(defineProps<Props>(), {
  title: "",
  titleStyle: "",
  headerStyle: "",
  wrapperClass: "",
  bodyClass: "",
  modalClass: "",
});

interface Emits {
  (e: "close"): void;

  (e: "outer-click"): void;
}

const emit = defineEmits<Emits>();
const animationIn = ref(false);

function handleOuterClick(e: Event) {
  const target = e.target as HTMLElement;
  if (target.dataset?.modal == "wrapper") {
    emit("outer-click");
    if (!props.disableOuterClose) {
      emit("close");
    } else {
      animationIn.value = true;
      setTimeout(() => {
        animationIn.value = false;
      }, 500);
    }
  }
}

watch(
    () => props.show,
    (val) => {
      if (val) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "auto";
      }
    }
);
onMounted(() => {
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !props.disableOuterClose) {
      emit("close");
    }
  });
});
</script>

<style scoped>
.dialog-wrapper{
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 5, 5, 0.5);
  z-index: 9999;
  transition: opacity 0.3s ease-in-out;
}
.dialog-hidden{
  opacity: 0;
  visibility: hidden;
}
.dialog-visible{
  opacity: 1;
  visibility: visible;
}
.dialog-box{
  display: flex;
  font-family: sans-serif;
  flex-direction: column;
  align-items: center;
  background-color: white;
  width: 500px;
  padding: 20px 10px;
  gap: 5px;
  border-radius: 10px;
  overflow-y: auto;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
.dialog-box-item{
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.boxTitle{
  width: 100%;
  position: relative;
  .btnItem{
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    width: 34px;
    height: 34px;
    border-radius: 50%;
    z-index: 999;
    cursor:pointer;
    position: absolute;
    top: 4px;
    right: 10px;

  }
}

@keyframes modal {
  from {
    opacity: 0;
    transform: translateY(-40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.modal-enter-active {
  animation: modal 0.3s ease-in-out;
}

.modal-leave-active {
  animation: modal 0.3s ease-in-out reverse;
}

@keyframes mobile-modal {
  from {
    opacity: 0;
    transform: translateY(50%);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.mobile-modal-enter-active {
  animation: mobile-modal 0.5s ease-in-out;
}

.mobile-modal-leave-active {
  animation: mobile-modal 0.5s ease-in-out reverse;
}

.animated {
  animation: horizontal-shaking 0.4s ease-in-out;
}
</style>
