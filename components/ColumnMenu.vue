<template>
  <div class="relative">
    <button 
      @click="isOpen = !isOpen"
      class="text-gray-400 hover:text-gray-600 px-2"
    >
      •••
    </button>

    <div v-if="isOpen" 
      class="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10"
    >
      <div class="py-1" role="menu">
        <button
          @click="$emit('sort', 'priority')"
          class="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
        >
          Sort by Priority
        </button>
        <button
          @click="$emit('sort', 'dueDate')"
          class="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
        >
          Sort by Due Date
        </button>
        <hr class="my-1">
        <button
          @click="$emit('clear')"
          class="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
        >
          Clear Column
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isOpen: false
    }
  },
  mounted() {
    document.addEventListener('click', this.handleClickOutside)
  },
  beforeDestroy() {
    document.removeEventListener('click', this.handleClickOutside)
  },
  methods: {
    handleClickOutside(e) {
      if (!this.$el.contains(e.target)) {
        this.isOpen = false
      }
    }
  }
}
</script> 