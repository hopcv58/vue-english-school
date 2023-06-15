<template>
  <div class="content position-r w-100" style="background: #F2F2F2; min-height: calc(100vh - 128px)">
    <div class="container-fluid">
      <div class="row justify-content-center">
        <Title>
          Cập nhật câu hỏi
        </Title>
        <section class="section section-lg pt-lg-0 w-100" style="margin-top: 200px">
          <div class="py-5 bg-secondary">
            <div class="container">
              <form @submit.prevent="storeQuestion">
                <div class="form-row">
                  <div class="form-group col-md-12">
                    <label for="content">Nội dung câu hỏi</label>
                    <wysiwyg v-model="content" class="form-control" required style="min-height: 200px;"/>
                  </div>
                </div>
                <div class="form-row">
                  <div class="form-group col-md-12">
                    <label for="question">Dữ kiện cho câu hỏi</label>
                    <wysiwyg v-model="question" class="form-control" required style="min-height: 200px;"/>
                  </div>
                </div>
                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="answer1">Đáp án A</label>
                    <wysiwyg v-model="answer1" required class="form-control" style="min-height: 150px;"/>
                  </div>
                  <div class="form-group col-md-6">
                    <label for="answer2">Đáp án B</label>
                    <wysiwyg v-model="answer2" required class="form-control" style="min-height: 150px;"/>
                  </div>
                </div>
                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="answer3">Đáp án C</label>
                    <wysiwyg v-model="answer3" required class="form-control" style="min-height: 150px;"/>
                  </div>
                  <div class="form-group col-md-6">
                    <label for="answer4">Đáp án D</label>
                    <wysiwyg v-model="answer4" required class="form-control" style="min-height: 150px;"/>
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
                <button type="submit" class="btn btn-primary">Cập nhật</button>
              </form>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import {BFormSelect, BFormTag, BFormTags} from 'bootstrap-vue'
import {store} from '@/store'

export default {
  name: 'questions',
  components: {
    BFormTag,
    BFormSelect,
    BFormTags
  },
  data() {
    return {
      store,
      content: '',
      question: '',
      answer1: '',
      answer2: '',
      answer3: '',
      answer4: '',
      correctAnswer: '',
      selectedTags: [],
      tagList: [],
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
    await this.getTags()
    await axios.get('http://localhost:8080/quiz/api/questions/' + this.$route.params.id)
        .then(res => {
          this.content = res.data.data.content
          this.question = res.data.data.question
          this.answer1 = res.data.data.answer1
          this.answer2 = res.data.data.answer2
          this.answer3 = res.data.data.answer3
          this.answer4 = res.data.data.answer4
          this.correctAnswer = res.data.data.correctAnswer
          this.selectedTags = res.data.data.tagList ? res.data.data.tagList.map(tag => tag.name) : []
        })
        .catch(err => {
          console.log(err)
        })
  },
  methods: {
    async storeQuestion() {
      if (!this.content || !this.question || !this.answer1 || !this.answer2 || !this.answer3 || !this.answer4 || !this.correctAnswer) {
        alert('Vui lòng nhập đầy đủ thông tin')
        return
      }

      const tagIds = []
      for (let tagName of this.selectedTags) {
        const tag = this.tagList.find(tag => tag.name === tagName)
        tagIds.push({id: tag.id})
      }

      await axios.put('http://localhost:8080/quiz/api/questions/' + this.$route.params.id, {
        id: this.$route.params.id,
        content: this.content,
        question: this.question,
        answer1: this.answer1,
        answer2: this.answer2,
        answer3: this.answer3,
        answer4: this.answer4,
        correctAnswer: this.correctAnswer,
        tagList: tagIds
      }, {
        headers: {
          'Authorization': `Bearer ${this.store.token}`
        }
      })
          .then(res => {
            alert('Cập nhật thành công')
          })
          .catch(err => {
            console.log(err)
          })
    },
    async getTags() {
      await axios.get('http://localhost:8080/quiz/api/tags?pageSize=100000&pageNo=0')
          .then(res => {
            if (res.data.data.items.length === 0) {
              return
            }
            this.tagList = res.data.data.items
          })
          .catch(err => {
            console.log(err)
          })
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
