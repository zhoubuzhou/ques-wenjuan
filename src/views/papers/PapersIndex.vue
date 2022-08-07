<template>
  <div>
    <el-card
      shadow="always"
      v-loading="loading"
      :body-style="{ padding: '20px' }">
      <template #header>
        <h2>
          问卷管理
          <el-button
            type="text"
            icon="el-icon-plus"
            @click="$router.push({ name: 'papers_add' })">添加</el-button>
        </h2>
      </template>
      <el-table :data="groups" border stripe>
        <el-table-column prop="papername" label="问卷名" width="150">
        </el-table-column>
        <el-table-column prop="classname" label="班级名" width="150">
        </el-table-column>
        <el-table-column label="操作">
          <template #default="{ row }">
            <el-button type="text" icon="el-icon-delete" @click="del(row._id)">删除</el-button>
            <el-button  type="text"
              icon="el-icon-edit" @click="$router.push({ path: `/papers/edit/${row._id}` })">编辑</el-button>
            <el-button type="text" @click="$router.push({  path: `/papers/answers/add/${row._id}` })">发布</el-button>
            <el-button type="text" @click="$router.push({  path: `/items/edit/${row._id}` })">查看</el-button>
            <!-- 用 query 传参可以解决页面刷新参数消失问题，这种方式可以理解为是 ajax中的 get 方法 -->
            <!-- 可以理解为 ajax 中的 post 请求方式，参数都是不可见的，但是上面两种方法都有一个弊端，就是当页面刷新了是获取不到参数值的 -->
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import { getPapers, delPapers } from "@/api/papers.js";
export default {
  data() {
    return {
      loading: false, //加载
      groups: [],
      searchValue: "",
      searchField: "",
    };
  },
  created() {
    this.getPapers();
  },

  methods: {
    async getPapers() {
      this.loading = true;
      try {
        const { data } = await getPapers();
        this.groups = data.result;
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
        await this.$confirm("此操作将永久删除此问卷, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(async () => {
            this.$message({
              type: "success",
              message: "删除成功!",
            });
            await delPapers(id);
            this.getPapers();
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