<template>
  <el-row class="row" style="display: flex; align-items: center">
    <el-col :span="22">
      <h2>Outgoing Product</h2>
    </el-col>
    <el-col :span="2">
      <el-button
          type="primary"
          @click="dialogClickVisible()"
      >
        Add
      </el-button>
    </el-col>
  </el-row>
  <el-row>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="id" label="Id" width="80px"/>
      <el-table-column prop="productsId.name" label="Products Name" width="120px"/>
      <el-table-column prop="price" label="Price" width="75px"/>
      <el-table-column prop="wareHouseId.name" label="WareHouse Name" width="135px"/>
      <el-table-column prop="roomId.name" label="Room Name" width="100px"/>
      <el-table-column prop="market.name" label="Magazine Name" width="125px"/>
      <el-table-column prop="measureId.name" label="Measure Name" width="120px"/>
      <el-table-column prop="value" label="Value" width="100px"/>
      <el-table-column prop="seller" label="Seller" width="90px"/>
      <el-table-column prop="sellData" label="Sell Date" width="90px"/>
      <el-table-column prop="createdDate" label="Date" width="80px"/>
      <el-table-column label="Operations">
        <template #default="props">
          <el-button
              link type="primary"
              @click="editRow(props)"
          >
            <font-awesome-icon icon="fa-solid fa-pencil"/>
          </el-button>
          <el-button link type="primary"
                     @click="deleteRow(props)"
          >
            <font-awesome-icon icon="fa-solid fa-trash-can"/>
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-row>


  <el-dialog v-model="dialogVisible" title="Outgoing Address">
    <el-form :model="form">
      <el-form-item label="Id">
        <el-input v-model="form.id"/>
      </el-form-item>
      <el-form-item label="Products Name">
        <el-select v-model="form.productsId"
                   value-key="id"
        >
          <el-option
              v-for="item in getProducts"
              :key="item.id"
              :label="item.name"
              :value="item"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="Price">
        <el-input v-model="form.price"/>
      </el-form-item>
      <el-form-item label="WareHouse Name">
        <el-select v-model="form.wareHouseId"
                   value-key="id"
        >
          <el-option
              v-for="item in getWareHouse"
              :key="item.id"
              :label="item.name"
              :value="item"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="Room Name">
        <el-select v-model="form.roomId" value-key="id">
          <el-option
              v-for="item in getRoom"
              :key="item.id"
              :label="item.name"
              :value="item"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="Magazine Name">
        <el-select v-model="form.market" value-key="id">
          <el-option v-for="item in getMarket"
                     :key="item.id"
                     :label="item.name"
                     :value="item"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="Measure Name">
        <el-select v-model="form.measureId" value-key="id">
          <el-option v-for="item in getMeasure"
                     :key="item.id"
                     :label="item.name"
                     :value="item"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="Value">
        <el-input v-model="form.value"/>
      </el-form-item>
      <el-form-item label="Seller Name">
        <el-input v-model="form.seller"/>
      </el-form-item>
      <el-form-item label="Sell Data">
        <el-input v-model="form.sellData"/>
      </el-form-item>
    </el-form>
    <template #footer>
      <span>
        <el-button
            type="info plain"
            @click="removeDialog()"
        >
          Cancel
        </el-button>
        <el-button
            type="primary"
            @click="saveForm()"
        >
          Save
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import useStore from "../store/store";

export default {
  name: "OutgoingProduct",
  setup() {
    const {getOutGoingProduct, setOutGoingProduct, getProducts, setProducts, getWareHouse, setWareHouse, getRoom,setRoom, getMeasure, setMeasure, getMarket, setMarket} = useStore()
    return{getOutGoingProduct, setOutGoingProduct, getProducts, setProducts, getWareHouse, setWareHouse, getRoom,setRoom, getMeasure, setMeasure, getMarket, setMarket}
  },
  data() {
    return{
      dialogVisible: false,
      form: {
        index: null,
        id: null,
        productsId: null,
        price: null,
        wareHouseId: null,
        roomId: null,
        market: null,
        measureId: null,
        value: null,
        seller: null,
        sellData: null,
        createdDate: '',
      },
      tableData: this.getOutGoingProduct,
      getProducts: this.getProducts,
      getWareHouse: this.getWareHouse,
      getRoom: this.getRoom,
      getMeasure: this.getMeasure,
      getMarket: this.getMarket
    }
  },
  methods: {
    dialogClickVisible() {
      this.dialogVisible = true
    },
    saveForm() {
      if (this.form.index !=null) {
        this.tableData[this.form.index] = JSON.parse(JSON.stringify(this.form))
      } else {
        this.form.createdDate = new Date().getDate() + "." + new Date().getMonth() + "." + new Date().getFullYear()
        this.tableData.push(JSON.parse(JSON.stringify(this.form)))
      }
      this.setOutGoingProduct(this.tableData)
      this.dialogVisible = false
    },
    editRow(props) {
      const {$index, row} = props;
      this.form = JSON.parse(JSON.stringify(row))
      this.form.index = $index
      this.dialogVisible = true
    },
    deleteRow(props) {
      const {$index} = props;
      this.tableData.splice($index,1)
      this.setOutGoingProduct(this.tableData)
    },
    removeDialog() {
      this.dialogVisible = false;
      this.form = {
        index: null,
        id: null,
        productsId: null,
        price: null,
        wareHouseId: null,
        roomId: null,
        market: null,
        measureId: null,
        value: null,
        seller: null,
        sellData: null,
        createdDate: '',
      }
    }
  }
}
</script>

<style scoped>
</style>