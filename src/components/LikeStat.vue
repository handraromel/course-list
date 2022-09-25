<template>
  <div>
    <i
      class="bi"
      :class="Liked ? 'liked bi-heart-fill' : 'bi-heart'"
      @click="Liked = !Liked"
      style="cursor: pointer"
    ></i>
  </div>
</template>

<script>
export default {
    props: {
        Liked: {
            type: Boolean
        }
    }
}
</script>
