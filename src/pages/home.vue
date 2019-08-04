<template>
    <el-button>{{name}}</el-button>
</template>
<script>
import { Button } from 'element-ui';
export default {
    data: function(){
        return {
            name: 'vivi'
        }
    },
    components: {
      [Button.name]:Button  
    }
}
</script>

