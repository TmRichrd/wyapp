<template>
  <div>
    <searchList></searchList>
    <!-- 搜索综合结果 -->
      <van-list>
        <van-cell v-for="item in list"
                  :key="item.id"
                  :title="item.name" />
      </van-list>
  </div>
</template>
<script>
import searchList from '../components/searchList.vue'
export default {
  components: {
    'searchList': searchList
  },
  data() {
    return {
      
    }
  },
  created() {
    
  },
  methods: {
    
  },
}
</script>
<style>
  
</style>