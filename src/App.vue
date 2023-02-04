<script>
import { defineComponent } from "vue";
import Header from "./components/Header.vue";
import Sidebar from './components/Sidebar.vue'

export default defineComponent( {
  components: {
    Header,
    Sidebar,
  },
  data() {
    return{
      openRouterMenu: "business",
      menuToggle: true,
    }
  },
  methods: {
    routerClick(name) {
      this.$router.push(name)
    },
    menuOchilishi() {
      this.menuToggle = !this.menuToggle
    }
  }
})
</script>
<template>
  <div class="container">
    <div
      class="sidebar"
      :style="`width: ${menuToggle ? 250 : 70}px`"
    >
      <Sidebar
        @click-router="routerClick"
        :open="openRouterMenu"
        :isCollapsed="!menuToggle"
      />
    </div>
    <div class="content"
      :style="`width: calc(100% - ${menuToggle ? 250 : 70}px)`"
    >
      <div class="header">
        <Header @menu-ochilishi="menuOchilishi()"/>
      </div>
      <div class="router">
        <router-view/>
      </div>
    </div>
  </div>
</template>

<style scoped>
*{
  padding: 0;
  margin: 0;
}
body{
  width: 100vw;
  height: 100vh;
}
.container{
  width: 100%;
  margin: 0;
  height: 100vh;
  display: flex;
}
.content{
  height: 100%;
  display: flex;
  flex-direction: column;
}
.header {
  width: 100%;
  height: 80px;
  display: flex;
  background-color: #f8f8f8;
  color: #5396ad;
}
.sidebar{
  display: flex;
  flex-direction: column;
}
.router{
  padding: 10px;
  background-color: #eae8e8;
  height: calc(100% - 80px);
}

</style>
