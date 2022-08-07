<template>
  <div>
    <!-- 搜索框 -->
    <div style="margin: 15px" class="inquire">
      <el-input
        placeholder="请输入内容"
        v-model="searchValue"
        style="width: 400px"
        class="input-with-select">
        <!-- searchValue:获取之中的内容，是什么就查询什么 -->
        <el-select
          v-model="searchField"
          style="width: 100px"
          slot="prepend"
          placeholder="请选择"
        >
          <el-option label="手机" value="phone"></el-option>
          <el-option label="邮箱" value="email"></el-option>
          <el-option label="姓名" value="username"></el-option>
        </el-select>
      </el-input>
      <el-button @click="getUsers" slot="append" class="inquire-btn"
        >查询</el-button
      >
      <el-button slot="append" type="primary" @click="refresh">重置</el-button>
    </div>
    <el-card
      shadow="always"
      v-loading="loading"
      :body-style="{ padding: '20px' }"
    >
      <template #header>
        <h2>
          用户管理
          <el-button
            type="text"
            icon="el-icon-plus"
            @click="$router.push({ name: 'user_add' })"
            >添加</el-button
          >
        </h2>
      </template>
      <!-- <div slot="header">
        <span>
          与上层相同 这是老版本用法
        </span>
      </div> -->
      <el-table :data="users" border stripe>
        <el-table-column prop="username" label="姓名" width="100">
        </el-table-column>
        <el-table-column label="性别" width="80">
          <template #default="{ row }">
            {{ ["女", "男"][row.gender] }}
          </template>
        </el-table-column>
        <el-table-column prop="phone" label="手机"> </el-table-column>
        <el-table-column prop="email" label="邮箱"> </el-table-column>
        <el-table-column prop="group" label="权限"> </el-table-column>
        <el-table-column label="创建时间">
          <template v-slot="{ row }">
            <!-- 默认插槽的第二种写法v-slot -->
            {{ dayjs(row.ctime).format("YYYY-MM-DD hh:mm:ss") }}
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template #default="{ row }">
            <!-- 在这之中添加只能用插槽，
            他会自动在之后的每一项中遍历
            加#default表示自定义插槽-->
            <el-button type="text" icon="el-icon-delete" @click="del(row._id)"
              >删除</el-button
            >
            <el-button
              type="text"
              icon="el-icon-edit"
              @click="$router.push({ path: `/user/edit/${row._id}` })"
              >编辑</el-button
            >
            <el-button
              type="text"
              @click="
                $router.push({ name: 'user_group', query: { id: row._id } })
              "
              >权限</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <div style="margin-top: 20px">
        <el-pagination
          @current-change="toPage"
          background
          layout="prev, pager, next"
          :total="count"
          :page-size="3"
        ></el-pagination>
      </div>
    </el-card>
  </div>
</template>

  <script>
import { getUsers, delUser } from "@/api/users.js";
import dayjs from "dayjs";
export default {
  data() {
    return {
      searchField: "",
      searchValue: "",
      loading: false, //加载
      page: 1,
      count: 0, //后端传来的用户个数
      users: [],
    };
  },
  created() {
    this.getUsers();
  },

  methods: {
    //日期时间
    dayjs(value) {
      return dayjs(value);
    },

    async getUsers() {
      this.loading = true;
      try {
        const where = {
          page: this.page,
          perPage: 3,
        };
        if (this.searchField && this.searchValue) {
          where.searchField = this.searchField;
          where.searchValue = this.searchValue;
        }
        const { data } = await getUsers(where);
        this.users = data.result;
        this.count = data.count;
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
        await this.$confirm("此操作将永久删除此用户, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            this.$message({
              type: "success",
              message: "删除成功!",
            });

            delUser(id);
            //刷新
            this.getUsers();
            this.loading = false;
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除",
            });
          });
      } catch (error) {
        this.$message.error("删除失败");
      }
    },

    //分页
    toPage(num) {
      this.page = num;
      this.getUsers();
    },
    //重置刷新
    refresh() {
      this.searchField = "";
      this.searchValue = "";
      this.getUsers();
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