<template>
  <div class="min-h-screen flex flex-col" :style="{ background: currentBoardData?.background || '#F8FAFC' }">
    <TrekkaHeader />
    
    <main class="flex-1 container mx-auto px-6 py-8">
      <!-- Board Header -->
      <div class="bg-white/95 backdrop-blur-sm rounded-xl p-6 mb-8 shadow-sm border border-gray-200">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-4">
            <div>
              <h2 class="text-2xl font-semibold text-gray-900">{{ currentBoardData?.title }}</h2>
              <p class="text-sm text-gray-600 mt-1">
                {{ currentBoardData?.team || 'Personal Board' }}
              </p>
            </div>
            <button 
              @click="toggleFavorite"
              class="text-2xl transition-transform hover:scale-110"
              :class="currentBoardData?.favorite ? 'text-yellow-400' : 'text-gray-400 hover:text-yellow-400'"
            >
              ★
            </button>
          </div>
          <div class="flex items-center space-x-3">
            <button 
              @click="openShareModal"
              class="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white/90 rounded-md hover:bg-white border border-gray-200 shadow-sm transition-all hover:shadow"
            >
              <span class="mr-2">👥</span> Share
            </button>
            <button 
              @click="openSettingsModal"
              class="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white/90 rounded-md hover:bg-white border border-gray-200 shadow-sm transition-all hover:shadow"
            >
              <span class="mr-2">⚙️</span> Settings
            </button>
          </div>
        </div>

        <!-- Board Stats -->
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
          <div class="bg-white/95 rounded-lg p-3 border border-gray-200">
            <div class="text-sm font-medium text-gray-500">Lists</div>
            <div class="text-2xl font-semibold text-gray-900 mt-1">
              {{ currentBoardData?.columns?.length || 0 }}
            </div>
          </div>
          
          <div class="bg-white/95 rounded-lg p-3 border border-gray-200">
            <div class="text-sm font-medium text-gray-500">Total Tasks</div>
            <div class="text-2xl font-semibold text-gray-900 mt-1">
              {{ totalTasks }}
            </div>
          </div>
          
          <div class="bg-white/95 rounded-lg p-3 border border-gray-200">
            <div class="text-sm font-medium text-gray-500">Completed</div>
            <div class="flex items-baseline">
              <span class="text-2xl font-semibold text-gray-900 mr-2">
                {{ completedTasks }}
              </span>
              <span class="text-sm text-gray-500">
                ({{ completionRate }}%)
              </span>
            </div>
          </div>
          
          <div class="bg-white/95 rounded-lg p-3 border border-gray-200">
            <div class="text-sm font-medium text-gray-500">Members</div>
            <div class="flex items-center mt-1">
              <div class="flex -space-x-2 mr-3">
                <img 
                  v-for="member in currentBoardData?.members?.slice(0, 3)" 
                  :key="member.id"
                  :src="member.avatar"
                  :alt="member.name"
                  class="w-8 h-8 rounded-full border-2 border-white"
                  :title="member.name"
                >
              </div>
              <button class="text-sm text-blue-600 hover:text-blue-700">
                {{ currentBoardData?.members?.length || 0 }} members
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Main Lists Section -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div v-for="column in mainColumns" :key="column.id" 
          class="bg-white/95 backdrop-blur-sm rounded-xl shadow-sm border border-gray-200"
        >
          <!-- Column Header -->
          <div class="p-3 flex items-center justify-between border-b border-gray-200">
            <div class="flex items-center space-x-2">
              <h3 class="font-medium text-gray-900">{{ column.title }}</h3>
              <span class="text-sm text-gray-500">({{ column.tasks.length }})</span>
            </div>
            <button 
              @click="openColumnMenu(column)"
              class="p-1 text-gray-400 hover:text-gray-600 rounded"
            >
              •••
            </button>
          </div>

          <!-- Tasks -->
          <div class="p-3">
            <draggable
              v-model="column.tasks"
              :group="{ name: 'tasks', pull: true, put: true }"
              item-key="id"
              class="space-y-3 min-h-[200px]"
              :animation="200"
            >
              <template #item="{ element: task }">
                <div 
                  class="bg-white rounded-lg p-3 shadow-sm border border-gray-200 cursor-pointer hover:shadow-md transition-shadow"
                  @click="openTaskModal(task)"
                >
                  <h4 class="font-medium text-gray-900">{{ task.title }}</h4>
                  <p class="text-sm text-gray-500 mt-1">{{ task.description }}</p>
                  
                  <!-- Task Footer -->
                  <div class="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
                    <div class="flex items-center space-x-2">
                      <span class="text-xs text-gray-400">
                        {{ formatDate(task.dueDate) }}
                      </span>
                      <div v-if="task.labels?.length" class="flex space-x-1">
                        <span 
                          v-for="label in task.labels" 
                          :key="label"
                          class="px-2 py-0.5 rounded-full text-xs"
                          :class="getLabelClass(label)"
                        >
                          {{ label }}
                        </span>
                      </div>
                    </div>
                    <div class="flex -space-x-2">
                      <img 
                        v-for="member in task.assignees?.slice(0, 2)" 
                        :key="member.id"
                        :src="member.avatar"
                        :alt="member.name"
                        class="w-6 h-6 rounded-full border-2 border-white"
                        :title="member.name"
                      >
                    </div>
                  </div>
                </div>
              </template>
            </draggable>

            <!-- Add Task Button -->
            <button 
              @click="openNewTaskModal(column)"
              class="w-full mt-3 p-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md flex items-center justify-center space-x-2 transition-colors"
            >
              <span>+</span>
              <span>Add Task</span>
            </button>
          </div>
        </div>
      </div>

      <!-- Additional Lists Section (if any) -->
      <div v-if="additionalColumns.length > 0" class="flex-1 overflow-x-auto">
        <h3 class="text-sm font-medium text-gray-500 uppercase tracking-wider mb-4">Additional Lists</h3>
        <div class="flex gap-6 min-w-max pb-8">
          <draggable
            v-model="additionalColumns"
            group="columns"
            item-key="id"
            class="flex gap-6"
            handle=".column-handle"
            :animation="200"
          >
            <template #item="{ element: column }">
              <div class="w-80 shrink-0">
                <div class="bg-white/95 backdrop-blur-sm rounded-xl shadow-sm border border-gray-200">
                  <!-- Column Header -->
                  <div class="p-3 flex items-center justify-between border-b border-gray-100">
                    <div class="flex items-center space-x-2">
                      <button class="column-handle cursor-grab hover:text-gray-600 px-1">⋮⋮</button>
                      <h3 class="font-medium text-gray-900">{{ column.title }}</h3>
                      <span class="text-sm text-gray-500">({{ column.tasks.length }})</span>
                    </div>
                    <div class="flex items-center space-x-1">
                      <button 
                        @click="openColumnMenu(column)"
                        class="p-1 text-gray-400 hover:text-gray-600 rounded"
                      >
                        •••
                      </button>
                    </div>
                  </div>

                  <!-- Tasks -->
                  <div class="p-3">
                    <draggable
                      v-model="column.tasks"
                      :group="{ name: 'tasks', pull: true, put: true }"
                      item-key="id"
                      class="space-y-3"
                      :animation="200"
                    >
                      <template #item="{ element: task }">
                        <div 
                          class="bg-white rounded-lg p-3 shadow-sm border border-gray-200 cursor-pointer hover:shadow-md transition-shadow"
                          @click="openTaskModal(task)"
                        >
                          <h4 class="font-medium text-gray-900">{{ task.title }}</h4>
                          <p class="text-sm text-gray-500 mt-1">{{ task.description }}</p>
                          
                          <!-- Task Footer -->
                          <div class="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
                            <div class="flex items-center space-x-2">
                              <span class="text-xs text-gray-400">
                                {{ formatDate(task.dueDate) }}
                              </span>
                              <div v-if="task.labels?.length" class="flex space-x-1">
                                <span 
                                  v-for="label in task.labels" 
                                  :key="label"
                                  class="px-2 py-0.5 rounded-full text-xs"
                                  :class="getLabelClass(label)"
                                >
                                  {{ label }}
                                </span>
                              </div>
                            </div>
                            <div class="flex -space-x-2">
                              <img 
                                v-for="member in task.assignees?.slice(0, 2)" 
                                :key="member.id"
                                :src="member.avatar"
                                :alt="member.name"
                                class="w-6 h-6 rounded-full border-2 border-white"
                                :title="member.name"
                              >
                            </div>
                          </div>
                        </div>
                      </template>
                    </draggable>

                    <!-- Add Task Button -->
                    <button 
                      @click="openNewTaskModal(column)"
                      class="w-full mt-3 p-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md flex items-center justify-center space-x-2 transition-colors"
                    >
                      <span>+</span>
                      <span>Add Task</span>
                    </button>
                  </div>
                </div>
              </div>
            </template>
          </draggable>

          <!-- Add Column Button -->
          <div class="w-80 shrink-0">
            <button 
              @click="openNewColumnModal"
              class="w-full h-full min-h-[100px] rounded-xl border-2 border-dashed border-gray-200 hover:border-blue-300 transition-colors flex flex-col items-center justify-center space-y-2 text-gray-500 hover:text-blue-600"
            >
              <span class="text-2xl">+</span>
              <span class="text-sm font-medium">Add New List</span>
            </button>
          </div>
        </div>
      </div>
    </main>

    <!-- Modals -->
    <share-board-modal v-if="isShareModalOpen" v-model:isOpen="isShareModalOpen" :board-id="boardStore.currentBoard" />
    <board-settings-modal v-if="isSettingsModalOpen" v-model:isOpen="isSettingsModalOpen" :board-id="boardStore.currentBoard" @save="updateBoardSettings" />
    <task-modal v-if="isTaskModalOpen" v-model:isOpen="isTaskModalOpen" :task="selectedTask" @save="saveTask" />
    <column-modal v-if="isColumnModalOpen" v-model:isOpen="isColumnModalOpen" :column="selectedColumn" @save="saveColumn" />

    <TrekkaFooter />
  </div>
