<template>
  <el-row class="row">
    <el-col :span="22">
      <h2>Categories</h2>
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
      body-class="justify-center bg-blue-800 text-center px-4 pb-8"
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
      <el-table-column prop="name" label="Name" width="300px"/>
      <el-table-column prop="wareHouseId.name" label="Parent Name" width="250px"/>
      <el-table-column prop="code" label="Code" width="180px"/>
      <el-table-column prop="createdDate" label="Data" width="200px"/>
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
  <el-dialog v-model="dialogVisible" title="Categories address">
    <el-form :model="form">
      <el-form-item  label="Id">
        <el-input type="number" v-model="form.id"/>
      </el-form-item>
      <el-form-item  label="Name">
        <el-input v-model="form.name"/>
      </el-form-item>
      <el-form-item label="WareHouse Name">
        <el-select
            v-model="form.wareHouseId" value-key="id"
        >
          <el-option
              v-for="item in getWareHouse"
              :key="item.id"
              :label="item.name"
              :value="item"
          />
        </el-select>
      </el-form-item>
      <el-form-item  label="Code">
        <el-input v-model="form.code"/>
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
  name: "Categories",
  components: {DeleteConfirm, CDialog},
  setup() {
    const { getCategories, setCategories, getWareHouse, setWareHouse } = useStore();
    return{ getCategories, setCategories, getWareHouse, setWareHouse }
  },
  data() {
    return {
      dialogVisible: false,
      confirmDelete: false,
      selectedCategory: null,
      form: {
        index: null,
        id: null,
        name: '',
        wareHouseId: null,
        code: null,
        createdDate: "",
      },
      tableData: this.getCategories,
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
        code: null,
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
        code: null,
        createdDate: "",
      };
      this.date = new Date()
    },
    saveForm() {
      if (this.form.index != null) {
        this.tableData[this.form.index] = JSON.parse(JSON.stringify(this.form))
      } else {
        let date = new Date();
        this.form.createdDate = new Date().getDate() + "." + (date.getMonth() + 1).toString().padStart(2, '0')  + "." + date.getFullYear()
        this.tableData.push(JSON.parse(JSON.stringify(this.form)))
      }
      this.dialogVisible = false;
      this.setCategories(this.tableData)
      this.removeForm()
    },
    formEdit(props) {
      const { $index, row } = props;
      this.form = JSON.parse(JSON.stringify(row))
      this.form.index = $index;
      this.dialogVisible = true
    },
    formDelete(props) {
      this.selectedCategory = props;
      this.confirmDelete = true;
    },
    deleteConfirm(){
      if (this.selectedCategory !== null) {
        const index = this.tableData.findIndex(item => item.id === this.selectedCategory);
       if (index !== 1) {
         this.tableData.splice(index, 1);
       }
       this.setCategories(this.tableData)
        this.confirmDelete = false;
       this.selectedCategory = null;
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