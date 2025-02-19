<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 overflow-y-auto">
    <div class="flex min-h-screen items-center justify-center px-4">
      <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" @click="close"></div>
      
      <div class="relative w-full max-w-3xl bg-white rounded-lg shadow-xl">
        <!-- Header -->
        <div class="flex items-start justify-between p-4 border-b">
          <div class="space-y-1 pr-8">
            <div class="flex items-center space-x-2">
              <h2 class="text-xl font-semibold text-gray-900">{{ task.title }}</h2>
              <span 
                v-if="task.priority"
                :class="priorityClass"
                class="px-2 py-1 rounded-full text-xs font-medium"
              >
                {{ task.priority }}
              </span>
            </div>
            <p class="text-sm text-gray-500">
              in list <span class="font-medium">{{ columnTitle }}</span>
            </p>
          </div>
          <button @click="close" class="text-gray-400 hover:text-gray-500">
            <span class="text-2xl">×</span>
          </button>
        </div>

        <div class="p-6 space-y-6">
          <!-- Description -->
          <div>
            <div class="flex items-start space-x-3">
              <span class="text-gray-500 mt-1">📝</span>
              <div class="flex-1">
                <h3 class="text-sm font-medium text-gray-900 mb-2">Description</h3>
                <div 
                  v-if="!isEditingDescription"
                  @click="isEditingDescription = true"
                  class="prose prose-sm text-gray-500 hover:bg-gray-50 rounded p-2 cursor-pointer"
                >
                  {{ task.description || 'Add a more detailed description...' }}
                </div>
                <textarea
                  v-else
                  v-model="editedDescription"
                  rows="4"
                  class="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  @blur="saveDescription"
                ></textarea>
              </div>
            </div>
          </div>

          <!-- Meta Information -->
          <div class="grid grid-cols-2 gap-6">
            <div>
              <h3 class="text-sm font-medium text-gray-900 mb-2">Due Date</h3>
              <input 
                type="date" 
                v-model="task.dueDate"
                class="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
            </div>
            <div>
              <h3 class="text-sm font-medium text-gray-900 mb-2">Assignee</h3>
              <select 
                v-model="task.assignee"
                class="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option v-for="user in users" :key="user.id" :value="user">
                  {{ user.name }}
                </option>
              </select>
            </div>
          </div>

          <!-- Comments Section -->
          <div>
            <div class="flex items-start space-x-3">
              <span class="text-gray-500 mt-1">💬</span>
              <div class="flex-1">
                <h3 class="text-sm font-medium text-gray-900 mb-3">Comments</h3>
                
                <!-- Comment List -->
                <div class="space-y-4">
                  <div v-for="comment in task.comments" :key="comment.id" class="flex space-x-3">
                    <img :src="comment.user.avatar" :alt="comment.user.name" class="w-8 h-8 rounded-full">
                    <div class="flex-1">
                      <div class="bg-gray-50 rounded-lg px-4 py-2">
                        <div class="flex justify-between items-start">
                          <span class="font-medium text-sm text-gray-900">{{ comment.user.name }}</span>
                          <span class="text-xs text-gray-500">{{ formatDate(comment.createdAt) }}</span>
                        </div>
                        <p class="text-sm text-gray-600 mt-1">{{ comment.content }}</p>
                      </div>
                      <div class="mt-1 ml-4 space-x-2">
                        <button class="text-xs text-gray-500 hover:text-gray-700">Edit</button>
                        <button class="text-xs text-gray-500 hover:text-gray-700">Delete</button>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- New Comment Form -->
                <div class="mt-4 flex space-x-3">
                  <img 
                    :src="currentUser.avatar" 
                    :alt="currentUser.name" 
                    class="w-8 h-8 rounded-full"
                  >
                  <div class="flex-1">
                    <textarea
                      v-model="newComment"
                      rows="2"
                      placeholder="Write a comment..."
                      class="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    ></textarea>
                    <div class="mt-2 flex justify-end">
                      <button 
                        @click="addComment"
                        class="px-3 py-1.5 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700"
                        :disabled="!newComment.trim()"
                      >
                        Comment
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isOpen: Boolean,
    task: Object,
    columnTitle: String
  },
  data() {
    return {
      isEditingDescription: false,
      editedDescription: '',
      newComment: '',
      currentUser: {
        id: 'current-user',
        name: 'Current User',
        avatar: 'https://ui-avatars.com/api/?name=Current+User'
      },
      users: [
        { id: 1, name: 'Developer 1', avatar: 'https://ui-avatars.com/api/?name=Developer+1' },
        { id: 2, name: 'QA Manager', avatar: 'https://ui-avatars.com/api/?name=QA+Manager' },
        { id: 3, name: 'Digital Marketing', avatar: 'https://ui-avatars.com/api/?name=Digital+Marketing' }
      ]
    }
  },
  computed: {
    priorityClass() {
      const classes = {
        high: 'bg-red-100 text-red-800',
        medium: 'bg-yellow-100 text-yellow-800',
        low: 'bg-green-100 text-green-800'
      }
      return classes[this.task.priority?.toLowerCase()]
    }
  },
  watch: {
    task: {
      immediate: true,
      handler(newTask) {
        if (newTask) {
          this.editedDescription = newTask.description
        }
      }
    }
  },
  methods: {
    close() {
      this.$emit('update:isOpen', false)
    },
    formatDate(date) {
      return new Date(date).toLocaleString()
    },
    saveDescription() {
      this.isEditingDescription = false
      if (this.editedDescription !== this.task.description) {
        this.$emit('update:task', {
          ...this.task,
          description: this.editedDescription
        })
      }
    },
    addComment() {
      if (!this.newComment.trim()) return

      const comment = {
        id: Date.now().toString(),
        content: this.newComment,
        user: this.currentUser,
        createdAt: new Date().toISOString()
      }

      this.$emit('update:task', {
        ...this.task,
        comments: [...(this.task.comments || []), comment]
      })

      this.newComment = ''
    }
  }
}
</script> 