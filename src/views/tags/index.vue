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
                  Danh sách tag
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
          <router-link to="/tags/create" class="btn btn-success">Thêm tag</router-link>
        </div>
        <div class="row justify-content-center bg-white">
          <table v-if="tags.length" class="table table-striped">
            <thead>
            <tr>
              <th scope="col">Tag</th>
              <th scope="col">Mô tả</th>
              <th scope="col" style="width: 170px">Thao tác</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="tag in tags" :key="tag.id">
              <td data-toggle="tooltip" :title="tag.name">
                {{ shortenContent(tag.name) }}
              </td>
              <td data-toggle="tooltip" :title="tag.description">
                {{ shortenContent(tag.description) }}
              </td>
              <td>
                <router-link :to="{ name: 'tags.edit', params: { id: tag.id } }" class="btn btn-sm btn-primary">Sửa</router-link>
                <button class="btn btn-sm btn-danger" @click="deleteTag(tag.id)">Xóa</button>
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
  name: 'tags',
  components: {},
  data () {
    return {
      tags: [],
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
    await axios.get(`http://localhost:8080/quiz/tags?pageNo=${this.pageNo - 1}&pageSize=${this.pageSize}&sortDir=${this.sortDir}&sortName=${this.sortName}`)
      .then(res => {
        this.tags = res.data.data.items
        this.totalPage = res.data.data.totalPage
        this.total = res.data.data.totalElements
      })
      .catch(err => {
        console.log(err)
      })
  },
  methods: {
    shortenContent (content) {
      if (!content) return ''
      if (content.length > 20) {
        return content.substring(0, 20) + '...'
      }
      return content
    },
    deleteTag(id) {
      if (confirm('Bạn có chắc chắn muốn xóa tag này?')) {
        axios.delete(`http://localhost:8080/quiz/tags/${id}`)
          .then(res => {
            alert('Xóa tag thành công!')
            this.tags = this.tags.filter(tag => tag.id !== id)
          })
          .catch(err => {
            alert('Xóa tag thất bại!')
            console.log(err)
          })
      }
    }
  }
}
</script>
