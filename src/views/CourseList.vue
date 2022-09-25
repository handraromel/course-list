<template>
  <main>
    <div class="container">
      <div class="row align-items-center min-vh-100">
        <div class="col-12 py-5">
          <div class="col pb-5 text-md-end text-center">
            <button
              class="btn btn-primary rounded-pill m-1 small-btn"
              @click="sortedByPrice"
            >
              sort by price
            </button>
            <button
              class="btn btn-primary rounded-pill m-1 small-btn"
              @click="sortedByReview"
            >
              sort by review
            </button>
            <button
              class="btn btn-primary rounded-pill m-1 small-btn"
              @click="sortedByRating"
            >
              sort by rating
            </button>
          </div>
          <div v-for="course in filterCourses" class="row" :key="course.id">
            <div class="col-md-4">
              <img
                class="img-fluid"
                :src="'src/assets/img/' + course.imgSrc"
                alt="Thumbnail Image"
                draggable="false"
              />
            </div>
            <div class="col-md-6">
              <div class="col-12 h-75">
                <p class="fw-bold">{{ course.title }}</p>
                <p>{{ course.desc }}</p>
                <small>{{ course.tutor }}</small> <br />
                <small>{{ course.courseDesc }}</small>
                <div class="col-xl-3 col-lg-4">
                  <Rating :grade="course.rating" />
                  {{
                    course.review == 0
                      ? 'No review yet'
                      : course.review + ' reviews'
                  }}
                </div>
              </div>
              <div class="col-12 h-25 d-flex">
                <div class="align-self-end my-2">
                  <router-link :to="'/course/' + course.id"
                    >Product detail</router-link
                  >
                </div>
              </div>
            </div>
            <div class="col-md-2 text-md-end">
              <div class="col-12 h-25">
                <p class="fw-bold">{{ course.price }}</p>
                <p>{{ course.prevPrice }}</p>
              </div>
              <div class="col-12 h-50 d-flex justify-content-end">
                <div class="align-self-end text-end">
                  <StatLabel
                    :withinDate="course.dateCreated"
                    :courseReview="course.review"
                    :courseRating="course.rating"
                  />
                </div>
              </div>
              <div class="col-12 h-25 d-flex justify-content-end">
                <div class="align-self-end">
                  <LikeStat :Liked="course.liked" />
                </div>
              </div>
            </div>
            <hr class="mb-4 mt-3" />
          </div>
          <div class="row justify-content-center text-center">
            <div class="col-12 mb-3">
              Page {{ currentPage }} of {{ setLastPage }}
            </div>
            <div class="col-12">
              <button
                class="btn rounded-pill px-4"
                :class="currentPage === 1 ? 'btn-secondary' : 'btn-info'"
                :disabled="currentPage === 1"
                @click="changePage(-1)"
              >
                Prev</button
              >&nbsp;
              <button
                class="btn rounded-pill px-4"
                :class="
                  currentPage === setLastPage ? 'btn-secondary' : 'btn-info'
                "
                :disabled="currentPage === setLastPage"
                @click="changePage(1)"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import axios from 'axios'
import Rating from '../components/Rating.vue'
import StatLabel from '../components/StatLabel.vue'
import LikeStat from '../components/LikeStat.vue'
export default {
  components: {
    Rating,
    StatLabel,
    LikeStat
  },
  data() {
    return {
      courses: [],
      perPage: 5,
      currentPage: 1,
      dataLength: 0,
      priceIndicator: 0,
      ratingIndicator: 0,
      reviewIndicator: 0,
      createdDate: ''
    }
  },
  methods: {
    getData() {
      axios.get('data/courses.json').then((res) => {
        this.courses = res.data
        this.dataLength = res.data.length
      })
    },
    changePage(num) {
      this.currentPage = this.currentPage + num
    },
    sortedByPrice() {
      this.priceIndicator = 1
      this.ratingIndicator = 0
      this.reviewIndicator = 0
    },
    sortedByRating() {
      this.ratingIndicator = 1
      this.priceIndicator = 0
      this.reviewIndicator = 0
    },
    sortedByReview() {
      this.reviewIndicator = 1
      this.priceIndicator = 0
      this.ratingIndicator = 0
    }
  },
  created() {
    this.getData()
  },
  computed: {
    filterCourses() {
      let sortedCourses = this.courses

      if (
        this.priceIndicator === 1 &&
        this.ratingIndicator === 0 &&
        this.reviewIndicator === 0
      ) {
        sortedCourses = sortedCourses.sort((a, b) => {
          return b.price - a.price
        })
      }

      if (
        this.ratingIndicator === 1 &&
        this.priceIndicator === 0 &&
        this.reviewIndicator === 0
      ) {
        sortedCourses = sortedCourses.sort((a, b) => {
          return b.rating - a.rating
        })
      }

      if (
        this.reviewIndicator === 1 &&
        this.ratingIndicator === 0 &&
        this.priceIndicator === 0
      ) {
        sortedCourses = sortedCourses.sort((a, b) => {
          return b.review - a.review
        })
      }

      const start = (this.currentPage - 1) * this.perPage
      const end = this.currentPage * this.perPage
      const result = sortedCourses.slice(start, end)
      return result
    },
    setLastPage() {
      const currentNum = Math.floor(this.dataLength / 5)
      const checkMod = this.dataLength % 5
      if (checkMod > 0) {
        return currentNum + 1
      } else {
        return currentNum
      }
    }
  }
}
</script>
