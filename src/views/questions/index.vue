<template>
  <div class="content position-r w-100" style="background: #F2F2F2; min-height: calc(100vh - 128px)">
    <div class="container-fluid">
      <div class="row justify-content-center">
        <Title>
          Danh sách câu hỏi
        </Title>
        <section class="section section-lg pt-lg-0 w-100" style="margin-top: 200px">
          <div class="container">
            <div class="row mb-3" style="justify-content: end">
              <router-link to="/questions/create" class="btn btn-success">Thêm câu hỏi</router-link>
            </div>
            <div class="row justify-content-center bg-white">
              <table v-if="questions.length" class="table table-striped">
                <thead>
                <tr>
                  <th scope="col">Nội dung</th>
                  <th scope="col" style="min-width: 120px">A</th>
                  <th scope="col" style="min-width: 120px">B</th>
                  <th scope="col" style="min-width: 120px">C</th>
                  <th scope="col" style="min-width: 120px">D</th>
                  <th scope="col" style="min-width: 60px">Answer</th>
                  <th scope="col" style="min-width: 130px">Tags</th>
                  <th scope="col" style="min-width: 132px">Thao tác</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="question in questions" :key="question.id">
                  <td data-toggle="tooltip" :title="question.content">
                    {{ shortenContent(question.content) }}
                  </td>
                  <td data-toggle="tooltip" :title="question.answer1">
                    {{ shortenContent(question.answer1) }}
                  </td>
                  <td data-toggle="tooltip" :title="question.answer2">
                    {{ shortenContent(question.answer2) }}
                  </td>
                  <td data-toggle="tooltip" :title="question.answer3">
                    {{ shortenContent(question.answer3) }}
                  </td>
                  <td data-toggle="tooltip" :title="question.answer4">
                    {{ shortenContent(question.answer4) }}
                  </td>
                  <td>{{ convertAnswer(question.correctAnswer) }}</td>
                  <td>
                    <span v-for="tag in question.tagList" :key="tag.id" class="badge badge-primary">{{
                        tag.name
                      }}</span>
                  </td>
                  <td>
                    <router-link
                        :to="{ name: 'questions.edit', params: { id: question.id } }"
                        class="btn btn-sm btn-primary">Sửa
                    </router-link>
                    <button class="btn btn-sm btn-danger" @click="deleteQuestion(question.id)">Xóa</button>
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
    </div>
    <div class="mochi-co">
      <img src="https://learn.mochidemy.com/svg/mochimochi.svg">
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'questions',
  components: {},
  data () {
    return {
      questions: [],
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
    await axios.get(`http://localhost:8080/quiz/questions?pageNo=${this.pageNo - 1}&pageSize=${this.pageSize}&sortDir=${this.sortDir}&sortName=${this.sortName}`)
      .then(res => {
        this.questions = res.data.data.items
        this.totalPage = res.data.data.totalPage
        this.total = res.data.data.totalElements
      })
      .catch(err => {
        console.log(err)
      })
  },
  methods: {
    convertAnswer (correctAnswer) {
      correctAnswer = parseInt(correctAnswer)
      if (correctAnswer === 1) {
        return 'A'
      } else if (correctAnswer === 2) {
        return 'B'
      } else if (correctAnswer === 3) {
        return 'C'
      } else if (correctAnswer === 4) {
        return 'D'
      }
    },
    shortenContent (content) {
      if (content.length > 20) {
        return content.substring(0, 20) + '...'
      }
      return content
    },
    deleteQuestion (id) {
      if (confirm('Bạn có chắc chắn muốn xóa câu hỏi này?')) {
        axios.delete(`http://localhost:8080/quiz/questions/${id}`)
          .then(res => {
            if (res.status === 200 || res.status === 204) {
              alert('Xóa câu hỏi thành công!')
              this.questions = this.questions.filter(question => question.id !== id)
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
