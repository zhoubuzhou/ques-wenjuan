<template>
  <div>
    <el-card shadow="always" :body-style="{ padding: '20px' }">
      <template #header> 添加班级 </template>

      <!-- 用ref获取表单对象 -->
      <el-form ref="form" :model="form" :rules="rules">
        <el-form-item label="班级名" prop="classname">
          <el-input v-model="form.classname"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="addClasses">保存</el-button>
          <el-button @click="$router.push({name:'classes_index'})">取消</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { addClasses } from "@/api/classes.js";
export default {
  data() {
    return {
      form: {
      },
      rules: {
        //表单验证规则
        classname: [
          {
            required: true, //必填
            message: "班级名必须填写", //错误信息
            trigger:'blur'
          },
          {
            validator: (rule, value, cb) => {
              if (/^[0-9a-zA-Z]{2,6}$/.test(value)) {
                cb();
              } else {
                cb(new Error("班级名需2-18个字母或数字组合"));
              }
            }, 
          },
        ],
      },
    };
  },
  methods: {
    async addClasses() {
      try {
        await this.$refs.form.validate(); //点击保存时再次校验全部代码
        //validate返回parmise，有错误执行catch，无错继续往下执行
        const { data } = await addClasses({
          classname: this.form.classname,
          ctime: this.form.ctime,
        });
        this.$message.success("添加成功");
        this.$router.push({
            name:'classes_index'
        })
      } catch (error) {
        this.$message.error(error.response.data.message);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
</style>