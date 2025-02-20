<template>
  <div class="relative">
    <button 
      @click.stop="isOpen = !isOpen"
      class="p-1.5 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
    >
      <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 3c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 14c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-7c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
      </svg>
    </button>

    <!-- Dropdown Menu -->
    <div v-if="isOpen" 
      class="absolute right-0 mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-[100]"
      style="filter: drop-shadow(0 4px 8px rgba(0,0,0,0.1))"
    >
      <button 
        v-for="action in actions" 
        :key="action.id"
        @click.stop="handleAction(action.id)"
        class="w-full px-4 py-2 text-sm text-left hover:bg-gray-50 flex items-center space-x-2"
        :class="action.color || 'text-gray-700'"
      >
        <component :is="action.icon" class="w-4 h-4" />
        <span>{{ action.label }}</span>
      </button>
    </div>
  </div>

  <!-- Backdrop -->
  <div v-if="isOpen" 
    class="fixed inset-0 z-[90]" 
    @click.stop="isOpen = false"
  />
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  task: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['edit', 'duplicate', 'delete', 'archive'])

const isOpen = ref(false)

// Menu actions configuration
const actions = [
  {
    id: 'edit',
    label: 'Edit Task',
    icon: 'svg-edit',
    color: 'text-gray-700'
  },
  {
    id: 'duplicate',
    label: 'Duplicate',
    icon: 'svg-duplicate',
    color: 'text-gray-700'
  },
  {
    id: 'archive',
    label: 'Archive',
    icon: 'svg-archive',
    color: 'text-gray-700'
  },
  {
    id: 'delete',
    label: 'Delete',
    icon: 'svg-delete',
    color: 'text-red-600 hover:text-red-700'
  }
]

// Action icons
const svgEdit = defineComponent({
  template: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
    </svg>
  `
})

const svgDuplicate = defineComponent({
  template: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
    </svg>
  `
})

const svgArchive = defineComponent({
  template: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
    </svg>
  `
})

const svgDelete = defineComponent({
  template: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
    </svg>
  `
})

function handleAction(actionId) {
  emit(actionId, props.task)
  isOpen.value = false
}
</script>

<style scoped>
/* Add these styles */
.relative {
  position: relative;
  z-index: 50;
}

.relative:focus-within {
  z-index: 100;
}

/* Optional: Add this if you want the menu to stay on top when hovering */
.relative:hover {
  z-index: 100;
}
</style> 