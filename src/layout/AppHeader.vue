<template>
  <header class="header-global">
    <base-nav class="navbar-main" transparent type="" effect="light" expand>
      <router-link slot="brand" class="navbar-brand mr-lg-5" to="/">
        <img src="img/brand/white.png" alt="logo">
      </router-link>

      <div class="row" slot="content-header" slot-scope="{closeMenu}">
        <div class="col-6 collapse-brand">
          <a href="https://demos.creative-tim.com/vue-argon-design-system/documentation/">
            <img src="img/brand/blue.png">
          </a>
        </div>
        <div class="col-6 collapse-close">
          <close-button @click="closeMenu"></close-button>
        </div>
      </div>

      <ul class="navbar-nav navbar-nav-hover align-items-lg-center">
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
      <ul class="navbar-nav align-items-lg-center ml-lg-auto">
        <li class="nav-item">
          <base-input placeholder="Search"
                      addon-left-icon="fa fa-search">
          </base-input>
        </li>
      </ul>
      <ul class="navbar-nav align-items-lg-center ml-lg-auto">
        <li class="nav-item">
          <router-link to="/login" class="nav-link">
            Đăng nhập
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/register" class="nav-link">
            Đăng ký
          </router-link>
        </li>
      </ul>
      <base-dropdown>
        <router-link to="/profile" class="dropdown-item">Profile</router-link>
        <router-link to="/logout" class="dropdown-item">Logout</router-link>
      </base-dropdown>
    </base-nav>
  </header>
</template>
<script>
import BaseNav from "@/components/BaseNav";
import BaseDropdown from "@/components/BaseDropdown";
import CloseButton from "@/components/CloseButton";

export default {
  components: {
    BaseNav,
    CloseButton,
    BaseDropdown
  },
  created() {
  }
};
</script>
<style>
</style>
