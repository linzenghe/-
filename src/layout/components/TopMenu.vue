<template>
  <div class="menu">
    <ul class="nav-list">
      <li v-for="(item, index) in menuList" :key="index" class="nav-item" :class="{'active':currentUrl.indexOf(item.path) != -1}">
        <router-link :to="item.path">{{ generateTitle(item.meta?item.meta.title:item.children[0].meta.title) }}</router-link>
      </li>
    </ul>
    <search id="header-search" class="right-menu-item" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Search from '@/components/MenuSearch'
import { isExternal } from '@/utils/validate'
import { generateTitle } from '@/utils/i18n'
export default {
  name: 'TopMenu',
  components: {
    Search
  },
  props: {

  },
  data() {
    return {
      currentUrl: ''
    }
  },
  computed: {
    ...mapGetters([
      'sidebar'
    ]),
    menuList() {
      // const router = this.$store.state.permission.addRoutes
      // router.map(item => {

      // })
      return this.$store.state.permission.addRoutes
    }
  },
  watch: {
    $route: {
      handler: function(val) {
        this.currentUrl = val.path
      },
      // 深度观察监听
      deep: true
    }
  },
  created() {
    this.currentUrl = this.$route.path
  },
  methods: {
    resolvePath(routePath) {
      return isExternal(routePath)
    },
    generateTitle
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/variables.scss";
.menu {
  height: $menuHeight;
  background: linear-gradient(#bee5fb, #90ccfb);
  box-sizing: border-box;
  box-shadow: inset 0 -5px 2px rgba(0,0,0,.2);
  .nav-list {
    margin: 0;
    padding: 0;
    overflow: hidden;
    float: left;
    list-style: none;
    .nav-item {
      list-style: none;
      float: left;
      min-width: 140px;
      line-height: 40px;
      text-align: center;
      font-size: 16px;
      color: #333;
      border-right: 1px solid #cccccc;
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      cursor: pointer;
      &:hover {
        background: linear-gradient(#fecd5a, #e4a81b);
        box-shadow: inset 0 -5px 2px rgba(0,0,0,.2);
        color: #fff;
      }
      &.active {
        background: linear-gradient(#fecd5a, #e4a81b);
        box-shadow: inset 0 -5px 2px rgba(0,0,0,.2);
        color: #fff;
      }
    }
  }
  .right-menu-item {
    float: right;
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
}

</style>
