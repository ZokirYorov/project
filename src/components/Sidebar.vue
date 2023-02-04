<template>
  <div class="left">
    <div class="sidebarIcon">
      <font-awesome-icon style="color: #5396ad" icon="fa-solid fa-spinner"/>
      Sidebar
    </div>
    <div
        class="for"
        v-for="(item, index) of menu"
        :key="index"
    >
      <div
        class="menuItem"
        :class="{active: openRouter=== item.link}"
        @click="$emit('click-router', item.link)"
      >
        <font-awesome-icon class="icons"
            :icon="item.icon"/>
        <span
            class="span"
          v-if="!isCollapsed"
        >
          {{item.label}}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Sidebar",
  props: {
    open: {
      type: String,
      required: true,
    },
    isCollapsed: {
      type: Boolean,
      required: true,
    }
  },
  data(){
    return {
      menu: [
        {
          label: "Business",
          icon: 'fa-solid fa-book',
          link: "/business",
        },
        {
          label: "Position",
          icon: "fa-solid fa-user",
          link: "/position"
        },
        {
          label: "Employee",
          icon: "fa-solid fa-clipboard-list",
          link: "/employee",
        },
        {
          label: 'WareHouse',
          icon: "fa-solid fa-warehouse",
          link: "/wareHouse"
        },
        {
          label: "Room",
          icon: "fa-solid fa-house",
          link: "/room"
        },
        {
          label: "Market",
          icon: "fa-solid fa-shop",
          link: "/market"
        },
        {
          label: "Categories",
          icon: "fa-solid fa-indent",
          link: "/categories"
        },
        {
          label: "Creator",
          icon: "fa-solid fa-clone",
          link: "/creator"
        },
        {
          label: "TagVue",
          icon: "fa-solid fa-tags",
          link: "/tagVue"
        },
        {
          label: "Products",
          icon: "fa-solid fa-apple-whole",
          link: "/products"
        },
        {
          label: "Measure",
          icon: "fa-solid fa-weight-scale",
          link: "/measure"
        },
        {
          label: "Income",
          icon: "fa-solid fa-receipt",
          link: "/income"
        },
        {
          label: "CurrentProduct",
          icon: "fa-solid fa-umbrella",
          link: "/currentProduct"
        },
        {
          label: "OutgoingProduct",
          icon: "fa-solid fa-sheet-plastic",
          link: "/outgoingProduct"
        },
      ]
    }
  },
  computed: {
    openRouter() {
      return this.$route.path
    }
  }
}
</script>

<style scoped>
.left{
  width: 100%;
  background-color: #f8f8f8;
  height: 100%;
}
.icons{
  color: #5396ad;
}
.sidebarIcon{
  height: 60px;
  border-radius: 8px;
  width: 170px;
  margin: 30px;
  display: flex;
  align-items: center;
  overflow: hidden;
  gap: 20px;
  font-size: 22px;
}
.for{
  max-width: 200px;
  position: relative;
  gap: 20px;
  margin: auto;
}
.menuItem{
  padding: 8px;
  font-size: 16px;
  overflow: hidden;
  gap: 10px;
  border-radius: 5px;
}
.menuItem:hover{
  background-color: #a4a9ab;
  cursor:pointer;
  color: white;
}
.span{
  padding-left: 10px;
}
.active{
  background-color: #a4a9ab;
  color: white;
}

</style>