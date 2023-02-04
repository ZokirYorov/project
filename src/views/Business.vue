<template>
  <el-row class="headerRow" style="align-items: center; padding: 0 20px">
    <el-col :span="22">
      <h2 class="h2">Business</h2>
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
      <el-table-column prop="businessName" label="Business Name" width="300px"/>
      <el-table-column prop="ownerFio" label="Owner FIO" width="300px"/>
      <el-table-column prop="ownerPhone" label="Owner Phone" width="320px"/>
      <el-table-column prop="createdDate" label="Data" width="150px"/>
      <el-table-column label="Operations" width="120px">
        <template #default="props">
          <el-button @click="editRow(props)" link type="primary">
            <font-awesome-icon icon="fa-solid fa-pencil"/>
          </el-button>
          <el-button @click="deleteRow(props)" link type="primary">
            <font-awesome-icon icon="fa-solid fa-trash-can"/>
          </el-button>
        </template>
      </el-table-column>>
    </el-table>
  </el-row>
  <el-dialog v-model="dialogVisible" title="Business Form">
    <el-form :model="form">
      <el-form-item  label="Id" >
        <el-input v-model="form.id"/>
      </el-form-item>
      <el-form-item  label="Business Name">
        <el-input v-model="form.businessName"/>
      </el-form-item>
      <el-form-item  label="Owner Fio">
        <el-input v-model="form.ownerFio"/>
      </el-form-item>
      <el-form-item  label="Owner Phone">
        <el-input v-model="form.ownerPhone"/>
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
 import axios from "axios";

 export default {
   name: 'business',
   setup() {
     const { getBusiness, setBusiness } = useStore();
     return { getBusiness, setBusiness }
   },
   data() {
     return {
       dialogVisible: false,
        form: {
         index: null,
          id: null,
          businessName: '',
          ownerFio: null,
          ownerPhone: null,
          createdDate: "",
        },
       tableData: this.getBusiness,
       getBusiness: this.getBusiness
     }
   },
   methods: {
     // getBusinessList(){
     //   axios.get("http://localhost:8080/api/business")
     //       .then((res) => {
     //         this.tableData  = res.data["content"];
     //       })
     // },
    clickForm() {
      this.dialogVisible = true;
      this.form = {
        index: null,
        id: null,
        businessName: '',
        ownerFio: null,
        ownerPhone: null,
        createdDate: "",
      }
    },
     removeForm() {
      this.dialogVisible = false;
      this.form = {
        index: null,
        id: null,
        businessName: '',
        ownerFio: null,
        ownerPhone: null,
        createdDate: "",
      }
     },
     saveForm() {
        if (this.form.index !=null) {
          this.tableData[this.form.index] = JSON.parse(JSON.stringify(this.form))
        } else {
          this.form.createdDate = new Date().getDate() + "." + new Date().getMonth() + "." + new Date().getFullYear()
          this.tableData.push(JSON.parse(JSON.stringify(this.form)))
        }
        this.setBusiness(this.tableData);
        this.removeForm()
     },
     editRow(props) {
      const {$index, row } = props;
      this.form = JSON.parse(JSON.stringify(row));
      this.form.index = $index;
      this.dialogVisible = true;
     },
     deleteRow(props) {
      const {$index } = props;
      this.tableData.splice($index, 1)
       this.setBusiness(this.tableData);
     }
   },
   // created() {
   //   this.getBusinessList()
   // }
 }
</script>
<style>

</style>
