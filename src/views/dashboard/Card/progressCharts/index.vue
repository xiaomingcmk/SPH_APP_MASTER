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
        // 最大值与最小值的设置
        min:0,
        max:100
      },
      yAxis:{
        // 隐藏Y轴
        show:false,
        // 均分
        type:'category'
      },
      // 系列
      series:[
        {
          type:'bar',
          data:[78],
          // 柱状图的宽度设置
          barWidth:10,
          color:"yellowgreen",
          // 背景颜色的设置
          showBackground:true,
          backgroundStyle:{
            color:"#eee"
          },
          // 文本的设置
          label:{
            show:true,
            // 改变文本内容
            formatter:'|',
            // 文本标签位置调试
            position:'right'
          }
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