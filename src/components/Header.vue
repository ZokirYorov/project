<template>
  <div class="menu-Icon">
        <font-awesome-icon
            icon="fa-solid fa-bars"
            @click="menuOchilishi()"
            class="icon"
            title="Menu Sidebar"
        />
        <h2 >Header</h2>
  </div>
</template>

<script>
export default {
  name: "Header",
  data(){
    return {

    }
  },
  methods: {
    menuOchilishi() {
      this.$emit('menu-ochilishi')
    }
  }
}
</script>

<style scoped>
.icon{
  width: 24px;
  height: 24px;
  font-size: 20px;
}
.icon:hover{
  color: #5396ad;
  cursor: pointer;
}
.menu-Icon{
  width: 140px;
  display: flex;
  padding-left: 15px;
  font-size: 20px;
  gap: 10px;
  justify-content: space-evenly;
  align-items: center;
}
</style>