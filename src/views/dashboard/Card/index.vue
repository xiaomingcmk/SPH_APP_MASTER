<template>
  <div>
    <el-row :gutter="10">
      <el-col :span="6">
        <!-- 第一个Card -->
        <el-card>
          <Detail title="总销售额" count="￥ 126560">
            <template slot="charts">
              <span>周同比&nbsp;&nbsp;56.67%&nbsp;&nbsp;<svg t="1680006529022" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1456" width="16" height="16"><path d="M858.9 689L530.5 308.2c-9.4-10.9-27.5-10.9-37 0L165.1 689c-12.2 14.2-1.2 35 18.5 35h656.8c19.7 0 30.7-20.8 18.5-35z" fill="#1afa29" p-id="1457"></path></svg></span>
              &nbsp;&nbsp;
              <span>日同比&nbsp;&nbsp;19.96%&nbsp;&nbsp;<svg t="1680006614383" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2603" width="16" height="16"><path d="M840.4 300H183.6c-19.7 0-30.7 20.8-18.5 35l328.4 380.8c9.4 10.9 27.5 10.9 37 0L858.9 335c12.2-14.2 1.2-35-18.5-35z" fill="#d81e06" p-id="2604"></path></svg></span>
            </template>
            <template slot="footer">
                <span>日销售额 ￥ 12452</span>
              </template>
          </Detail>
        </el-card>
      </el-col>
      <el-col :span="6">
        <!-- 第二个Card -->
        <el-card>
            <Detail title="访问量" count="88460">
              <template slot="charts">
                <lineCharts></lineCharts>
              </template>
              <template slot="footer">
                <span>日访问量 1342</span>
              </template>
            </Detail>
          </el-card>
      </el-col>
      <el-col :span="6">
       <!-- 第三个Card -->
        <el-card>
            <Detail title="支付笔数" count="88460">
              <template slot="charts">
                <barCharts></barCharts>
              </template>
              <template slot="footer">
                <span>转换率 64%</span>
              </template>
            </Detail>
          </el-card>
      </el-col>
      <el-col :span="6">
        <!-- 第四个Card -->
        <el-card>
            <Detail title="运营活动效果" count="78%">
              <template slot="charts">
                <progressCharts></progressCharts>
              </template>
              <template slot="footer">
              <span>周同比&nbsp;&nbsp;56.67%&nbsp;&nbsp;<svg t="1680006529022" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1456" width="16" height="16"><path d="M858.9 689L530.5 308.2c-9.4-10.9-27.5-10.9-37 0L165.1 689c-12.2 14.2-1.2 35 18.5 35h656.8c19.7 0 30.7-20.8 18.5-35z" fill="#1afa29" p-id="1457"></path></svg></span>
              &nbsp;&nbsp;
              <span>日同比&nbsp;&nbsp;19.96%&nbsp;&nbsp;<svg t="1680006614383" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2603" width="16" height="16"><path d="M840.4 300H183.6c-19.7 0-30.7 20.8-18.5 35l328.4 380.8c9.4 10.9 27.5 10.9 37 0L858.9 335c12.2-14.2 1.2-35-18.5-35z" fill="#d81e06" p-id="2604"></path></svg></span>
            </template>
            </Detail>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Detail from './Detail'
import lineCharts from './lineChart'
import barCharts from './barCharts'
import progressCharts from './progressCharts'
export default {
  name:'',
  components:{
    Detail,lineCharts,barCharts,progressCharts
  }
}
</script>

<style>

</style>