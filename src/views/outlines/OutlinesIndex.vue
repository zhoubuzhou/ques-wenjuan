<template>
  <div>
    <el-card
      shadow="always"
      v-loading="loading"
      :body-style="{ padding: '20px' }"
    >
      <template #header>
        <h2>
          大纲管理
          <el-button
            type="text"
            icon="el-icon-plus"
            @click="$router.push({ name: 'outlines_add' })"
            >添加</el-button
          >
        </h2>
      </template>
      <div class="custom-tree-container">
        <div class="block">
          <el-tree :data="data" :props="form">
            <span class="custom-tree-node" slot-scope="{ node, data }">
              <span>{{ node.label }}</span>
              <span>
                <el-button
                  type="text"
                  @click="
                    $router.push({
                      name: 'outlines_add',
                      query: { id: data._id },})">
                      <!-- 传递当前行的id -->
                  添加子节点
                </el-button>
                <el-button
                  type="text"
                  @click="$router.push({ path: `/outlines/edit/${data._id}` })">
                  编辑
                </el-button>
                <el-button type="text" @click="del(data._id)"> 删除 </el-button>
              </span>
            </span>
          </el-tree>
        </div>
      </div>
    </el-card>
  </div>
</template>

  <script>
import { getOutlines, delOutlines } from "@/api/outlines.js";
export default {
  data() {
    return {
      loading: false, //加载
      data: [],
      form: {
        children: "children",
        label: "outlinename",
      },
    };
  },
  created() {
    this.getOutlines();
  },

  methods: {
    getOutlines(data) {
      console.log(data);
    },

    async getOutlines() {
      this.loading = true;
      try {
        const { data } = await getOutlines();
        this.data = data;
        this.loading = false;
      } catch (error) {
        this.loading = false;
      }
    },

    //删除
    async del(id) {
      this.loading = true;
      try {
        //弹框
        await this.$confirm("此操作将永久删除此大纲, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(async() => {
            this.$message({
              type: "success",
              message: "删除成功!",
            });
            await delOutlines(id);
            this.getOutlines();
            this.loading = false;
            
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除",
            });
            this.loading = false;
          });
      } catch (error) {
        this.$message.error("删除失败");
      }
    },
  },
};
</script>

<style lang="scss">
.inquire-btn {
  margin-left: 10px;
}
.el-input-group__prepend {
  background-color: #ffffff;
}
</style>