<template>
  <div>
    <el-card shadow="always" :body-style="{ padding: '20px' }">
      <template #header> 编辑选项</template>

      <el-form ref="form" :model="form" :rules="rules">
        <el-form-item label="选项名" prop="itemname">
          <el-input v-model="form.itemname"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="editItems">保存</el-button>
          <el-button @click="$router.push({ name: 'items_index' })"
            >取消</el-button
          >
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { editItems, editItemsOne } from "@/api/items.js";
export default {
  data() {
    return {
      user: {},
      form: {
        itemname: "",
      },
      rules: {
        //表单验证规则
        itemname: [
          {
            required: true,
            message: "选项名必须填写",
          },
          {
            validator: (rule, value, cb) => {
              if (/^[0-9a-zA-Z]{2,18}$/.test(value)) {
                cb();
              } else {
                cb(new Error("选项名需2-18个字母或数字组合"));
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
          //         cb(new Error("选项名已存在"));
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
    this.getItems();
  },
  methods: {
    async getItems() {
      try {
        const { data } = await editItemsOne(this.$route.params.id);
        this.form.itemname = data.itemname;
      } catch (error) {}
    },
    async editItems() {
      try {
        await this.$refs.form.validate();
        await editItems(this.$route.params.id, {
          itemname: this.form.itemname,
        });
        this.$message.success("编辑成功");
        this.$router.push({ name: "items_index" });
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