<template>
  <el-row class="row">
    <el-col :span="22">
      <h2>Measure</h2>
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
  <el-row>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="id" label="Id" width="180px"/>
      <el-table-column prop="name" label="Name" width="300px"/>
      <el-table-column prop="code" label="Code" width="400px"/>
      <el-table-column prop="createdDate" label="Data" width="200px"/>
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
  <el-dialog v-model="dialogVisible" title="Measure address">
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

export default {
  name: "Measure",
  setup() {
    const { getMeasure, setMeasure } = useStore();
    return { getMeasure, setMeasure }
  },
  data() {
    return {
      dialogVisible: false,
      form: {
        index: null,
        id: null,
        name: '',
        code: null,
        createdDate: '',
      },
      tableData: this.getMeasure,
      month: [1,2,3,4,5,6,7,8,9,10,11,12],
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
        createdDate: '',
      }
    },
    saveForm() {
      if (this.form.index != null) {
        this.tableData[this.form.index] =JSON.parse(JSON.stringify(this.form))
      } else {
        this.form.createdDate = new Date().getDate() + "." + this.month[new Date().getMonth()] + "." + new Date().getFullYear()
        this.tableData.push(JSON.parse(JSON.stringify(this.form)))
      }
      this.setMeasure(this.tableData)
      this.removeDialog()
    },
    editRow(props) {
      const { $index, row } = props;
      this.form = JSON.parse(JSON.stringify(row))
      this.form.index = $index
      this.dialogVisible = true
    },
    deleteRow(props) {
      const { $index } = props;
      this.tableData.splice($index,1)
      this.setMeasure(this.tableData)
    },
    removeDialog() {
      this.dialogVisible = false;
      this.form = {
        index: null,
        id: null,
        name: '',
        code: null,
        createdDate: '',
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