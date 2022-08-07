<template>
  <div>
    <el-card shadow="always" :body-style="{ padding: '20px' }">
      <template #header> 添加选项 </template>

      <!-- 用ref获取表单对象 -->
      <el-form ref="form" :model="form" :rules="rules">
        <el-form-item label="选项名" prop="itemname">
          <el-input v-model="form.itemname"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="addItems">保存</el-button>
          <el-button @click="$router.push({ name: 'items_index' })"
            >取消</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { addItems } from "@/api/items.js";
export default {
  data() {
    return {
      form: {},
      rules: {
        //表单验证规则
        itemname: [
          {
            required: true, //必填
            message: "选项名必须填写", //错误信息
            // trigger: "blur",
          },
          {
            validator: (rule, value, cb) => {
              if (/^.{2,18}$/.test(value)) {
                cb();
              } else {
                cb(new Error("选项名需2-18个字母或数字组合"));
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
    async addItems() {
      try {
        await this.$refs.form.validate(); //点击保存时再次校验全部代码
        if (this.$route.query.id) {
          this.form.pid = this.$route.query.id;
        }
        const { data } = await addItems(this.form);

        this.$message.success("添加成功");
        this.$router.push({
          name: "items_index",
        });
      } catch (error) {
        // this.$message.error(error.response.data.message);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
</style>