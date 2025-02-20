<template>
  <div class="min-h-screen flex flex-col">
    <main class="flex-1 container mx-auto px-6 py-8">
      <!-- Boards Header -->
      <div class="mb-8">
        <div class="flex items-center justify-between">
          <div>
            <h2 class="text-xl font-semibold text-gray-900">Boards</h2>
            <p class="text-sm text-gray-500 mt-1">Manage and organize your projects</p>
          </div>
          <button 
            @click="openNewBoardModal"
            class="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors"
          >
            <span class="mr-2">+</span> Create Board
          </button>
        </div>
      </div>

      <!-- Favorites Section -->
      <div v-if="favoriteBoards.length" class="mb-12">
        <h3 class="text-sm font-medium text-gray-400 uppercase tracking-wider mb-4">
          Starred Boards
        </h3>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div v-for="board in favoriteBoards" :key="board.id"
            class="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 group border border-gray-100 hover:border-blue-100 hover:translate-y-[-2px] overflow-hidden cursor-pointer"
            @click="openBoard(board)"
          >
            <!-- Board Preview -->
            <div 
              class="h-32 bg-cover bg-center transition-all duration-300"
              :style="{
                background: board.background,
                backgroundSize: isGradient(board.background) ? '100% 100%' : 'auto'
              }"
            />

            <!-- Board Info -->
            <div class="p-4">
              <div class="flex items-start justify-between mb-3">
                <div>
                  <h4 class="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                    {{ board.title }}
                  </h4>
                  <p class="text-sm text-gray-500">{{ board.team || 'Personal Board' }}</p>
                </div>
                <button 
                  @click.stop="toggleFavorite(board)"
                  class="text-yellow-400 hover:text-yellow-500"
                >
                  ★
                </button>
              </div>

              <!-- Board Stats -->
              <div class="flex items-center space-x-4 text-sm text-gray-500">
                <div class="flex items-center">
                  <span class="mr-2">📋</span>
                  {{ board.lists?.length || 0 }} lists
                </div>
                <div class="flex items-center">
                  <span class="mr-2">✓</span>
                  {{ completedTasks(board) }}/{{ totalTasks(board) }} tasks
                </div>
              </div>

              <!-- Last Activity -->
              <div class="mt-4 pt-4 border-t border-gray-100">
                <div class="flex items-center justify-between text-xs text-gray-400">
                  <div class="flex items-center">
                    <span class="w-2 h-2 rounded-full bg-green-400 mr-2"></span>
                    Updated {{ formatDate(board.updatedAt) }}
                  </div>
                  <div class="flex -space-x-2">
                    <img 
                      v-for="member in board.members?.slice(0, 3)" 
                      :key="member.id"
                      :src="member.avatar"
                      :alt="member.name"
                      class="w-6 h-6 rounded-full ring-2 ring-white"
                      :title="member.name"
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- All Boards -->
      <div>
        <h3 class="text-sm font-medium text-gray-400 uppercase tracking-wider mb-4">
          All Boards
        </h3>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div v-for="board in regularBoards" :key="board.id"
            class="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 group border border-gray-100 hover:border-blue-100 hover:translate-y-[-2px] overflow-hidden cursor-pointer"
            @click="openBoard(board)"
          >
            <!-- Same structure as favorite board cards -->
            <div 
              class="h-32 bg-cover bg-center transition-all duration-300"
              :style="{
                background: board.background,
                backgroundSize: isGradient(board.background) ? '100% 100%' : 'auto'
              }"
            />

            <div class="p-4">
              <div class="flex items-start justify-between mb-3">
                <div>
                  <h4 class="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                    {{ board.title }}
                  </h4>
                  <p class="text-sm text-gray-500">{{ board.team || 'Personal Board' }}</p>
                </div>
                <button 
                  @click.stop="toggleFavorite(board)"
                  class="text-gray-300 hover:text-yellow-400"
                >
                  ★
                </button>
              </div>

              <div class="flex items-center space-x-4 text-sm text-gray-500">
                <div class="flex items-center">
                  <span class="mr-2">📋</span>
                  {{ board.lists?.length || 0 }} lists
                </div>
                <div class="flex items-center">
                  <span class="mr-2">✓</span>
                  {{ completedTasks(board) }}/{{ totalTasks(board) }} tasks
                </div>
              </div>

              <div class="mt-4 pt-4 border-t border-gray-100">
                <div class="flex items-center justify-between text-xs text-gray-400">
                  <div class="flex items-center">
                    <span class="w-2 h-2 rounded-full bg-green-400 mr-2"></span>
                    Updated {{ formatDate(board.updatedAt) }}
                  </div>
                  <div class="flex -space-x-2">
                    <img 
                      v-for="member in board.members?.slice(0, 3)" 
                      :key="member.id"
                      :src="member.avatar"
                      :alt="member.name"
                      class="w-6 h-6 rounded-full ring-2 ring-white"
                      :title="member.name"
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Add Board Card -->
          <div 
            class="bg-white rounded-lg border-2 border-dashed border-gray-200 hover:border-blue-300 transition-colors p-6 flex flex-col items-center justify-center gap-3 cursor-pointer group min-h-[250px]"
            @click="openNewBoardModal"
          >
            <div class="w-12 h-12 rounded-full bg-blue-50 group-hover:bg-blue-100 transition-colors flex items-center justify-center">
              <span class="text-2xl text-blue-600">+</span>
            </div>
            <h3 class="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
              Create New Board
            </h3>
            <p class="text-sm text-gray-500 text-center">
              Add a new board to organize your tasks
            </p>
          </div>
        </div>
      </div>
    </main>

    <!-- New Board Modal -->
    <board-modal
      v-if="isModalOpen"
      v-model:isOpen="isModalOpen"
      :board="selectedBoard"
      @save="saveBoard"
    />

    <!-- Board Details Modal -->
    <div v-if="isDetailsModalOpen" class="fixed inset-0 z-50 overflow-y-auto">
      <div class="flex min-h-screen items-center justify-center px-4">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" @click="closeDetailsModal"></div>
        
        <div class="relative w-full max-w-2xl bg-white rounded-lg shadow-xl">
          <div class="p-6">
            <!-- Header -->
            <div class="flex justify-between items-start mb-6">
              <div>
                <h2 class="text-2xl font-semibold text-gray-900">{{ selectedBoard?.title }}</h2>
                <p class="mt-1 text-sm text-gray-500">
                  {{ selectedBoard?.team || 'Personal Board' }}
                </p>
              </div>
              <div class="flex space-x-2">
                <button 
                  @click="editBoard"
                  class="px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-md border border-gray-300"
                >
                  Edit Board
                </button>
                <button 
                  @click="navigateToBoard(selectedBoard?.id)"
                  class="px-3 py-1.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md"
                >
                  Open Board
                </button>
                <button 
                  @click="closeDetailsModal"
                  class="text-gray-400 hover:text-gray-600 p-1"
                >
                  ×
                </button>
              </div>
            </div>

            <!-- Statistics Grid -->
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div class="bg-blue-50 rounded-lg p-4">
                <div class="text-sm font-medium text-blue-600 mb-1">Lists</div>
                <div class="text-2xl font-semibold text-blue-700">
                  {{ selectedBoard?.lists?.length || 0 }}
                </div>
              </div>
              
              <div class="bg-green-50 rounded-lg p-4">
                <div class="text-sm font-medium text-green-600 mb-1">Tasks</div>
                <div class="text-2xl font-semibold text-green-700">
                  {{ totalTasks(selectedBoard) }}
                </div>
              </div>
              
              <div class="bg-purple-50 rounded-lg p-4">
                <div class="text-sm font-medium text-purple-600 mb-1">Completed</div>
                <div class="flex items-baseline">
                  <span class="text-2xl font-semibold text-purple-700 mr-2">
                    {{ completedTasks(selectedBoard) }}
                  </span>
                  <span class="text-sm text-purple-600">
                    ({{ completionRate }}%)
                  </span>
                </div>
              </div>
              
              <div class="bg-orange-50 rounded-lg p-4">
                <div class="text-sm font-medium text-orange-600 mb-1">Members</div>
                <div class="text-2xl font-semibold text-orange-700">
                  {{ selectedBoard?.members?.length || 0 }}
                </div>
              </div>
            </div>

            <!-- Activity Timeline -->
            <div class="mb-8">
              <h3 class="text-sm font-medium text-gray-700 mb-4">Recent Activity</h3>
              <div class="space-y-4">
                <div v-for="(activity, index) in recentActivities" :key="index" 
                  class="flex items-start space-x-3"
                >
                  <div class="flex-shrink-0">
                    <img :src="activity.user.avatar" :alt="activity.user.name" 
                      class="w-8 h-8 rounded-full"
                    >
                  </div>
                  <div class="flex-1 min-w-0">
                    <p class="text-sm text-gray-900">
                      <span class="font-medium">{{ activity.user.name }}</span>
                      {{ activity.action }}
                    </p>
                    <p class="text-xs text-gray-500">
                      {{ formatDate(activity.date) }}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Lists Overview -->
            <div>
              <h3 class="text-sm font-medium text-gray-700 mb-4">Lists Overview</h3>
              <div class="space-y-3">
                <div v-for="list in selectedBoard?.lists" :key="list.id"
                  class="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div>
                    <h4 class="text-sm font-medium text-gray-900">{{ list.title }}</h4>
                    <p class="text-xs text-gray-500">
                      {{ list.tasks?.length || 0 }} tasks
                    </p>
                  </div>
                  <div class="flex items-center space-x-2">
                    <div class="w-32 bg-gray-200 rounded-full h-2">
                      <div class="bg-blue-600 h-2 rounded-full" 
                        :style="{ width: `${getListProgress(list)}%` }"
                      ></div>
                    </div>
                    <span class="text-xs text-gray-600">
                      {{ getListProgress(list) }}%
                    </span>
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

