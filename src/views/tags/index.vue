<template>
  <div class="content position-r w-100" style="background: #F2F2F2; min-height: calc(100vh - 128px)">
    <div class="container-fluid">
      <div class="row justify-content-center">
        <Title>
          Danh sách tag
        </Title>
        <section class="section section-lg pt-lg-0 w-100" style="margin-top: 200px">
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
                    <router-link :to="{ name: 'tags.edit', params: { id: tag.id } }" class="btn btn-sm btn-primary">
                      Sửa
                    </router-link>
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
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'tags',
  components: {},
  data() {
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
  async created() {
    await axios.get(`http://localhost:8080/quiz/api/tags?pageNo=${this.pageNo - 1}&pageSize=${this.pageSize}&sortDir=${this.sortDir}&sortName=${this.sortName}`)
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
    shortenContent(content) {
      if (!content) return ''
      if (content.length > 20) {
        return content.substring(0, 20) + '...'
      }
      return content
    },
    deleteTag(id) {
      if (confirm('Bạn có chắc chắn muốn xóa tag này?')) {
        axios.delete(`http://localhost:8080/quiz/api/tags/${id}`)
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
