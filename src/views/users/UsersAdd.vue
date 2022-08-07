<template>
  <div>
    <el-card shadow="always" :body-style="{ padding: '20px' }">
      <template #header> 添加用户 </template>

      <!-- 用ref获取表单对象 -->
      <el-form ref="form" :model="form" :rules="rules">
        <el-form-item label="用户名" prop="username">
          <!-- 写prop表示此数据参与验证，不写不参与 -->
          <el-input v-model="form.username"></el-input>
        </el-form-item>

        <el-form-item label="性别">
          <el-radio-group v-model="form.gender">
            <el-radio label="1">男</el-radio> 
            <el-radio label="0">女</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="手机" prop="phone">
          <el-input v-model="form.phone"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="form.email"></el-input>
        </el-form-item>

        <el-form-item label="密码" prop="password">
          <el-input v-model="form.password"></el-input>
        </el-form-item>
        <el-form-item label="再次输入密码" prop="confirmPassword">
          <el-input v-model="form.confirmPassword"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="addUser">保存</el-button>
          <!-- @click="addUser"并非导入的addUser -->
          <el-button @click="$router.push({name:'user'})">取消</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { addUser } from "@/api/users.js";
export default {
  data() {
    return {
      form: {
        gender: "1",
      },
      rules: {
        //表单验证规则
        username: [
          {
            required: true, //必填
            message: "用户名必须填写", //错误信息
            // trigger:'blur'//何时触发
          },
          {
            validator: (rule, value, cb) => {
              if (/^[0-9a-zA-Z]{2,18}$/.test(value)) {
                cb();
              } else {
                cb(new Error("用户名需2-18个字母或数字组合"));
              }
            }, //自定义验证规则
          },
        ], //是一个数组，里面可以包含多个对象，每个对象就是一个规则
        email: [
          {
            required: true,
            message: "邮箱必须填写",
          },
          {
            validator: (rule, value, cb) => {
              if (/^\w+@\w+\.com$/.test(value)) {
                cb();
              } else {
                cb(new Error("邮箱格式错误"));
              }
            },
          },
        ],
        phone: [
          {
            required: true,
            message: "手机号必须填写",
          },
          {
            validator: (rule, value, cb) => {
              if (/^1[345678]\d{9}$/.test(value)) {
                cb();
              } else {
                cb(new Error("手机格式错误"));
              }
            },
          },
        ],
        password: [
          {
            required: true,
            message: "密码必须填写",
          },
          {
            validator: (rule, value, cb) => {
              if (/^\w{6,16}$/.test(value)) {
                cb();
              } else {
                cb(new Error("密码必须6-16位任意字符拼接"));
              }
            },
          },
        ],
        confirmPassword: [
          {
            required: true,
            message: "密码必须填写",
          },
          {
            validator: (rule, value, cb) => {
              if (this.form.password === value) {
                cb();
              } else {
                cb(new Error("两次密码输入不一致"));
              }
            },
          },
        ],
      },
    };
  },
  methods: {
    async addUser() {
      try {
        await this.$refs.form.validate(); //点击保存时再次校验全部代码
        //validate返回parmise，有错误执行catch，无错继续往下执行
        const { data } = await addUser({
          username: this.form.username,
          phone: this.form.phone,
          email: this.form.email,
          password: this.form.password,
          gender: this.form.gender,
        });
        console.log(data);
        this.$message.success("添加成功");
        this.$router.push({
            name:'user'
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