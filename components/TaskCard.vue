<template>
  <div 
    class="bg-white rounded-lg shadow-sm hover:shadow p-3 group transform transition-all duration-200"
    :class="[
      { 'border-l-4': task.priority },
      { 'opacity-50': dragging },
      { 'cursor-grab': !dragging },
      { 'cursor-grabbing': dragging },
      { 'shadow-md': dragging }
    ]"
    :style="priorityBorderColor"
    draggable="true"
    @dragstart="$emit('dragstart', $event)"
    @dragend="$emit('dragend', $event)"
  >
    <!-- Add hover actions -->
    <div class="flex justify-between items-start">
      <div class="space-y-2 flex-1">
        <!-- Labels -->
        <div class="flex flex-wrap gap-2">
          <span 
            v-if="task.priority"
            :class="priorityClass"
            class="inline-block px-2 py-1 rounded-full text-xs font-medium"
          >
            {{ task.priority }}
          </span>
          <span 
            v-for="label in task.labels" 
            :key="label"
            class="inline-block px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600"
          >
            {{ label }}
          </span>
        </div>

        <!-- Title -->
        <h4 class="text-sm font-medium text-gray-900">{{ task.title }}</h4>

        <!-- Due Date -->
        <div class="flex items-center justify-between text-xs text-gray-500">
          <div class="flex items-center space-x-3">
            <span v-if="isOverdue" class="flex items-center text-red-600">
              <span class="mr-1">⚠️</span>
              Overdue
            </span>
            <span v-else-if="task.dueDate" class="flex items-center">
              <span class="mr-1">📅</span>
              {{ formatDate(task.dueDate) }}
            </span>
          </div>
        </div>
      </div>

      <!-- Hover Actions -->
      <div class="opacity-0 group-hover:opacity-100 transition-opacity flex items-center space-x-2">
        <button 
          @click.stop="$emit('edit', task)"
          class="p-1 text-gray-400 hover:text-gray-600 rounded"
          title="Edit task"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
          </svg>
        </button>
        <button 
          @click.stop="confirmDelete"
          class="p-1 text-gray-400 hover:text-red-600 rounded"
          title="Delete task"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  task: {
    type: Object,
    required: true
  },
  dragging: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['edit', 'delete', 'dragstart', 'dragend'])

const colors = {
  high: '#ef4444',
  medium: '#f59e0b',
  low: '#10b981'
}

const priorityClass = computed(() => {
  switch (props.task.priority?.toLowerCase()) {
    case 'high': return 'bg-red-100 text-red-800'
    case 'medium': return 'bg-yellow-100 text-yellow-800'
    case 'low': return 'bg-green-100 text-green-800'
    default: return ''
  }
})

const priorityBorderColor = computed(() => {
  return props.task.priority ? { borderLeftColor: colors[props.task.priority.toLowerCase()] } : {}
})

const isOverdue = computed(() => {
  if (!props.task.dueDate) return false
  return new Date(props.task.dueDate) < new Date()
})

function formatDate(date) {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric'
  })
}

function confirmDelete() {
  if (confirm('Are you sure you want to delete this task?')) {
    emit('delete', props.task)
  }
}
</script> 