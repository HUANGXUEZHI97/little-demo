<template>
  <div>
<h1>HelloWorld</h1>
  </div>
</template>

<script>
  export default {
    name:'HelloWorld',
    data() {
      return {
        one: 0.1,
        two: 0.2,
      }
    },
    computed: {
      three() {
        const tem = this.one + this.two
        return this.numFormat(tem)
      }
    },
    mounted () {
      console.log('[ this.three ]', this.three);
    },
    methods: {
      //取最大精度16位
      numFormat(num = 0) {
        return this.$math.format(Number(num),16)
      }
    },
  }
</script>

<style lang="scss" scoped>

</style>