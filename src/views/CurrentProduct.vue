<template>
  <el-row class="row" style="display: flex;align-items: center">
    <el-col :span="22">
      <h2>Current Product</h2>
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
  <CDialog
      has-close-icon
      :show="currentDelete"
      @close="currentDelete = false"
      body-class="justify-center bg-blue-800 text-center px-4 pb-8"
  >
    <DeleteConfirm
        v-model:show="currentDelete"
        title="Ushbu itemni uchirmoqchimisiz?"
        @confirm="deleteConfirm"
    />
  </CDialog>
  <el-row>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="id" label="Id" width="150px"/>
      <el-table-column prop="products.name" label="Products Name" width="180px"/>
      <el-table-column prop="amount" label="Amount" width="150px"/>
      <el-table-column prop="measureId.name" label="Measure Name" width="180px"/>
      <el-table-column prop="wareHouseId.name" label="WareHouse Name" width="160px"/>
      <el-table-column prop="roomId.name" label="Room Name" width="150px"/>
      <el-table-column prop="createdDate" label="Date" width="100px"/>
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
  <el-dialog v-model="clickDialogVisible" title="Current Address">
    <el-form :model="form">
      <el-form-item label="Id">
        <el-input v-model="form.id"/>
      </el-form-item>
      <el-form-item label="Products Name">
        <el-select v-model="form.products"
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
      <el-form-item label="Amount">
        <el-input v-model="form.amount"/>
      </el-form-item>
      <el-form-item label="Measure Name">
        <el-select v-model="form.measureId"
                   value-key="id"
        >
          <el-option v-for="item in getMeasure"
                     :key="item.id"
                     :label="item.name"
                     :value="item"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="WareHouse Name">
        <el-select v-model="form.wareHouseId"
                   value-key="id"
        >
          <el-option v-for="item in getWareHouse"
                     :key="item.id"
                     :label="item.name"
                     :value="item"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="Room Name">
        <el-select v-model="form.roomId"
                   value-key="id"
        >
          <el-option v-for="item in getRoom"
                     :key="item.id"
                     :label="item.name"
                     :value="item"
          />
        </el-select>
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
import CDialog from "@/components/CDialog.vue";
import DeleteConfirm from "@/components/DeleteConfirm.vue";

export default {
  name: "CurrentProduct",
  components: {DeleteConfirm, CDialog},
  setup() {
    const {getCurrentProduct, setCurrentProduct, getProducts,setProducts, getMeasure, setMeasure, getWareHouse, setWareHouse, getRoom, setRoom} = useStore();
    return {getCurrentProduct, setCurrentProduct, getProducts,setProducts, getMeasure, setMeasure, getWareHouse, setWareHouse, getRoom, setRoom}
  },
  data() {
    return{
      clickDialogVisible: false,
      currentDelete: false,
      selectedCurrent: null,
      form: {
        index: null,
        id: null,
        products: null,
        amount: null,
        measureId: null,
        wareHouseId: null,
        roomId: null,
        createdDate: '',
      },
      tableData: this.getCurrentProduct,
      getProducts: this.getProducts,
      getMeasure: this.getMeasure,
      getWareHouse: this.getWareHouse,
      getRoom: this.getRoom,
    }
  },
  methods: {
    clickForm(){
      this.clickDialogVisible = true
    },
    saveForm() {
      if (this.form.index !==null) {
        this.tableData[this.form.index] = JSON.parse(JSON.stringify(this.form))
      } else {
        let date = new Date();
        this.form.createdDate = date.getDate() + "." + (date.getMonth() + 1).toString().padStart(2, '0') + "." + date.getFullYear()
        this.tableData.push(JSON.parse(JSON.stringify(this.form)))
      }
      this.setCurrentProduct(this.tableData)
      this.clickDialogVisible = false
    },
    editRow(props) {
      const {$index, row} = props;
      this.form = JSON.parse(JSON.stringify(row))
      this.form.index = $index
      this.clickDialogVisible = true
    },
    deleteRow(props) {
      this.selectedCurrent = props;
      this.currentDelete = true;
    },
    deleteConfirm() {
      if (this.selectedCurrent !== null) {
        const index = this.tableData.findIndex(item => item.id === this.selectedCurrent);
        if (index !== 1) {
          this.tableData.splice(index, 1);
        }
        this.setCurrentProduct(this.tableData);
        this.currentDelete = false;
        this.selectedCurrent = null;
      }
    },
    removeDialog() {
      this.clickDialogVisible = false;
      this.form = {
        index: null,
        id: null,
        products: null,
        amount: null,
        measureId: null,
        wareHouseId: null,
        roomId: null,
        createdDate: '',
      }
    }
  }
}
</script>

<style scoped>
</style>