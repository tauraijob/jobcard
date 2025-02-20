<template>
  <div class="min-h-screen flex flex-col" :style="{ background: currentBoardData?.background || '#F8FAFC' }">
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
            <!-- Debug info -->
            <div v-if="isDev" class="mb-4 text-xs text-gray-400">
              Column: {{ column.id }}<br>
              Tasks: {{ column.tasks }}<br>
              Raw tasks data: <pre>{{ JSON.stringify(column.tasks, null, 2) }}</pre>
            </div>

            <draggable
              :list="column.tasks"
              :group="{ name: 'tasks', pull: true, put: true }"
              item-key="id"
              class="space-y-3 min-h-[200px] p-1"
              :animation="200"
              ghost-class="ghost-card"
              chosen-class="chosen-card"
              drag-class="dragging-card"
              :force-fallback="true"
              :fallback-class="'dragging-fallback'"
              :fallback-on-body="true"
              :delay="0"
              :delayOnTouchOnly="true"
              :touch-start-threshold="2"
              :scroll="true"
              :animation-duration="400"
              @change="(e) => handleDragChange(e, column.id)"
            >
              <template #item="{ element: task }">
                <div class="task-wrapper select-none">
                  <div v-if="isDev" class="text-xs text-gray-400 mb-1">
                    Task data: {{ task }}
                  </div>
                  
                  <div v-if="task?.id"
                    class="task-card bg-white rounded-lg p-4 shadow-sm border border-gray-200 
                    hover:shadow-md transition-all duration-200 group relative"
                    @click="openTaskModal(task)"
                  >
                    <!-- Add menu in the top right corner -->
                    <div class="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity z-50">
                      <TaskMenu 
                        :task="task"
                        @edit="openTaskModal"
                        @duplicate="duplicateTask"
                        @delete="confirmDeleteTask"
                        @archive="archiveTask"
                      />
                    </div>

                    <!-- Add color label indicator -->
                    <div 
                      v-if="task.colorLabel"
                      class="absolute -left-0.5 top-0 bottom-0 w-2 rounded-l-lg"
                      :class="{
                        'bg-green-500': task.colorLabel === 'green',
                        'bg-yellow-500': task.colorLabel === 'yellow',
                        'bg-orange-500': task.colorLabel === 'orange',
                        'bg-red-500': task.colorLabel === 'red',
                        'bg-purple-500': task.colorLabel === 'purple',
                        'bg-blue-500': task.colorLabel === 'blue',
                        'bg-sky-500': task.colorLabel === 'sky',
                        'bg-pink-500': task.colorLabel === 'pink',
                      }"
                    />

                    <!-- Drag Handle -->
                    <div class="task-drag-handle absolute -left-2 top-1/2 -translate-y-1/2 w-8 h-8 
                      flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity
                      cursor-grab active:cursor-grabbing"
                    >
                      <svg class="w-4 h-4 text-gray-400" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M8 6a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM8 14a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM16 6a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM16 14a2 2 0 1 0 0 4 2 2 0 0 0 0-4z"/>
                      </svg>
                    </div>

                    <!-- Header with title and department -->
                    <div class="flex items-center justify-between mb-2">
                      <div>
                        <h4 class="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                          {{ task.title || 'Untitled Task' }}
                        </h4>
                        <span v-if="task.department" 
                          class="text-xs text-gray-500 mt-0.5 inline-block"
                        >
                          {{ task.department }}
                        </span>
                      </div>
                      <span class="text-xs px-2 py-0.5 rounded-full bg-blue-50 text-blue-600">
                        {{ task.stage }}
                      </span>
                    </div>

                    <p v-if="task.description" 
                      class="text-sm text-gray-600 line-clamp-2 mb-3">
                      {{ task.description }}
                    </p>
                    
                    <!-- Task Footer -->
                    <div class="flex items-center justify-between pt-2 border-t border-gray-100">
                      <div class="flex items-center space-x-3">
                        <!-- Due date -->
                        <span v-if="task.dueDate" 
                          class="flex items-center text-xs text-gray-500"
                        >
                          <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          {{ formatDate(task.dueDate) }}
                        </span>

                        <!-- Assigned Members -->
                        <div v-if="task.assignees?.length" class="flex -space-x-2">
                          <img 
                            v-for="member in task.assignees.slice(0, 3)" 
                            :key="member.id"
                            :src="member.avatar"
                            :alt="member.name"
                            class="w-6 h-6 rounded-full border-2 border-white"
                            :title="member.name"
                          >
                          <span v-if="task.assignees.length > 3" 
                            class="w-6 h-6 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center text-xs text-gray-500"
                            :title="task.assignees.slice(3).map(m => m.name).join(', ')"
                          >
                            +{{ task.assignees.length - 3 }}
                          </span>
                        </div>
                      </div>

                      <!-- Labels -->
                      <div v-if="task.labels?.length" class="flex flex-wrap gap-1">
                        <span 
                          v-for="label in task.labels" 
                          :key="label"
                          class="px-2 py-0.5 rounded-full text-xs font-medium"
                          :class="getLabelClass(label)"
                        >
                          {{ label }}
                        </span>
                      </div>
                    </div>

                    <!-- Add attachment indicator if files exist -->
                    <div v-if="task.attachments?.length" 
                      class="flex items-center mt-2 text-xs text-gray-500"
                    >
                      <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                      </svg>
                      {{ task.attachments.length }} attachment{{ task.attachments.length > 1 ? 's' : '' }}
                    </div>
                  </div>
                </div>
              </template>
            </draggable>

            <!-- Add Task Button -->
            <button 
              @click="openNewTaskModal()"
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
                    <div v-if="isDev" class="mb-4 text-xs text-gray-400">
                      Column: {{ column.id }}<br>
                      Tasks: {{ column.tasks }}<br>
                      Raw tasks data: <pre>{{ JSON.stringify(column.tasks, null, 2) }}</pre>
                    </div>

                    <draggable
                      :list="column.tasks"
                      :group="{ name: 'tasks', pull: true, put: true }"
                      item-key="id"
                      class="space-y-3 min-h-[200px] p-1"
                      :animation="200"
                      ghost-class="ghost-card"
                      chosen-class="chosen-card"
                      drag-class="dragging-card"
                      :force-fallback="true"
                      :fallback-class="'dragging-fallback'"
                      :fallback-on-body="true"
                      :delay="0"
                      :delayOnTouchOnly="true"
                      :touch-start-threshold="2"
                      :scroll="true"
                      :animation-duration="400"
                      @change="(e) => handleDragChange(e, column.id)"
                    >
                      <template #item="{ element: task }">
                        <div v-if="isDev" class="text-xs text-gray-400 mb-1">
                          Task data: {{ task }}
                        </div>
                        
                        <div v-if="task"
                          class="bg-white rounded-lg p-3 shadow-sm border border-gray-200 cursor-pointer hover:shadow-md transition-shadow"
                          @click="openTaskModal(task)"
                        >
                          <h4 class="font-medium text-gray-900">{{ task.title }}</h4>
                          <p v-if="task.description" class="text-sm text-gray-500 mt-1">{{ task.description }}</p>
                          
                          <!-- Task Footer -->
                          <div class="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
                            <div class="flex items-center space-x-2">
                              <span v-if="task.dueDate" class="text-xs text-gray-400">
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
                            <div v-if="task.assignees?.length" class="flex -space-x-2">
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
                      @click="openNewTaskModal()"
                      class="w-full mt-3 p-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md flex items-center justify-center space-x-2 transition-colors"
                    >
                      <span>+</span>
                      <span class="text-sm font-medium">Add New List</span>
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
  </div>
