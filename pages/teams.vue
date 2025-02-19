<template>
  <div class="min-h-screen flex flex-col bg-blue-50">
    <TrekkaHeader />
    
    <main class="flex-1 container mx-auto px-6 py-8">
      <!-- Teams Header -->
      <div class="mb-8">
        <div class="flex items-center justify-between">
          <h2 class="text-xl font-semibold text-gray-900">Teams</h2>
          <button 
            @click="openNewTeamModal"
            class="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md"
          >
            <span class="mr-2">+</span> Create Team
          </button>
        </div>
      </div>

      <!-- Teams Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="team in teams" :key="team.id" 
          class="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 p-6 cursor-pointer group border border-gray-100 hover:border-blue-100 hover:translate-y-[-2px]"
          @click="openTeamDetails(team)"
        >
          <!-- Team Header -->
          <div class="flex items-start justify-between mb-6">
            <div>
              <h3 class="text-lg font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                {{ team.name }}
              </h3>
              <p class="text-sm text-gray-500 mt-1">{{ team.description }}</p>
            </div>
            <button 
              @click.stop="openTeamMenu(team)"
              class="text-gray-400 hover:text-gray-600 p-1.5 hover:bg-gray-100 rounded-full transition-colors"
            >
              •••
            </button>
          </div>

          <!-- Team Stats -->
          <div class="flex items-center space-x-4 mb-6 text-sm text-gray-500">
            <div class="flex items-center">
              <span class="mr-2">👥</span>
              {{ team.members.length }} members
            </div>
            <div class="flex items-center">
              <span class="mr-2">📋</span>
              {{ team.recentBoards.length }} boards
            </div>
          </div>

          <!-- Team Members -->
          <div class="mb-6">
            <div class="flex -space-x-2 overflow-hidden">
              <img 
                v-for="member in team.members.slice(0, 5)" 
                :key="member.id"
                :src="member.avatar"
                :alt="member.name"
                class="inline-block h-8 w-8 rounded-full ring-2 ring-white"
                :title="member.name"
              >
              <div 
                v-if="team.members.length > 5"
                class="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 ring-2 ring-white"
              >
                <span class="text-xs font-medium text-gray-500">
                  +{{ team.members.length - 5 }}
                </span>
              </div>
            </div>
          </div>

          <!-- Recent Boards -->
          <div>
            <h4 class="text-xs font-medium text-gray-400 uppercase tracking-wider mb-3">
              Recent Boards
            </h4>
            <div class="space-y-2">
              <a 
                v-for="board in team.recentBoards.slice(0, 3)" 
                :key="board.id"
                :href="`/boards/${board.id}`"
                class="block text-sm text-gray-600 hover:text-gray-900 py-1.5 px-3 rounded-md hover:bg-gray-50 transition-colors"
                @click.stop
              >
                {{ board.title }}
              </a>
              <div 
                v-if="team.recentBoards.length > 3"
                class="text-xs text-gray-400 pl-3"
              >
                + {{ team.recentBoards.length - 3 }} more boards
              </div>
            </div>
          </div>

          <!-- Activity Indicator -->
          <div class="mt-6 pt-4 border-t border-gray-100">
            <div class="flex items-center text-xs text-gray-400">
              <span class="w-2 h-2 rounded-full bg-green-400 mr-2"></span>
              Active
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- Add the details modal -->
    <team-details-modal
      v-if="isDetailsModalOpen"
      v-model:isOpen="isDetailsModalOpen"
      :team="selectedTeam"
      @edit="openTeamMenu(selectedTeam)"
      @new-board="createNewBoard"
      @remove-member="removeMember"
    />

    <!-- New Team Modal -->
    <team-modal
      v-if="isTeamModalOpen"
      v-model:isOpen="isTeamModalOpen"
      :team="selectedTeam"
      @save="saveTeam"
    />

    <TrekkaFooter />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useTeamStore } from '~/store/team'

const teamStore = useTeamStore()
const teams = computed(() => teamStore.teams)
const isTeamModalOpen = ref(false)
const selectedTeam = ref(null)
const isDetailsModalOpen = ref(false)

function openNewTeamModal() {
  selectedTeam.value = null
  isTeamModalOpen.value = true
}

function openTeamMenu(team) {
  selectedTeam.value = team
  isTeamModalOpen.value = true
}

function openTeamDetails(team) {
  selectedTeam.value = team
  isDetailsModalOpen.value = true
}

function createNewBoard() {
  // Implement board creation logic
  alert('New board creation coming soon!')
}

function removeMember(memberId) {
  if (selectedTeam.value) {
    teamStore.removeMember(selectedTeam.value.id, memberId)
  }
}

function saveTeam(teamData) {
  if (selectedTeam.value) {
    teamStore.updateTeam(teamData)
  } else {
    teamStore.addTeam(teamData)
  }
}
</script>

<style>
.group:hover .group-hover\:text-blue-600 {
  transition-delay: 50ms;
}
</style> 