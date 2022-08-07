<template>
  <div>
    <el-card shadow="always" :body-style="{ padding: '20px' }">
      <template #header> 编辑班级 </template>

      <el-form
        ref="form"
        :model="form"
        :rules="rules"
        label-width="80px"
        size="normal"
      >
        <el-form-item label="问卷名">
          <el-input v-model="form.papername" value="name"></el-input>
        </el-form-item>

        <el-form-item label="编辑班级">
          <el-select v-model="form.classname">
            <el-option
              v-for="item in classes"
              :key="item._id"
              :label="item.classname + '班'"
              :value="item.classname">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="选项类型" size="normal">
          <el-tree
            show-checkbox
            default-expand-all
            :data="items"
            ref="itemstree"
            node-key="_id"
            :props="{ label: 'itemname', children: 'children' }"
            @check-change="collectitem">
          </el-tree>
        </el-form-item>

        <el-form-item label="选项大纲" size="normal" v-loading="loading">
          <el-tree
            show-checkbox
            default-expand-all
            :data="outlines"
            ref="outlinestree"
            node-key="_id"
            :props="{ label: 'outlinename', children: 'children' }"
            @check-change="collectoutlines"
          >
          </el-tree>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="add">保存</el-button>
          <el-button @click="$router.push({ name: 'papers_index' })"
            >取消</el-button
          >
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { editPapers, editPapersone } from "@/api/papers.js";
import { getClasses } from "@/api/classes.js";
import { getItems } from "@/api/items.js";
import { getOutlines } from "@/api/outlines.js";

export default {
  data() {
    return {
      user: {},
      classes: [],
      items: [],
      outlines: [],
      data: [],
      form: {
        papername: "",
        classname: "",
        items: [],
        outlines: [],
      },
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
    await this.getClasses();
    await this.getOutlines();
    await this.getItems();
    await this.getPapers();
  },
  methods: {
    async getPapers() {
      const { data } = await editPapersone(this.$route.params.id);
      console.log(data);
      this.form.papername = data.papername;
      this.form.classname = data.classname;
      this.$refs.itemstree.setCheckedNodes(data.items); //建立树节点
      this.$refs.outlinestree.setCheckedNodes(data.outlines);
    },
    async add() {
      try {
        const items = this.form.items.map((el) => {
          return { _id: el._id, itemname: el.itemname };
        });
        const outlines = this.form.outlines.map((el) => {
          return { _id: el._id, outlinename: el.outlinename };
        });
        await this.$refs.form.validate();
        const { data } = await editPapers(
          {
            papername: this.form.papername,
            classname: this.form.classname,
            outlines,
            items,
          },
          this.$route.params.id
        );
        this.$message.success("编辑成功");
        this.$router.push({
          name: "papersIndex",
        });
      } catch (error) {
        this.$message.success("编辑失败");
      }
    },
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
    //no
    collectoutlines(node, flag) {
      if (node.children.length === 0) {
        if (flag) {
          this.form.outlines.push(node);
        } else {
          this.form.outlines.splice(
            this.form.outlines.indexOf(node.outlinename),
            1
          );
        }
      }
    },
    collectitem(node, flag) {
      if (node.children.length === 0) {
        if (flag) {
          this.form.items.push(node);
        } else {
          this.form.items.splice(this.form.items.indexOf(node.items), 1);
        }
      }
    },

    async editPapers() {
      try {
        await this.$refs.form.validate();
        await editPapers(this.$route.params.id, {
          classname: this.form.classname,
        });
        this.$message.success("编辑成功");
        this.$router.push({ name: "classes_index" });
      } catch (error) {
        console.log(error);
        // this.$message.error(error.responsse.data.message);//写这句疯狂报错
      }
    },
  },
};
</script>

<style lang="scss" scoped>
</style>