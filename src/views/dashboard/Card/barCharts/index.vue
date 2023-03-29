<template>
  <!-- 容器 -->
  <div class="charts" ref="charts"></div>
</template>

<script>
// 引入echarts
import * as echarts from 'echarts';
export default {
  name:'',
  mounted() {
    // 初始化echarts
    let lineCharts=echarts.init(this.$refs.charts)
    // 配置数据
    lineCharts.setOption({
      xAxis:{
        // 隐藏X轴
        show:false,
        type:'category'
      },
      yAxis:{
        // 隐藏YY轴
        show:false
      },
      // 系列
      series:[
        {
          type:'bar',
          data:[18,33,20,12,55,43,25,61,45,23,47,52],
        },
      ],
      // 布局调试
      grid:{
        left:0,
        top:0,
        right:0,
        bottom:0
      },
      // 提示信息
      tooltip:{}
    })
  },
}
</script>

<style>
.charts{
  width: 100%;
  height: 100%;
}
</style>