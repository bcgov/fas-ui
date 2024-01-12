<template>
  <div
    id="staff-comments"
    class="d-inline"
  >
    <!-- NB: attach the menu to component div so we can unit test it -->
    <v-menu
      v-model="state.showComments"
      location="bottom"
      attach="#staff-comments"
      :offset="offset"
      :persistent="false"
      transition="slide-y-transition"
      :close-on-content-click="false"
    >
      <!-- the button -->
      <template #activator="{ props: activatorProps }">
        <v-btn
          id="comments-button"
          size="small"
          variant="text"
          color="primary"
          v-bind="activatorProps"
        >
          <v-icon size="x-large">
            mdi-comment-text-outline
          </v-icon>
          <span>{{ state.numComments }}</span>
        </v-btn>
      </template>

      <!-- the menu (panel) -->
      <v-card
        id="staff-comment-container"
        flat
        class="px-8 py-6"
      >
        <v-card-title class="d-flex justify-space-between pa-0">
          <div>
            <v-icon
              size="medium"
              color="primary"
            >
              mdi-comment-text-outline
            </v-icon>
            <span>{{ state.numComments }}</span>
          </div>
          <v-btn
            id="close-button"
            icon
            size="large"
            variant="text"
            class="mr-n3"
            @click="close()"
          >
            <v-icon color="primary">
              mdi-close
            </v-icon>
          </v-btn>
        </v-card-title>

        <v-card-text class="mt-2 pa-0">
          <v-textarea
            ref="textarea"
            v-model="state.comment"
            autofocus
            no-resize
            variant="filled"
            rows="5"
            placeholder="Enter Comments"
            :rules="state.rules"
          />
        </v-card-text>

        <v-card-actions class="d-flex justify-space-between pa-0 pt-8">
          <div class="text-body-2 mt-1">
            {{ state.charsRemaining }}
          </div>
          <div class="mr-n3">
            <v-btn
              id="save-button"
              variant="text"
              color="primary"
              class="font-weight-bold"
              :loading="state.isSaving"
              @click="save()"
            >
              Save
            </v-btn>
            <v-btn
              id="cancel-button"
              variant="text"
              color="primary"
              @click="close()"
            >
              Cancel
            </v-btn>
          </div>
        </v-card-actions>

        <v-card-text class="mt-6 pa-0">
          <div
            id="existing-comments"
            class="pr-5"
          >
            <div
              v-for="(comment, i) in state.comments"
              :key="i"
              class="text-body-2"
            >
              <p
                class="pre-line mb-4"
                v-html="comment.comment"
              />
              <p class="font-italic mb-4">
                {{ comment.submitterDisplayName }}
                &hyphen;
                {{ apiToPacificDateTime(comment.timestamp) }}
              </p>
            </div>
          </div>
        </v-card-text>
      </v-card>
    </v-menu>
  </div>
</template>

<script setup lang="ts">
import { CommentIF, FormIF } from '@bcrs-shared-components/interfaces'
import { computed, onBeforeMount, reactive, ref } from 'vue'
import { DateTime } from 'luxon'

const props = withDefaults(defineProps<{
  axios: any,
  businessId: string
  url: string // pass URL if need to override
  offset: number
  maxLength: number
}>(), {
  axios: null,
  url: null,
  offset: -33,
  maxLength: 4096
})
const textarea = ref<FormIF>(null)

/** Model property for v-menu (ie, whether to show the panel). */
const state = reactive({
  showComments: false,
  comments: [] as Array<CommentIF>, /** The list of comments. */
  comment: null as string, /** The new comment's text. */
  isSaving: false, /** Whether a comment is being saved. */
  charsRemaining: computed<number>(() => { /** The number of chars remaining in the new comment. */
    const length = state.comment ? state.comment.length : 0 // comment may be null
    return (state.maxLength - length)
  }),
  numComments: computed<string>(() => { /** The Number of Comments string for this entity. */
    const numComments = state.comments.length
    return (numComments === 1 ? '1 Comment' : `${numComments} Comments`)
  }),
  rules: computed<Array<(v) => boolean | string>>(() => { /** Array of validations rules for the textarea. */
    // exclude whitespace in minimum length check
    // include whitespace in maximum length check
    return [
      val => (val && val.trim().length > 0) || 'Enter a comment.',
      val => (val && val.length <= state.maxLength) || 'Maximum characters reached.'
    ]
  }),
  getUrl: computed<string>(() => { /** get Endpoint URL. */
    return props.url || `businesses/${props.businessId}/comments`
  })
})

