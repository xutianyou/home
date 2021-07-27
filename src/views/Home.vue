<template>
  <div class="home">
    <el-container>
      <el-header class="home-header">
        <span class="home-header-name">懒虫之家</span>

        <el-popover
          placement="right-start"
          trigger="click">

          <ul class="home-header-box">
            <li class="home-header-box-li" @click="toLogOut">登出</li>
            <li class="home-header-box-li" @click="toSwitchThemes">切换主题颜色</li>
          </ul>
          
          <i class="home-header-img" slot="reference"></i>
        </el-popover>

      </el-header>

      <el-container>

        <el-aside width="200px">
          <nav-menu></nav-menu>
        </el-aside>

        <el-main>
          <router-view class="home-view" />
        </el-main>

      </el-container>

    </el-container>
  </div>
</template>

<script>

import { mapMutations } from 'vuex'
import NavMenu from '@/components/aside/NavMenu.vue'

export default {
  name: 'Home',
  components: {
    NavMenu
  },
  data() {
    return {
      theme: 'custom-blue',
      themeBlue: 'custom-blue',
      themeViolet: 'custom-violet'
    }
  },
  computed: {
  },
  mounted() {
    let bodyDom = document.getElementsByTagName('body')[0].getAttribute("class");
    
    if ( bodyDom.indexOf(this.themeViolet) > -1 ) {
      // 紫色主题
      this.theme = this.themeViolet;
    } else {
      // 默认蓝色主题
      this.theme = this.themeBlue;
    }
  },
  methods: {
    ...mapMutations(['deleteToken']),

    toLogOut() {
      this.deleteToken();
      this.$router.push({ name: 'Login'});
    },
    toSwitchThemes() {
      let body = document.getElementsByTagName('body')[0];

      this.theme = this.theme === 'custom-violet' ? 'custom-blue' : 'custom-violet';
      
      body.classList.add(this.theme);
      body.classList.remove(this.theme === 'custom-violet' ? 'custom-blue' : 'custom-violet');
    }
  }
}
</script>

<style lang="less" scoped>
.home {
  &>.el-container {
    height: 100%;

    &>.el-header {
      position: relative;
      height: 50px !important;
      padding: 0;
      background-color: var(--themeColor);
    }
    &>.el-container {
      height: calc(100% - 50px);
      background-color: var(--backgroundTheme);


      &>.el-aside {
        width: 200px !important;
      }

      &>.el-main {
        padding: 0;
      }
    }
  }
  &-header {
    
    &-name {
      position: absolute;
      top: 50%;
      left: 0;
      transform: translate(20px, -50%);
      line-height: 1;
      font-size: 24px;
      color: @ColorWhite;
    }

    &-img {
      position: absolute;
      top: 50%;
      right: 0;
      transform: translate(-20px, -50%);
      width: 30px;
      height: 30px;
      border-radius: 50%;
      background: url(~@/assets/xty.jpg) no-repeat center;
      background-size: 30px;
      cursor: pointer;
    }

    &-box {
      color: @textPrimary;
      &-li {
        cursor: pointer;
        &:hover {
          color: var(--themeColor);
        }
      }
    }


  }
}
</style>
