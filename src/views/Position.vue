<template>
  <el-row class="rowPosition" style="align-items: center; padding: 0 20px">
    <el-col :span="22">
      <h2>Position</h2>
    </el-col>
    <el-col :span="2">
      <el-button class="elButton"
          type="primary"
        @click="formVisible()"
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
    <el-table class="table" :data="tableData" style="width: 100%">
      <el-table-column class="columnTable" prop="id" label="Id" width="100px"/>
      <el-table-column class="columnTable" prop="name" label="Name" width="300px"/>
      <el-table-column class="columnTable" prop="code" label="Code" width="250px"/>
      <el-table-column class="columnTable" prop="type" label="Type Employee" width="250px"/>
      <el-table-column class="columnTable" prop="createdDate" label="Data" width="150px"/>
      <el-table-column class="columnTable" label="Operations" width="120px">
        <template #default="props">
          <el-button link type="primary" @click="editRow(props)">
            <font-awesome-icon icon="fa-solid fa-pencil"/>
          </el-button>
          <el-button link type="primary" @click="deleteRow(props)">
            <font-awesome-icon icon="fa-solid fa-trash-can"/>
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-row>
  <el-dialog v-model="dialogVisible" title="Position address">
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
      <el-form-item label="Type">
        <el-input v-model="form.type"/>
      </el-form-item>
    </el-form>
    <template #footer>
      <span>
        <el-button
          type="info plain"
          @click="removeForm()"
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
  name: 'Position',
  components: {DeleteConfirm, CDialog},
  setup() {
    const { getPosition, setPosition } = useStore();
    return{ getPosition, setPosition }
  },
  data() {
    return {
      dialogVisible: false,
      confirmDelete: false,
      selectedItems: null,
      form: {
        index: null,
        id: null,
        name: "",
        code: null,
        type: null,
        createdDate: "",
      },
      tableData: this.getPosition,
    }
  },
  methods: {
    formVisible() {
      this.dialogVisible = true;
      this.form = {
        index: null,
        id: null,
        name: "",
        code: null,
        type: null,
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
      this.setPosition(this.tableData);
      this.removeForm()
    },
    removeForm() {
      this.dialogVisible = false;
      this.form = {
        index: null,
        id: null,
        name: "",
        code: null,
        type: null,
        createdDate: "",
      }
    },
    editRow(props) {
      const { $index, row } = props;
      this.form = JSON.parse(JSON.stringify(row))
      this.form.index = $index;
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
        this.setPosition(this.tableData);
        this.confirmDelete = false;
        this.selectedItems = null;
      }
    }
  }
}
</script>
<style>

</style>