const apiToPacificDateTime = (apiDateTime: string): string => {
  if (!apiDateTime) return apiDateTime
  return DateTime.fromISO(apiDateTime).setZone('America/Vancouver').toFormat('fff')
}

/**
 * Flattens and sorts an array of comments.
 * @param comments the array of comments to sort and deconstruct
 * @returns the sorted and flattened array of comments
 */
const flattenAndSortComments = (comments: Array<any>): Array<any> => {
  if (comments && comments.length > 0) {
    // first use map to change comment.comment to comment
    const temp: Array<any> = comments.map(c => c.comment)
    // then sort newest to oldest
    temp.sort((a, b) => new Date(a.timestamp) < new Date(b.timestamp) ? 1 : -1)
    return temp
  }
  return []
}

/** Fetches the staff comments from the API. */
const fetchStaffComments = async (): Promise<void> => {
  state.comments = await props.axios.get(state.getUrl)
    .then(res => {
      const comments = (res?.data && res.data?.comments) || []
      // if comments is array of object with 'comment as key' flatten structure
      if (Array.isArray(comments) && comments[0] && typeof comments[0].comment === 'string') {
        return comments
      }
      return flattenAndSortComments(comments)
    })
    .catch(() => [])
}

/** Called when component is created. */
onBeforeMount(async () => {
  await fetchStaffComments()
})

/** Saves the new comment to the API. */
const save = async (): Promise<void> => {
  // don't save if invalid
  if (!textarea.value.validate()) return

  // prevent double saving
  if (state.isSaving) return
  state.isSaving = true

  const data = {
    comment: {
      businessId: props.businessId,
      comment: state.comment
    }
  }

  let success = false
  await props.axios.post(state.getUrl, data).then(() => {
    success = true
  }).catch(error => {
    // eslint-disable-next-line no-console
    console.log('save() error =', error)
    alert('Could not save your comment. Please try again or cancel.')
  })

  state.isSaving = false
  if (success) {
    // clear the data and reload the staff comments
    textarea.value.reset()
    await fetchStaffComments()
  }
}

const close = () : void => {
  // clear any errors; leave the data
  textarea.value.resetValidation()
  state.showComments = false
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/theme.scss';

#staff-comment-container {
  width: 33rem;
  height: 36rem;
  overflow: hidden;
}

.v-card-title {
  .v-icon {
    margin-top: 1px;
  }

  span {
    color: $app-blue;
    font-size: 0.75rem;
    letter-spacing: normal;
    margin-left: 5px;
  }
}

:deep() {
  .v-textarea textarea {
    font-size: 0.875rem !important;
    color: $gray7 !important;

    &::placeholder {
      color: $gray7 !important;
    }
  }

  // reduce overall textarea height when there are no error messages
  .v-textarea:not(.error--text) {
    margin-bottom: -24px;
  }

  // reduce overall textarea height when there are errors messages
  .v-textarea.error--text {
    margin-bottom: -12px;
  }

  // shrink input area to make space for error messages
  .v-textarea.error--text textarea {
    height: calc(140px - 12px) !important;
  }
}

.v-card__actions .body-2 {
  color: $gray7;
}

#existing-comments {
  height: 16rem;
  max-height: 16rem;
  overflow-y: scroll;
  text-align: left;

  .body-2 {
    color: $gray7;
    line-height: 1.375rem;
  }

  .body-2 + .body-2 {
    margin-top: 1rem;
    padding-top: 1rem;
    border-top: 1px solid $gray7;
    border-radius: 0;
  }
}
</style>
