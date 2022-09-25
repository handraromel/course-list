<template>
  <div class="container">
    <div class="row align-items-center min-vh-100">
      <div class="col-12 py-5">
        <p class="fw-bold fs-3 mb-3">{{ course.title }}</p>
        <div class="col-md-5">
          <img
            class="img-fluid"
            :src="'../src/assets/img/' + course.imgSrc"
            alt="Thumbnail Image"
            draggable="false"
          />
        </div>
        <div class="row mt-4">
          <div class="col-md-9">
            <p>{{ course.desc }}</p>
            <small>{{ course.tutor }}</small> <br />
            <small>{{ course.courseDesc }}</small>
            <div class="col-lg-2">
              <Rating :grade="course.rating" />
              {{
                course.review == 0
                  ? 'No review yet'
                  : course.review + ' reviews'
              }}
            </div>
            <div class="col mt-5">
              <router-link :to="{ name: 'courses' }"
                >Back to course list</router-link
              >
            </div>
          </div>
          <div class="col-md-3 text-end">
            <div class="col-12 h-25">
              <p class="fw-bold">{{ course.price }}</p>
              <p>{{ course.prevPrice }}</p>
            </div>
            <div class="col-12 h-50 d-flex justify-content-end">
              <div class="align-self-end">
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
        </div>
      </div>
    </div>
  </div>
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
      id: this.$route.params.id,
      course: {}
    }
  },
  methods: {
    getData() {
      axios.get('../data/courses.json').then((res) => {
        this.course = res.data.find((item) => item.id == this.id)
      })
    }
  },
  created() {
    this.getData()
  }
}
</script>
