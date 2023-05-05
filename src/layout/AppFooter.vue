<template>
  <footer class="footer has-cards">
    <div class="container">
      <div class="row align-items-center justify-content-md-between">
        <div class="col-md-6">
          <div class="copyright">
            &copy; {{ year }}
            ThaoNP
          </div>
        </div>
        <div class="col-md-6">
          <ul class="nav nav-footer justify-content-end">
            <li class="nav-item">
              <router-link to="/" class="nav-link">
                Home
              </router-link>
            </li>
            <li class="nav-item">
              <router-link to="/tests" class="nav-link">
                Đề thi
              </router-link>
            </li>
            <li class="nav-item">
              <router-link to="/questions" class="nav-link">
                Câu hỏi
              </router-link>
            </li>
            <li class="nav-item">
              <router-link to="/tags" class="nav-link">
                Tags
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </footer>
</template>
<script>
export default {
  name: 'app-footer',
  data () {
    return {
      year: new Date().getFullYear()
    }
  }
}
</script>
<style>
</style>
