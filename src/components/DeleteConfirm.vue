

<template>
  <p>{{props.title}}</p>
  <div class="btnItems">
    <button
        @click="handleConfirm"
        class="buttonItem">
      Ha, o‘chirish
    </button>
    <button
        @click="emit('update:show', false)"
        class="btnItem"
    >
      Bekor qilish
    </button>
  </div>
</template>
<script setup lang="ts">

const props = defineProps<{
  title?: string;
  show?: boolean;
}>()


const emit = defineEmits<{
  (e: 'confirm'): void
  (e: 'update:show', value: boolean): void
}>()

const handleConfirm = () => {
  emit('confirm')
  emit('update:show', false)
}
</script>

<style scoped>
p{
  font-size: 18px;
  font-weight: bold;
}
.btnItems{
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 15px;
  .buttonItem{
    display: flex;
    background-color: red;
    color: white;
    font-weight: bold;
    padding: 10px 15px;
    font-size: 16px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  .buttonItem:hover{
    background-color: #c81d1d;
  }
  .btnItem{
    border: none;
    font-weight: bold;
    font-size: 16px;
    background-color: #D1D5DC;
    color: #25303F;
    cursor: pointer;
    border-radius: 4px;
    padding: 10px 15px;
  }
  .btnItem:hover{
    background-color: #abafb6;
  }
}
</style>
