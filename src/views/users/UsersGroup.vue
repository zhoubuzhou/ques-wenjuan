<template>
  <div>
    <el-card>
      <template #header>设置权限</template>
      <el-form>
        <el-form-item label="分组">
          <el-checkbox-group v-model="gvalue">
            <el-checkbox v-for="v in groups" :key="v" :label="v">{{
              v
            }}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="setGroups">保存</el-button>
          <el-button @click="$router.push({ name: 'user' })">取消</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { getPolicies } from "@/api/policies.js";
import { setGroups } from "@/api/users.js";
export default {
  data() {
    return {
      gvalue: [],
      groups: [],
    };
  },
  created() {
    this.getPolicies();
  },
  methods: {
    async setGroups() {
      try {
        await setGroups(this.$route.query.id, { group: this.gvalue });
        this.$router.push({name:'user'});
      } catch (error) {}
    },
    async getPolicies() {
      try {
        const { data } = await getPolicies();
        this.groups = data;
      } catch (error) {}
    },
  },
};
</script>

<style lang="scss" scoped>
</style>