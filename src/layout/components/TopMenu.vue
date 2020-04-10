<template>
  <div class="menu">
    <ul class="nav-list">
      <router-link v-for="(item, index) in menuList" :key="index" :to="item.url" tag="li" class="nav-item" :class="{'active':currentUrl.indexOf(item.url) != -1}">{{ item.title }}</router-link>
    </ul>
    <search id="header-search" class="right-menu-item" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Search from '@/components/MenuSearch'
export default {
  name: 'TopMenu',
  components: {
    Search
  },
  props: {
    menuList: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      currentUrl: ''
    }
  },
  computed: {
    ...mapGetters([
      'sidebar'
    ])
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
  methods: {}
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
