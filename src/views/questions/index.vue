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
              <SearchCustom :tags="tagList" @submit="searchByTag"></SearchCustom>
            </div>
            <div v-if="store.isAdmin()" class="row mb-3" style="justify-content: end">
              <router-link class="btn btn-success" to="/questions/create">Thêm câu hỏi</router-link>
            </div>
            <div class="row justify-content-center bg-white">
              <table v-if="questions.length" class="table table-striped">
                <thead>
                <tr>
                  <th scope="col">Nội dung</th>
                  <th scope="col">Câu hỏi</th>
                  <th v-if="store.isAdmin()" scope="col" style="min-width: 60px">
                    Answer
                  </th>
                  <th scope="col" style="min-width: 130px">Tags</th>
                  <th scope="col" style="min-width: 130px"></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="question in questions" :key="question.id">
                  <td :title="question.content" data-toggle="tooltip" v-html="question.content">
                  </td>
                  <td :title="question.question" data-toggle="tooltip" v-html="question.question">
                  </td>
                  <td v-if="store.isAdmin()" v-html="convertAnswer(question)"></td>
                  <td>
                    <span v-for="tag in question.tagList" :key="tag.id" class="badge badge-primary">{{
                        tag.name
                      }}</span>
                  </td>
                  <td>
                    <template v-if="store.isAdmin()">
                      <router-link
                          :to="{ name: 'questions.edit', params: { id: question.id } }"
                          class="btn btn-sm btn-primary">Sửa
                      </router-link>
                      <button class="btn btn-sm btn-danger" @click="deleteQuestion(question.id)">Xóa</button>
                    </template>
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
                <base-pagination v-model="pageNo" :page-count="totalPage" :per-page="pageSize"
                                 :total="total"></base-pagination>
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
import { store } from '@/store'
import SearchCustom from '@/components/SearchCustom.vue'

export default {
  name: 'questions',
  components: { SearchCustom },
  data () {
    return {
      store,
      questions: [],
      pageNo: this.$route.query.page || 1,
      pageSize: this.$route.query.size || 10000,
      sortDir: this.$route.query.sortDir || 'DESC',
      sortName: this.$route.query.sortName || 'id',
      keyword: this.$route.query.keyword || '',
      totalPage: 0,
      total: 0,
      tagList: []
    }
  },
  async created () {
    await axios.get(`http://localhost:8080/quiz/api/questions?pageNo=${this.pageNo - 1}&pageSize=${this.pageSize}&sortDir=${this.sortDir}&sortName=${this.sortName}`)
        .then(res => {
          this.questions = res.data.data.items
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
    convertAnswer (question) {
      if (question.correctAnswer) {
        question.correctAnswer = parseInt(question.correctAnswer)
      } else {
        return ''
      }
      return question['answer' + question.correctAnswer]
    },
    async searchByTag (tagId, keyword) {
      let url = `http://localhost:8080/quiz/api/questions?pageNo=${this.pageNo - 1}&pageSize=${this.pageSize}&sortDir=${this.sortDir}&sortName=${this.sortName}`
      if (tagId) {
        url += `&tagId=${tagId}`
      }
      if (keyword) {
        url += `&content=${keyword}`
      }
      await axios.get(url)
          .then(res => {
            this.questions = res.data.data.items
            this.totalPage = res.data.data.totalPage
            this.total = res.data.data.totalElements
          })
          .catch(err => {
            store.displayError('Có lỗi xảy ra. Vui lòng thử lại')
          })
    },
    deleteQuestion (id) {
      if (confirm('Bạn có chắc chắn muốn xóa câu hỏi này?')) {
        axios.delete(`http://localhost:8080/quiz/api/questions/${id}`)
            .then(res => {
              if (res.status === 200 || res.status === 204) {
                store.displaySuccess('Xóa câu hỏi thành công!')
                this.questions = this.questions.filter(question => question.id !== id)
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
