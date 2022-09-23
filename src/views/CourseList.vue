<template>
  <main>
    <div class="container">
      <div class="row align-items-center min-vh-100">
        <div class="col-12 py-5">
          <div v-for="course in courses" class="row" :key="course.id">
            <div class="col-md-4">
              <img
                class="img-fluid"
                :src="'src/assets/img/' + course.imgSrc"
                alt="Thumbnail Image"
              />
            </div>
            <div class="col-md-6">
              <p class="fw-bold">{{ course.title }}</p>
              <p>{{ course.desc }}</p>
              <small>{{ course.tutor }}</small> <br />
              <!-- Rating component here -->
              <small>{{ course.courseDesc }}</small>
              <!-- badges here -->
            </div>
            <div class="col-md-2">
              <p class="fw-bold">{{ course.price }}</p>
              <p>{{ course.prevPrice }}</p>
            </div>
            <hr class="my-4" />
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      courses: []
    }
  },
  mounted() {
    axios.get('data/coursesPageOne.json').then((res) => {
      this.courses = res.data
    })
  }
}
</script>
