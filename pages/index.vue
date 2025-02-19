<template>
  <div class="min-h-screen flex flex-col bg-blue-50">
    <TrekkaHeader />
    
    <main class="flex-1 container mx-auto px-6 py-8">
      <!-- Board Header -->
      <div class="mb-8">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-4">
            <h2 class="text-xl font-semibold text-gray-900">Main Board</h2>
            <button class="text-gray-500 hover:text-gray-700">
              <span class="text-sm">★</span>
            </button>
          </div>
          <div class="flex items-center space-x-3">
            <button class="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white rounded-md hover:bg-gray-50 border border-gray-300">
              <span class="mr-2">👥</span> Share
            </button>
            <button class="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white rounded-md hover:bg-gray-50 border border-gray-300">
              <span class="mr-2">⚙️</span> Settings
            </button>
          </div>
        </div>
      </div>

      <!-- Board Content -->
      <div class="flex gap-4 overflow-x-auto pb-8 min-h-[calc(100vh-13rem)]">
        <div v-for="column in columns" :key="column.id" 
          class="bg-gray-100 rounded-lg p-4 min-w-[320px] max-w-[320px] h-fit"
        >
          <column-header
            :column-id="column.id"
            :title="column.title"
            @edit="updateColumnTitle"
            @delete="deleteColumn"
          />
          
          <div 
            class="min-h-[2rem] space-y-3"
            @dragover.prevent
            @drop.prevent="handleDrop($event, column.id)"
          >
            <task-card
              v-for="task in column.tasks"
              :key="task.id"
              :task="task"
              draggable="true"
              @dragstart="handleDragStart($event, task, column.id)"
              @dragend="handleDragEnd"
              :dragging="draggingId === task.id"
              @click="openTaskModal(task)"
              @edit="openTaskModal"
              @delete="deleteTask"
            />
          </div>

          <button
            v-if="column.id === 'todo'"
            @click="openNewTaskModal"
            class="mt-3 w-full py-2 px-3 text-gray-600 hover:text-gray-900 text-sm text-left rounded hover:bg-gray-200 transition-colors"
          >
            + Add a card
          </button>
        </div>

        <!-- Add Column Button -->
        <button 
          @click="openColumnModal"
          class="bg-gray-100 bg-opacity-60 hover:bg-gray-200 rounded-lg p-4 min-w-[320px] max-w-[320px] h-fit text-gray-600 hover:text-gray-900 text-sm text-center transition-colors"
        >
          + Add another list
        </button>
      </div>
    </main>

    <task-modal
      v-if="isModalOpen"
      v-model:isOpen="isModalOpen"
      :task="selectedTask"
      @save="saveTask"
    />

    <task-details
      v-if="isDetailsOpen"
      v-model:isOpen="isDetailsOpen"
      :task="selectedTask"
      :column-title="getColumnTitle(selectedTask)"
      @update:task="updateTask"
    />

    <column-modal
      v-if="isColumnModalOpen"
      v-model:isOpen="isColumnModalOpen"
      @save="addNewColumn"
    />

    <TrekkaFooter />
  </div>
</template>

<script setup>
import { useBoardStore } from '~/store/board'
import { computed, ref } from 'vue'

const boardStore = useBoardStore()
const columns = computed(() => boardStore.currentBoardData.columns)
const isModalOpen = ref(false)
const isDetailsOpen = ref(false)
const selectedTask = ref(null)
const draggingId = ref(null)
const draggingColumn = ref(null)
const isColumnModalOpen = ref(false)

function saveBoard() {
  // Will implement persistence later
  console.log('Board state saved')
}

function openTaskModal(task) {
  selectedTask.value = task
  isDetailsOpen.value = true
}

function openNewTaskModal() {
  selectedTask.value = null
  isModalOpen.value = true
}

function saveTask(taskData) {
  if (selectedTask.value) {
    boardStore.updateTask(taskData.id, taskData)
  } else {
    boardStore.addTask(taskData)
  }
  saveBoard()
}

function getColumnTitle(task) {
  if (!task) return ''
  const column = boardStore.currentBoardData.columns.find(col => 
    col.tasks.some(t => t.id === task.id)
  )
  return column?.title || ''
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

function openColumnModal() {
  isColumnModalOpen.value = true
}

function addNewColumn(title) {
  boardStore.addColumn(title)
  saveBoard()
}

function updateColumnTitle({ id, title }) {
  boardStore.updateColumn(id, { title })
  saveBoard()
}

function deleteColumn(columnId) {
  boardStore.deleteColumn(columnId)
  saveBoard()
}
</script>

<style>
/* Optional: Add some transition effects */
.flip-list-move {
  transition: transform 0.3s;
}

.sortable-ghost {
  opacity: 0.5;
  background: #EFF6FF;
  border: 2px dashed #60A5FA;
}

.sortable-drag {
  transform: rotate(3deg);
  cursor: grabbing;
}

.no-move {
  transition: transform 0s;
}
</style> 