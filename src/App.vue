<script setup>
import { register } from './CustomElement';

register('jc-scrollbar')
</script>

<template>
  <jc-scrollbar wrap-style="height: 100vh;">
    <div id="content" >
      XY
      <jc-scrollbar wrap-style="height: 200px">
        <div class="box"></div>
      </jc-scrollbar>
      <br/>
      <jc-scrollbar native="true" wrap-style="height: 200px">
        <div class="box"></div>
      </jc-scrollbar>
      X
      <jc-scrollbar direction="x" wrap-style="height: 200px">
        <div class="box"></div>
      </jc-scrollbar>
      <br/>
      <jc-scrollbar native="true" direction="x" wrap-style="height: 200px">
        <div class="box"></div>
      </jc-scrollbar>
      Y
      <jc-scrollbar direction="y" wrap-style="height: 200px">
        <div class="box"></div>
      </jc-scrollbar>
      <br/>
      <jc-scrollbar native="true" direction="y" wrap-style="height: 200px">
        <div class="box"></div>
      </jc-scrollbar>
    </div>
  </jc-scrollbar>
</template>

<style>
body {
  margin: 0;
}

#content {
  max-width: 500px;
  width: 90%;
  margin: 0px auto;
  padding: 40px 0;
}

.box {
  width: 2000px;
  height: 1000px;
  background: radial-gradient(#93add5, #7dc3ac, #f1a9a3);
}
</style>
