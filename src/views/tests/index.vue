<template>
  <div>
    <div class="position-relative">
      <!-- shape Hero -->
      <section class="section-shaped my-0">
        <div class="shape shape-style-1 shape-default shape-skew">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div class="container shape-container d-flex">
          <div class="col px-0">
            <div class="row">
              <div class="col-lg-6">
                <h1 class="display-3  text-white">
                  Danh sách bài kiểm tra
                </h1>
              </div>
            </div>
          </div>
        </div>
      </section>
      <!-- 1st Hero Variation -->
    </div>
    <section class="section section-lg pt-lg-0 mt--300">
      <div class="container">
        <div class="row mb-3" style="justify-content: end">
          <router-link to="/tests/create" class="btn btn-success">Thêm bài kiểm tra</router-link>
        </div>
        <div class="row justify-content-center bg-white">
          <table v-if="tests.length" class="table table-striped">
            <thead>
            <tr>
              <th scope="col">Tên bài kiểm tra</th>
              <th scope="col">Mô tả</th>
              <th scope="col">Thời lượng (phút)</th>
              <th scope="col">Tags</th>
              <th scope="col" style="min-width: 130px">Thao tác</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="test in tests" :key="test.id">
              <td data-toggle="tooltip" :title="test.name">
                {{ shortenContent(test.name) }}
              </td>
              <td data-toggle="tooltip" :title="test.description">
                {{ shortenContent(test.description) }}
              </td>
              <td data-toggle="tooltip" :title="test.availableTime">
                {{ shortenContent(test.availableTime) }}
              </td>
              <td>
                <span v-for="tag in test.tagList" :key="tag.id" class="badge badge-primary">{{ tag.name }}</span>
              </td>
              <td>
                <router-link
                  :to="{ name: 'tests.edit', params: { id: test.id } }"
                  class="btn btn-sm btn-primary">Sửa
                </router-link>
                <button class="btn btn-sm btn-danger" @click="deleteTest(test.id)">Xóa</button>
              </td>
            </tr>
            </tbody>
          </table>
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
</template>

<script>
import axios from 'axios'

export default {
  name: 'tests',
  components: {},
  data () {
    return {
      tests: [],
      pageNo: this.$route.query.page || 1,
      pageSize: this.$route.query.size || 10000,
      sortDir: this.$route.query.sortDir || 'DESC',
      sortName: this.$route.query.sortName || 'id',
      keyword: this.$route.query.keyword || '',
      totalPage: 0,
      total: 0
    }
  },
  async created () {
    await axios.get(`http://localhost:8080/quiz/tests?pageNo=${this.pageNo - 1}&pageSize=${this.pageSize}&sortDir=${this.sortDir}&sortName=${this.sortName}`)
      .then(res => {
        this.tests = res.data.data.items
        this.totalPage = res.data.data.totalPage
        this.total = res.data.data.totalElements
      })
      .catch(err => {
        console.log(err)
      })
  },
  methods: {
    shortenContent (content) {
      if (content.length > 30) {
        return content.substring(0, 30) + '...'
      }
      return content
    },
    deleteTest (id) {
      if (confirm('Bạn có chắc chắn muốn xóa bài kiểm tra này?')) {
        axios.delete(`http://localhost:8080/quiz/tests/${id}`)
          .then(res => {
            if (res.status === 200) {
              alert('Xóa bài kiểm tra thành công!')
              this.tests = this.tests.filter(test => test.id !== id)
            }
          })
          .catch(err => {
            console.log(err)
          })
      }
    }
  }
}
</script>
