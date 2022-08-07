<template>
  <div>
    <el-card shadow="always" :body-style="{ padding: '20px' }">
      <template #header> 编辑用户 </template>

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

        <el-form-item>
          <el-button type="primary" @click="editUser">保存</el-button>
          <el-button @click="$router.push({ name: 'user' })">取消</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { editUser, exist, editForm } from "@/api/users.js";
export default {
  data() {
    return {
      user: {},
      form: {
        gender: "1",
        username: "",
        phone: "",
        email: "",
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
          {
            validator: async (rule, value, cb) => {
              if (this.user.username === value) {
                cb();
                return;
              }
              try {
                const { data } = await exist({ field: "username", value });
                if (data === true) {
                  cb(new Error("用户名已存在"));
                } else {
                  cb();
                }
              } catch (error) {
              
              }
            },
            trigger: "bur",
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
          {
            validator: async (rule, value, cb) => {
              if (this.user.email === value) {
                cb();
                return;
              }
              try {
                const { data } = await exist({ field: "email", value });
                if (data === true) {
                  cb(new Error("邮箱已存在"));
                } else {
                  cb();
                }
              } catch (error) {}
            },
            trigger: "bur",
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
          {
            validator: async (rule, value, cb) => {
              if (this.user.phone === value) {
                cb();
                return;
              }
              try {
                const { data } = await exist({ field: "phone", value });
                if (data === true) {
                  cb(new Error("手机号已存在"));
                } else {
                  cb();
                }
              } catch (error) {}
            },
            trigger: "bur",
          },
        ],
       
      },
    };
  },
  created() {
    this.getuser();
  },
  methods: {
    async getuser() {
      try {
        const { data } = await editForm(this.$route.params.id);
        this.user = data;
        this.form.username = data.username;
        this.form.email = data.email;
        this.form.phone = data.phone;
        this.form.gender = data.gender;
      } catch (error) {}
    },
    async editUser() {
      try {
        await this.$refs.form.validate();
        await editUser(this.$route.params.id, {
          username: this.form.username,
          phone: this.form.phone,
          email: this.form.email,
          gender: this.form.gender,
        });
        this.$message.success("编辑成功");
        this.$router.push({ name: "user" });
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