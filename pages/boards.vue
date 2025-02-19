<template>
  <div class="min-h-screen flex flex-col bg-blue-50">
    <TrekkaHeader />
    
    <main class="flex-1 container mx-auto px-6 py-8">
      <div class="mb-8">
        <h1 class="text-2xl font-bold text-gray-900">Your Boards</h1>
        <p class="mt-1 text-sm text-gray-500">Manage and organize all your projects</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <!-- Existing Boards -->
        <div 
          v-for="board in boards" 
          :key="board.id"
          class="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
        >
          <NuxtLink :to="`/boards/${board.id}`" class="block p-4">
            <div class="flex justify-between items-start">
              <div>
                <h3 class="text-lg font-medium text-gray-900">{{ board.title }}</h3>
                <p class="mt-1 text-sm text-gray-500">
                  {{ board.columns.reduce((acc, col) => acc + col.tasks.length, 0) }} tasks
                </p>
              </div>
              <button 
                @click.prevent="toggleFavorite(board)"
                class="text-gray-400 hover:text-yellow-500"
              >
                <span v-if="board.favorite">★</span>
                <span v-else>☆</span>
              </button>
            </div>
            <div class="mt-4 flex items-center text-sm text-gray-500">
              <span class="flex items-center">
                <span class="mr-2">👥</span>
                {{ board.members?.length || 1 }} members
              </span>
            </div>
          </NuxtLink>
        </div>

        <!-- Create New Board -->
        <button 
          @click="showNewBoardModal = true"
          class="bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 p-4 hover:border-blue-500 hover:bg-blue-50 transition-colors duration-200"
        >
          <div class="text-center">
            <span class="block text-3xl text-gray-400 mb-2">+</span>
            <span class="text-sm font-medium text-gray-900">Create New Board</span>
          </div>
        </button>
      </div>
    </main>

    <!-- New Board Modal -->
    <div v-if="showNewBoardModal" class="fixed inset-0 z-50 overflow-y-auto">
      <div class="flex min-h-screen items-center justify-center px-4">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" @click="showNewBoardModal = false"></div>
        
        <div class="relative w-full max-w-md bg-white rounded-lg shadow-xl">
          <div class="p-6">
            <h2 class="text-xl font-semibold text-gray-900 mb-4">Create New Board</h2>
            <form @submit.prevent="createBoard">
              <div class="space-y-4">
                <div>
                  <label for="boardTitle" class="block text-sm font-medium text-gray-700">Board Title</label>
                  <input
                    id="boardTitle"
                    v-model="newBoardTitle"
                    type="text"
                    required
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Enter board title"
                  >
                </div>
                <div>
                  <label for="boardTemplate" class="block text-sm font-medium text-gray-700">Template</label>
                  <select
                    id="boardTemplate"
                    v-model="selectedTemplate"
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  >
                    <option value="blank">Blank Board</option>
                    <option value="kanban">Kanban Template</option>
                    <option value="sprint">Sprint Planning</option>
                  </select>
                </div>
              </div>
              <div class="mt-6 flex justify-end space-x-3">
                <button
                  type="button"
                  @click="showNewBoardModal = false"
                  class="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-md border border-gray-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  class="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md"
                  :disabled="!newBoardTitle.trim()"
                >
                  Create Board
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
import { ref, computed } from 'vue'
import { useBoardStore } from '~/store/board'

const boardStore = useBoardStore()
const boards = computed(() => boardStore.boards)
const showNewBoardModal = ref(false)
const newBoardTitle = ref('')
const selectedTemplate = ref('blank')

function toggleFavorite(board) {
  board.favorite = !board.favorite
}

function createBoard() {
  const boardId = `board-${Date.now()}`
  const columns = getTemplateColumns(selectedTemplate.value)
  
  boardStore.addBoard({
    id: boardId,
    title: newBoardTitle.value,
    columns: columns,
    members: [],
    favorite: false,
    createdAt: new Date().toISOString()
  })

  showNewBoardModal.value = false
  newBoardTitle.value = ''
  selectedTemplate.value = 'blank'
  
  // Navigate to the new board
  navigateTo(`/boards/${boardId}`)
}

function getTemplateColumns(template) {
  switch (template) {
    case 'kanban':
      return [
        { id: 'todo', title: 'To Do', tasks: [] },
        { id: 'inProgress', title: 'In Progress', tasks: [] },
        { id: 'review', title: 'Review', tasks: [] },
        { id: 'done', title: 'Done', tasks: [] }
      ]
    case 'sprint':
      return [
        { id: 'backlog', title: 'Backlog', tasks: [] },
        { id: 'sprint', title: 'Current Sprint', tasks: [] },
        { id: 'inProgress', title: 'In Progress', tasks: [] },
        { id: 'testing', title: 'Testing', tasks: [] },
        { id: 'done', title: 'Done', tasks: [] }
      ]
    default:
      return [
        { id: 'todo', title: 'To Do', tasks: [] },
        { id: 'inProgress', title: 'In Progress', tasks: [] },
        { id: 'done', title: 'Done', tasks: [] }
      ]
  }
}
</script> 