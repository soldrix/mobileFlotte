<template>
  <div class="lazyload" :style="{width: width + '%', height: height + 'px'}"></div>
</template>

<script>
import {defineComponent} from "vue";

export default defineComponent({
  name: "LazyLoad",
  props: {
    width: {
      type: Number,
      default: 100,
      required: false
    },
    height: {
      type: Number,
      default: 100,
      required: false
    }
  }
})
</script>

<style lang="scss" scoped>
.lazyload {
  opacity: 0.5;
  background: linear-gradient(135deg, rgba(211,223,232,.5) 30%,rgba(169,184,197,.5) 38%,rgba(168,182,193,.6) 41%,rgba(168,182,193,.6) 50%,rgba(168,182,193,.6) 50%,rgba(169,184,197,.6) 51%,rgba(211,223,232,.6) 57%,rgba(211,223,232,.6) 80%,rgba(211,223,232,.6) 80%);
  background-size: 1200% 1200%;
  border-radius: 8px;

  -webkit-animation: AnimationName 2s ease infinite reverse;
  -moz-animation: AnimationName 2s ease infinite reverse;
  animation: AnimationName 2s ease infinite reverse;
}

@-webkit-keyframes AnimationName {
  0%{background-position:0% 92%}
  50%{background-position:100% 9%}
  100%{background-position:0% 92%}
}
@-moz-keyframes AnimationName {
  0%{background-position:0% 92%}
  50%{background-position:100% 9%}
  100%{background-position:0% 92%}
}
@keyframes AnimationName {
  0%{background-position:0% 92%}
  100%{background-position:100% 9%}
  /*     100%{background-position:0% 92%} */
}
</style>