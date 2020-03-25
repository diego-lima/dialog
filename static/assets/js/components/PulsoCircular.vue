<template>
  <div v-if="flag" class="sonar-wrapper">
    <div class="sonar-emitter">
      <div class="sonar-wave"></div>
    </div>
  </div>
  
</template>

<script>
export default {
  props: {
    flag: { type: Boolean }
  }
};
</script>

<style lang="css" scoped>
/* Prevent scrollbars to appear when waves go out of bound */
.sonar-wrapper {
  height: 100%;
  position: relative;
  z-index: 0;
  overflow: visible;
  /* padding: 20px; */
}

/* The circle */
.sonar-emitter {
  position: relative;
  margin: 0 auto;
  width: 25px;
  height: 25px;
  border-radius: 9999px;
  background-color: HSL(45, 100%, 50%);
}

/* the 'wave', same shape and size as its parent */
.sonar-wave {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 9999px;
  background-color: HSL(45, 100%, 50%);
  opacity: 0;
  z-index: -1;
  pointer-events: none;
}

/*
  Animate!
  NOTE: add browser prefixes where needed.
*/
.sonar-wave {
  animation: sonarWave 2s linear infinite;
}

@keyframes sonarWave {
  from {
    opacity: 0.4;
  }
  to {
    transform: scale(3);
    opacity: 0;
  }
}
</style>