</template>

<script setup>
import { useBoardStore } from '~/store/board'
import { useTeamStore } from '~/store/team'
import { computed, ref, watch } from 'vue'
import { useRuntimeConfig } from '#app'
import draggable from 'vuedraggable'
import TaskMenu from '~/components/TaskMenu.vue'

const config = useRuntimeConfig()
const isDev = config.public.dev

const boardStore = useBoardStore()
const teamStore = useTeamStore()
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
const totalTasks = computed(() => {
  return currentBoardData.value?.columns?.reduce((total, column) => {
    return total + (column.tasks?.length || 0)
  }, 0) || 0
})

const completedTasks = computed(() => {
  const doneColumn = currentBoardData.value?.columns?.find(col => col.id === 'done')
  return doneColumn?.tasks?.length || 0
})

const completionRate = computed(() => {
  if (totalTasks.value === 0) return 0
  return Math.round((completedTasks.value / totalTasks.value) * 100)
})

// Calculate total unique members across all teams
const totalMembers = computed(() => {
  const uniqueMembers = new Set()
  teamStore.teams.forEach(team => {
    team.members?.forEach(member => {
      uniqueMembers.add(member.id)
    })
  })
  return uniqueMembers.size
})

function saveBoard() {
  // Will implement persistence later
  console.log('Board state saved')
}

function openTaskModal(task) {
  selectedTask.value = task
  isTaskModalOpen.value = true
}

function openNewTaskModal() {
  selectedTask.value = null
  isTaskModalOpen.value = true
}

