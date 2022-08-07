<template>
  <div>
    <el-card shadow="always" :body-style="{ padding: '20px' }">
      <template #header> 添加问卷 </template>

      <!-- 用ref获取表单对象 -->
      <el-form ref="form" :model="form" :rules="rules" label-width="80px" size="normal">
        <el-form-item label="问卷名">
          <el-input
            v-model="form.papername"
            value="name"
            placeholder="请输入问卷名称"
          ></el-input>
        </el-form-item>

        <el-form-item label="选择班级">
          <el-select v-model="form.classname" placeholder="请选择班级名称">
            <el-option
              v-for="item in classes"
              :key="item._id"
              :label="item.classname + '班'"
              :value="item.classname"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="选择大纲" size="normal" v-loading="loading">
          <el-tree
            show-checkbox
            default-expand-all
            :data="outlines"
            :props="{ label: 'outlinename', children: 'children' }"
            @check-change="collectoutlines"
          >
          </el-tree>
        </el-form-item>

        <el-form-item label="选择类型">
          <el-tree
            :data="items"
            show-checkbox
            default-expand-all
            :props="{ label: 'itemname', children: 'children' }"
            @check-change="collectitem"
          >
          </el-tree>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="addPapers">保存</el-button>
          <el-button @click="$router.push({ name: 'papers_index' })"
            >取消</el-button
          >
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { addPapers } from "@/api/papers.js";
import { getClasses } from "@/api/classes.js";
import { getItems } from "@/api/items.js";
import { getOutlines } from "@/api/outlines.js";

export default {
  data() {
    return {
      data: [],
      classes: [],
      outlines: [],
      items: [],
      form: {
        papername: "",
        classname: "",
        items: [],
        outlines: [],
      },
      loading: false,
      rules: {
        //表单验证规则
        papername: [
          {
            required: true, //必填
            message: "问卷名必须填写", //错误信息
            trigger: "blur",
          },
          {
            validator: (rule, value, cb) => {
              if (/^[0-9a-zA-Z]{2,6}$/.test(value)) {
                cb();
              } else {
                cb(new Error("问卷名需2-18个字母或数字组合"));
              }
            },
          },
        ],
      },
    };
  },
  async created() {
    //获取
    await this.getClasses();
    await this.getOutlines();
    await this.getItems();
  },

  methods: {
    //获取班级
    async getClasses() {
      this.loading = true;
      try {
        const { data } = await getClasses();
        this.classes = data.result;
        this.loading = false;
      } catch (error) {
        this.loading = false;
      }
    },
    //获取选项
    async getItems() {
      this.loading = true;
      try {
        const { data } = await getItems();
        this.items = data;
        this.loading = false;
      } catch (error) {
        this.loading = false;
      }
    },
    //获取大纲
    async getOutlines() {
      this.loading = true;
      try {
        const { data } = await getOutlines();
        this.outlines = data;
        this.loading = false;
      } catch (error) {
        this.loading = false;
      }
    },
    //添加方法
    async addPapers() {
      try {
        await this.$refs.form.validate();
        const { data } = await addPapers(this.form);
        this.$message.success("添加成功");
        this.$router.push({ name: "papers_index" });
      } catch (error) {
        this.$message.error(error.response.data.message);
      }
    },
    //多看
    collectitem(node, flag) {
      if (node.children.length) {
        return;
      }
      if (flag) {
        this.form.items.push({
          _id: node._id,
          itemname: node.itemname,
        });
      } else {
        const pos = this.form.items.findIndex((el) => el.id === node._id);
        this.form.items.splice(pos, 1);
      }
    },
    collectoutlines(node, flag) {
      if (node.children.length) {
        return;
      }
      if (flag) {
        this.form.outlines.push({
          _id: node._id,
          outlinename: node.outlinename,
        });
      } else {
        const pos = this.form.outlines.findIndex((el) => el.id === node._id);
        this.form.outlines.splice(pos, 1);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
</style>