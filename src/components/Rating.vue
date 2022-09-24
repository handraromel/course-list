<template>
  <div class="rating">
    <ul class="list">
      <span class="rating-text" v-if="hasCounter">{{ stars }}</span
      >&nbsp;
      <li
        v-for="star in maxStars"
        class="star"
        :class="{ active: star <= stars }"
        @click="rate(star)"
        :key="star"
      >
        <i class="bi" :class="star <= stars ? 'bi-star-fill' : 'bi-star'"></i>
      </li>
    </ul>
  </div>
</template>

<script>
import 'bootstrap-icons/font/bootstrap-icons.css'
export default {
  props: {
    grade: {
      type: String,
      required: true
    },
    maxStars: {
      type: Number,
      default: 5
    },
    hasCounter: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      stars: this.grade
    }
  },
  methods: {
    rate(star) {
      if (typeof star === 'number' && star <= this.maxStars && star >= 0)
        this.stars = this.stars === star ? star - 1 : star
    }
  },
  updated() {
    if (this.stars === undefined) {
        this.stars = this.grade
    }
  }
}
</script>

<style lang="scss" scoped>
$active-color: #f3d23e;

.rating {
  font-size: 18px;
}

.list {
  margin: 0 0 5px 0;
  padding: 0;
  list-style-type: none;
  &:hover {
    .star {
      color: $active-color;
    }
  }
}

.star {
  display: inline-block;
  cursor: pointer;
  &:hover {
    & ~ .star {
      &:not(.active) {
        color: inherit;
      }
    }
  }
}

.rating-text {
  color: $active-color;
  text-shadow: 2px 2px 2px #caaa19;
}

.active {
  color: $active-color;
}
</style>
