<template>
  <div>
    <el-card shadow="always" :body-style="{ padding: '20px' }">
      <template #header> 添加大纲 </template>

      <!-- 用ref获取表单对象 -->
      <el-form ref="form" :model="form" :rules="rules">
        <el-form-item label="大纲名" prop="outlinename">
          <el-input v-model="form.outlinename"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="addOutlines">保存</el-button>
          <el-button @click="$router.push({ name: 'outlines_index' })"
            >取消</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { addOutlines } from "@/api/outlines.js";
export default {
  data() {
    return {
      form: {},
      rules: {
        //表单验证规则
        outlinename: [
          {
            required: true, //必填
            message: "大纲名必须填写", //错误信息
            trigger: "blur",
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
        ],
      },
    };
  },
  created() {
    // console.dir(this.form.pid);
  },
  methods: {
    async addOutlines() {
      try {
        await this.$refs.form.validate(); //点击保存时再次校验全部代码
        if (this.$route.query.id) {
          this.form.pid = this.$route.query.id;
        }
        const { data } = await addOutlines(this.form);

        this.$message.success("添加成功");
        this.$router.push({
          name: "outlines_index",
        });
      } catch (error) {
        this.$message.error(error.response.data.message);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
</style>