<script setup>
import { ref, computed } from 'vue'
import { useBoardStore } from '~/store/board'
import { useRouter } from 'vue-router'

const router = useRouter()
const boardStore = useBoardStore()
const isModalOpen = ref(false)
const isDetailsModalOpen = ref(false)
const selectedBoard = ref(null)

const favoriteBoards = computed(() => 
  boardStore.boards.filter(board => board.favorite)
)

const regularBoards = computed(() => 
  boardStore.boards.filter(board => !board.favorite)
)

function openNewBoardModal() {
  selectedBoard.value = null
  isModalOpen.value = true
}

function openBoard(board) {
  selectedBoard.value = board
  isDetailsModalOpen.value = true
}

function editBoard() {
  isDetailsModalOpen.value = false
  isModalOpen.value = true
}

function closeDetailsModal() {
  isDetailsModalOpen.value = false
  selectedBoard.value = null
}

function saveBoard(boardData) {
  if (selectedBoard.value) {
    boardStore.updateBoard(boardData)
  } else {
    boardStore.addBoard(boardData)
  }
}

function toggleFavorite(board) {
  boardStore.updateBoard({
    ...board,
    favorite: !board.favorite
  })
}

function navigateToBoard(boardId) {
  router.push(`/boards/${boardId}`)
}

