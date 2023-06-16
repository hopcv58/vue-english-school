<template>
  <div class="content position-r w-100" style="background: #F2F2F2; min-height: calc(100vh - 128px)">
    <div class="container-fluid" style="min-height: calc(100vh - 128px)">
      <div class="row justify-content-center" style="margin-top: 68px;min-height: calc(100vh - 128px)">
        <div class="col-3 _col-1 position-r">
          <div class="position-a" style="left: 0; top: 30%; width: 80%; max-width: 180px">
            <img src="https://learn.mochidemy.com/image/213202355_4534422609904130_3896387388468451408_n_1.png"
                 style="width: 100%">
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
              <div v-if="!currentAnswer" class="div-no_click w-100 text-center">
                <button class="no_click btn-active">
                  {{ totalAnswers < totalQuestions - 1 ? 'CÂU TIẾP THEO' : 'NỘP BÀI' }}
                </button>
              </div>
              <div v-else class="div-submit-success div-review-next">
                <button
                    v-if="totalAnswers < totalQuestions - 1"
                    class="btn btn-submit-success"
                    @click="nextQuestion"
                >
                  CÂU TIẾP THEO
                </button>
                <button
                    v-else
                    class="btn btn-submit-success"
                    @click="submitTest"
                >
                  NỘP BÀI
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
  name: 'tests',
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
  },
  async created() {
    await this.getQuestions()
    await axios.get('http://localhost:8080/quiz/api/tests/' + this.$route.params.id,
        {
          headers: {
            'Authorization': `Bearer ${store.token}`
          }
        })
        .then(response => {
          this.questions = response.data.data.questionList
        })
  },
  methods: {
    endTestEarly() {
      this.$router.push('/tests')
    },
    async getQuestions() {
      await axios.get('http://localhost:8080/quiz/api/tests/' + this.$route.params.id)
          .then(res => {
            this.questions = res.data.data.questionList
            this.totalQuestions = res.data.data.questionList.length
          })
          .catch(err => {
            console.log(err)
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

    }
  }
}
</script>
<style>
</style>
