<template>
  <div class="content position-r w-100" style="background: #F2F2F2; min-height: calc(100vh - 128px)">
    <div class="container-fluid" style="min-height: calc(100vh - 128px)">
      <div class="row justify-content-center" style="margin-top: 68px;min-height: calc(100vh - 128px)">
        <div class="col-3 _col-1 position-r">
          <div class="position-a" style="left: 0; top: 30%; width: 80%; max-width: 180px">
            <img src="https://learn.mochidemy.com/image/213202355_4534422609904130_3896387388468451408_n_1.png"
                 style="width: 100%">
          </div>
          <div v-if="availableTime" class="result-questions" style="position: absolute; right: 15px">
            <h2 class="result-box-header result-box-title">Time remaining</h2>
            <div class="result-box-body">
              <h3 class="text-center">
                {{ formattedRemainingTime }}
              </h3>
            </div>
          </div>
        </div>
        <div class="col-6 _col-2 main-center" style="padding-bottom: 10px; min-height: 616px;">
          <div class="div-review" style="">
            <div class="row div_process" style="margin: 0; padding: 30px 0 10px">
              <div class="col-2 text-center">
                <img @click="endTestEarly" src="https://learn.mochidemy.com/svg/close_game.svg"
                     style="width: 25px; cursor: pointer">
              </div>
              <div class="col-9">
                <div class="process_bar" style="">
                  <div class="process-element" data-content="5" id="process-element"
                       :style="{'width': this.progress + '%'}">
                    <img src="https://learn.mochidemy.com/image/9362859030ff2f1748657ae47ef40370.png" alt="">
                  </div>
                </div>
              </div>
            </div>

            <div v-if="totalQuestions" class="learn-game position-r"
                 style="overflow: hidden auto; padding-bottom: 30px;">
              <div id="game">
                <div class="game-learn-2 game-learn-word">
                  <div class="row justify-content-center position-r">
                    <div class="col-9">
                      <div class="game-learn-2 game-learn-word">
                        <div class="text-center w-100">
                          <p class="title-game-2" v-html="currentQuestion.content">
                          </p>
                        </div>
                      </div>
                    </div>
                    <div class="col-9">
                      <div class="box-answer-3">
                        <div class="text-center list-answer-3">
                          <p class="mb-0" style="font-size: 15px; font-weight: bold" v-html="currentQuestion.question">
                          </p>
                        </div>
                      </div>
                    </div>
                    <div class="col-8">
                      <div class="div-answer-game" style="margin-top: 30px">
                        <div v-for="answerNo in [1,2,3,4]" :key="answerNo" class="bg-answer-item">
                          <div class="answer-review-item item-game text-center"
                               :class="{'answer-review-item-success': currentAnswer === answerNo}"
                               :data-answer="answerNo" @click="setAnswer(answerNo)">
                            <p class="mb-0" v-html="currentQuestion['answer' + answerNo]">
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="btn-answer" style="width: 50%; margin-left: 25%; height: 80px; bottom: 20px">
              <div v-if="this.currentQuestionNo + 1 >= totalQuestions" class="div-submit-success div-review-next">
                <button class="btn btn-submit-success" @click="submitTest">
                  NỘP BÀI
                </button>
              </div>
              <div v-else-if="!currentAnswer"
                   class="div-no_click w-100 text-center">
                <button class="no_click btn-active">
                  CÂU TIẾP THEO
                </button>
              </div>
              <div v-else class="div-submit-success div-review-next">
                <button
                    class="btn btn-submit-success"
                    @click="nextQuestion"
                >
                  CÂU TIẾP THEO
                </button>
              </div>
              <div class="div-no-success text-center mt-2" v-if="currentQuestionNo < totalQuestions - 1">
                <a class="skip-question-btn" href="#" @click.prevent="skipQuestion">
                  Bỏ qua câu này
                </a>
              </div>
            </div>
          </div>
          <div class="position-a mochi-hello" style="bottom: 0px; left: 0px;">
            <img src="https://learn.mochidemy.com/svg/icon-hello.svg" style="width: 100px">
          </div>
        </div>
        <div class="col-3 _col-3 text-center position-r">
          <div class="position-a" style="right: 0; top: 0; width: 70%; max-width: 150px">
            <img src="https://learn.mochidemy.com/image/213202355_4534422609904130_3896387388468451408_n_2.png"
                 style="width: 100%">
          </div>
          <div class="position-a" style="right: 0; top: 50%; width: 80%">
            <img src="https://learn.mochidemy.com/image/213202355_4534422609904130_3896387388468451408_n.png.webp"
                 style="width: 100%">
          </div>
          <div class="result-questions">
            <h2 class="result-box-header result-box-title">Question List</h2>
            <div class="result-box-body">
              <div class="row g-0 result-box-list">
                <div v-for="(question, index) in questions" :key="index"
                     class="result-box-span" :class="{
                  answering: index === currentQuestionNo,
                  answered: answers[index] !== undefined,
                }" @click="goToQuestion(index)">
                  <div class="result-box-number">{{ index + 1 }}</div>
                </div>
              </div>
            </div>
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
import {store} from '@/store'

