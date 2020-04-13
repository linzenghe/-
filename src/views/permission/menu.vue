<template>
  <div class="app-container">
    <div class="router-body">
      <div class="left-side">
        <h3>菜单配置示例页面</h3>
        <el-tree
          ref="tree"
          :check-strictly="checkStrictly"
          :data="routesData"
          :props="defaultProps"
          node-key="path"
          class="permission-tree"
        />
      </div>
      <div class="right-side">
        <h3>添加路由</h3>
        <el-form label-width="180px">
          <el-form-item label="路由地址">
            <el-input v-model="form.path" placeholder="如，/error-page/log" />
          </el-form-item>
          <el-form-item label="重定向地址">
            <el-input v-model="form.redirect" placeholder="如，/401" />
          </el-form-item>
          <el-form-item label="组件">
            <el-input v-model="form.component" placeholder="组件路径, 如，/views/error-page/index" />
          </el-form-item>
          <el-form-item label="路由名称">
            <el-input v-model="form.name" placeholder="error-page" />
          </el-form-item>
          <el-form-item label="标题">
            <el-input v-model="form.meta.title" placeholder="系统日志" />
          </el-form-item>
          <el-form-item label="图标">
            <el-input v-model="form.meta.icon" placeholder="el-icon-bug" />
          </el-form-item>
          <el-form-item label="是否一直显示根路由">
            <el-switch v-model="form.alwaysShow" />
          </el-form-item>
          <el-form-item label="是否显示">
            <el-switch v-model="form.hiddren" />
          </el-form-item>
          <el-form-item label="是否缓存">
            <el-switch v-model="form.meta.noCache" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click.prevent="submit">提交保存</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import path from 'path'
import { mapGetters } from 'vuex'
import { deepClone } from '@/utils'
import { getRoleRoutes } from '@/api/role'
import i18n from '@/lang'
import request from '@/utils/request'
export default {
  name: 'PagePermission',
  data() {
    return {
      routesList: [],
      checkStrictly: false,
      defaultProps: {
        children: 'children',
        label: 'title'
      },
      routes: [],
      form: {
        path: '',
        redirect: '',
        component: '',
        name: '',
        alwaysShow: '',
        hiddren: '',
        meta: {
          title: '',
          icon: '',
          noCache: ''
        }
      }
    }
  },
  computed: {
    ...mapGetters([
      'roles'
    ]),
    routesData() {
      return this.routes
    }

  },
  created() {
    this.getRoutes()
    request({ url: '/vue-element-admin/user/info', method: 'get', params: { token: 'admin-token' }}).then(res => {
      console.log(res)
    }).catch(err => {
      console.log(err)
    })
  },
  methods: {
    submit() {
      this.$message({
        type: 'success',
        message: '提交的信息' + JSON.stringify(this.form)
      })
    },
    async getRoutes() {
      const data = { role: this.roles[0] }
      getRoleRoutes(data).then(res => {
        this.serviceRoutes = res.data
        const routes = this.generateRoutes(res.data)
        this.routes = this.i18n(routes)
      }).catch(err => {
        console.log(err)
      })
    },
    i18n(routes) {
      const app = routes.map(route => {
        route.title = i18n.t(`route.${route.title}`)
        if (route.children) {
          route.children = this.i18n(route.children)
        }
        return route
      })
      return app
    },
    // Reshape the routes structure so that it looks the same as the sidebar
    generateRoutes(routes, basePath = '/') {
      const res = []

      for (let route of routes) {
        // skip some route
        if (route.hidden) { continue }

        const onlyOneShowingChild = this.onlyOneShowingChild(route.children, route)

        if (route.children && onlyOneShowingChild && !route.alwaysShow) {
          route = onlyOneShowingChild
        }

        const data = {
          path: path.resolve(basePath, route.path),
          title: route.meta && route.meta.title

        }

        // recursive child routes
        if (route.children) {
          data.children = this.generateRoutes(route.children, data.path)
        }
        res.push(data)
      }
      return res
    },
    generateArr(routes) {
      let data = []
      routes.forEach(route => {
        data.push(route)
        if (route.children) {
          const temp = this.generateArr(route.children)
          if (temp.length > 0) {
            data = [...data, ...temp]
          }
        }
      })
      return data
    },

    // reference: src/view/layout/components/Sidebar/SidebarItem.vue
    onlyOneShowingChild(children = [], parent) {
      let onlyOneChild = null
      const showingChildren = children.filter(item => !item.hidden)

      // When there is only one child route, the child route is displayed by default
      if (showingChildren.length === 1) {
        onlyOneChild = showingChildren[0]
        onlyOneChild.path = path.resolve(parent.path, onlyOneChild.path)
        return onlyOneChild
      }

      // Show parent if there are no child route to display
      if (showingChildren.length === 0) {
        onlyOneChild = { ... parent, path: '', noShowingChildren: true }
        return onlyOneChild
      }

      return false
    }
  }
}
</script>
<style scoped lang="scss">
.router-body{
  overflow:hidden;
  .left-side{
    width: 300px;
    float: left;
  }
  .right-side{
    width: 600px;
    float: left;
  }
}

</style>
