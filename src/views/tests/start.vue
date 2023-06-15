<template>
  <div class="content position-r w-100" style="background: #F2F2F2; min-height: calc(100vh - 128px)">
    <div class="container-fluid">
      <div class="row justify-content-center" style="margin-top: 68px">
        <div class="col-3 _col-1 position-r">
          <div class="position-a" style="left: 0; top: 30%; width: 80%; max-width: 180px">
            <img src="https://learn.mochidemy.com/image/213202355_4534422609904130_3896387388468451408_n_1.png" style="width: 100%">
          </div>
        </div>
        <div class="col-6 _col-2 main-center" style="padding-bottom: 10px; min-height: 616px;">
          <div class="div-review" style="">
            <div class="row div_process" style="margin: 0; padding: 30px 0 10px">
              <div class="col-2 text-center">
                <img onclick="openPopupReview()" src="https://learn.mochidemy.com/svg/close_game.svg" style="width: 25px; cursor: pointer">
              </div>
              <div class="col-9">
                <div class="process_bar" style="">
                  <div class="process-element" data-content="5" id="process-element">
                    <img src="https://learn.mochidemy.com/image/9362859030ff2f1748657ae47ef40370.png" alt="">
                  </div>
                </div>
              </div>
            </div>

            <div class="learn-game position-r" style="overflow: hidden auto; padding-bottom: 30px; height: 440.25px;">
              <div id="game">
                <div class="game-learn-2 game-learn-word">
                  <div class="row justify-content-center position-r">
                    <div class="col-9">
                      <div class="game-learn-2 game-learn-word">
                        <div class="text-center w-100">
                          <p class="title-game-2">
                            Chọn từ thích hợp điền vào chỗ trống
                          </p>
                        </div>
                      </div>
                    </div>
                    <div class="col-9">
                      <div class="box-answer-3">
                        <div class="text-center list-answer-3">
                          <p class="mb-0" style="font-size: 15px; font-weight: bold">
                            She had a happy ______ in her small hometown.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div class="col-8">
                      <div class="div-answer-game" style="margin-top: 30px">
                        <div class="bg-answer-item">
                          <div class="answer-review-item item-game text-center answer-stt-1 " data-status="0" data-content="truant">
                            <p class="mb-0">
                              truant
                            </p>
                          </div>
                        </div>
                        <div class="bg-answer-item">
                          <div class="answer-review-item item-game text-center answer-stt-2 " data-status="0" data-content="recognise">
                            <p class="mb-0">
                              recognise
                            </p>
                          </div>
                        </div>
                        <div class="bg-answer-item">
                          <div class="answer-review-item item-game text-center answer-stt-3 answer-true" data-status="1" data-content="childhood">
                            <p class="mb-0">
                              childhood
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>


              </div>
              <div id="mobilize">
                <div class="row justify-content-center">
                  <div class="col-7 text-center">
                    <p>Cố lên, cố lên!</p>
                    <img src="https://learn.mochidemy.com/image/aa7e86cee01cd8643b414977ffbf2495.png" alt="">
                  </div>
                </div>
              </div>
            </div>

            <input type="hidden" id="key" value="0">
            <input type="hidden" id="game-choice" value="2">
            <div class="btn-answer" style="width: 50%; margin-left: 25%; height: 80px; bottom: 20px">
              <div class="div-no_click w-100 text-center">
                <button class="no_click btn-active" id="no_click">
                  KIỂM TRA
                </button>
              </div>
              <div class="div-submit-success div-review-next" style="display: none">
                <button class="btn-submit-success" value="1" id="action_click">
                  KIỂM TRA
                </button>
              </div>
              <div class="div-mobilize-click" style="display: none">
                <button class="btn-submit-success" value="1" id="mobilize_click">
                  TIẾP TỤC
                </button>
              </div>
              <!-- Phần tôi chưa thuộc tử này -->
              <div class="div-no-success text-center mt-2">
                <button class="no-know-btn fw-bold cursor-pointer text-decoration-underline border-0 bg-light" value="1">
                  Mình không nhớ từ này
                </button>
              </div>
            </div>

            <div class="col-12 p-0 box-answer" id="ele-answer" style="left: 0px;">
              <div class="div-answer div-answer-success">
                <div class="row div-answer div-answer-success" style="margin-left: 0; margin-right: 0">
                  <div class="col-10 mt-4 mb-4 position-r">
                    <div style="margin-left: 40px">
                      <p class="text-white word-content-2 mb-0" id="answer-content-review">
                        childhood
                      </p>

                      <p class="text-white word-phonetic-2 mb-0" id="answer-phonetic-review">
                        /ˈtʃaɪldhʊd/
                      </p>
                      <p class="text-white en-hint mb-0" id="answer-content-2-review">
                        Tuổi thơ (n)
                      </p>
                      <p class="text-white en-hint mb-0" id="answer-en-hint-review">
                        She had a happy <span style="font-weight: bold; font-size: 15px">childhood</span> in her small hometown.
                      </p>

                      <p class="text-white en-hint text-trans mb-0" id="answer-trans-hint-review" style="display: none">
                        Cô ấy có một tuổi thơ hạnh phúc ở thị trấn nhỏ của mình.
                      </p>
                      <p class=" mb-0" style="cursor: pointer; margin-top: 10px">
                        <img src="https://learn.mochidemy.com/svg/icon-error-word.svg" style="width: 20px">
                        <span class="error-word" onclick="openPopupModal('#popupWordError')">
                    <u>Báo lỗi nội dung</u>
                </span>
                      </p>
                    </div>
                    <div id="cover-answer" style="display: none;"></div>
                  </div>
                  <div class="col-2 text-center mt-4 mb-4">
                    <div class="text-center" style="max-width: 60px">
                      <button class="btn-answer-icon">
                        <img class="icon-btn-answer" src="https://learn.mochidemy.com/svg/sound-answer.svg" onclick="play()">
                      </button>
                    </div>
                    <div class="text-center mt-2" style="max-width: 60px">
                      <button class="btn-answer-icon">
                        <img class="icon-btn-answer" src="https://learn.mochidemy.com/svg/translate.svg" data-id="1" id="btn-trans">
                      </button>
                    </div>
                  </div>
                </div>

              </div>
            </div>
            <audio src="https://mochien3.1-api.mochidemy.com/public/audios/question/Childhood_usnew.mp3" id="audio" style="display:none;"></audio>
            <audio src="" id="nextAudio" style="display:none;"></audio>
            <input type="hidden" id="is_review" value="1">
            <input type="hidden" id="review_again" value="0">
            <input type="hidden" id="answer-choice">
            <input type="hidden" id="lastReviewTime" value="1686274883">
            <div id="data-audio-review" style="display: none"></div>
          </div>
          <div id="pending-review" style="display: none;">
            <div style="position: absolute; bottom: 100px; left: 0; width: 100%">
              <div class="container">
                <div class="row">
                  <div class="col-md-12 text-center">
                    <div class="bg-bar">
                      <div class="text-end" id="myBar" style="width: 100%;">
                        <p id="bar-per" style="margin-top:3px">100%</p>


                        <img id="icon-pending-1" src="https://learn.mochidemy.com/image/mochi_tet-02.png" style="height: 100px; top: -110px; width: auto">
                        <img id="icon-pending-2" src="https://learn.mochidemy.com/image/mochi_tet-02.png" style="display: none; height: 100px; top: -110px; width: auto">
                      </div>
                    </div>
                    <p>Ôn tập vào Thời điểm vàng giúp bạn tăng 10 lần khả năng ghi nhớ.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="game-done" style="display: none">
            <div class="w-100 text-center" style="margin-top: 150px">
              <img src="https://learn.mochidemy.com/image/2d91da53346559194e2f37374c65cadc.png" style="width: 300px">
              <div class="mt-3">
                <p style="font-weight: bold; font-size: 15px; width: 70%; margin-left: 15%">
                  Đang cập nhật <span style="color: #FFCB08">"Thời điểm vàng"</span>
                </p>
              </div>
              <div class="w-100 text-center">
                <div class="lds-ellipsis">
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
              </div>
            </div>
          </div>
          <div class="ending-game"></div>
          <div class="position-a mochi-hello" style="bottom: 0px; left: 0px;">
            <img src="https://learn.mochidemy.com/svg/icon-hello.svg" style="width: 100px">
          </div>
          <audio src="https://learn.mochidemy.com/audio/Click.mp3" id="audio_learn" style="display:none;"></audio>
          <audio src="https://learn.mochidemy.com/audio/Ending_review.mp3" id="audio_end_review" style="display:none;"></audio>
          <audio src="https://learn.mochidemy.com/audio/Wrong_answer.mp3" id="audio_wrong_answer" style="display:none;"></audio>
          <audio src="https://learn.mochidemy.com/audio/Right Answer.mp3" id="audio_right_answer" style="display:none"></audio>
        </div>
        <div class="col-3 _col-3 text-center position-r">
          <div class="position-a" style="right: 0; top: 0; width: 70%; max-width: 150px">
            <img src="https://learn.mochidemy.com/image/213202355_4534422609904130_3896387388468451408_n_2.png" style="width: 100%">
          </div>
          <div class="position-a" style="right: 0; top: 50%; width: 80%">
            <img src="https://learn.mochidemy.com/image/213202355_4534422609904130_3896387388468451408_n.png.webp" style="width: 100%">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import {BFormTags, BFormTag, BFormSelect} from 'bootstrap-vue'
import Modal from '@/components/Modal.vue'

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
    await this.getTags()
    await this.getQuestions()
    await axios.get('http://localhost:8080/quiz/api/tests/' + this.$route.params.id)
        .then(response => {
          this.name = response.data.data.name
          this.description = response.data.data.description
          this.availableTime = response.data.data.availableTime
          this.selectedTags = response.data.data.tagList ? response.data.data.tagList.map(tag => tag.name) : []
          this.addQuestionModal.selectedQuestionIds = response.data.data.questionList ? response.data.data.questionList.map(question => question.id) : []
        })
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
        alert('Vui lòng nhập đầy đủ thông tin')
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

      await axios.put('http://localhost:8080/quiz/api/tests/' + this.$route.params.id, {
        id: this.$route.params.id,
        name: this.name,
        description: this.description,
        availableTime: this.availableTime,
        questionList: questionIds,
        tagList: tagIds
      })
          .then(res => {
            alert('Cập nhật thành công')
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
            if (res.data.data.items.length === 0) {
              return
            }
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