function completedTasks(board) {
  return board.lists?.reduce((acc, list) => 
    acc + list.tasks?.filter(task => task.completed)?.length || 0, 0
  ) || 0
}

function totalTasks(board) {
  return board.lists?.reduce((acc, list) => 
    acc + (list.tasks?.length || 0), 0
  ) || 0
}

function formatDate(date) {
  if (!date) return 'Never'
  const d = new Date(date)
  const now = new Date()
  const diff = now - d
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  
  if (days === 0) return 'Today'
  if (days === 1) return 'Yesterday'
  if (days < 7) return `${days} days ago`
  return d.toLocaleDateString()
}

const completionRate = computed(() => {
  if (!selectedBoard.value) return 0
  const total = totalTasks(selectedBoard.value)
  if (total === 0) return 0
  return Math.round((completedTasks(selectedBoard.value) / total) * 100)
})

const recentActivities = computed(() => [
  {
    user: { name: 'John Doe', avatar: 'https://ui-avatars.com/api/?name=John+Doe' },
    action: 'completed task "Update documentation"',
    date: new Date(Date.now() - 1000 * 60 * 30) // 30 minutes ago
  },
  {
    user: { name: 'Jane Smith', avatar: 'https://ui-avatars.com/api/?name=Jane+Smith' },
    action: 'added new task "Review pull request"',
    date: new Date(Date.now() - 1000 * 60 * 60) // 1 hour ago
  },
  {
    user: { name: 'Mike Johnson', avatar: 'https://ui-avatars.com/api/?name=Mike+Johnson' },
    action: 'created new list "Sprint Backlog"',
    date: new Date(Date.now() - 1000 * 60 * 60 * 2) // 2 hours ago
  }
])

function getListProgress(list) {
  if (!list.tasks?.length) return 0
  const completed = list.tasks.filter(task => task.completed).length
  return Math.round((completed / list.tasks.length) * 100)
}

function isGradient(background) {
  return background?.includes('gradient')
}
</script>

<style>
.group:hover .group-hover\:text-blue-600 {
  transition-delay: 50ms;
}
</style> 