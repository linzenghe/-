<template>
  <div class="hamburgerLine">
    <div class="arrow-bg" :style="{backgroundImage:'url('+switchBg+')'}" @click="toggleClick">
      <i class="arrow-icon" :class="{'el-icon-arrow-left': isActive, 'el-icon-arrow-right': !isActive}"></i>
    </div>
  </div>
</template>

<script>
import switchBg from '@/assets/img/switch_btn.png'
export default {
  name: 'Hamburger',
  props: {
    isActive: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      switchBg:switchBg
    }
  },
  methods: {
    toggleClick() {
      this.$emit('toggleClick')
    }
  }
}
</script>

<style lang="scss" scoped>
.hamburgerLine {
  position: absolute;
  right: -10px;
  height: 100%;
  background: #244893;
  width: 10px;
  top: 0;
  overflow: hidden;
  .arrow-bg {
    position: absolute;
    cursor: pointer;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    width: 10px;
    height: 54px;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    .arrow-icon {
      font-size: 12px;
      color: #fff;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }
  }
}

</style>
