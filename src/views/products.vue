<template>
  <div>
    <el-row class="row">
      <el-col :span="22">
        <h2>Products</h2>
      </el-col>
      <el-col :span="2">
        <el-button
            type="primary"
          @click="formVisible()"
        >Add</el-button>
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
        <el-table-column prop="id" label="Id" width="100px"/>
        <el-table-column prop="name" label="Name" width="180px"/>
        <el-table-column prop="category.name" label="Categories Name" width="180px"/>
        <el-table-column prop="createdDate" label="Data" width="140px"/>
        <el-table-column prop="data" label="Updated Data" width="150px"/>
        <el-table-column prop="creator.name" label="Creator Name" width="180px"/>
        <el-table-column prop="tagVue.name" label="Tag Name" width="150px"/>
        <el-table-column label="Operations" width="120px">
          <template #default="props">
            <el-button
              link type="primary"
              @click="rowEdit(props)"
            >
              <font-awesome-icon icon="fa-solid fa-pencil"/>
            </el-button>
            <el-button
              link  type="primary"
              @click="rowDelete(props)"
            >
              <font-awesome-icon icon="fa-solid fa-trash-can"/>
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <el-dialog v-model="dialogVisible" title="Products address">
      <el-form :model="form">
        <el-form-item label="Id">
          <el-input v-model="form.id"/>
        </el-form-item>
        <el-form-item label="Name">
          <el-input v-model="form.name"/>
        </el-form-item>
        <el-form-item  label="Categories Name">
          <el-select
              v-model="form.category" value-key="id">
            <el-option
              v-for="item of getCategories"
              :key="item.id"
              :label="item.name"
              :value="item"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="Updated Data">
          <el-input v-model="form.data"/>
        </el-form-item>
        <el-form-item label="Creator Name">
          <el-select
            v-model="form.creator" value-key="id"
          >
            <el-option
              v-for="item in getCreator"
              :key="item.id"
              :label="item.name"
              :value="item"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="Tag Name">
          <el-select v-model="form.tagVue" value-key="id">
            <el-option
              v-for="item in getTagVue"
              :key="item.id"
              :label="item.name"
              :value="item"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <span>
          <el-button type="info plain" @click="dialogVisible=false"
          >
            Cancel
          </el-button>
          <el-button
            type="primary"
            @click="formSaqlash()"
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
  name: "products",
  components: {DeleteConfirm, CDialog},
  setup() {
    const { getProducts, setProducts, getCategories, setCategories, getTagVue, setTagVue, getCreator, setCreator } = useStore();
    return{ getProducts, setProducts, getCategories, setCategories, getTagVue, setTagVue, getCreator, setCreator }
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
        category: null,
        data: null,
        creator: null,
        tagVue: null,
        createdDate: "",
      },
      tableData: this.getProducts,
      getCategories: this.getCategories,
      getTagVue: this.getTagVue,
      getCreator: this.getCreator,
    }
  },
  methods: {
    formVisible() {
      this.dialogVisible = true;
          this.form = {
            index: null,
            id: null,
            name: "",
            category: null,
            data: null,
            creator: null,
            tagVue: null,
            createdDate: "",
          }
          console.log(this.form.creator)
    },
    formSaqlash() {
      if (this.form.index != null) {
        this.tableData[this.form.index] = JSON.parse(JSON.stringify(this.form))
      } else {
        let date = new Date();
        this.form.createdDate = date.getDate() + "." + (date.getMonth() + 1).toString().padStart(2, '0') + "." + date.getFullYear()
        this.tableData.push(JSON.parse(JSON.stringify(this.form)))
      }
      this.setProducts(this.tableData)
      this.dialogVisible = false;
      this.form = {
        index: null,
        id: null,
        name: "",
        creator: null,
        data: null,
        category: null,
        tagVue: null,
        createdDate: "",
      }

    },
    rowEdit(props) {
      const {$index, row } = props;
      this.form = JSON.parse(JSON.stringify(row));
      this.form.index = $index
      this.dialogVisible = true
    },
    rowDelete(props) {
      this.selectedItems = props;
      this.confirmDelete = true;
    },
    deleteConfirm() {
      if (this.selectedItems !== null) {
        const index = this.tableData.findIndex(item => item.id === this.selectedItems);
        if (index !== 1) {
          this.tableData.splice(index, 1);
        }
        this.setProducts(this.tableData)
        this.confirmDelete = false;
        this.selectedItems = null;
      }
    },
    // getAllProducts() {
    //   axios.get('http://localhost:8080/api/product')
    //   .then(({data}) => {
    //     this.tableData = data;
    //   })
    // },
    // getAllCategories() {
    //   axios.get('http://localhost:8080/api/category')
    //   .then(({data}) => {
    //     this.categories = data;
    //   })
    // }
  },
  // mounted() {
  //   this.getAllProducts();
  //   this.getAllCategories();
  // }
}
</script>

<style scoped>
.row{
  padding: 0 10px;
  align-items: center;
}
</style>