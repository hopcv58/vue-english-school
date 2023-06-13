<template>
  <div class="w-100 welcome full-height" style="background: #FFCB08; position: relative; height: 100vh; display: block">
    <div class="hello" style="height: 100%">
      <div class="container-full" style="padding-top: 250px; height: 100%; position: relative; overflow: hidden">
        <div class="logo" style="position: absolute; top: 30px; left: 30px;">
          <img src="https://learn.mochidemy.com/image/Logo_white.png" alt="mochimochi" style="height: 50px">
        </div>
        <div class="row ">
          <div class="text-start" style="position: relative; min-width:320px; display: inline-flex">
            <img id="hand-wave-static" src="https://learn.mochidemy.com/image/mochi_new.png" alt=""
                 style="height: 140%; margin: 0 0 -5vw 25vw;">
            <div id="choose-start" style="align-self: center">
              <p id="memorize-title" style="color: rgba(91, 45, 17, 1); font-weight: bold; margin-bottom: 20px">
                Học tiếng Anh cùng Mochi
              </p>
              <div class="div-submit-success mb-3">
                <button class="btn-submit-success" id="btn-start" @click="redirectToTests">Bắt đầu ngay</button>
              </div>
              <div class="div-submit-white" style="width: 320px">
                <button class="btn-submit-white" id="btn-has-account" style="width: 320px" @click="redirectToLogin">Mình đã có tài khoản</button>
              </div>
            </div>
          </div>
        </div>
        <div style="position:absolute; left: -130px; top: 60%; width: 80%; max-width: 300px">
          <img src="https://learn.mochidemy.com/image/213202355_4534422609904130_3896387388468451408_n.png.webp" style="width: 100%; opacity: 0.4">
        </div>
        <div style="position:absolute; right: -100px; top: 10px; width: 80%; max-width: 300px">
          <img src="https://learn.mochidemy.com/image/213202355_4534422609904130_3896387388468451408_n.png.webp" style="width: 100%; opacity: 0.4">
        </div>
        <div style="position:absolute; right: -50px; bottom: 0; width: 80%; max-width: 300px">
          <img src="https://learn.mochidemy.com/image/213202355_4534422609904130_3896387388468451408_n.png.webp" style="width: 100%; opacity: 0.4">
        </div>
      </div>
    </div>
  </div>
</template>
<script>

export default {
  created() {

  },
  methods: {
    redirectToLogin() {
      this.$router.push('/login')
    },
    redirectToTests() {
      this.$router.push('/tests')
    }
  }
};
</script>
