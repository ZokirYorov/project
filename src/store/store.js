import { defineStore } from "pinia/dist/pinia";
import { useStorage } from "@vueuse/core";

const useStore = defineStore('store', {
    state: () => ({
        business: useStorage('business', []),
        position: useStorage('position', []),
        employee: useStorage('employee',[]),
        wareHouse: useStorage('wareHouse',[]),
        room: useStorage('room', []),
        market: useStorage('market', []),
        categories: useStorage('categories', []),
        creator: useStorage('creator', []),
        tagVue: useStorage('tagVue', []),
        products: useStorage('products', []),
        measure: useStorage('measure', []),
        income: useStorage('income', []),
        currentProduct: useStorage('currentProduct', []),
        outGoingProduct: useStorage('outGoingProduct', []),
    }),
    getters: {
        getBusiness: (state) => state.business,
        getPosition: (state) => state.position,
        getEmployee: (state) => state.employee,
        getWareHouse: (state) => state.wareHouse,
        getRoom: (state) => state.room,
        getMarket: (state) => state.market,
        getCategories: (state) => state.categories,
        getCreator: (state) => state.creator,
        getTagVue: (state) => state.tagVue,
        getProducts: (state) => state.products,
        getMeasure: (state) => state.measure,
        getIncome: (state) => state.income,
        getCurrentProduct: (state) => state.currentProduct,
        getOutGoingProduct: (state) => state.outGoingProduct,
    },
    actions: {
        setBusiness(business) {
            this.business = business
        },
        setPosition(position) {
            this.position = position
        },
        setEmployee(employee) {
            this.employee = employee
        },
        setWareHouse(wareHouse) {
            this.wareHouse = wareHouse
        },
        setRoom(room) {
            this.room = room
        },
        setMarket(market) {
            this.market = market
        },
        setCategories(categories) {
            this.categories = categories
        },
        setCreator(creator) {
            this.creator = creator
        },
        setTagVue(tagVue) {
            this.tagVue = tagVue
        },
        setProducts(products) {
            this.products = products
        },
        setMeasure(measure) {
            this.measure = measure
        },
        setIncome(income) {
            this.income = income
        },
        setCurrentProduct(currentProduct) {
            this.currentProduct = currentProduct
        },
        setOutGoingProduct(outGoingProduct) {
            this.outGoingProduct = outGoingProduct
        },
    }
})

export default useStore;