export default {
  name: 'tests-start',
  components: {
    Modal,
    BFormTags,
    BFormTag,
    BFormSelect
  },
  data() {
    return {
      store,
      questions: [],
      answers: [],
      currentQuestionNo: 0,
      currentAnswer: 0,
      totalQuestions: 0,
      totalAnswers: 0,
      availableTime: 0,
      passedTime: 0,
      interval: null,
    }
  },
  computed: {
    progress() {
      if (this.totalQuestions === 0) {
        return 5
      }
      const progress = (this.currentQuestionNo + 1) / this.totalQuestions * 100
      if (progress > 100) {
        return 100
      }
      return progress < 5 ? 5 : progress
    },
    currentQuestion() {
      if (this.totalQuestions === 0) {
        return {}
      }
      return this.questions[this.currentQuestionNo]
    },
    formattedRemainingTime() {
      const remainingTime = this.availableTime - this.passedTime
      if (remainingTime <= 0) {
        return '00:00'
      }
      const minutes = Math.floor(remainingTime / 60)
      const seconds = remainingTime % 60
      return `${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`
    },
  },
  async created() {
    // add refresh event listener
    window.onbeforeunload = function (e) {
      return 'Are you sure you want to leave? Your progress will be lost.'
    }
    await this.getQuestions()
    await axios.get('http://localhost:8080/quiz/api/tests/' + this.$route.params.id,
        {
          headers: {
            'Authorization': `Bearer ${store.token}`
          }
        })
        .then(response => {
          this.questions = response.data.data.questionList
          this.availableTime = response.data.data.availableTime * 60 // convert to seconds
          // set Interval to count down. When time is up, submit test and clear interval
          this.interval = setInterval(() => {
            this.passedTime++
            if (this.passedTime >= this.availableTime) {
              this.submit()
              clearInterval(this.interval)
            }
          }, 1000)
        })
  },
  methods: {
    endTestEarly() {
      this.store.confirmModal = {
        show: true,
        title: 'Bạn chưa hoàn thành bài thi',
        content: 'Bạn có chắc chắn muốn quay lại? Các câu trả lời sẽ không được lưu lại.',
        onConfirm: () => {
          this.$router.push('/tests')
        },
      }
    },
    async getQuestions() {
      await axios.get('http://localhost:8080/quiz/api/tests/' + this.$route.params.id)
          .then(res => {
            this.questions = res.data.data.questionList
            this.totalQuestions = res.data.data.questionList.length
          })
          .catch(err => {
            store.displayError('Có lỗi xảy ra. Vui lòng thử lại')
          })
    },
    setAnswer(answer) {
      this.currentAnswer = answer
    },
    skipQuestion() {
      if (this.currentQuestionNo < this.totalQuestions - 1) {
        this.currentQuestionNo++
        this.currentAnswer = 0
      }
    },
    nextQuestion() {
      this.answers[this.currentQuestionNo] = this.currentAnswer
      this.currentAnswer = 0
      this.currentQuestionNo++
      this.totalAnswers++
    },
    submitTest() {
      if (this.totalAnswers < this.totalQuestions) {
        this.store.confirmModal = {
          show: true,
          title: 'Bạn chưa hoàn thành bài thi',
          content: 'Bạn có chắc chắn muốn nộp bài?',
          onConfirm: this.submit,
        }
      } else {
        this.submit()
      }
    },
    submit() {
      const data = {
        userId: this.store.user.id,
        testId: this.$route.params.id,
      }
    },
    goToQuestion(index) {
      if (this.currentAnswer !== 0) {
        this.answers[this.currentQuestionNo] = this.currentAnswer
      }
      this.currentQuestionNo = index
      this.currentAnswer = this.answers[index] || 0
    },
  },
  beforeDestroy() {
    clearInterval(this.interval)
    window.onbeforeunload = null
  }
}
</script>
<style>
</style>
