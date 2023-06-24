<template>
  <div class="content position-r w-100" style="background: #F2F2F2; min-height: calc(100vh - 128px)">
    <div class="container-fluid">
      <div class="row justify-content-center">
        <Title>
          Danh sách câu hỏi
        </Title>
        <section class="section section-lg pt-lg-0 w-100" style="margin-top: 200px">
          <div class="container">
            <div class="d-flex justify-content-center my-3">
              <SearchCustom :tags="[]" @submit="searchUsers"></SearchCustom>
            </div>
            <div class="row mb-3" style="justify-content: end">
              <router-link to="/users/create" class="btn btn-success">Thêm users</router-link>
            </div>
            <div class="row justify-content-center bg-white">
              <table v-if="users.length" class="table table-striped">
                <thead>
                <tr>
                  <th scope="col">Tên đăng nhập</th>
                  <th scope="col">Tên hiển thị</th>
                  <th scope="col">Email</th>
                  <th scope="col">Loại tài khoản</th>
                  <th scope="col">Trạng thái</th>
                  <th scope="col"></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="user in users" :key="user.username">
                  <td>{{ user.username }}</td>
                  <td>{{ user.name }}</td>
                  <td>{{ user.email }}</td>
                  <td> {{ getRoles(user.role) }}</td>
                  <td>{{ user.active ? 'Đang hoạt động' : 'Đã khóa' }}</td>
                  <td>
                    <router-link :to="'/users/' + user.username" class="btn btn-sm btn-primary">Chi tiết</router-link>
                  </td>
                </tr>
                </tbody>
              </table>
              <SearchNoData v-else></SearchNoData>
              <div v-if="totalPage === 0" class="text-center">
                <div class="spinner-border text-primary" role="status">
                  <span class="sr-only">Loading...</span>
                </div>
              </div>
              <div v-if="totalPage > 1">
                <base-pagination :page-count="totalPage" :per-page="pageSize" :total="total"
                                 v-model="pageNo"></base-pagination>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import { store } from '@/store'
import SearchCustom from '@/components/SearchCustom.vue'
import axios from 'axios'

export default {
  name: 'users',
  components: { SearchCustom },
  data () {
    return {
      store,
      users: [],
      pageNo: this.$route.query.page || 1,
      pageSize: this.$route.query.size || 10000,
      sortDir: this.$route.query.sortDir || 'DESC',
      sortName: this.$route.query.sortName || 'id',
      keyword: this.$route.query.keyword || '',
      totalPage: 0,
      total: 0,
    }
  },
  async created () {
    if (!store.isAdmin()) {
      this.$router.push('/login')
    }
    await this.searchUsers('', '')
  },
  methods: {
    getRoles (roles) {
      if (!roles) return 'Người dùng'
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === 'ROLE_ADMIN') {
          return 'Quản trị viên'
        }
      }
      return 'Người dùng'
    },
    async searchUsers (tagId, keyword) {
      let url = `http://localhost:8080/quiz/api/users?pageNo=${this.pageNo - 1}&pageSize=${this.pageSize}&sortDir=${this.sortDir}&sortName=${this.sortName}`
      if (keyword) {
        url += `&content=${keyword}`
      }
      await axios.get(url, {
        headers: {
          'Authorization': `Bearer ${store.token}`
        }
      })
          .then(res => {
            this.users = res.data.data.items
            this.totalPage = res.data.data.totalPage
            this.total = res.data.data.totalElements
          })
          .catch(err => {
            store.displayError('Có lỗi xảy ra. Vui lòng thử lại')
          })
    },
  }
}
</script>
