<template>
  <div>
    <el-card shadow="always" :body-style="{ padding: '20px' }">
      <template #header> 编辑班级 </template>

      <el-form ref="form" :model="form" :rules="rules">
        <el-form-item label="班级名" prop="classname">
          <el-input v-model="form.classname"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="editClasses">保存</el-button>
          <el-button @click="$router.push({ name: 'classes_index' })">取消</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { editClasses, editClassesOne } from "@/api/classes.js";
export default {
  data() {
    return {
      user: {},
      form: {
        classname: "",
      },
      rules: {
        //表单验证规则
        classname: [
          {
            required: true, //必填
            message: "班级名必须填写", 
          },
          {
            validator: (rule, value, cb) => {
              if (/^[0-9a-zA-Z]{2,8}$/.test(value)) {
                cb();
              } else {
                cb(new Error("班级名需2-18个字母或数字组合"));
              }
            }, //自定义验证规则
          },
          {
            validator: async (rule, value, cb) => {
              if (this.user.classname === value) {
                cb();
                return;
              }
              try {
                const { data } = await exist({ field: "classname", value });
                if (data === true) {
                  cb(new Error("班级名名已存在"));
                } else {
                  cb();
                }
              } catch (error) {
              
              }
            },
            trigger: "bur",
          },
        ], //是一个数组，里面可以包含多个对象，每个对象就是一个规则
       
      },
    };
  },
  created() {
    this.getClasses();
  },
  methods: {
    async getClasses() {
      try {                  
        const { data } = await editClassesOne(this.$route.params.id);
        // this.user = data;
        this.form.classname = data.classname;
      } catch (error) {}
    },
    async editClasses() {
      try {
        await this.$refs.form.validate();
        await editClasses(this.$route.params.id, {
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