</template>

<script setup>
import { useBoardStore } from '~/store/board'
import { computed, ref } from 'vue'

const boardStore = useBoardStore()
const currentBoardData = computed(() => boardStore.currentBoardData)

// Update the columns computed property to safely access columns
const columns = computed(() => currentBoardData.value?.columns || [])

const isModalOpen = ref(false)
const isDetailsOpen = ref(false)
const selectedTask = ref(null)
const draggingId = ref(null)
const draggingColumn = ref(null)
const isColumnModalOpen = ref(false)
const isShareModalOpen = ref(false)
const isSettingsModalOpen = ref(false)
const isTaskModalOpen = ref(false)
const selectedColumn = ref(null)

// Update the stats computeds to use currentBoardData
const totalTasks = computed(() => 
  currentBoardData.value?.columns?.reduce((acc, col) => 
    acc + (col.tasks?.length || 0), 0
  ) || 0
)

const completedTasks = computed(() => 
  currentBoardData.value?.columns?.reduce((acc, col) => 
    acc + (col.tasks?.filter(t => t.completed)?.length || 0), 0
  ) || 0
)

const completionRate = computed(() => {
  if (!totalTasks.value) return 0
  return Math.round((completedTasks.value / totalTasks.value) * 100)
})

function saveBoard() {
  // Will implement persistence later
  console.log('Board state saved')
}

