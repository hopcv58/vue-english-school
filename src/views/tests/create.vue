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
                  Thêm bài kiểm tra
                </h1>
              </div>
            </div>
          </div>
        </div>
      </section>
      <!-- 1st Hero Variation -->
    </div>
    <modal :show.sync="addQuestionModal.show">
      <h6 slot="header" class="modal-title" id="modal-title-default">Thêm câu hỏi vào đề thi</h6>

      <select v-model="addQuestionModal.selectingTagId" class="form-control col-6" @change="getQuestionsForModal">
        <option value="">Chọn tag</option>
        <option v-for="tag in tagList" :value="tag.id">{{ tag.name }}</option>
      </select>

      <table v-if="addQuestionModal.questions.length" class="table table-striped">
        <thead>
        <tr>
          <th scope="col">Chọn</th>
          <th scope="col">Nội dung</th>
          <th scope="col">Tags</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="question in addQuestionModal.questions">
          <td>
            <input type="checkbox" :value="question.id" v-model="addQuestionModal.selectingQuestionIds">
          </td>
          <td>{{ question.content }}</td>
          <td>
            <span v-for="tag in question.tagList" class="badge badge-primary mr-1">{{ tag.name }}</span>
          </td>
        </tr>
        </tbody>
      </table>

      <template slot="footer">
        <base-button type="primary" @click="saveModalChanges">Save changes</base-button>
        <base-button type="link" class="ml-auto" @click="discardModalChanges">
          Close
        </base-button>
      </template>
    </modal>
    <section class="section section-lg pt-lg-0 mt--300">
      <div class="py-5 bg-secondary">
        <div class="container">
          <form @submit.prevent="storeTest">
            <div class="form-row">
              <div class="form-group col-md-12">
                <label for="content">Tên bài kiểm tra</label>
                <input v-model="name" required class="form-control" />
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
                        >{{ tag }}</b-form-tag>
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
            <button type="submit" class="btn btn-success">Thêm</button>
            <button type="button" class="btn btn-primary" @click="showModal">Thêm câu hỏi</button>
          </form>

          <h4 v-if="addQuestionModal.selectedQuestionIds.length" class="mt-5">
            Các câu hỏi đã chọn
          </h4>
          <h4 v-else class="mt-5">
            Chưa có câu hỏi nào được chọn
          </h4>
          <table v-if="addQuestionModal.selectedQuestionIds.length" class="table table-striped">
            <thead>
            <tr>
              <th scope="col">Nội dung</th>
              <th scope="col">Tags</th>
            </tr>
            </thead>
            <tbody>
            <template v-for="question in questions">
              <tr v-if="addQuestionModal.selectedQuestionIds.includes(question.id)">
                <td>{{ question.content }}</td>
                <td>
                  <span v-for="tag in question.tagList" class="badge badge-primary mr-1">{{ tag.name }}</span>
                </td>
              </tr>
            </template>
            </tbody>
          </table>
        </div>
      </div>
    </section>

  </div>
</template>

<script>
import axios from 'axios'
import { BFormTags, BFormTag, BFormSelect } from 'bootstrap-vue'
import Modal from '@/components/Modal.vue'

export default {
  name: 'tests',
  components: {
    Modal,
    BFormTags,
    BFormTag,
    BFormSelect
  },
  data () {
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

      name: '',
      description: '',
      availableTime: '',
      selectedTags: [],
    }
  },
  computed: {
    tagNameList () {
      return this.tagList.map(tag => tag.name)
    },
    availableTags () {
      return this.tagNameList.filter(tag => !this.selectedTags.includes(tag))
    },
  },
  async created () {
    this.getTags()
    this.getQuestions()
  },
  methods: {
    showModal () {
      this.addQuestionModal.show = true
      this.addQuestionModal.selectingTagId = null
      this.addQuestionModal.questions = []
      this.addQuestionModal.selectingQuestionIds = this.addQuestionModal.selectedQuestionIds
    },
    discardModalChanges () {
      this.addQuestionModal.show = false
      this.addQuestionModal.selectingTagId = null
      this.addQuestionModal.questions = []
      this.addQuestionModal.selectingQuestionIds = this.addQuestionModal.selectedQuestionIds
    },
    saveModalChanges () {
      this.addQuestionModal.show = false
      this.addQuestionModal.selectingTagId = null
      this.addQuestionModal.questions = []
      this.addQuestionModal.selectedQuestionIds = this.addQuestionModal.selectingQuestionIds
      this.getQuestions()
    },
    async storeTest () {
      if (!this.name || !this.availableTime) {
        alert('Vui lòng nhập đầy đủ thông tin')
        return
      }

      const questionIds = []
      for (let questionId of this.addQuestionModal.selectedQuestionIds) {
        questionIds.push({ id: questionId })
      }

      const tagIds = []
      for (let tagName of this.selectedTags) {
        const tag = this.tagList.find(tag => tag.name === tagName)
        tagIds.push({ id: tag.id })
      }

      await axios.post('http://localhost:8080/quiz/tests', {
        name: this.name,
        description: this.description,
        availableTime: this.availableTime,
        tagList: tagIds,
        questionList: questionIds
      })
        .then(res => {
          this.$router.push('/tests/' + res.data.data.id + '/edit')
        })
        .catch(err => {
          console.log(err)
        })
    },
    async getQuestionsForModal () {
      if (!this.addQuestionModal.selectingTagId) {
        this.addQuestionModal.questions = []
        return
      }
      await axios.get('http://localhost:8080/quiz/questions?pageSize=100000&pageNo=0&tagId=' + this.addQuestionModal.selectingTagId)
        .then(res => {
          this.addQuestionModal.questions = res.data.data.items
        })
        .catch(err => {
          console.log(err)
        })
    },
    async getTags () {
      await axios.get('http://localhost:8080/quiz/tags?pageSize=100000&pageNo=0')
        .then(res => {
          this.tagList = res.data.data.items
        })
        .catch(err => {
          console.log(err)
        })
    },
    async getQuestions () {
      await axios.get('http://localhost:8080/quiz/questions?pageSize=100000&pageNo=0')
        .then(res => {
          this.questions = res.data.data.items
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
    height: 24px !important;
    align-items: center !important;
}
</style>