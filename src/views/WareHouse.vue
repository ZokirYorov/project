<template>
    <el-row class="row">
      <el-col :span="22">
        <h2>Ware House</h2>
      </el-col>
      <el-col :span="2">
        <el-button
          type="primary"
          @click="clickFormVisible()"
        >
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
      <el-table-column prop="id" label="Id" width="180px" title="Id number"/>
      <el-table-column prop="name" label="Name" width="300px"/>
      <el-table-column prop="code" label="Code" width="300px"/>
      <el-table-column prop="createdDate" label="Data" width="300px"/>
      <el-table-column label="Operations" width="120px">
        <template #default="props">
          <el-button @click="editRow(props)" link type="primary">
            <font-awesome-icon icon="fa-solid fa-pencil"/>
          </el-button>
          <el-button @click="deleteRow(props)" link type="primary">
            <font-awesome-icon icon="fa-solid fa-trash-can"/>
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-row>
  <el-dialog v-model="dialogVisible" title="WareHouse address">
    <el-form :model="form">
      <el-form-item label="Id">
        <el-input type="number" v-model="form.id"/>
      </el-form-item>
      <el-form-item label="Name">
        <el-input v-model="form.name"/>
      </el-form-item>
      <el-form-item label="Code">
        <el-input v-model="form.code"/>
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
import CDialog from "@/components/CDialog.vue";
import DeleteConfirm from "@/components/DeleteConfirm.vue";
export default {
  name: "WareHouse",
  components: {DeleteConfirm, CDialog},
  setup() {
     const { getWareHouse, setWareHouse } = useStore();
     return { getWareHouse, setWareHouse }
  },
  data() {
    return {
      dialogVisible: false,
      confirmDelete: false,
      selectedItems: null,
      form: {
        index: null,
        id: null,
        name: '',
        code: null,
        createdDate: "",
      },
      tableData: this.getWareHouse,

    }
  },
  methods: {
    clickFormVisible() {
      this.dialogVisible = true;
      this.form = {
        index: null,
        id: null,
        name: '',
        code: null,
        createdDate: "",
      }
    },
    saveForm() {
      if (this.form.index != null) {
        this.tableData[this.form.index] =JSON.parse(JSON.stringify(this.form))
      } else {
        let date = new Date()
        this.form.createdDate = date.getDate() + "." + (date.getMonth() + 1).toString().padStart(2, '0') + "." + date.getFullYear()
        this.tableData.push(JSON.parse(JSON.stringify(this.form)))
      }
      this.setWareHouse(this.tableData)
      this.removeDialog()
    },
    editRow(props) {
      const { $index, row } = props;
      this.form = JSON.parse(JSON.stringify(row))
      this.form.index = $index
      this.dialogVisible = true
    },
    deleteRow(props) {
      this.selectedItems = props;
      this.confirmDelete = true;
    },
    deleteConfirm() {
      if (this.selectedItems !== null) {
        const index = this.tableData.findIndex(item => item.id === this.selectedItems);
        if (index !== 1) {
          this.tableData.splice(index, 1);
        }
        this.setWareHouse(this.tableData)
        this.confirmDelete = false;
        this.selectedItems = null;
      }
    },
    removeDialog() {
      this.dialogVisible = false;
      this.form = {
        index: null,
        id: null,
        name: '',
        code: null,
        createdDate: "",
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