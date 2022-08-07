<template>
  <div>
    <el-container>
      <el-header>
        <h2>
          问卷管理系统
          <el-button type="text" @click="logout">注销</el-button>
        </h2>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <el-menu :default-active='active'>
            <template v-for="m1 in menus">
              <el-submenu :index="m1.name" :key="m1.name">
                <template #title>{{ m1.meta.menuName }}</template>
                <template v-for="m2 in m1.children">
                  <el-menu-item v-if="m2.meta.showMenu" :index="m2.name" :key="m2.name" @click="$router.push({name:m2.name})">{{m2.meta.menuName}}</el-menu-item>
                </template>
              </el-submenu>
            </template>
          </el-menu>
        </el-aside>
        <el-container>
          <el-main>
            <router-view></router-view>
          </el-main>
          <el-footer></el-footer>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  computed: {
    menus() {
      return this.$router.options.routes.filter((el) => el.meta.showMenu);
    },
    active(){
      return this.$route.name
    }
  },
  methods: {
    //注销
    logout() {
      localStorage.removeItem("token"); //移除
      this.$router.push({ name: "login" }); //跳转
    },
  },
};
</script>
