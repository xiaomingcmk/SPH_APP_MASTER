<template>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <div class="search-header">
          <span class="search-hot">线上热门搜索</span>
          <el-dropdown>
            <span>
              <i class="el-icon-more"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>黄金糕</el-dropdown-item>
              <el-dropdown-item>狮子头</el-dropdown-item>
              <el-dropdown-item>螺蛳粉</el-dropdown-item>
              <el-dropdown-item>双皮奶</el-dropdown-item>
              <el-dropdown-item >蚵仔煎</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
      <div>
        <el-row :gutter="10">
          <el-col :span="12">
            <LineCharts></LineCharts>
          </el-col>
          <el-col :span="12">
            <LineCharts></LineCharts>
          </el-col>
        </el-row>
      </div>
    </el-card>
</template>

<script>
import LineCharts from './lineCharts'
export default {
  name:'',
  components:{
    LineCharts
  }
}
</script>

<style scoped>

.search-header{
  display: flex !important;
  justify-content: space-between;
  border-bottom: 1px solid #eee;
  padding: 5px 0;
}

.search-hot{
  margin-right: 550px;
}

</style>