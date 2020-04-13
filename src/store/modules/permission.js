import { asyncRoutes, constantRoutes } from '@/router'
import { getRoleRoutes } from '@/api/role'

/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}
/* 遍历router map */
function flatten(data) {
  for (const item of data) {
    if (item.component) {
      item.component = require(`../../${item.component}`).default
    }
    if (item.children && item.children.length !== 0) {
      flatten(item.children)
    }
  }
  return data
}
/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, roles) {
  const res = []

  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })

  return res
}

const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
}

const actions = {
  generateRoutes({ commit }, roles) {
    return new Promise(resolve => {
      let accessedRoutes
      getRoleRoutes({ role: roles[0] }).then(res => {
        console.log(res.data)
        accessedRoutes = flatten(res.data || [])
        commit('SET_ROUTES', accessedRoutes)
        resolve(accessedRoutes)
      }).catch(err => {
        console.log(err)
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
