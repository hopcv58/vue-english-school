<template>
  <div class="content position-r w-100" style="background: #F2F2F2; min-height: calc(100vh - 128px)">
    <div class="container-fluid">
      <div class="row justify-content-center">
        <Title>
          Danh sách bài kiểm tra
        </Title>
        <section class="section section-lg pt-lg-0 w-100" style="margin-top: 200px">
          <div class="container">
            <div class="d-flex justify-content-center my-3">
              <SearchCustom :tags="tagList" @submit="searchByTag"></SearchCustom>
            </div>
            <div v-if="store.isAdmin()" class="row mb-3" style="justify-content: flex-end">
              <router-link to="/tests/create" class="btn btn-success">Thêm bài test</router-link>
            </div>
            <div class="row justify-content-center bg-white">
              <table v-if="tests.length" class="table table-striped">
                <thead>
                <tr>
                  <th scope="col">Tên bài kiểm tra</th>
                  <th scope="col">Mô tả</th>
                  <th scope="col">Thời lượng</th>
                  <th scope="col">Tags</th>
                  <th scope="col"></th>
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
                    {{ shortenContent(test.availableTime) + ' phút' }}
                  </td>
                  <td>
                    <span v-for="tag in test.tagList" :key="tag.id" class="badge badge-primary">{{ tag.name }}</span>
                  </td>
                  <td style="display: flex; justify-content: center">
                    <router-link
                        :to="{ name: 'tests.detail', params: { id: test.id } }"
                        class="btn btn-sm btn-primary">Xem
                    </router-link>
                    <template v-if="store.isLoggedIn()">
                      <router-link
                          :to="{ name: 'tests.start', params: { id: test.id } }"
                          class="btn btn-sm btn-success">
                        Thi
                      </router-link>
                      <template v-if="store.isAdmin()">
                        <router-link
                            :to="{ name: 'tests.edit', params: { id: test.id } }"
                            class="btn btn-sm btn-primary">Sửa
                        </router-link>
                        <button class="btn btn-sm btn-danger" @click="deleteTest(test.id)">Xóa</button>
                      </template>
                    </template>
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
  </div>
</template>

<script>
import axios from 'axios'
import {store} from "@/store";
import ButtonSubmitSuccess from "@/components/ButtonSubmitSuccess.vue";
import SearchCustom from "@/components/SearchCustom.vue";

export default {
  name: 'tests',
  components: {SearchCustom, ButtonSubmitSuccess},
  data() {
    return {
      store,
      tests: [],
      pageNo: this.$route.query.page || 1,
      pageSize: this.$route.query.size || 10000,
      sortDir: this.$route.query.sortDir || 'DESC',
      sortName: this.$route.query.sortName || 'id',
      keyword: this.$route.query.keyword || '',
      totalPage: 0,
      total: 0,
      selectedTagId: "",
      tagList: [],
    }
  },
  async created() {
    await axios.get(`http://localhost:8080/quiz/api/tests?pageNo=${this.pageNo - 1}&pageSize=${this.pageSize}&sortDir=${this.sortDir}&sortName=${this.sortName}`)
        .then(res => {
          this.tests = res.data.data.items
          this.totalPage = res.data.data.totalPage
          this.total = res.data.data.totalElements
        })
        .catch(err => {
          store.displayError('Có lỗi xảy ra. Vui lòng thử lại')
        })
    await axios.get('http://localhost:8080/quiz/api/tags?pageSize=100000&pageNo=0')
        .then(res => {
          this.tagList = res.data.data.items
        })
        .catch(err => {
          store.displayError('Có lỗi xảy ra. Vui lòng thử lại')
        })
  },
  methods: {
    shortenContent(content) {
      if (content.length > 30) {
        return content.substring(0, 30) + '...'
      }
      return content
    },
    async searchByTag(tagId, keyword) {
      let url = `http://localhost:8080/quiz/api/tests?pageNo=${this.pageNo - 1}&pageSize=${this.pageSize}&sortDir=${this.sortDir}&sortName=${this.sortName}`
      if (tagId) {
        url += `&tagId=${tagId}`
      }
      if (keyword) {
        url += `&name=${keyword}`
      }
      await axios.get(url)
          .then(res => {
            this.tests = res.data.data.items
            this.totalPage = res.data.data.totalPage
            this.total = res.data.data.totalElements
          })
          .catch(err => {
            store.displayError('Có lỗi xảy ra. Vui lòng thử lại')
          })
    },
    deleteTest(id) {
      if (confirm('Bạn có chắc chắn muốn xóa bài kiểm tra này?')) {
        axios.delete(`http://localhost:8080/quiz/api/tests/${id}`)
            .then(res => {
              if (res.status === 200) {
                store.displayError('Xóa bài kiểm tra thành công!')
                this.tests = this.tests.filter(test => test.id !== id)
              }
            })
            .catch(err => {
              store.displayError('Có lỗi xảy ra. Vui lòng thử lại')
            })
      }
    }
  }
}
</script>
