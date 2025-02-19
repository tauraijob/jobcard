<template>
  <div class="fixed inset-0 z-50 overflow-y-auto">
    <div class="flex min-h-screen items-center justify-center px-4">
      <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" @click="$emit('update:isOpen', false)"></div>
      
      <div class="relative w-full max-w-md bg-white rounded-lg shadow-xl">
        <div class="p-6">
          <h2 class="text-xl font-semibold text-gray-900 mb-4">
            {{ team ? 'Edit Team' : 'Create New Team' }}
          </h2>
          
          <form @submit.prevent="handleSubmit">
            <div class="space-y-4">
              <!-- Team Name -->
              <div>
                <label for="name" class="block text-sm font-medium text-gray-700">Team Name</label>
                <input
                  id="name"
                  v-model="formData.name"
                  type="text"
                  required
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Enter team name"
                >
              </div>

              <!-- Description -->
              <div>
                <label for="description" class="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  id="description"
                  v-model="formData.description"
                  rows="3"
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Enter team description"
                ></textarea>
              </div>

              <!-- Members (only shown when editing) -->
              <div v-if="team">
                <label class="block text-sm font-medium text-gray-700 mb-2">Team Members</label>
                <div class="space-y-2">
                  <div v-for="member in formData.members" :key="member.id" 
                    class="flex items-center justify-between"
                  >
                    <div class="flex items-center space-x-3">
                      <img :src="member.avatar" :alt="member.name" class="w-8 h-8 rounded-full">
                      <span class="text-sm text-gray-900">{{ member.name }}</span>
                    </div>
                    <select
                      v-model="member.role"
                      class="text-sm rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    >
                      <option value="admin">Admin</option>
                      <option value="member">Member</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <div class="mt-6 flex justify-end space-x-3">
              <button
                type="button"
                @click="$emit('update:isOpen', false)"
                class="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-md border border-gray-300"
              >
                Cancel
              </button>
              <button
                type="submit"
                class="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md"
                :disabled="!formData.name.trim()"
              >
                {{ team ? 'Save Changes' : 'Create Team' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const props = defineProps({
  isOpen: Boolean,
  team: {
    type: Object,
    default: null
  }
})

const emit = defineEmits(['update:isOpen', 'save'])

const formData = ref({
  name: '',
  description: '',
  members: []
})

onMounted(() => {
  if (props.team) {
    formData.value = {
      ...props.team
    }
  } else {
    formData.value = {
      name: '',
      description: '',
      members: []
    }
  }
})

function handleSubmit() {
  emit('save', formData.value)
  emit('update:isOpen', false)
}
</script> 