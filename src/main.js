import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { createPinia } from 'pinia/dist/pinia'
import App from './App.vue'
import position from "./views/Position.vue"
import business from "./views/Business.vue"
import employee from "./views/Employee.vue"
import wareHouse from "./views/WareHouse.vue";
import room from "./views/Room.vue";
import market from "./views/Market.vue";
import categories from "./views/Categories.vue";
import creator from "./views/Creator.vue";
import tagVue from "./views/TagVue.vue";
import products from "./views/products.vue";
import measure from "./views/Measure.vue";
import income from "./views/Income.vue";
import currentProduct from "./views/CurrentProduct.vue";
import outgoingProduct from "./views/OutgoingProduct.vue";
import {createRouter, createWebHashHistory} from "vue-router/dist/vue-router";
import { library} from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import {  faUserSecret,
    faBars,faSpinner,faBook,faUserGear,faClipboardList,faUser,faAppleWhole,faTrashArrowUp, faTrashCan, faPencil,faWarehouse,
    faHouse,faShop,faIndent,faClone,faTags,faWeightScale,faReceipt,faUmbrella,faSheetPlastic
} from '@fortawesome/free-solid-svg-icons'

library.add(faUserSecret)
library.add(faBars,faSpinner,faBook,faUserGear,faClipboardList,faUser,faAppleWhole,
    faTrashArrowUp,faTrashCan,faPencil,faWarehouse,faHouse,
    faShop,faIndent,faClone,faTags,faWeightScale,faReceipt,faUmbrella,faSheetPlastic)

const pinia = createPinia();
const routes = [
    {
        name: "Main",
        path: "/",
        redirect: "/business",
    },
    {
        name:"BusinessPage",
        path: "/business",
        component: business,
    },
    {
        name: "PositionPage",
        path: "/position",
        component: position,
    },
    {
        name: "EmployeePage",
        path: "/employee",
        component: employee,
    },
    {
        name: "WareHousePage",
        path: "/wareHouse",
        component: wareHouse,
    },
    {
        name: "RoomPage",
        path: "/room",
        component: room,
    },
    {
        name: "MarketPage",
        path: "/market",
        component: market,
    },
    {
        name: "CategoriesPage",
        path: "/categories",
        component: categories,
    },
    {
        name: "CreatorPage",
        path: "/creator",
        component: creator,
    },
    {
        name: "TagVuePage",
        path: "/tagVue",
        component: tagVue,
    },
    {
        name: "productsPage",
        path: "/products",
        component: products,
    },
    {
        name: "MeasurePage",
        path: "/measure",
        component: measure,
    },
    {
        name: "IncomePage",
        path: "/income",
        component: income,
    },
    {
        name: "CurrentProductPage",
        path: "/currentProduct",
        component: currentProduct,
    },
    {
        name: "OutgoingProductPage",
        path: "/outgoingProduct",
        component: outgoingProduct,
    },
]

const router = createRouter( {
    history: createWebHashHistory(),
    routes,
})
createApp(App)
    .component('font-awesome-icon',FontAwesomeIcon )
    .use(router)
    .use(ElementPlus)
    .use(pinia)
    .mount('#app')
