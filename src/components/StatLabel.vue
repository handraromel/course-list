<template>
    <div>
        <span class="btn small-btn" :class="setLabel(withinDate) === true ? 'btn-success' : ''">
            {{ setLabel(withinDate) === true ? 'NEW' : '' }}
        </span> <br>
        <span class="btn small-btn mt-2" :class="courseReview > 20 && courseRating > 4 ? 'btn-warning':''">
            {{ courseReview > 20 && courseRating > 4 ? 'BEST SELLER':'' }}
        </span> <br>
        <span class="btn small-btn mt-2" :class="setLabel(withinDate) === true && courseReview > 20 && courseRating > 4 ? 'btn-danger':''">
            {{ setLabel(withinDate) === true && courseReview > 20 && courseRating > 4 ? 'HOT LESSON':'' }}
        </span>
    </div>
</template>

<script>
import moment from 'moment'
export default {
    props: {
        withinDate: {
            type: String
        },
        courseReview: {
            type: String
        },
        courseRating: {
            type: String
        }
    },
    methods: {
        setLabel(date) {
            return moment(date).isBetween('2022-09-24', '2022-09-30')
        }
    }
}
</script>