<template>
  <div class="content position-r w-100" style="background: #F2F2F2; min-height: calc(100vh - 128px)">
    <div class="container-fluid">
      <div class="row justify-content-center">
        <Title>
          Thêm bài kiểm tra
        </Title>
        <modal :show.sync="addQuestionModal.show" modal-classes="modal-lg">
          <h6 slot="header" class="modal-title" id="modal-title-default">Thêm câu hỏi vào đề thi</h6>

          <select v-model="addQuestionModal.selectingTagId" class="form-control col-6" @change="getQuestionsForModal">
            <option value="">Chọn tag</option>
            <option v-for="tag in tagList" :key="tag.id" :value="tag.id">{{ tag.name }}</option>
          </select>

          <table v-if="addQuestionModal.questions.length" class="table table-striped">
            <thead>
            <tr>
              <th scope="col">Chọn</th>
              <th scope="col">Nội dung</th>
              <th scope="col">Câu hỏi</th>
              <th scope="col">Đáp án</th>
              <th scope="col">Tags</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="question in addQuestionModal.questions">
              <td>
                <input type="checkbox" :value="question.id" v-model="addQuestionModal.selectingQuestionIds">
              </td>
              <td v-html="question.content"></td>
              <td v-html="question.question"></td>
              <td v-html="convertAnswer(question)"></td>
              <td>
                <span v-for="tag in question.tagList" class="badge badge-primary mr-1">{{ tag.name }}</span>
              </td>
            </tr>
            </tbody>
          </table>
          <SearchNoData v-else></SearchNoData>
          <template slot="footer">
            <base-button type="primary" @click="saveModalChanges">Chọn câu hỏi</base-button>
            <base-button type="link" class="ml-auto" @click="discardModalChanges">
              Close
            </base-button>
          </template>
        </modal>
        <section class="section section-lg pt-lg-0 w-100" style="margin-top: 200px">
          <div class="container">
            <form>
              <div class="form-row">
                <div class="form-group col-md-12">
                  <label for="content">Tên bài kiểm tra</label>
                  <input v-model="name" required class="form-control"/>
                </div>
              </div>
              <div class="form-row">
                <div class="form-group col-md-12">
                  <label for="content">Mô tả</label>
                  <textarea v-model="description" required class="form-control" rows="5"></textarea>
                </div>
              </div>
              <div class="form-row">
                <div class="form-group col-md-12">
                  <label for="content">Thời gian làm bài</label>
                  <input v-model="availableTime" required class="form-control" type="number"/>
                </div>
              </div>
              <div class="form-row">
                <div class="form-group col-md-12">
                  <label for="tags">Tags</label>
                  <b-form-tags
                      v-if="tagNameList.length > 0"
                      id="tags-component-select"
                      v-model="selectedTags"
                      class="mb-2"
                      add-on-change
                      no-outer-focus
                  >
                    <template v-slot="{ tags, inputAttrs, inputHandlers, disabled, removeTag }">
                      <ul v-if="tags.length > 0" class="list-inline d-inline-block mb-2">
                        <li v-for="tag in tags" :key="tag" class="list-inline-item">
                          <b-form-tag
                              @remove="removeTag(tag)"
                              :title="tag"
                              :disabled="disabled"
                          >{{ tag }}
                          </b-form-tag>
                        </li>
                      </ul>
                      <b-form-select
                          v-bind="inputAttrs"
                          v-on="inputHandlers"
                          :disabled="disabled || availableTags.length === 0"
                          :options="availableTags"
                      >
                        <template #first>
                          <!-- This is required to prevent bugs with Safari -->
                          <option disabled value="">Chọn tag</option>
                        </template>
                      </b-form-select>
                    </template>
                  </b-form-tags>
                </div>
              </div>
            </form>

            <button type="button" class="btn btn-primary" @click="showModal">Thêm câu hỏi</button>
            <h4 v-if="addQuestionModal.selectedQuestionIds.length" class="mt-5">
              Các câu hỏi đã chọn
            </h4>
            <SearchNoData v-else>
              Chưa có câu hỏi nào được chọn
            </SearchNoData>
            <table v-if="addQuestionModal.selectedQuestionIds.length" class="table table-striped">
              <thead>
              <tr>
                <th scope="col">Nội dung</th>
                <th scope="col">Câu hỏi</th>
                <th scope="col">Đáp án</th>
                <th scope="col">Tags</th>
              </tr>
              </thead>
              <tbody>
              <template v-for="question in questions">
                <tr v-if="addQuestionModal.selectedQuestionIds.includes(question.id)">
                  <td v-html="question.content"></td>
                  <td v-html="question.question"></td>
                  <td v-html="convertAnswer(question)"></td>
                  <td>
                    <span v-for="tag in question.tagList" class="badge badge-primary mr-1">{{ tag.name }}</span>
                  </td>
                </tr>
              </template>
              </tbody>
            </table>
            <button
                v-if="this.name && this.availableTime && addQuestionModal.selectedQuestionIds.length"
                type="button" class="btn btn-success" @click="storeTest"
            >
              Lưu lại
            </button>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import {BFormTags, BFormTag, BFormSelect} from 'bootstrap-vue'
