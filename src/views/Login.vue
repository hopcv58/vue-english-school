<template>
  <div class="layout">
    <div class="layout__element"
         style="background: url('img/theme/login-bg.png') center no-repeat; background-size: cover;">
      <div class="container-fluid" style="padding: 0px;">
        <div class="justify-content-md-center row">
          <div class="col-lg-6">
            <div class="layout__content">
              <div class="header">
                <p>Đăng nhập</p>
              </div>
              <div class="text-center login">
                <div class="login__boxTitle"><p>Đăng nhập tài khoản QuizChii</p></div>
                <div class="login__boxInput">
                  <div class="input__group">
                    <input
                        v-model="username"
                        type="text"
                        placeholder="Nhập tên đăng nhập"
                        class="form-control ">
                    <p class="input__message__error">
                      <small>{{ username && username.length < 6 ? 'Tên đăng nhập phải có ít nhất 6 ký tự' : ''}}</small>
                    </p>
                  </div>
                  <div class="input__group">
                    <div style="position: relative;">
                      <input
                          v-model="password"
                          type="password"
                          minlength="6"
                          placeholder="Nhập chính xác mật khẩu của bạn"
                          class="form-control"></div>
                    <p class="input__message__error">
                      <small>{{ password && password.length < 6 ? 'Mật khẩu phải có ít nhất 6 ký tự' : ''}}</small>
                    </p>
                  </div>
                </div>
                <div class="login__action">
                  <div v-if="password.length < 6 || username.length < 6"
                       class="button__action button__action--inactive">
                    <p>Đăng nhập</p>
                  </div>
                  <div v-else class="button__action button__action--active">
                    <div class="button__action__boxActive">
                      <p>Đăng nhập</p>
                    </div>
                  </div>
                </div>
                <p class="login__title__forgotPw">Quên mật khẩu?</p>
                <p style="font-weight: bold;"><span>Chưa có tài khoản? </span>
                  <RouterLink to="/register">
                    <span class="login__title__register">Tạo tài khoản học mới</span>
                  </RouterLink>
                </p>
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
      password: '',
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
