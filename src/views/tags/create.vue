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
                  Thêm câu hỏi
                </h1>
              </div>
            </div>
          </div>
        </div>
      </section>
      <!-- 1st Hero Variation -->
    </div>
    <section class="section section-lg pt-lg-0 mt--300">
      <div class="py-5 bg-secondary">
        <div class="container">
          <form @submit.prevent="storeQuestion">
            <div class="form-row">
              <div class="form-group col-md-12">
                <label for="content">Nội dung câu hỏi</label>
                <textarea v-model="content" required class="form-control" rows="5"></textarea>
              </div>
            </div>
            <div class="form-row">
              <div class="form-group col-md-6">
                <label for="answer1">Đáp án A</label>
                <textarea v-model="answer1" required class="form-control" rows="2"></textarea>
              </div>
              <div class="form-group col-md-6">
                <label for="answer2">Đáp án B</label>
                <textarea v-model="answer2" required class="form-control" rows="2"></textarea>
              </div>
            </div>
            <div class="form-row">
              <div class="form-group col-md-6">
                <label for="answer3">Đáp án C</label>
                <textarea v-model="answer3" required class="form-control" rows="2"></textarea>
              </div>
              <div class="form-group col-md-6">
                <label for="answer4">Đáp án D</label>
                <textarea v-model="answer4" required class="form-control" rows="2"></textarea>
              </div>
            </div>
            <div class="form-row">
              <div class="form-group col-md-6">
                <label for="correctAnswer">Đáp án đúng</label>
                <select v-model="correctAnswer" required class="form-control">
                  <option value="1">A</option>
                  <option value="2">B</option>
                  <option value="3">C</option>
                  <option value="4">D</option>
                </select>
              </div>
            </div>
            <div class="form-row">
              <div class="form-group col-md-12">
                <label for="tags">Tags</label>
                <b-form-tags
                  v-model="selectedTags"
                  :tags="tags"
                  class="mb-2"
                  placeholder="Nhập tag, cách nhau bởi dấu phẩy, chấm phẩy hoặc dấu cách"
                  remove-on-delete
                  separator=" ,;"
                >
                </b-form-tags>
              </div>
            </div>
            <button type="submit" class="btn btn-success">Thêm</button>
          </form>
        </div>
      </div>
    </section>

  </div>
</template>

<script>
import axios from 'axios'
import { BFormTags } from 'bootstrap-vue'

export default {
  name: 'questions',
  components: {
    BFormTags
  },
  data () {
    return {
      content: '',
      answer1: '',
      answer2: '',
      answer3: '',
      answer4: '',
      correctAnswer: '',
      selectedTags: [],
      tags: [],
    }
  },
  async created () {
  },
  methods: {
    async storeQuestion() {
      await axios.get('http://localhost:8080/quiz/tags?pageSize=100000&pageNo=0')
        .then(res => {
          this.tags = res.data.data.items
        })
        .catch(err => {
          console.log(err)
        })
      let tagIds = []

      for (let selectedTag of this.selectedTags) {
        let tag = this.tags.find(tag => tag.name === selectedTag)
        if (tag) {
          tagIds.push({ id: tag.id })
        } else {
          await axios.post('http://localhost:8080/quiz/tags', {
            name: selectedTag
          })
            .then(res => {
              tagIds.push({ id: res.data.data.id })
            })
            .catch(err => {
              console.log(err)
            })
        }
      }

      await axios.post('http://localhost:8080/quiz/questions', {
        content: this.content,
        answer1: this.answer1,
        answer2: this.answer2,
        answer3: this.answer3,
        answer4: this.answer4,
        correctAnswer: this.correctAnswer,
        tagList: tagIds
      })
        .then(res => {
          this.$router.push('/questions')
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>
<style>
.badge-secondary {
    background-color: #5e72e4 !important;
    color: #fff !important;
    height: 24px!important;
    align-items: center!important;
}
</style>