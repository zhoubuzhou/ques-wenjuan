<template>
  <div>
    <el-card shadow="always" :body-style="{ padding: '20px' }">
      <template #header> 编辑大纲</template>

      <el-form ref="form" :model="form" :rules="rules">
        <el-form-item label="大纲名" prop="outlinename">
          <el-input v-model="form.outlinename"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="editOutlines">保存</el-button>
          <el-button @click="$router.push({ name: 'outlines_index' })"
            >取消</el-button
          >
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { editOutlines, editOutlinesOne } from "@/api/outlines.js";
export default {
  data() {
    return {
      user: {},
      form: {
        outlinename: "",
      },
      rules: {
        //表单验证规则
        outlinename: [
          {
            required: true,
            message: "大纲名必须填写",
          },
          {
            validator: (rule, value, cb) => {
              if (/^[0-9a-zA-Z]{2,18}$/.test(value)) {
                cb();
              } else {
                cb(new Error("大纲名需2-18个字母或数字组合"));
              }
            },
          },
          // {
          //   validator: async (rule, value, cb) => {
          //     if (this.user.outlinename === value) {
          //       cb();
          //       return;
          //     }
          //     try {
          //       const { data } = await exist({ field: "outlinename", value });
          //       if (data === true) {
          //         cb(new Error("大纲名名已存在"));
          //       } else {
          //         cb();
          //       }
          //     } catch (error) {}
          //   },
          //   trigger: "bur",
          // },
        ],
      },
    };
  },
  created() {
    this.getOutlines();
  },
  methods: {
    async getOutlines() {
      try {
        const { data } = await editOutlinesOne(this.$route.params.id);
        this.form.outlinename = data.outlinename;
      } catch (error) {}
    },
    async editOutlines() {
      try {
        await this.$refs.form.validate();
        await editOutlines(this.$route.params.id, {
          outlinename: this.form.outlinename,
        });
        this.$message.success("编辑成功");
        this.$router.push({ name: "outlines_index" });
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