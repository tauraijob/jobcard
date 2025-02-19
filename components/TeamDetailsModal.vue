<template>
  <div class="fixed inset-0 z-50 overflow-y-auto">
    <div class="flex min-h-screen items-center justify-center px-4">
      <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" @click="$emit('update:isOpen', false)"></div>
      
      <div class="relative w-full max-w-2xl bg-white rounded-lg shadow-xl">
        <div class="p-6">
          <div class="flex justify-between items-start mb-6">
            <div>
              <h2 class="text-2xl font-semibold text-gray-900">{{ team.name }}</h2>
              <p class="mt-1 text-sm text-gray-500">{{ team.description }}</p>
            </div>
            <div class="flex space-x-2">
              <button 
                @click="$emit('edit')"
                class="px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-md border border-gray-300"
              >
                Edit Team
              </button>
              <button 
                @click="$emit('update:isOpen', false)"
                class="text-gray-400 hover:text-gray-600 p-1"
              >
                ×
              </button>
            </div>
          </div>

          <!-- Members Section -->
          <div class="mb-8">
            <div class="flex justify-between items-center mb-4">
              <h3 class="text-lg font-medium text-gray-900">Members</h3>
              <button 
                @click="showInviteForm = true"
                class="text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                + Add Member
              </button>
            </div>

            <!-- Invite Form -->
            <div v-if="showInviteForm" class="mb-4 bg-gray-50 p-4 rounded-lg">
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

            <!-- Members List -->
            <div class="space-y-3">
              <div v-for="member in team.members" :key="member.id" 
                class="flex items-center justify-between bg-white p-3 rounded-lg border"
              >
                <div class="flex items-center space-x-3">
                  <img :src="member.avatar" :alt="member.name" class="w-8 h-8 rounded-full">
                  <div>
                    <div class="text-sm font-medium text-gray-900">{{ member.name }}</div>
                    <div class="text-xs text-gray-500">{{ member.role }}</div>
                  </div>
                </div>
                <button 
                  v-if="member.role !== 'admin'"
                  @click="removeMember(member.id)"
                  class="text-red-600 hover:text-red-800 text-sm"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>

          <!-- Boards Section -->
          <div>
            <div class="flex justify-between items-center mb-4">
              <h3 class="text-lg font-medium text-gray-900">Boards</h3>
              <button 
                @click="$emit('new-board')"
                class="text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                + New Board
              </button>
            </div>
            <div class="grid grid-cols-2 gap-4">
              <a v-for="board in team.recentBoards" 
                :key="board.id"
                :href="`/boards/${board.id}`"
                class="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100"
              >
                <h4 class="text-sm font-medium text-gray-900">{{ board.title }}</h4>
              </a>
            </div>
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
  team: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['update:isOpen', 'edit', 'new-board'])
const showInviteForm = ref(false)
const newMemberEmail = ref('')

const isValidEmail = computed(() => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newMemberEmail.value)
})

function inviteMember() {
  if (isValidEmail.value) {
    // Here you would typically make an API call to invite the member
    alert(`Invitation sent to ${newMemberEmail.value}`)
    newMemberEmail.value = ''
    showInviteForm.value = false
  }
}

function removeMember(memberId) {
  if (confirm('Are you sure you want to remove this member?')) {
    emit('remove-member', memberId)
  }
}
</script> 