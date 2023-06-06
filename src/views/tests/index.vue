<template>
  <div class="content position-r w-100" style="background: #F2F2F2; min-height: calc(100vh - 128px)">
    <div class="container-fluid">
      <div class="row justify-content-center">
        <Title>
          Danh sách bài kiểm tra
        </Title>
        <section class="section section-lg pt-lg-0" style="margin-top: 200px">
          <div class="container">
            <div class="row mb-3" style="justify-content: space-between">
              <SearchInput></SearchInput>
            </div>
            <div class="row mb-3" style="justify-content: flex-end">
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
              <SearchNoData v-else></SearchNoData>
              <div v-if="totalPage > 1">
                <base-pagination :page-count="totalPage" :per-page="pageSize" :total="total"
                                 v-model="pageNo"></base-pagination>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
    <div class="mochi-co">
      <img src="https://learn.mochidemy.com/svg/mochimochi.svg">
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'tests',
  data() {
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
