<template>
  <div>
    <el-card style="margin: 20px 0;">
    <CategorySelect @getCategoryId="getCategoryId" :show="!isShowTable"></CategorySelect>
    </el-card>
    <el-card>
      <div v-show="isShowTable">
        <el-button type="primary" icon="el-icon-plus" :disabled="!category3Id" @click="addAttr">添加属性</el-button>
        <!-- 表格：展示平台属性 -->
        <el-table style="width: 100%;" border :data="attrList">
          <el-table-column prop="prop" label="序号" width="80" align="center"></el-table-column>
          <el-table-column prop="attrName" label="属性名称" width="150"></el-table-column>
          <el-table-column prop="prop" label="属性值列表" width="width">
            <template slot-scope="{ row,$index }">
              <el-tag type="success" v-for="(attrValue,index) in row.attrValueList" :key="attrValue.id" style="margin: 0 20px;">{{ attrValue.valueName }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="prop" label="操作" width="150">
            <template slot-scope="{ row,$index }">
              <el-button type="warning" icon="el-icon-edit" size="mini" @click="updateAttr(row)"></el-button>
              <el-button type="danger" icon="el-icon-delete" size="mini"></el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 添加属性|修改属性的结构 -->
      <div v-show="!isShowTable">
        <el-form :inline="true" ref="form" label-width="80px" :model="attrInfo">
          <el-form-item label="属性名">
            <el-input placeholder="请输入属性名" v-model="attrInfo.attrName"></el-input>
          </el-form-item>
        </el-form>
        <el-button type="primary" icon="el-icon-plus" @click="addAttrValue" :disabled="!attrInfo.attrName">添加属性值</el-button>
        <el-button @click="isShowTable=true">取消</el-button>
        <el-table style="width: 100%;margin: 20px 0;" border :data="attrInfo.attrValueList">
          <el-table-column align="center" type="index" label="序号" width="80"></el-table-column>
          <el-table-column label="属性值名称" width="width" prop="prop">
            <template slot-scope="{row,$index}">
              <!-- 这里的结构需要用到span与input进行来回的切换 -->
              <el-input v-model="row.valueName" placeholder="请输入属性值名称" size="mini" v-if="row.flag" @blur="toLook(row)" @keyup.native.enter="toLook(row)" :ref="$index"></el-input>
              <span v-else @click="toEdit(row,$index)" style="display: block;">{{ row.valueName }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="width" prop="prop">
            <template  slot-scope="{row,$index}">
              <!-- 气泡确认框 -->
              <el-popconfirm :title="`确定删除${row.valueName}吗？`" @onConfirm="deleteAttrValue">
                <el-button type="danger" icon="el-icon-delete" size="mini" slot="reference"></el-button>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
        <el-button type="primary" @click="addOrUpdateAttr" :disabled="attrInfo.attrValueList.length<1">保存</el-button>
        <el-button @click="isShowTable=true">取消</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
import cloneDeep from 'lodash/cloneDeep'
export default {
  name:'Attr',
  data() {
    return {
      category1Id:'',
      category2Id:'',
      category3Id:'',
      // 接收平台属性的字段
      attrList:[],
      // 控制table表格显示与隐藏
      isShowTable:true,
      // 收集新增属性|修改属性使用的
      attrInfo:{
        // 属性名
        attrName: "",
        // 属性值
        attrValueList: [
        ],
        // 三级分类的id
        categoryId: 0,
        categoryLevel: 3,
      }
    }
  },
  methods: {
    // 自定义事件的回调
    getCategoryId({categoryId,level}){
    // 区别三级分类相应的 id，一级父组件进行存储
    if(level==1){
      this.category1Id=categoryId
      this.category2Id=''
      this.category3Id=''
    }else if(level==2){
      this.category2Id=categoryId
      this.category3Id=''
    }else {
      this.category3Id=categoryId
      // 发请求获取平台的属性数据
      this.getAttrList()
    }
    },
    // 获取平台属性的数据
    async getAttrList(){
      const {category1Id,category2Id,category3Id}=this
      let result= await this.$API.attr.reqArrtList(category1Id,category2Id,category3Id)
      if(result.code==200){
        this.attrList=result.data
      }
    },
    // 添加属性值按钮的回调
    addAttrValue(){
      // 向属性值的数组里添加元素
      // flag属性:给每一个属性值添加一个标记，用户切换查看模式与编辑模式；好处：每一个属性值可以控制自己的模式切换
      this.attrInfo.attrValueList.push({attrId:this.attrInfo.id,valueName:'',flag:true})
      this.$nextTick(()=>{
        this.$refs[this.attrInfo.attrValueList.length-1].focus()
      })
    },
    // 添加属性按钮的回调
    addAttr(){
      // 切换table显示与隐藏
      this.isShowTable=false
      // 清除数据
      // 收集三级分类的id
      this.attrInfo={
         // 属性名
         attrName: "",
        // 属性值
        attrValueList: [
        ],
        // 三级分类的id
        categoryId: this.category3Id,
        categoryLevel: 3,
      }
    },
    // 修改某一个属性
    updateAttr(row){
      this.isShowTable=false
      // 将选中的属性值赋值给attrInfo
      this.attrInfo=cloneDeep(row)
      // 在修改某个属性的时候，将相应的属性值添加上flag这个标记
      this.attrInfo.attrValueList.forEach(item=>{
        // 因为vue无法探测普通的新增 property，这样书写的属性不是响应式数据
        this.$set(item,'flag',false)
      })
    },
    // 失去焦点的事件---切换为查看模式，展示 span
    toLook(row){
      // 如果属性值为空，不能作为新的属性值，需要给用户提示，让其重新输入一个其他的属性值
      if(row.valueName.trim()==''){
        this.$message("请你输入一个正常的属性值!!!")
        return;
      }
      // 新增的属性值不能与已有的属性值重复
      let isRepat=this.attrInfo.attrValueList.some((item)=>{
        // 需要将row从数组里面判断的时候去除
        // row是最新新增的属性值【数组的最后一项元素】
        // 判断的时候，需要把已有的数组当中新增的这个属性值去除
        if(row!=item){
          return row.valueName==item.valueName
        }
      })
      if(isRepat) return
      row.flag=false
    },
    // 点击span的回调，变为编辑模式
    toEdit(row,index){
      row.flag=true
      // 获取input节点，实现自动聚焦
      // 需要注意：点击span的时候，切换为input变为编辑模式，但是需要注意，对于浏览器而言，页面重绘需要耗时间
      // 点击span的时候，重绘一个input它是需要耗费时间的，因此我们不可能一点击span就立马获取到input
      // $nextTick：当节点渲染完毕了，会执行一次
      this.$nextTick(()=>{
        this.$refs[index].focus()
      })
    },
    // 气泡确认框确定按钮的回调
    deleteAttrValue(index){
      // 当前删除属性值的操作是不用发请求的
      this.attrInfo.attrValueList.splice(index,1)
    },
    // 保存按钮：进行添加属性或者修改属性的操作
    async addOrUpdateAttr(){
      // 整理参数：如果用户添加很多属性值，且属性值为空的不应该提交给服务器
      // 提交给服务器数据中不应该出现flag字段
      this.attrInfo.attrValueList= this.attrInfo.attrValueList.filter(item=>{
        // 过滤掉属性值不是空的
        if(item.valueName!=''){
          // 删除掉flag属性
          delete item.flag
          return true
        }
      });
      try {
        // 发请求
        await this.$API.attr.reqAddOrUpdateAttr(this.attrInfo)
        // 展示平台属性的信号量进行切换
        this.isShowTable=true
        // 提示消息
        this.$message({type:'success',message:'保存成功'})
        // 保存成功胡需要再次获取平台属性进行展示
        this.getAttrList()
      } catch (error) {
        
      }

    }
    
  },
}
</script>

<style>

</style>