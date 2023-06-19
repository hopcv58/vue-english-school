<template>
  <div class="content position-r w-100" style="background: #F2F2F2; min-height: calc(100vh - 128px)">
    <div class="container-fluid">
      <div class="row justify-content-center">
        <Title>
          Thông tin tài khoản
        </Title>
        <section class="section section-lg pt-lg-0 w-100" style="margin-top: 200px">
          <div class="py-5 bg-secondary">
            <div class="container">
              <form>
                <div class="register-box__input">
                  <div class="input__group">
                    <label>Tên đăng nhập</label>
                    <div class="form-control">{{ username }}</div>
                    <p class="input__message__error"><small>{{ usernameError }}</small></p>
                  </div>
                  <div class="input__group">
                    <label>Tên hiển thị</label>
                    <input v-model="name" type="text" placeholder="Tên của bạn" class="form-control" name="name">
                    <p class="input__message__error"><small>{{ nameError }}</small></p>
                  </div>
                  <div class="input__group">
                    <label>Email</label>
                    <input v-model="email" type="text" placeholder="Nhập chính xác email của bạn"
                           class="form-control" name="email">
                    <p class="input__message__error"><small>{{ emailError }}</small></p>
                  </div>
                  <div class="input__group">
                    <label>Mật khẩu</label>
                    <div style="position: relative;">
                      <input
                          v-model="password"
                          :type="showPassword ? 'text' : 'password'"
                          placeholder="Mật khẩu của bạn"
                          class="form-control"
                          name="password">
                      <span style="position: absolute; top:0.7em;right:1em;cursor: pointer;"
                            @click="showPassword = !showPassword">
                        <i v-if="showPassword" class="fa fa-eye-slash"></i>
                        <i v-else class="fa fa-eye"></i>
                      </span>
                    </div>
                    <p class="input__message__error"><small>{{ passwordError }}</small></p>
                  </div>
                </div>
                <div class="register__action">
                  <div v-if="!isFormValid"
                       class="button__action button__action--inactive d-flex justify-content-center align-items-center">
                    <p>Cập nhật tài khoản</p>
                  </div>
                  <div v-else class="button__action button__action--active">
                    <div class="button__action__boxActive d-flex justify-content-center align-items-center"
                         @click="updateUser">
                      <p>Cập nhật tài khoản</p>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import {store} from "@/store";
import axios from "axios";

export default {
  name: 'profile',
  data() {
    return {
      store,
      username: '',
      email: '',
      name: '',
      password: '',
      showPassword: false
    }
  },
  computed: {
    usernameError() {
      if (!this.username) return ''
      return this.username.length >= 3 && this.username.length <= 20 ? '' : 'Tên đăng nhập phải có từ 3 đến 20 ký tự'
    },
    emailError() {
      if (!this.email) return ''
      if (this.email.length > 50) return 'Email quá dài'
      const re = /\S+@\S+\.\S+/
      return re.test(this.email) ? '' : 'Email không hợp lệ'
    },
    nameError() {
      if (!this.name) return ''
      return this.name.length >= 6 && this.name.length <= 50 ? '' : 'Tên phải có từ 6 đến 50 ký tự'
    },
    passwordError() {
      if (!this.password) return ''
      return this.password.length >= 6 && this.password.length <= 20 ? '' : 'Mật khẩu phải có từ 6 đến 20 ký tự'
    },
    isFormValid() {
      return this.username && this.email && this.name && this.password
          && !this.usernameError && !this.emailError && !this.nameError && !this.passwordError
    }
  },
  created() {
    this.username = this.store.user.username
    this.name = this.store.user.name
    this.email = this.store.user.email
    this.password = this.store.user.password
  },
  methods: {
    updateUser() {
      axios.post(`http://localhost:8080/quiz/api/users/${this.store.user.id}`, {
        username: this.username,
        email: this.email,
        name: this.name,
        password: this.password
      }, {
        headers: {
          'Authorization': `Bearer ${this.store.token}`
        }
      }).then(res => {
        store.displaySuccess('Câp nhật thông tin thành công')
      }).catch(err => {
        if (err.response.data.error)
          store.displayError(err.response.data.error)
        else
          store.displayError('Đã có lỗi xảy ra. Vui lòng thử lại')
      })
    }
  }
}
</script>
