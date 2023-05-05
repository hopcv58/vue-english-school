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
                  Danh sách câu hỏi
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
          <router-link to="/questions/create" class="btn btn-success">Thêm câu hỏi</router-link>
        </div>
        <div class="row justify-content-center bg-white">
          <table v-if="questions" class="table table-striped">
            <thead>
            <tr>
              <th scope="col">Nội dung</th>
              <th scope="col">Đáp án A</th>
              <th scope="col">Đáp án B</th>
              <th scope="col">Đáp án C</th>
              <th scope="col">Đáp án D</th>
              <th scope="col">Đáp án đúng</th>
              <th scope="col">Tags</th>
              <th scope="col" style="min-width: 130px">Thao tác</th>
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
                <span v-for="tag in question.tagList" :key="tag.id" class="badge badge-primary">{{ tag.name }}</span>
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
            if (res.status === 200) {
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
