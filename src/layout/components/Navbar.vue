<template>
  <div class="navbar" :style="{backgroundImage: 'url('+topBg+')'}">
    <div class="logo">
      <img src="@/assets/img/logo.png">
      <div class="company-title">
        <h3>招商局能源运输股份有限公司</h3>
        <p>china Merchants Energy Shipping co.LTD</p>
      </div>
    </div>
    <div class="title">{{ title }}</div>
    <div class="right-menu">
      <template v-if="device!=='mobile'">

        <screenfull id="screenfull" class="right-menu-item hover-effect" />

        <lang-select class="right-menu-item hover-effect" />

      </template>

      <el-dropdown class="avatar-container right-menu-item hover-effect" trigger="click">
        <div class="avatar-wrapper" style="margin-top: 0">
          <!-- <img :src="avatar+'?imageView2/1/w/80/h/80'" class="user-avatar"> -->
          <span style="font-size:15px">管理员</span>
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown">
          <router-link to="/index">
            <el-dropdown-item>
              {{ $t('navbar.dashboard') }}
            </el-dropdown-item>
          </router-link>
          <el-dropdown-item divided @click.native="logout">
            <span style="display:block;">{{ $t('navbar.logOut') }}</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Screenfull from '@/components/Screenfull'
import LangSelect from '@/components/LangSelect'
// import Search from '@/components/HeaderSearch'
import topBg from '@/assets/img/top_bg.png'
export default {
  components: {
    Screenfull,
    LangSelect
  },
  data() {
    return {
      title: '招商轮船船舶管理信息平台',
      topBg: topBg
    }
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar',
      'device',
      'userInfo'
    ])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/variables.scss";
.navbar {
  height: $navbarHeight;
  overflow: hidden;
  position: relative;
  background-size: 100% 100%;
  background-position: center;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);
  .logo {
    float: left;
    overflow: hidden;
    height: $navbarHeight;
    color: #fff;
    padding: 8px 0 8px 24px;
    img {
      width: 45px;
      height: 45px;
      float: left;
    }
    .company-title {
      float: left;
      margin-left: 16px;
      h3 {
        font-size: 20px;
        margin: 0;
        font-weight: normal;
        margin-top: 4px;
      }
      p {
        font-size: 13px;
        margin: 0;
        letter-spacing: 0.5px;
      }
    }
  }
  .title {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    color: #fff;
    font-size: 24px;
  }
  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color:transparent;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: $navbarHeight;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #fff;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 10px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