function openColumnMenu(column) {
  selectedColumn.value = column
  isColumnModalOpen.value = true
}

function handleDragChange(evt, columnId) {
  if (evt.added) {
    const task = evt.added.element
    // Update the task's stage when it's moved
    boardStore.updateTask(task.id, {
      ...task,
      stage: columnId // Update the stage to match the new column
    })
  }
  
  saveBoard()
}

function saveTask(taskData) {
  console.log('Saving task:', taskData)
  
  if (selectedTask.value) {
    boardStore.updateTask(taskData.id, taskData)
  } else {
    // Use the selected stage from the form instead of the column
    boardStore.addTask(taskData, taskData.stage)
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
  const formattedDate = new Date(date).toLocaleDateString('en-ZW', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
  return formattedDate
}

// Add these computed properties
const mainColumns = computed(() => {
  const cols = currentBoardData.value?.columns?.filter(col => 
    ['todo', 'inProgress', 'done'].includes(col.id)
  ) || []
  
  console.log('Main columns computed:', JSON.stringify(cols, null, 2))
  return cols
})

const additionalColumns = computed(() => 
  currentBoardData.value?.columns?.filter(col => 
    !['todo', 'inProgress', 'done'].includes(col.id)
  ) || []
)

// Add this to your script setup
watch(() => currentBoardData.value?.columns, (newCols) => {
  console.log('Columns updated:', newCols)
}, { deep: true })

// Add this to your script setup
watch(() => mainColumns.value, (newCols) => {
  console.log('Main columns updated:', JSON.stringify(newCols, null, 2))
}, { deep: true })

// Add these new methods
function duplicateTask(task) {
  const newTask = {
    ...task,
    id: `task-${Date.now()}`,
    title: `${task.title} (Copy)`,
    createdAt: new Date().toISOString(),
    stage: task.stage // Ensure we keep the same stage
  }
  // Use the task's current stage/column for the duplicate
  boardStore.addTask(newTask, task.stage)
  saveBoard()
}

function confirmDeleteTask(task) {
  if (confirm('Are you sure you want to delete this task?')) {
    boardStore.deleteTask(task.id)
    saveBoard()
  }
}

function archiveTask(task) {
  // You might want to implement an archive feature in your store
  boardStore.updateTask(task.id, { ...task, archived: true })
  saveBoard()
}
</script>

<style>
/* Reset and update the drag-related classes */
.ghost-card {
  @apply bg-blue-50/50 border-2 border-dashed border-blue-200 !important;
  opacity: 0.3;
  transform: scale(0.95) !important;
}

.chosen-card {
  opacity: 0 !important;
}

.dragging-card {
  transform: scale(1.05) !important;
  @apply shadow-lg bg-white border-blue-200 !important;
}

/* This is the key class for the dragged item visibility */
.dragging-fallback {
  @apply shadow-xl bg-white border border-blue-200 !important;
  transform: rotate(3deg) scale(1.05) !important;
  opacity: 1 !important;
  z-index: 9999 !important;
  pointer-events: none !important;
}

.sortable-drag {
  opacity: 1 !important;
  z-index: 9999 !important;
}

.sortable-ghost {
  opacity: 0.3 !important;
  @apply bg-blue-50 border-2 border-dashed border-blue-200 !important;
}

.sortable-chosen {
  opacity: 0 !important;
}

.task-card {
  position: relative;
  transform-origin: center center;
  transition: all 0.2s ease;
  user-select: none;
  -webkit-user-select: none;
  background: white;
  z-index: 1;
}

.task-wrapper {
  position: relative;
  z-index: 1;
  transition: transform 0.2s ease;
}

/* Remove any opacity transitions */
.task-wrapper,
.task-card,
.ghost-card,
.dragging-card,
.dragging-fallback,
.sortable-drag,
.sortable-ghost,
.sortable-chosen {
  transition: transform 0.2s ease !important;
}

/* Ensure the dragged item stays visible */
.sortable-drag,
.dragging-fallback {
  visibility: visible !important;
  display: block !important;
}

.task-drag-handle {
  z-index: 10;
  border-radius: 9999px;
  background-color: white;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  touch-action: none;
  user-select: none;
}

.task-drag-handle:hover {
  background-color: #F8FAFC;
}

.task-drag-handle:active {
  background-color: #F1F5F9;
  cursor: grabbing;
}

.column-drop-preview {
  border: 2px dashed #3B82F6;
  background-color: rgba(59, 130, 246, 0.1);
  margin: 0.5rem 0;
  border-radius: 0.5rem;
  min-height: 100px;
}
</style> 