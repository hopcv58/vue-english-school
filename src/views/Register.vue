<template>
  <div class="layout">
    <div class="layout__element"
         style="background: url('img/theme/login-bg.png') center no-repeat; background-size: cover;">
      <div class="container-fluid" style="padding: 0px;">
        <div class="justify-content-md-center row">
          <div class="col-lg-6">
            <div class="layout__content">
              <div class="header">
                <img
                    src="data:image/png;base64,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"
                    alt="close">
                <p>Đăng nhập</p>
              </div>
              <div class="text-center login">
                <div class="login__boxTitle"><p>Đăng nhập tài khoản học MochiMochi</p></div>
                <div class="google button__social">
                  <div class="google__box button__social__box">
                    <img
                        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEMAAAApCAYAAABupZRPAAACuUlEQVR4Xu2a4VHjMBCFKYESXAIluIQrwSWkA9IBdGA6ODrwdUAJKoES3mlZe+I8W9Yqko3C8M3sDwftavUsrYSSh4cMADx6a7113s7e+pnJ82n8+yP7/ghGAWSQg7dP2BmgojUc8+6AivCMNAHWEP8X3Kso0DeaKwLjvHXcV7VAZ0N/NYTyyCypu6b4BBvo2zuCf9x/NeBYIZy3J86hCqBLQxI8AoeaCynSa4QU1ldokZUzxWTy/IawsA47COFjPuH6vDPZC7fdBDoAK85byzHWgMaV9nPfhtuVQHKa9TPHcdsgSKsTr+xvAXoqddhJCAGFxHhm7wAd+6aAnbdR5IoBe9E8sW9toIAYHXuucNPSOBoUEGNgT8Jhx3VeEuSIAV0iMTr2qxVkihFyntOwXwiouE0hWxTb8fPzhvVYR85D3HZuJwkudxNbDJzQFtDApVjUKdhe3i04CS6nxy0WCW2BsmK8r8TfVYw3/pRI2k5RVozFOsc3i9FxQlvgV4wLuHMxaq4ZHyvxGyx3grn1kzNx97tJUt8CwjNnMcsWIOw8IYou9vsQ0PuEzmh/v3oIs9hNYiA8HpMYlhNo0o5iBeEpPZHcL3LEEGD434R9coGu/djXDy37xRAfDjJiGwPidUM4s18OiN+ffLKPBRQQQ5ZK7C0JLfveAnRWxOjZzwJyxRBg2wVEsKxrfagQ7jrsKi37WhA/DjSSJIZ1dkib5MImwC6EPXEC2ke/Ysm345baMdF7azjGGkj/0rrjGN8C4jsLM+DyOwx5K5NN540edhGEm2rFLsB+ObwHDsbZdhiS0JjYkWQX593AsYKIEC3nUBVQQYbrvIvjUOuMWAN6BkkpglYG1FYjLEjSiF8EWRlQ+7KwABVFtsyPq+HFmX660HLMHwFUmD+43DANo8k9hTzL4EW4u6gJ/wHTpTJF5mKLuQAAAABJRU5ErkJggg=="
                        alt="icon google">
                    <p>Đăng nhập với G+</p>
                  </div>
                </div>
                <div class="facebook button__social">
                  <div class="facebook__box button__social__box">
                    <img
                        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAA9CAYAAADMMmuxAAABRElEQVR4Xu2Y4XGCQBCFLcESKMEStgRLoARLsIPYQezAdGAJKeFKsISX3RxxzBPIAoeXH/vNvB+Ot7sfDhzgZlMQAI1mr2k1x4fYZ4t9J10arp+FNtpp3jQJ0xHu50aLt5p3ajgV4b4ukI/6xt1mINz7T1BuuCHcfxTkkyxRkyUIzxhFCy7cYSHCMwaxxVxdAOE5g6D80RvCc3pBvuTWQHhWL7aQKx3YlXLVnPB7V3xMw7N66RZP4VOz5T6z0WZnnjBCQsnhBvJP6eXE9YvBNIGW6xeDEAiBEFhTQAsOeN6jOalr7sHumlzfl8OPQMp1L+daW+CjtsCxtkD1c0BqC+yqCnwPryiQagvkPaCiQN4DOgFxxJ5yvdhjONdzmruAB6x5M/KAEAiBEAiBEAiBEAiBEAiBEAiBfyDQ4vlfrqHk934nX2pE29oahaubAAAAAElFTkSuQmCC"
                        alt="icon google">
                    <p>Đăng nhập với Facebook</p>
                  </div>
                </div>
                <div class="apple button__social">
                  <div class="apple__box button__social__box">
                    <img
                        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADMAAAA9CAYAAAAAq1FaAAAClklEQVR4Xu2ajXGdMBCEXYJLoASXQAnuIHSQdGA6iDsgHTgdUIJLUAkpYaP1hQQWCUTsse8y+WY082bQiV3Qz0m8mxtnALjLZcil02shoPBcvubyA3/otZ5rsuDbXyZK9FrfLbDulMTAmjuNcQmFYtuldmiMS2Dj49BIZtY4d8DGSBLhJQaNdQfqg31N0jh3wLpXC4PGuiOL/KKqCzxqnEuy0GdVLjxrjEtgA/+IOZdbjXMJbF2pEaNrLWTBvTqAvY1e634YaOwasDdD8U+5jDUTsBmPxlkY09T+ZdgwLDWfYAvfehXn7xk2Y3UaWwPWJmNospYVcOKYcrnX+MvAbviA+s1KUACNd5X2aGBeBzSScnnQNpvIgZ9xzUSJGda1uPrz91uQ0JpVw57etAn3ySfVvgPnC5wn6obQlgx6gsNgP+vBBm0kaGQ/y8Hm+LSt65qEwmz5AmIM+IWEAyOtO0AvdOrhN4g1VkbVvwGWTkTgfEuN16/y78Wg2jfgeK/hjU71b8gV7jXCKefbalgSGIHvqn1HrvSoUU6ZVPuOXOmbRjnlvxmv/FMTANmn+mvQdmzqhV71b0CcdYYcf7dB++m8F3r1sAFxcjNy+nZmjXBO/ewMsSaBhbIhxBs3C1VDSWsGYYZuDRBr8Swxrs3wUCMy29wN8Wa1NZ2a6bVGEMprDy9ozQD06uMFXtCazjk+fkKcrTQZVP8G2MwWIV97Uu1FEGNr0KnuKvC9pR5V7yHw+3Xg/DygBNr+ufeeJFzpXgr8jB8+1E71XQYfv+ehkbZv/y3gmiHenOvVAPvSwO7KwkWZ7Vz5JpTwlkYWcP4hd0YtvRBgbdHs0f8OJpydl70W2BMeV4Xj6q9vCjPGNpb2aPJSez8BiuBv0gVimL4AAAAASUVORK5CYII="
                        alt="icon google">
                    <p>Đăng nhập với Apple</p>
                  </div>
                </div>
                <p class="login__switch">HOẶC</p>
                <div class="login__boxInput">
                  <div class="input__group">
                    <input type="text" placeholder="Nhập email tài khoản học"
                           class="form-control ">
                    <p class="input__message__error"><small></small></p>
                  </div>
                  <div class="input__group">
                    <div style="position: relative;">
                      <input type="password"
                             placeholder="Nhập chính xác mật khẩu của bạn"
                             class="form-control "></div>
                    <p class="input__message__error"><small></small></p>
                  </div>
                </div>
                <div class="login__action">
                  <div class="button__action button__action--inactive"><p>Đăng nhập</p></div>
                </div>
                <p class="login__title__forgotPw">Quên mật khẩu?</p>
                <p style="font-weight: bold;"><span>Chưa có tài khoản? </span><a
                    href="/register?url-callback=https://learn.mochidemy.com/oauth&amp;lang=vi&amp;deviceType=4"><span
                    class="login__title__register">Tạo tài khoản học mới</span></a></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'register',
  data() {
    return {
      username: '',
      email: '',
      name: '',
      password: '',
      password_confirm: ''
    }
  },
  methods: {
    login() {
      this.$router.push({name: 'home'})
    }
  }
}
</script>
<style>
</style>