import Modal from '@/components/Modal.vue'
import {store} from "@/store";

export default {
  name: 'tests',
  components: {
    Modal,
    BFormTags,
    BFormTag,
    BFormSelect
  },
  data() {
    return {
      addQuestionModal: {
        show: false,
        selectingTagId: null,
        questions: [],
        selectingQuestionIds: [],
        selectedQuestionIds: []
      },
      tagList: [],
      questions: [],
      store,
      name: '',
      description: '',
      availableTime: '',
      selectedTags: [],
    }
  },
  computed: {
    tagNameList() {
      return this.tagList.map(tag => tag.name)
    },
    availableTags() {
      return this.tagNameList.filter(tag => !this.selectedTags.includes(tag))
    },
  },
  async created() {
    this.getTags()
    this.getQuestions()
  },
  methods: {
    showModal() {
      this.addQuestionModal.show = true
      this.addQuestionModal.selectingTagId = null
      this.addQuestionModal.questions = []
      this.addQuestionModal.selectingQuestionIds = this.addQuestionModal.selectedQuestionIds
    },
    discardModalChanges() {
      this.addQuestionModal.show = false
      this.addQuestionModal.selectingTagId = null
      this.addQuestionModal.questions = []
      this.addQuestionModal.selectingQuestionIds = this.addQuestionModal.selectedQuestionIds
    },
    saveModalChanges() {
      this.addQuestionModal.show = false
      this.addQuestionModal.selectingTagId = null
      this.addQuestionModal.questions = []
      this.addQuestionModal.selectedQuestionIds = this.addQuestionModal.selectingQuestionIds
      this.getQuestions()
    },
    async storeTest() {
      if (!this.name || !this.availableTime) {
        store.displayError('Vui lòng nhập đầy đủ thông tin')
        return
      }
      if (!this.addQuestionModal.selectedQuestionIds.length) {
        store.displayError('Vui lòng chọn it nhất 1 câu hỏi')
        return
      }

      const questionIds = []
      for (let questionId of this.addQuestionModal.selectedQuestionIds) {
        questionIds.push({id: questionId})
      }

      const tagIds = []
      for (let tagName of this.selectedTags) {
        const tag = this.tagList.find(tag => tag.name === tagName)
        tagIds.push({id: tag.id})
      }

      await axios.post('http://localhost:8080/quiz/api/tests', {
        name: this.name,
        description: this.description,
        availableTime: this.availableTime,
        tagList: tagIds,
        questionList: questionIds
      }, {
        headers: {
          'Authorization': `Bearer ${store.token}`
        }
      })
          .then(res => {
            store.displaySuccess('Tạo bài thi thành công')
            this.$router.push('/tests')
          })
          .catch(err => {
            console.log(err)
          })
    },
    async getQuestionsForModal() {
      if (!this.addQuestionModal.selectingTagId) {
        this.addQuestionModal.questions = []
        return
      }
      await axios.get('http://localhost:8080/quiz/api/questions?pageSize=100000&pageNo=0&tagId=' + this.addQuestionModal.selectingTagId)
          .then(res => {
            this.addQuestionModal.questions = res.data.data.items
          })
          .catch(err => {
            console.log(err)
          })
    },
    async getTags() {
      await axios.get('http://localhost:8080/quiz/api/tags?pageSize=100000&pageNo=0')
          .then(res => {
            this.tagList = res.data.data.items
          })
          .catch(err => {
            console.log(err)
          })
    },
    async getQuestions() {
      await axios.get('http://localhost:8080/quiz/api/questions?pageSize=100000&pageNo=0')
          .then(res => {
            this.questions = res.data.data.items
          })
          .catch(err => {
            console.log(err)
          })
    },
    convertAnswer(question) {
      if (question.correctAnswer) {
        question.correctAnswer = parseInt(question.correctAnswer)
      } else {
        return ''
      }
      return question['answer' + question.correctAnswer]
    },
  }
}
</script>
<style>
.badge-secondary {
  background-color: #5e72e4 !important;
  color: #fff !important;
  height: 24px !important;
  align-items: center !important;
}
</style>
