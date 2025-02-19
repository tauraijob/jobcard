<template>
  <div class="flex justify-between items-center mb-3 relative">
    <h3 class="text-sm font-medium text-gray-900">{{ title }}</h3>
    
    <div class="relative">
      <button 
        class="text-gray-400 hover:text-gray-600 px-2"
        @click.stop="isMenuOpen = !isMenuOpen"
      >
        •••
      </button>

      <!-- Dropdown Menu -->
      <div 
        v-if="isMenuOpen"
        class="absolute right-0 mt-1 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10"
      >
        <div 
          class="py-1" 
          role="menu" 
          aria-orientation="vertical" 
          aria-labelledby="column-menu"
        >
          <button
            class="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            role="menuitem"
            @click="editColumn"
          >
            Edit List
          </button>
          <button
            class="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
            role="menuitem"
            @click="confirmDelete"
          >
            Delete List
          </button>
        </div>
      </div>
    </div>

    <!-- Edit Column Modal -->
    <column-modal
      v-if="isEditModalOpen"
      v-model:isOpen="isEditModalOpen"
      :title="title"
      :is-editing="true"
      @save="handleEdit"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  columnId: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  }
})

const emit = defineEmits(['edit', 'delete'])
const isMenuOpen = ref(false)
const isEditModalOpen = ref(false)

// Close menu when clicking outside
function handleClickOutside(event) {
  if (isMenuOpen.value) {
    isMenuOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})

function editColumn() {
  isMenuOpen.value = false
  isEditModalOpen.value = true
}

function handleEdit(newTitle) {
  emit('edit', { id: props.columnId, title: newTitle })
  isEditModalOpen.value = false
}

function confirmDelete() {
  if (confirm('Are you sure you want to delete this list? All tasks will be deleted.')) {
    emit('delete', props.columnId)
  }
  isMenuOpen.value = false
}
</script> 