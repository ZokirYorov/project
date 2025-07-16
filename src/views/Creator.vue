<template>
  <el-row class="row">
    <el-col :span="22">
      <h2>Creator</h2>
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
      :show="showDeleteItem"
      @close="showDeleteItem = false"
      body-class="justify-center bg-blue-800 text-center px-4 pb-8"
  >
    <DeleteConfirm
        v-model:show="showDeleteItem"
        title="Ushbu itemni uchirmoqchimisiz?"
        @confirm="deleteFormItem"
    />
  </CDialog>
  <el-row>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="id" label="Id" width="180px"/>
      <el-table-column prop="name" label="Name" width="300px"/>
      <el-table-column prop="code" label="Code" width="300px"/>
      <el-table-column prop="createdDate" label="Data" width="250px"/>
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
  <el-dialog v-model="dialogVisible" title="Creator address">
    <el-form :model="form">
      <el-form-item label="Id">
        <el-input v-model="form.id"/>
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
  name: "Creator",
  components: {DeleteConfirm, CDialog},
  setup() {
    const { getCreator, setCreator } = useStore();
    return { getCreator, setCreator }
  },
  data() {
    return {
      dialogVisible: false,
      showDeleteItem: false,
      selectedItem: null,
      form: {
        index: null,
        id: null,
        name: '',
        code: null,
        createdDate: "",
      },
      tableData: this.getCreator,
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
        let date = new Date();
        this.form.createdDate = date.getDate() + "." + (date.getMonth()+1).toString().padStart(2, '0') + "." + date.getFullYear()
        this.tableData.push(JSON.parse(JSON.stringify(this.form)))
      }
      this.setCreator(this.tableData)
      this.removeDialog()
    },
    editRow(props) {
      const { $index, row } = props;
      this.form = JSON.parse(JSON.stringify(row))
      this.form.index = $index
      this.dialogVisible = true
    },
    deleteRow(props) {
      this.selectedItem = props;
      this.showDeleteItem = true;
    },
    deleteFormItem(){
      if (this.selectedItem !== null) {
        const index = this.tableData.findIndex(item => item.id === this.selectedItem);
        if (index !== 1) {
          this.tableData.splice(index, 1);
        }
        this.setCreator(this.tableData);
        this.showDeleteItem = false;
        this.selectedItem = null;
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