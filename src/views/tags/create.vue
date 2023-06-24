<template>
  <div class="content position-r w-100" style="background: #F2F2F2; min-height: calc(100vh - 128px)">
    <div class="container-fluid">
      <div class="row justify-content-center">
        <Title>
          Thêm tag
        </Title>
        <section class="section section-lg pt-lg-0 w-100" style="margin-top: 200px">
          <div class="py-5 bg-secondary">
            <div class="container">
              <form @submit.prevent="storeTag">
                <div class="form-row">
                  <div class="form-group col-md-12">
                    <label for="content">Nội dung tag</label>
                    <textarea v-model="name" class="form-control" required rows="5"></textarea>
                  </div>
                </div>
                <div class="form-row">
                  <div class="form-group col-md-12">
                    <label for="content">Mô tả (tuỳ chọn)</label>
                    <textarea v-model="description" class="form-control" rows="5"></textarea>
                  </div>
                </div>
                <button class="btn btn-success" type="submit">Thêm</button>
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
import { store } from '@/store'
import { BFormTags } from 'bootstrap-vue'

export default {
  name: 'tags-create',
  components: {
    BFormTags
  },
  data () {
    return {
      store,
      name: '',
      description: '',
      tags: [],
    }
  },
  async created () {
  },
  methods: {
    async storeTag () {
      await axios.get('http://localhost:8080/quiz/api/tags?pageSize=100000&pageNo=0')
          .then(res => {
            this.tags = res.data.data.items
          })
          .catch(err => {
            store.displayError('Có lỗi xảy ra. Vui lòng thử lại')
          })

      const existed = this.tags.find(tag => tag.name === this.name)

      if (existed) {
        store.displayError('Tag đã tồn tại')
        return
      }

      await axios.post('http://localhost:8080/quiz/api/tags', {
        name: this.name,
        description: this.description
      }, {
        headers: {
          Authorization: `Bearer ${store.token}`
        }
      })
          .then(res => {
            store.displaySuccess('Thêm tag thành công')
            this.$router.push('/tags')
          })
          .catch(err => {
            store.displayError('Có lỗi xảy ra. Vui lòng thử lại')
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
