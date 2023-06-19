<template>
  <div class="content position-r w-100" style="background: #F2F2F2; min-height: calc(100vh - 128px)">
    <div class="container-fluid">
      <div class="row justify-content-center">
        <Title>
          {{ store.isAdmin() ? 'Thống kê' : 'Lịch sử thi' }}
        </Title>
        <AdminStatistic v-if="store.isAdmin()"/>
        <UserStatistic v-else-if="store.isLoggedIn()"/>
      </div>
    </div>
  </div>
</template>

<script>
import {store} from "@/store";
import AdminStatistic from "@/views/results/admin";
import UserStatistic from "@/views/results/user";

export default {
  name: 'results',
  components: {
    AdminStatistic,
    UserStatistic
  },
  data() {
    return {
      store
    }
  },
}
</script>
