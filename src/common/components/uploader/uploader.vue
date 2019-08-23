<template>
    <input type="file" webkitdirectory @change="onChange"/>
</template>
<script>
export default {
    methods: {
        onChange(event){
            console.log(event)
        }
    }
}
</script>