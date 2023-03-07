<script setup>
import { register } from './CustomElement';

register('scroll-bar')
</script>

<template>
  <scroll-bar wrap-style="height: 100vh;">
    <div id="content" >
      XY
      <scroll-bar wrap-style="height: 200px">
        <div class="box"></div>
      </scroll-bar>
      <br/>
      <scroll-bar native="true" wrap-style="height: 200px">
        <div class="box"></div>
      </scroll-bar>
      X
      <scroll-bar direction="x" wrap-style="height: 200px">
        <div class="box"></div>
      </scroll-bar>
      <br/>
      <scroll-bar native="true" direction="x" wrap-style="height: 200px">
        <div class="box"></div>
      </scroll-bar>
      Y
      <scroll-bar direction="y" wrap-style="height: 200px">
        <div class="box"></div>
      </scroll-bar>
      <br/>
      <scroll-bar native="true" direction="y" wrap-style="height: 200px">
        <div class="box"></div>
      </scroll-bar>
    </div>
  </scroll-bar>
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
