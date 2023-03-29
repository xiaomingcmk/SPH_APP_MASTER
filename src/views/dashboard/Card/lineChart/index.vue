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
          type:'line',
          data:[18,33,20,12,55,43,25,61,45,23,47,52,66],
          // 拐点样式的设置
          itemStyle:{
            opacity:0
          },
          // 线条的颜色
          lineStyle:{
            color:'purple',
          },
          // 填充颜色设置
          areaStyle:{
            color:{
              type:'linear',
              x:0,
              y:0,
              x2:0,
              y2:1,
              colorStops:[
                {
                  offset:0,
                  color:'purple' // 0% 处地颜色
                },
                {
                  offset:1,
                  color:'#fff' // 100% 处地颜色
                },
              ],
              global:false, 
            }
          },
        },
      ],
      // 布局调试
      grid:{
        left:0,
        top:0,
        right:0,
        bottom:0
      }
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