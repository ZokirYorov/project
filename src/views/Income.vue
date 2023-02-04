<template>
  <el-row class="row" style="display: flex; align-items: center; justify-content: space-between">
    <el-col :span="22">
      <h2>Income</h2>
    </el-col>
    <el-col :span="2">
      <el-button
          type="primary"
          @click="clickForm()"
      >
        Add
      </el-button>
    </el-col>
  </el-row>
  <el-row>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="id" label="Id" width="50px"/>
      <el-table-column prop="products.name" label="Product Name" width="120px"/>
      <el-table-column prop="price" label="Price" width="100px"/>
      <el-table-column prop="wareHouseId.name" label="WareHouse Name" width="140px"/>
      <el-table-column prop="room.name" label="Room Name" width="110px"/>
      <el-table-column prop="measureId.name" label="Measure Name" width="120px"/>
      <el-table-column prop="value" label="Value" width="80px"/>
      <el-table-column prop="receiverId" label="Receiver Name" width="115px"/>
      <el-table-column prop="deliveryId" label="Delivery Name" width="120px"/>
      <el-table-column prop="incomeDate" label="Income Date" width="100px"/>
      <el-table-column prop="createdDate" label="Date" width="100px"/>
      <el-table-column label="Operations">
        <template #default="props">
          <el-button @click="editRow(props)" link type="primary">
            <font-awesome-icon icon="fa-solid fa-pencil"/>
          </el-button>
          <el-button link type="primary"
                     @click="deleteRow(props)">
            <font-awesome-icon icon="fa-solid fa-trash-can"/>
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-row>
  <el-dialog v-model="dialogClick" title="Income Address">
    <el-form :model="form">
      <el-form-item label="Id">
        <el-input v-model="form.id"/>
      </el-form-item>
      <el-form-item label="Products Name">
        <el-select
            v-model="form.products"
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
        <el-select v-model="form.room"
                   value-key="id"
        >
          <el-option
              v-for="item in getRoom"
              :key="item.id"
              :label="item.name"
              :value="item"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="Measure Name">
        <el-select v-model="form.measureId"
                   value-key="id"
        >
          <el-option
              v-for="item in getMeasure"
              :key="item.id"
              :label="item.name"
              :value="item"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="Value">
        <el-input v-model="form.value"/>
      </el-form-item>
      <el-form-item label="Receiver Name">
        <el-input v-model="form.receiverId"/>
      </el-form-item>
      <el-form-item label="Delivery Name">
        <el-input v-model="form.deliveryId"/>
      </el-form-item>
      <el-form-item label="Income Data">
        <el-input v-model="form.incomeDate"/>
      </el-form-item>
    </el-form>
    <template #footer>
      <span>
        <el-button type="info plain" @click="removeDialog()">
          Cancel
        </el-button>
        <el-button type="primary" @click="saveForm()">
          Save
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import useStore from "../store/store";

export default {
  name: "Income",
  setup() {
    const {getIncome, setIncome, getProducts, setProducts, getWareHouse, setWareHouse, setRoom, getRoom, setMeasure,getMeasure } = useStore();
    return {getIncome, setIncome, getProducts, setProducts, getWareHouse, setWareHouse, setRoom, getRoom, setMeasure,getMeasure}
  },
  data() {
    return{
      dialogClick: false,
      form: {
        index: null,
        id: null,
        products: null,
        price: null,
        wareHouseId: null,
        room: null,
        measureId: null,
        value: null,
        receiverId: null,
        deliveryId: null,
        incomeDate: null,
        createdDate: '',
      },
      tableData: this.getIncome,
      getProducts: this.getProducts,
      getWareHouse: this.getWareHouse,
      getRoom: this.getRoom,
      getMeasure: this.getMeasure,
      month: [1,2,3,4,5,6,7,8,9,10,11,12],
    }
  },
  methods: {

    clickForm(){
      this.dialogClick = true
    },
    saveForm(){
      if (this.form.index !=null) {
        this.tableData[this.form.index] = JSON.parse(JSON.stringify(this.form))
      } else {
        this.form.createdDate = new Date().getDate() + "." + this.month[new Date().getMonth()] + "." + new Date().getFullYear()
        this.tableData.push(JSON.parse(JSON.stringify(this.form)))
      }
      this.setIncome(this.tableData)
      this.removeDialog()
    },
    editRow(props) {
      const {$index, row} = props;
      this.form = JSON.parse(JSON.stringify(row))
      this.form.index = $index
      this.dialogClick = true
    },
    deleteRow(props) {
      const {$index} = props;
      this.tableData.splice($index,1)
      this.setIncome(this.tableData)
    },
    removeDialog() {
      this.dialogClick = false;
      this.form = {
        index: null,
        id: null,
        productsId: null,
        price: null,
        wareHouseId: null,
        room: null,
        measureId: null,
        value: null,
        receiverId: null,
        deliveryId: null,
        incomeDate: null,
        createdDate: '',
      }
    },
  }
}
</script>

<style scoped>
</style>