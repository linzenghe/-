<template>
  <div class="filter-container">
    <el-form :inline="filterOption.inline">
      <el-form-item v-for="item in filterForm" :label="item.label" :key="item.prop">
        <!-- input type: text | textArea | password-->
        <el-input 
          v-if="item.type === 'input' || item.type === 'textArea' || item.type==='password'" 
          :type="item.type"
          v-model='item.value'
          :rows="item.type === 'textArea'?item.rows:''"
          :show-password="(item.type === 'password'&&item.show-password) ? true : false"
          :placeholder="item.placeholder"
          :class='item.class' 
          :style='item.style'
          :prefix-icon="item.type === 'text'?item.prefix-icon:''"
          :suffix-icon="item.type === 'text'?item.suffix-icon:''"
          :clearable="item.clearable?item.clearable:false"
          />
        <!-- radio -->
        <el-radio-group v-if="item.type==='radio'" v-model='item.value' @change="((lable)=>{item.changeRadio(label,item,index)})">
          <el-radio v-for='(radio,index) in item.radioArr' :key='index' :label='radio.label' :disabled="radio.disabled">{{radio.label}}</el-radio>
        </el-radio-group>
        <!-- checkbox -->
        <el-checkbox-group v-if="item.type==='checkbox'" v-model="item.value"  @change="((lable)=>{item.changeCheck(label,item,index)})">
          <el-checkbox v-for='(checkbox,index) in item.checkboxArr' :key="index" :label="checkbox.label" :disabled="checkbox.disabled">{{checkbox.label}}</el-checkbox>
        </el-checkbox-group>
        <!-- select -->
        <el-select v-if="item.type ==='select'" :clearable="item.clearable" @change='((option)=>{item.changeSelect(option,item,index)})' :multiple="item.multiple" v-model="item.value" :placeholder="item.placeholder">
          <el-option
            v-for="option in item.selectArr"
            :key="option.value"
            :label="option.label"
            :value="option.value"
            :disabled="option.disabled">
          </el-option>
        </el-select>
        <!-- cascader -->
        <el-cascader
          v-if="item.type==='cascader'"
          v-modal="item.value"
          :options="item.options"
          :props="item.props"
          @change="((value)=>{item.changeCascader(value,item,index)})"
          :clearable='item.clearable?true:false'>
        </el-cascader>
        <!-- number -->
        <el-input-number v-if="item.type==='number'" v-model="item.value" :min='item.min' :max='item.max' :size='item.size' @change='((currentValue,oldValue)=>{item.changeNumber(currentValue,oldValue,item,index)})'></el-input-number>
        <!-- timePicker -->
        <el-time-select
          v-if="item.type==='timePicker'"
          v-model="item.value"
          :picker-options="item.picker-options"
          :placeholder="item.placeholder?item.placeholder:'选择时间'"
          :clearable="item.clearable"
          :disabled="item.disabled"
          :is-range="item.is-range"
          :start-placeholder="item.start-placeholder"
          :end-placeholder="item.end-placeholder"
          :prefix-icon="item.prefix-icon?item.prefix-icon:'el-icon-time'"
          :clear-icon="item.clear-icon?item.clear-icon:'el-icon-circle-close'"
          :range-separator="item.range-separator?item.range-separator:'至'"
          @change="((time)=>{item.changeTime(time,index,index)})"
          >
        </el-time-select>
        <!-- datePicker  --- subType:date daterange....-->
        <el-date-picker
          v-if="item.type==='datePicker'"
          :type="item.subType?item.subType:'date'"
          v-model='item.value'
          :disabled="item.disabled"
          :readonly="item.readonly"
          :unlink-panels="item.unlink-panels?item.unlink-panels:false"
          :placeholder="item.placeholder"
          :range-separator="item.range-separator?item.range-separator:'至'"
          :start-placeholder="item.start-placeholder?item.start-placeholder:'开始日期'"
          :end-placeholder="item.end-placeholder?item.end-placeholder:'结束日期'"
          :pickerOptions="item.pickerOptions"
          :format="item.format"
          :align="item.align"
          :editable="item.editable"
          :clearable="item.clearable"
          :value-format="item.value-format"
          @change="((date)=>{item.changeDate(date,item,index)})"
        ></el-date-picker>
        <!-- dateTimePicker -->
        <el-date-picker
          v-if="item.type==='dateTimePicker'"
          :type="item.subType?item.subType:'datetime'"
          v-model='item.value'
          :disabled="item.disabled"
          :readonly="item.readonly"
          :unlink-panels="item.unlink-panels?item.unlink-panels:false"
          :placeholder="item.placeholder"
          :range-separator="item.range-separator?item.range-separator:'至'"
          :start-placeholder="item.start-placeholder?item.start-placeholder:'开始日期'"
          :end-placeholder="item.end-placeholder?item.end-placeholder:'结束日期'"
          :pickerOptions="item.pickerOptions"
          :format="item.format"
          :align="item.align"
          :editable="item.editable"
          :clearable="item.clearable"
          :value-format="item.value-format"
          @change="((date)=>{item.changeDateTime(date,item,index)})"
        ></el-date-picker>

        <!-- button -->
        <el-button
              v-if="item.type==='button'"
              :type="item.subType"
              :size="item.size"
              :disabled="item.disabled"
              :plain="item.plain"
              @click.native.prevent="btn.method(item,index)"
            >{{ item.label }}
            </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  export default {
    props: {
      filterOption:{
        type: Object,
        default: {
          inline:true,
        }
      },
      filterForm:{
        type: Array,
        default: []
      }
    },
    data() {
      return {
        
      };
    },
    created(){

    },
    mounted() {

    },
    computed: {},
    methods: {
      // // radio change
      // changeRadio(label,item,index){
      //   this.$emit('changeRadio',label,item,index);
      // },
      // // checkbox change
      // changeCheck(label,item,index){
      //   this.$emit('changeCheck',label,item,index);
      // },
      // // select change
      // changeSelect(label,item,index){
      //   this.$emit('changeSelect',label,item,index);
      // },
      // // cascader  change
      // changeCascader(value,item,index){
      //   this.$emit('changeCasder',value,item,index);
      // },
      // // number change
      // changeNumber(oldVal,newVal,item,index){
      //   this.$emit('changeNumber',oldVal,newVal,item,index);
      // },
      // // time change
      // changeTime(time,item,index){
      //   this.$emit('changeTime',time,item,index);
      // },
      // // date change
      // changeDate(date,item,index){
      //   this.$emit('changeDate',date,item,index);
      // },
      // // dateTime change
      // changeDateTime(date,item,index){
      //   this.$emit('changeDateTime',date,item,index);
      // }
    }
  };
</script>
<style lang="scss">

</style>
