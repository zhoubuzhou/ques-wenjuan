<template>
  <div class="user-login">
    <el-card style="width: 400px">
      <template #header>
        <h2>用户登录</h2>
      </template>
      <el-form>
        <el-form-item label="用户名">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="login">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { login } from "@/api/users.js";
export default {
  data() {
    return {
      form: {
        username: "root",
        password: "123123",
      },
    };
  },
  methods: {
    async login() {
      //本地存储,local storage(永久)、session storage(会话存储，临时)
      //可以当作两个前端的小型数据库，按照键值对存储
      try {
        const { data } = await login({
          //接口login
          username: this.form.username,
          password: this.form.password,
        });
        console.log(data); //返回密钥 查看是否取值成功
        // window.localStorage.setItem('token',data);//方法1：取名token 保存data数据
        localStorage.token = data; //方法2：简写 当对象用
        this.$message.success("登陆成功");
        this.$router.push({name:'user'})//跳转
      } catch (err) {
        this.$message.error("登陆失败");
        //自动注入弹出小框给用户提示
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.user-login {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>