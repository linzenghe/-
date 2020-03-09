<template>
  <div class="dashboard-container">
    <div class="dashboard-editor-container ">
      <p>系统首页</p>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  components: {},
  data() {
    return {}
  },
  computed: {
    ...mapGetters([
      'roles'
    ])
  },
  created() {}
}
</script>
<style scoped>
  .dashboard-editor-container {
    padding: 20px;
  }
</style>
