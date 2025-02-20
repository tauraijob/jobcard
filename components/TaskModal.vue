<template>
  <div class="fixed inset-0 z-50 overflow-y-auto">
    <div class="flex min-h-screen items-center justify-center px-4">
      <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" @click="$emit('update:isOpen', false)"></div>
      
      <div class="relative w-full max-w-md bg-white rounded-lg shadow-xl">
        <div class="p-6">
          <h2 class="text-xl font-semibold text-gray-900 mb-4">
            {{ task ? 'Edit Task' : 'Create New Task' }}
          </h2>
          
          <form @submit.prevent="handleSubmit">
            <div class="space-y-4">
              <!-- Task Title -->
              <div>
                <label for="title" class="block text-sm font-medium text-gray-700">Task Title</label>
                <input
                  id="title"
                  v-model="formData.title"
                  type="text"
                  required
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Enter task title"
                >
              </div>

              <!-- Task Description -->
              <div>
                <label for="description" class="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  id="description"
                  v-model="formData.description"
                  rows="3"
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Add a more detailed description..."
                ></textarea>
              </div>

              <!-- Due Date -->
              <div>
                <label for="dueDate" class="block text-sm font-medium text-gray-700">Due Date</label>
                <input
                  id="dueDate"
                  v-model="formData.dueDate"
                  type="date"
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
              </div>

              <!-- Department Selection -->
              <div>
                <label for="department" class="block text-sm font-medium text-gray-700">Department</label>
                <select
                  id="department"
                  v-model="formData.department"
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="">Select Department</option>
                  <option v-for="dept in departments" :key="dept" :value="dept">
                    {{ dept }}
                  </option>
                </select>
              </div>

              <!-- Member Selection -->
              <div>
                <label class="block text-sm font-medium text-gray-700">Assign Members</label>
                <div class="mt-2 flex flex-wrap gap-2">
                  <div v-for="member in availableMembers" 
                    :key="member.id"
                    @click="toggleMember(member)"
                    class="flex items-center p-1 rounded-full border cursor-pointer transition-colors"
                    :class="[
                      isSelected(member) 
                        ? 'border-blue-500 bg-blue-50' 
                        : 'border-gray-200 hover:border-blue-200'
                    ]"
                  >
                    <img 
                      :src="member.avatar" 
                      :alt="member.name"
                      class="w-6 h-6 rounded-full"
                    >
                    <span class="ml-2 mr-2 text-sm">{{ member.name }}</span>
                    <span v-if="isSelected(member)" 
                      class="text-blue-500 text-xs bg-blue-100 rounded-full w-4 h-4 flex items-center justify-center"
                    >
                      ✓
                    </span>
                  </div>
                </div>
              </div>

              <!-- Color Label -->
              <div>
                <label class="block text-sm font-medium text-gray-700">Color Label</label>
                <div class="mt-2 flex flex-wrap gap-2">
                  <button
                    v-for="color in colorLabels"
                    :key="color.id"
                    type="button"
                    @click="toggleColorLabel(color.id)"
                    class="w-6 h-6 rounded-full border-2 transition-all duration-200 hover:scale-110"
                    :class="[
                      color.class,
                      formData.colorLabel === color.id ? 'ring-2 ring-offset-2 ring-blue-500' : 'hover:ring-2 hover:ring-offset-2 hover:ring-gray-300'
                    ]"
                    :title="color.name"
                  />
                </div>
              </div>

              <!-- Labels -->
              <div>
                <label class="block text-sm font-medium text-gray-700">Labels</label>
                <div class="mt-2 flex flex-wrap gap-2">
                  <button
                    v-for="label in availableLabels"
                    :key="label"
                    type="button"
                    @click="toggleLabel(label)"
                    class="px-3 py-1 rounded-full text-sm"
                    :class="[
                      formData.labels?.includes(label) 
                        ? getLabelClass(label)
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    ]"
                  >
                    {{ label }}
                  </button>
                </div>
              </div>

              <!-- Attachments -->
              <div>
                <label class="block text-sm font-medium text-gray-700">Attachments</label>
                <div class="mt-2 space-y-3">
                  <!-- File Input -->
                  <div class="flex items-center justify-center w-full">
                    <label class="flex flex-col w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                      <div class="flex flex-col items-center justify-center pt-7">
                        <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                        <p class="pt-1 text-sm text-gray-600">Drop files or click to upload</p>
                      </div>
                      <input 
                        type="file" 
                        class="opacity-0" 
                        multiple 
                        @change="handleFileUpload"
                      >
                    </label>
                  </div>

                  <!-- File List -->
                  <div v-if="formData.attachments?.length" class="space-y-2">
                    <div v-for="(file, index) in formData.attachments" 
                      :key="index"
                      class="flex items-center justify-between p-2 bg-gray-50 rounded-lg"
                    >
                      <div class="flex items-center space-x-2">
                        <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                        </svg>
                        <span class="text-sm text-gray-600">{{ file.name }}</span>
                      </div>
                      <button 
                        type="button"
                        @click="removeFile(index)"
                        class="text-red-500 hover:text-red-700"
                      >
                        ×
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Add Stage Selection -->
              <div>
                <label for="stage" class="block text-sm font-medium text-gray-700">Stage</label>
                <select
                  id="stage"
                  v-model="formData.stage"
                  @change="handleStageChange"
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="todo">To Do</option>
                  <option value="inProgress">In Progress</option>
                  <option value="done">Done</option>
                </select>
              </div>
            </div>

            <div class="mt-6 flex justify-end space-x-3">
              <button
                type="button"
                @click="$emit('update:isOpen', false)"
                class="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-md border border-gray-300"
              >
                Cancel
              </button>
              <button
                type="submit"
                class="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md"
                :disabled="!formData.title.trim()"
              >
                {{ task ? 'Save Changes' : 'Create Task' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useBoardStore } from '~/store/board'

const props = defineProps({
  isOpen: Boolean,
  task: {
    type: Object,
    default: null
  }
})

const emit = defineEmits(['update:isOpen', 'save'])

const boardStore = useBoardStore()

const availableLabels = ['Bug', 'Feature', 'Enhancement', 'Documentation', 'Design']

const departments = [
  'Development',
  'Design',
  'QA',
  'Marketing',
  'Product',
  'Management'
]

// Sample members data - you should replace this with your actual members data
const availableMembers = ref([
  { id: 1, name: 'John Doe', avatar: 'https://ui-avatars.com/api/?name=John+Doe' },
  { id: 2, name: 'Jane Smith', avatar: 'https://ui-avatars.com/api/?name=Jane+Smith' },
  { id: 3, name: 'Mike Johnson', avatar: 'https://ui-avatars.com/api/?name=Mike+Johnson' },
  // Add more members as needed
])

// Add color labels
const colorLabels = [
  { id: 'green', name: 'Green', class: 'bg-green-500' },
  { id: 'yellow', name: 'Yellow', class: 'bg-yellow-500' },
  { id: 'orange', name: 'Orange', class: 'bg-orange-500' },
  { id: 'red', name: 'Red', class: 'bg-red-500' },
  { id: 'purple', name: 'Purple', class: 'bg-purple-500' },
  { id: 'blue', name: 'Blue', class: 'bg-blue-500' },
  { id: 'sky', name: 'Sky', class: 'bg-sky-500' },
  { id: 'pink', name: 'Pink', class: 'bg-pink-500' },
]

// Update formData to include new fields
const formData = ref({
  title: '',
  description: '',
  dueDate: '',
  labels: [],
  stage: 'todo',
  department: '',
  assignees: [],
  colorLabel: '',
  attachments: []
})

onMounted(() => {
  if (props.task) {
    formData.value = { 
      ...props.task,
      assignees: props.task.assignees || [],
      attachments: props.task.attachments || [],
      colorLabel: props.task.colorLabel || ''
    }
  } else {
    formData.value = {
      title: '',
      description: '',
      dueDate: '',
      labels: [],
      stage: 'todo',
      department: '',
      assignees: [],
      colorLabel: '',
      attachments: []
    }
  }
})

function toggleLabel(label) {
  if (!formData.value.labels) {
    formData.value.labels = []
  }
  const index = formData.value.labels.indexOf(label)
  if (index === -1) {
    formData.value.labels.push(label)
  } else {
    formData.value.labels.splice(index, 1)
  }
}

function toggleMember(member) {
  const index = formData.value.assignees.findIndex(m => m.id === member.id)
  if (index === -1) {
    formData.value.assignees.push(member)
  } else {
    formData.value.assignees.splice(index, 1)
  }
}

function isSelected(member) {
  return formData.value.assignees.some(m => m.id === member.id)
}

function handleSubmit() {
  emit('save', {
    ...formData.value,
    id: props.task?.id || `task-${Date.now()}`
  })
  emit('update:isOpen', false)
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

function handleStageChange() {
  if (props.task && formData.value.stage !== props.task.stage) {
    // Move the task to the new stage
    boardStore.moveTaskToStage(props.task.id, formData.value.stage)
    
    // Update other task properties
    emit('save', {
      ...formData.value,
      id: props.task.id,
      stage: formData.value.stage // Ensure stage is included
    })
  }
}

function toggleColorLabel(colorId) {
  formData.value.colorLabel = formData.value.colorLabel === colorId ? '' : colorId
}

function handleFileUpload(event) {
  const files = Array.from(event.target.files)
  
  // Convert files to storable format
  const newFiles = files.map(file => ({
    name: file.name,
    type: file.type,
    size: file.size,
    url: URL.createObjectURL(file), // For preview
    file // Keep the actual file for upload
  }))
  
  formData.value.attachments = [
    ...(formData.value.attachments || []),
    ...newFiles
  ]
}

function removeFile(index) {
  const file = formData.value.attachments[index]
  if (file.url) {
    URL.revokeObjectURL(file.url) // Clean up the object URL
  }
  formData.value.attachments.splice(index, 1)
}

watch(() => props.task?.stage, (newStage) => {
  if (newStage && formData.value.stage !== newStage) {
    formData.value.stage = newStage
  }
})
</script> 