function openTaskModal(task) {
  selectedTask.value = task
  isTaskModalOpen.value = true
}

function openNewTaskModal(column) {
  selectedTask.value = null
  selectedColumn.value = column
  isTaskModalOpen.value = true
}

function openColumnMenu(column) {
  selectedColumn.value = column
  isColumnModalOpen.value = true
}

function saveTask(taskData) {
  if (selectedTask.value) {
    boardStore.updateTask(taskData.id, taskData)
  } else {
    boardStore.addTask(taskData)
  }
  isTaskModalOpen.value = false
  saveBoard()
}

function saveColumn(columnData) {
  if (selectedColumn.value) {
    boardStore.updateColumn(columnData.id, columnData)
  } else {
    boardStore.addColumn(columnData.title)
  }
  isColumnModalOpen.value = false
  saveBoard()
}

function openNewColumnModal() {
  selectedColumn.value = null
  isColumnModalOpen.value = true
}

function updateTask(updatedTask) {
  boardStore.updateTask(updatedTask.id, updatedTask)
}

function deleteTask(task) {
  boardStore.deleteTask(task.id)
  saveBoard()
}

function handleDragStart(event, task, columnId) {
  draggingId.value = task.id
  draggingColumn.value = columnId
  event.dataTransfer.effectAllowed = 'move'
}

function handleDragEnd() {
  draggingId.value = null
  draggingColumn.value = null
}

function handleDrop(event, columnId) {
  if (!draggingId.value || !draggingColumn.value) return

  const fromColumnId = draggingColumn.value
  const taskId = draggingId.value
  
  const fromColumn = columns.value.find(c => c.id === fromColumnId)
  const toColumn = columns.value.find(c => c.id === columnId)
  
  if (!fromColumn || !toColumn) return

  const taskIndex = fromColumn.tasks.findIndex(t => t.id === taskId)
  if (taskIndex === -1) return

  const task = fromColumn.tasks[taskIndex]
  
  // Remove from original column
  fromColumn.tasks.splice(taskIndex, 1)
  
  // Add to new column
  toColumn.tasks.push(task)
  
  handleDragEnd()
  saveBoard()
}

function openShareModal() {
  isShareModalOpen.value = true
}

function openSettingsModal() {
  isSettingsModalOpen.value = true
}

function updateBoardSettings(settings) {
  boardStore.updateBoardSettings(settings)
  saveBoard()
}

function toggleFavorite() {
  if (currentBoardData.value) {
    boardStore.updateBoard({
      ...currentBoardData.value,
      favorite: !currentBoardData.value.favorite
    })
  }
}

function getLabelClass(label) {
  const classes = {
    'Bug': 'bg-red-100 text-red-800',
    'Feature': 'bg-green-100 text-green-800',
    'Enhancement': 'bg-blue-100 text-blue-800',
    'Documentation': 'bg-purple-100 text-purple-800',
    'Design': 'bg-pink-100 text-pink-800'
  }
  return classes[label] || 'bg-gray-100 text-gray-800'
}

function formatDate(date) {
  if (!date) return ''
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
  return formattedDate
}

// Add these computed properties
const mainColumns = computed(() => 
  currentBoardData.value?.columns?.filter(col => 
    ['todo', 'inProgress', 'done'].includes(col.id)
  ) || []
)

const additionalColumns = computed(() => 
  currentBoardData.value?.columns?.filter(col => 
    !['todo', 'inProgress', 'done'].includes(col.id)
  ) || []
)
</script>

<style>
.sortable-ghost {
  opacity: 0.5;
  background: #F1F5F9;
  border: 2px dashed #94A3B8;
}

.sortable-drag {
  transform: rotate(3deg);
  cursor: grabbing;
}

.column-handle {
  cursor: grab;
}

.column-handle:active {
  cursor: grabbing;
}
</style> 