<template>
  <div class="table">
    <el-row class="row">
      <el-col :span="22">
        <h2 style="padding-left: 10px">Employee</h2>
      </el-col>
      <el-col :span="2">
        <el-button
          type="primary"
          @click="clickForm()"
        >Add</el-button>
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
        <el-table-column prop="id" label="Id" width="50px"/>
        <el-table-column prop="fio" label="FIO" width="180px"/>
        <el-table-column prop="phoneNumber" label="Phone Number" width="150px"/>
        <el-table-column prop="documentNumber" label="Document Number" width="150px"/>
        <el-table-column prop="gender" label="Gender" width="150px"/>
        <el-table-column prop="birthdate" label="Birth Date" width="150px"/>
        <el-table-column prop="position.name" label="Position Name" width="130px"/>
        <el-table-column prop="createdDate" label="Data" width="125px"/>
        <el-table-column label="Operations" width="120px">
          <template #default="props">
            <el-button
                link type="primary"
              @click="rowEdit(props)"
            >
              <font-awesome-icon icon="fa-pencil"/>
            </el-button>
            <el-button
              link type="primary"
              @click="rowDelete(props)"
            >
              <font-awesome-icon icon="fa-trash-can"/>
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <el-dialog v-model="formVisible" title="Employee address">
      <el-form :model="form">
        <el-form-item  label="Id">
          <el-input v-model="form.id" autocomplete="off"/>
        </el-form-item>
        <el-form-item  label="FIO">
          <el-input v-model="form.fio"/>
        </el-form-item>
        <el-form-item  label="Phone Number">
          <el-input v-model="form.phoneNumber"/>
        </el-form-item>
        <el-form-item  label="Document Number">
          <el-input v-model="form.documentNumber"/>
        </el-form-item>
        <el-form-item  label="Gender">
          <el-input v-model="form.gender"/>
        </el-form-item>
        <el-form-item  label="Birth Date">
          <el-input v-model="form.birthdate"/>
        </el-form-item>
        <el-form-item label="Position Name">
          <el-select v-model="form.position"
                     value-key="id"
          >
            <el-option
              v-for="item in getPosition"
              :key="item.name"
              :label="item.name"
              :value="item"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <span>
          <el-button type="info plain"
            @click="formVisible = false"
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
  </div>
</template>
<script>
import useStore from "../store/store";
import CDialog from "@/components/CDialog.vue";
import DeleteConfirm from "@/components/DeleteConfirm.vue";

export default {
  name: 'Employee',
  components: {DeleteConfirm, CDialog},
  setup() {
    const { getEmployee, setEmployee, getPosition, setPosition } = useStore();
    return { getEmployee, setEmployee, getPosition, setPosition };
  },
  data() {
    return {
      formVisible: false,
      confirmDelete: false,
      selectedEmployee: null,
      form: {
        index: null,
        id: null,
        fio: "",
        phoneNumber: null,
        documentNumber: null,
        gender: null,
        birthdate: null,
        position: null,
        createdDate: "",
      },
      tableData: this.getEmployee,
      getPosition: this.getPosition,
    }
  },
  methods: {
    clickForm() {
      this.formVisible = true
      this.form = {
        index: null,
        id: null,
        fio: "",
        phoneNumber: null,
        documentNumber: null,
        gender: null,
        birthdate: null,
        position: null,
        createdDate: "",
      }
    },
    saveForm() {
      if (!this.form.id && !this.form.fio && !this.form.phoneNumber && !this.form.documentNumber && !this.form.birthdate && !this.form.gender) {
        alert('Fill in the field')
        this.formVisible = false;
      } else {
        if (this.form.index != null) {
          this.tableData[this.form.index] = JSON.parse(JSON.stringify(this.form))
        } else {
          let date = new Date();
          this.form.createdDate = date.getDate() + "." + (date.getMonth() + 1).toString().padStart(2, '0') + "." + date.getFullYear()
          this.tableData.push(JSON.parse(JSON.stringify(this.form)))
        }
        this.setEmployee(this.tableData);
        this.form ={
          index: null,
          id: '',
          fio: "",
          phoneNumber: null,
          documentNumber: null,
          gender: null,
          birthdate: null,
          position: null,
          createdDate: "",
        };
        this.formVisible = false
      }

    },
    rowEdit(props) {
      const {$index, row } = props;
      this.form = JSON.parse(JSON.stringify(row));
      this.form.index = $index;
      this.formVisible = true;
    },
    rowDelete(props) {
      this.selectedEmployee = props;
      this.confirmDelete = true;
    },
    deleteConfirm() {
      if (this.selectedEmployee !== null) {
        const index = this.tableData.findIndex(item => item.id === this.selectedEmployee);
        if (index !==1 ){
          this.tableData.splice(index, 1);
        }
        this.setEmployee(this.tableData);
        this.confirmDelete = false;
        this.selectedEmployee = null;
      }
    }
  },
}
</script>

<style scoped>
.row{
  align-items: center;
}
</style>
