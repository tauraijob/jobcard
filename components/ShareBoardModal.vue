<template>
  <div class="fixed inset-0 z-50 overflow-y-auto">
    <div class="flex min-h-screen items-center justify-center px-4">
      <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" @click="$emit('update:isOpen', false)"></div>
      
      <div class="relative w-full max-w-md bg-white rounded-lg shadow-xl">
        <div class="p-6">
          <h2 class="text-xl font-semibold text-gray-900 mb-4">
            Share Board
          </h2>

          <!-- Share Link -->
          <div class="mb-6">
            <label class="block text-sm font-medium text-gray-700 mb-2">Board Link</label>
            <div class="flex">
              <input
                type="text"
                readonly
                :value="shareLink"
                class="flex-1 rounded-l-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
              <button
                @click="copyLink"
                class="px-4 py-2 bg-gray-100 border border-l-0 border-gray-300 rounded-r-md hover:bg-gray-200"
              >
                Copy
              </button>
            </div>
          </div>

          <!-- Team Members -->
          <div class="mb-6">
            <label class="block text-sm font-medium text-gray-700 mb-2">Team Members</label>
            <div class="space-y-2">
              <div v-for="member in members" :key="member.id" class="flex items-center justify-between">
                <div class="flex items-center space-x-3">
                  <img :src="member.avatar" :alt="member.name" class="w-8 h-8 rounded-full">
                  <span class="text-sm text-gray-900">{{ member.name }}</span>
                </div>
                <select
                  v-model="member.role"
                  class="text-sm rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="viewer">Viewer</option>
                  <option value="editor">Editor</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
            </div>
          </div>

          <!-- Add Member -->
          <div class="mb-6">
            <label class="block text-sm font-medium text-gray-700 mb-2">Add Member</label>
            <div class="flex space-x-2">
              <input
                v-model="newMemberEmail"
                type="email"
                placeholder="Enter email address"
                class="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
              <button
                @click="inviteMember"
                :disabled="!isValidEmail"
                class="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md disabled:opacity-50"
              >
                Invite
              </button>
            </div>
          </div>

          <div class="flex justify-end">
            <button
              @click="$emit('update:isOpen', false)"
              class="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-md border border-gray-300"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  isOpen: Boolean,
  boardId: String
})

const emit = defineEmits(['update:isOpen'])

const shareLink = computed(() => `${window.location.origin}/boards/${props.boardId}`)
const newMemberEmail = ref('')
const members = ref([
  { id: 1, name: 'John Doe', avatar: 'https://ui-avatars.com/api/?name=John+Doe', role: 'admin' },
  { id: 2, name: 'Jane Smith', avatar: 'https://ui-avatars.com/api/?name=Jane+Smith', role: 'editor' }
])

const isValidEmail = computed(() => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newMemberEmail.value)
})

function copyLink() {
  navigator.clipboard.writeText(shareLink.value)
    .then(() => alert('Link copied to clipboard!'))
    .catch(() => alert('Failed to copy link'))
}

function inviteMember() {
  if (isValidEmail.value) {
    // Here you would typically make an API call to invite the member
    alert(`Invitation sent to ${newMemberEmail.value}`)
    newMemberEmail.value = ''
  }
}
</script> 