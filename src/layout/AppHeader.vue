<template>
  <header class="header-global">
    <div class="main menu"
         style="background: #F2F2F2;; width: 100%; height: 68px; box-shadow: -10px -10px 10px rgba(189, 189, 189, 0.2), 6px 6px 10px rgba(189, 189, 189, 0.2); position: fixed; top: 0; z-index: 200">
      <div class="container-fluid">
        <div class="row">
          <div class="col-3 _col-1 position-r">
            <div class="logo-menu vertical-center">
              <router-link to="/">
                <img src="https://learn.mochidemy.com/image/Logo_mochi-01.png" class="w-100 logo-pc">
              </router-link>
              <a class="open-loading" href="https://learn.mochidemy.com">
                <img src="https://learn.mochidemy.com/image/mochi_no.png" class="w-100 logo-small">
              </a>
            </div>
          </div>
          <div class="col-6 _col-2">
            <div class="row menu">
              <div class="col-3 p-0 text-center menu-item" :class="{active: $route.path.includes('tests')}">
                <router-link to="/tests">
                  <div class="menu-item-box text-center w-100">
                    <img src="https://learn.mochidemy.com/image/e4dd21e9ad4131ae0908c4612ed53950.png" alt="">
                    <p class="mb-0">
                      Bài thi
                    </p>
                  </div>
                </router-link>
              </div>
              <div class="col-3 p-0 text-center menu-item" :class="{active: $route.path.includes('questions')}">
                <router-link to="/questions">
                  <div class="menu-item-box text-center w-100">
                    <img src="https://learn.mochidemy.com/image/community.png" alt="">
                    <p class="mb-0">
                      Câu hỏi
                    </p>
                  </div>
                </router-link>
              </div>
              <div class="col-3 p-0 text-center menu-item" :class="{active: $route.path.includes('tags')}">
                <router-link to="/tags">
                  <div class="menu-item-box text-center w-100">
                    <img src="https://learn.mochidemy.com/image/c0a2da7975636aadc438062308305511.png" alt="">
                    <p class="mb-0">
                      Thẻ
                    </p>
                  </div>
                </router-link>
              </div>
              <div class="col-3 p-0 text-center menu-item" :class="{active: $route.path.includes('examine')}">
                <router-link to="/statistic">
                  <div class="menu-item-box text-center w-100">
                    <img src="https://learn.mochidemy.com/image/0de5e72098e28718ff302f2a5f010ea8.png" alt="">
                    <p class="mb-0">
                      Thống kê
                    </p>
                  </div>
                </router-link>
              </div>
            </div>
          </div>
          <div class="col-3 _col-3 position-r">
            <div class="position-a vertical-center" style="right: 60px;">
              <div class="menu-user-name">
                <span class="text-user-name" style="color: #FFCB08" v-if="user">
                  {{ user.name }}
                </span>
                <span class="text-user-name" style="color: #FFCB08" v-else>
                  Guest
                </span>
              </div>
              <div class="menu-avatar"
                   style="background: url(https://learn.mochidemy.com/image/0c0722e80c76ce7315418a18480e28d8.png); background-size: cover;">
              </div>
              <div class="position-a icon-menu-dropdown-open">
                <img src="https://learn.mochidemy.com/svg/dropdown_menu.svg">
              </div>
              <div class="position-a icon-menu-dropdown-close" style="display: none">
                <img src="https://learn.mochidemy.com/svg/dropdown_menu.svg">
              </div>
            </div>
          </div>
          <div class="position-a menu-dropdown text-center" style="display: none;">
            <a href="javascript:" onclick="openPopupPageHallOffFame()" class="btn-setting">
              <div class="btn-top text-start btn-active menu-dropdown-item">
                <span class="text-white p-dropdown vertical-center">
                  Thành tích học tập
                </span>
                <img src="https://learn.mochidemy.com/image/c40f2d0a61141a0fd73106c254f8d7aa.png" alt="">
              </div>
            </a>
            <a href="javascript:" onclick="openPopupPage('#popup-page-setting')" class="btn-setting"
               style="margin-bottom: 30px">
              <div class="btn-top-setting text-start btn-active menu-dropdown-item">
                <span class="text-white p-dropdown vertical-center">
                  Cài đặt tài khoản
                </span>
                <img src="https://learn.mochidemy.com/image/98713df50c21cbe016386923bf65dc97.png" alt="">
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>
<script>

export default {
  created() {
  },
  computed: {
    user() {
      return window.user;
    }
  },
};
</script>
<style>
</style>
