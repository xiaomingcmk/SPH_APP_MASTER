<template>
  <div>
    <!-- 按钮 -->
    <el-button type="primary" icon="el-icon-plus" style="margin: 10px 0;" @click="showDialog">添加</el-button>
    <!-- 表格组件 -->
    <el-table style="width: 100%;" border :data="list">
      <el-table-column type="index" label="序号" width="80px" align="center"></el-table-column>
      <el-table-column prop="tmName" label="品牌名称" width="width"></el-table-column>
      <el-table-column prop="logoUrl" label="品牌LOGO" width="width">
        <template slot-scope="{row,$index}">
          <img :src="row.logoUrl" style="width: 100px;height: 100px;">
        </template>
      </el-table-column>
      <el-table-column prop="prop" label="操作" width="width">
        <template slot-scope="{row,$index}">
          <el-button type="warning" icon="el-icon-edit" size="mini" style="margin-right: 20px;" @click="updateTradeMark(row)">修改</el-button>
          <el-button type="danger" icon="el-icon-delete" size="mini" @click="deleteTradeMark(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页器
      当前第几页、数据总条数、每一页展示条数、连续页码数
      current-page：代表的是当前第几页
      total：代表分页器一共需要展示数据条数
      page-size：代表的是每一页需要展示多少条数据
      page-count：代表按钮的数量  如果是9，代表连续页码是7
      page-sizes：代表可以设置每一页展示多少条数据
      layout：可以实现分页器布局
     -->
    <el-pagination
    style="margin-top: 20px;text-align: center;"
    :current-page="page"
    :total="total"
    :page-size="limit"
    :page-count="7"
    :page-sizes="[3,5,10]"
    @current-change="getPageList"
    @size-change="handlerSizeChange"
    layout="prev,pager,next,jumper,->,sizes,total">
    </el-pagination>
    <!-- 对话框
      :visible.sync：控制对话框显示与隐藏用的 -->
    <el-dialog :title="tmFrom.id?'修改品牌':'添加品牌'" :visible.sync="dialogFormVisible">
      <!-- form 表单 -->
      <el-form style="width: 80%;" :model="tmFrom" :rules="rules" ref="ruleForm">
        <el-form-item label="品牌名称" label-width="100px" prop="tmName">
          <el-input autocomplete="off" v-model="tmFrom.tmName"></el-input>
        </el-form-item>
        <el-form-item label="品牌LOGO" label-width="100px" prop="logoUrl">
          <el-upload
              class="avatar-uploader"
              action="/dev-api/admin/product/fileUpload"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload">
              <img v-if="tmFrom.logoUrl" :src="tmFrom.logoUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>        
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="AddOrUpdateTradeMark">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>

export default {
  name:'tradeMark',
  data() {
    return {
      // 代表的是分页器第几页
      page:1,
      // 当前页面展示数据条数
      limit:3,
      // 总共数据条数
      total:0,
      // 列表展示的数据
      list:[],
      // 对话框显示与隐藏控制的属性
      dialogFormVisible:false,
      // 收集品牌的信息：对象身上的书写，不能乱写，需要看文档
      tmFrom:{
        tmName:'',
        logoUrl:''
      },
      // 表单验证规则
      rules:{
        // 品牌名称的验证规则
        tmName: [
            { required: true, message: '请输入品牌名称', trigger: 'blur' },
            { min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'change' }
          ],
        // 品牌logo的验证规则
        logoUrl: [
            { required: true, message: '请选择品牌的图片'}
          ]
      }
    }
  },
  // 组件挂载完毕
  mounted() {
    // 获取列表数据的方法
    this.getPageList();
  },
  methods: {
    // 获取品牌列表的数据
    async getPageList(pager=1){
      this.page=pager
      // 解构出参数
      const {page,limit}=this
      // 获取品牌列表的接口
      let result= await this.$API.trademark.reqTradeMarkList(page,limit)
      if(result.code==200){
        // 分别是展示数据总条数与列表展示的数据
        this.total=result.data.total;
        this.list=result.data.records;
      }
    },
    // 分页器某一页需要展示数据条数发生改变的时候会触发
    handlerSizeChange(limit){
      this.limit=limit
      this.getPageList()
    },
    // 点击添加品牌的按钮
    showDialog(){
      // 显示对话框
      this.dialogFormVisible=true
      // 清除数据
      this.tmFrom={tmName:'',logoUrl:''}
    },
    // 修改品牌的按钮
    updateTradeMark(row){
      // row：当前用户选中这个品牌的信息
      // 显示对话框
      this.dialogFormVisible=true
      this.tmFrom={...row}

    },
    // 图片上传成功
    handleAvatarSuccess(res, file) {
      this.tmFrom.logoUrl=res.data
      },
    // 图片上传之前
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },
    // 添加按钮（添加品牌|修改品牌）
    AddOrUpdateTradeMark(){
      // 当全部验证通过时，再去书写业务逻辑
      this.$refs.ruleForm.validate(async (success) => {
        if (success) {
          this.dialogFormVisible=false
          // 发起请求：添加品牌成功、修改品牌成功
          let result= await this.$API.trademark.reqAddOrUpdateTradeMark(this.tmFrom)
          if(result.code==200){
            // 弹出信息：添加品牌成功、修改品牌成功
            this.$message({
              type:'success',
              message:this.tmFrom.id?'修改品牌成功':'添加品牌成功'
            })
            this.getPageList(this.tmFrom.id?this.page:1)
          }
        }else{
          console.log("error submit!!");
          return false
        }
      })
    },
    // 删除品牌的操作
    deleteTradeMark(row){
      this.$confirm(`你确定删除${row.tmName}`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          // 当用户点击确定按钮的时候会触发
          // 向服务器发请求
          let result= await this.$API.trademark.reqDeleteTradeMark(row.id)
          if(result.code==200){
            this.$message({
            type: 'success',
            message: '删除成功!'
          });
          // 再次获取品牌列表数据
          this.getPageList(this.list.length>1?this.page:this.page-1)
          }
        }).catch(() => {
          // 当用户点击取消按钮的时候会触发
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    }
  },

}
</script>

<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
