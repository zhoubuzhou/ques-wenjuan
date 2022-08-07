<template>
  <div v-loading="loading">
    <el-card shadow="always" :body-style="{ padding: '20px' }">
      <template #header>
        <h2>{{ paper.papername }}</h2>
      </template>
      <el-card v-for="(outline, index) in paper.outlines" :key="outline._id">
        <template #header>
          <div>{{ index + 1 }}、{{ outline.outlinename }}</div>
        </template>
        <el-radio-group v-model="outline.answer">
          <el-radio
            v-for="item in paper.items"
            :key="item._id"
            :label="item.itemname"
            >{{ item.itemname }}</el-radio>
        </el-radio-group>
      </el-card>
      <p>
        <el-button type="primary" @click="addAnswers">保存</el-button>
        <el-button @click="$router.push({ name: 'papers_index' })"
          >取消</el-button>
      </p>
    </el-card>
  </div>
</template>

<script>
import { addAnswers } from "@/api/answers.js";
import { editPapersone, getPapers } from "@/api/papers.js";

export default {
  data() {
    return {
      loading: false,
      paper: {},
    };
  },
  created() {
    this.getPapers();
  },

  methods: {
    //添加方法
    async addAnswers() {
      this.loading = true;
      try {
        const { data } = await addAnswers({
          paperId: this.$route.params.id,
          outlines: this.paper.outlines,
          items: this.paper.items,
        });
        this.$message.success("添加成功");
        this.$router.push({ name: "papers_index" });
        this.loading = false;
      } catch (error) {
        this.$message.error(error.response.data.message);
        this.loading = false;
      }
    },

    async getPapers() {
      this.loading = true;
      try {
        const { data } = await editPapersone(this.$route.params.id);
        // console.log(data);//取到有数据的对象
        this.paper = data;
        // console.log(this.paper);//确定获取
        this.loading = false;
      } catch (error) {
        console.log(error);
        this.loading = false;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
</style>