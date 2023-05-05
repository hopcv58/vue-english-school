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
                  Thêm tag
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
          <form @submit.prevent="storeTag">
            <div class="form-row">
              <div class="form-group col-md-12">
                <label for="content">Nội dung tag</label>
                <textarea v-model="name" required class="form-control" rows="5"></textarea>
              </div>
            </div>
            <div class="form-row">
              <div class="form-group col-md-12">
                <label for="content">Mô tả (tuỳ chọn)</label>
                <textarea v-model="description" class="form-control" rows="5"></textarea>
              </div>
            </div>
            <button type="submit" class="btn btn-primary">Cập nhật</button>
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
  name: 'tags',
  components: {
    BFormTags
  },
  data () {
    return {
      name: '',
      description: '',
      tags: [],
    }
  },
  async created () {
    await axios.get('http://localhost:8080/quiz/tags/' + this.$route.params.id)
      .then(res => {
        this.name = res.data.data.name
        this.description = res.data.data.description
      })
      .catch(err => {
        console.log(err)
      })
  },
  methods: {
    async storeTag () {
      await axios.put('http://localhost:8080/quiz/tags/' + this.$route.params.id, {
        name: this.name,
        description: this.description
      })
        .then(res => {
          this.$router.push('/tags')
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