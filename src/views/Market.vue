<template>
  <el-row class="row">
    <el-col :span="22">
      <h2>Market</h2>
    </el-col>
    <el-col :span="2">
      <el-button type="primary" @click="clickDialog()">
        Add
      </el-button>
    </el-col>
  </el-row>
  <CDialog
      has-close-icon
      :show="confirmDelete"
      @close="confirmDelete = false"
  >
    <DeleteConfirm
        v-model:show="confirmDelete"
        title="Ushbu itemni uchirmoqchimisiz?"
        @confirm="deleteConfirm"
    />
  </CDialog>
  <el-row>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="id" label="Id" width="150px"/>
      <el-table-column prop="name" label="Name" width="400px"/>
      <el-table-column prop="wareHouseId.name" label="WareHouse Name" width="300px"/>
      <el-table-column prop="createdDate" label="Data" width="220px"/>
      <el-table-column label="Operations" width="120px">
        <template #default="props">
          <el-button link type="primary" @click="formEdit(props)">
            <font-awesome-icon icon="fa-solid fa-pencil"/>
          </el-button>
          <el-button link type="primary" @click="formDelete(props)">
            <font-awesome-icon icon="fa-solid fa-trash-can"/>
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-row>
  <el-dialog v-model="dialogVisible" title="Market address">
    <el-form :model="form">
      <el-form-item label="Id">
        <el-input v-model="form.id"/>
      </el-form-item>
      <el-form-item label="Name">
        <el-input v-model="form.name"/>
      </el-form-item>
      <el-form-item label="WareHouse Name">
        <el-select
            v-model="form.wareHouseId" value-key="id"
        >
          <el-option
              v-for="item of getWareHouse"
              :key="item.id"
              :label="item.name"
              :value="item"
          />
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <span>
        <el-button type="info plain" @click="removeForm()">
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
import CDialog from "@/components/CDialog.vue";
import DeleteConfirm from "@/components/DeleteConfirm.vue";
export default {
  name: "Market",
  components: {DeleteConfirm, CDialog},
  setup() {
    const { getMarket, setMarket, getWareHouse, setWareHouse } = useStore();
    return{ getMarket, setMarket, getWareHouse, setWareHouse }
  },
  data() {
    return {
      dialogVisible: false,
      confirmDelete: false,
      selectedItem: null,
      form: {
        index: null,
        id: null,
        name: '',
        wareHouseId: null,
        createdDate: "",
      },
      tableData: this.getMarket,
      getWareHouse: this.getWareHouse,
    }
  },
  methods: {
    clickDialog() {
      this.dialogVisible = true;
      this.form = {
        index: null,
        id: null,
        name: '',
        wareHouseId: null,
        createdDate: "",
      }
    },
    removeForm() {
      this.dialogVisible = false;
      this.form = {
        index: null,
        id: null,
        name: '',
        wareHouseId: null,
        createdDate: "",
      }
    },
    saveForm() {
      if (this.form.index != null) {
        this.tableData[this.form.index] = JSON.parse(JSON.stringify(this.form))
      } else {
        let date = new Date()
        this.form.createdDate = date.getDate() + "." + (date.getMonth() + 1).toString().padStart(2, '0') + "." + date.getFullYear()
        this.tableData.push(JSON.parse(JSON.stringify(this.form)))
      }
      this.setMarket(this.tableData)
      this.removeForm()
    },
    formEdit(props) {
      const { $index, row } = props;
      this.form = JSON.parse(JSON.stringify(row))
      this.form.index = $index;
      this.dialogVisible = true
    },
    formDelete(props) {
      this.selectedItem = props;
      this.confirmDelete = true;
    },
    deleteConfirm() {
      if (this.selectedItem !== null) {
        const index = this.tableData.findIndex(item => item.id === this.selectedItem);
        if (index !==1) {
          this.tableData.splice(index, 1);
        }
        this.setMarket(this.tableData)
        this.confirmDelete = false;
        this.selectedItem = null;
      }
    }
  }
}
</script>

<style scoped>
.row{
  align-items: center;
}
</style>