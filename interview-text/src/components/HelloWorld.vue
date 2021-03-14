<template>
  <div>

  </div>
</template>

<script>
  export default {
    name:'HelloWorld',
    mounted(){
      console.log('[ this.$math.add(0.1,0.2) ]', this.$math.add(0.1,0.2))
      console.log(this.$math.format(
        (this.$math.add(
          this.$math.bignumber(0.1),
          this.$math.bignumber(0.2)
        ))
      ))//'0.3'
    }
  }
</script>

<style lang="scss" scoped>

</style>