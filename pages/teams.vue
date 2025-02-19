<template>
  <div class="min-h-screen flex flex-col bg-blue-50">
    <TrekkaHeader />
    
    <main class="flex-1 container mx-auto px-6 py-8">
      <div class="mb-8">
        <h1 class="text-2xl font-bold text-gray-900">Teams</h1>
        <p class="mt-1 text-sm text-gray-500">Manage your teams and collaborators</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <!-- Existing Teams -->
        <div 
          v-for="team in teams" 
          :key="team.id"
          class="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 p-4"
        >
          <div class="flex items-start justify-between">
            <div class="flex items-center space-x-3">
              <div class="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
                <span class="text-xl text-blue-600">{{ team.title[0] }}</span>
              </div>
              <div>
                <h3 class="text-lg font-medium text-gray-900">{{ team.title }}</h3>
                <p class="text-sm text-gray-500">{{ team.members.length }} members</p>
              </div>
            </div>
            <button class="text-gray-400 hover:text-gray-600">•••</button>
          </div>

          <div class="mt-4">
            <div class="flex -space-x-2 overflow-hidden">
              <img
                v-for="member in team.members.slice(0, 5)"
                :key="member.id"
                :src="member.avatar"
                :alt="member.name"
                class="inline-block h-8 w-8 rounded-full ring-2 ring-white"
              >
              <div
                v-if="team.members.length > 5"
                class="flex items-center justify-center h-8 w-8 rounded-full bg-gray-200 ring-2 ring-white"
              >
                <span class="text-xs text-gray-600">+{{ team.members.length - 5 }}</span>
              </div>
            </div>
          </div>

          <div class="mt-4 pt-4 border-t">
            <div class="flex justify-between text-sm">
              <span class="text-gray-500">{{ team.boards.length }} boards</span>
              <button class="text-blue-600 hover:text-blue-700 font-medium">
                View Team
              </button>
            </div>
          </div>
        </div>

        <!-- Create New Team -->
        <button 
          @click="showNewTeamModal = true"
          class="bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 p-4 hover:border-blue-500 hover:bg-blue-50 transition-colors duration-200"
        >
          <div class="text-center">
            <span class="block text-3xl text-gray-400 mb-2">+</span>
            <span class="text-sm font-medium text-gray-900">Create New Team</span>
          </div>
        </button>
      </div>
    </main>

    <!-- New Team Modal -->
    <div v-if="showNewTeamModal" class="fixed inset-0 z-50 overflow-y-auto">
      <div class="flex min-h-screen items-center justify-center px-4">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" @click="showNewTeamModal = false"></div>
        
        <div class="relative w-full max-w-md bg-white rounded-lg shadow-xl">
          <div class="p-6">
            <h2 class="text-xl font-semibold text-gray-900 mb-4">Create New Team</h2>
            <form @submit.prevent="createTeam">
              <div class="space-y-4">
                <div>
                  <label for="teamTitle" class="block text-sm font-medium text-gray-700">Team Name</label>
                  <input
                    id="teamTitle"
                    v-model="newTeamTitle"
                    type="text"
                    required
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Enter team name"
                  >
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700">Invite Members</label>
                  <div class="mt-1">
                    <input
                      v-model="newMemberEmail"
                      type="email"
                      class="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      placeholder="Enter email address"
                      @keydown.enter.prevent="addMember"
                    >
                  </div>
                  <div class="mt-2 flex flex-wrap gap-2">
                    <div
                      v-for="(member, index) in invitedMembers"
                      :key="index"
                      class="inline-flex items-center bg-blue-50 rounded-full px-3 py-1"
                    >
                      <span class="text-sm text-blue-700">{{ member }}</span>
                      <button
                        @click="invitedMembers.splice(index, 1)"
                        class="ml-2 text-blue-400 hover:text-blue-600"
                      >
                        ×
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div class="mt-6 flex justify-end space-x-3">
                <button
                  type="button"
                  @click="showNewTeamModal = false"
                  class="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-md border border-gray-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  class="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md"
                  :disabled="!newTeamTitle.trim()"
                >
                  Create Team
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

    <TrekkaFooter />
  </div>
</template>

<script setup>
import { ref } from 'vue'

const teams = ref([
  {
    id: 1,
    title: 'Development Team',
    members: [
      { id: 1, name: 'John Doe', avatar: 'https://ui-avatars.com/api/?name=John+Doe' },
      { id: 2, name: 'Jane Smith', avatar: 'https://ui-avatars.com/api/?name=Jane+Smith' },
      // Add more members...
    ],
    boards: [
      { id: 1, title: 'Sprint Planning' },
      { id: 2, title: 'Bug Tracking' }
    ]
  },
  // Add more teams...
])

const showNewTeamModal = ref(false)
const newTeamTitle = ref('')
const newMemberEmail = ref('')
const invitedMembers = ref([])

function addMember() {
  if (newMemberEmail.value && !invitedMembers.value.includes(newMemberEmail.value)) {
    invitedMembers.value.push(newMemberEmail.value)
    newMemberEmail.value = ''
  }
}

function createTeam() {
  const newTeam = {
    id: Date.now(),
    title: newTeamTitle.value,
    members: invitedMembers.value.map((email, index) => ({
      id: index + 1,
      name: email.split('@')[0],
      avatar: `https://ui-avatars.com/api/?name=${email.split('@')[0]}`
    })),
    boards: []
  }

  teams.value.push(newTeam)
  showNewTeamModal.value = false
  newTeamTitle.value = ''
  invitedMembers.value = []
}
</script> 