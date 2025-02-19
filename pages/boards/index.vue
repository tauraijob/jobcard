<template>
  <div class="min-h-screen flex flex-col bg-blue-50">
    <TrekkaHeader />
    
    <main class="flex-1 container mx-auto px-6 py-8">
      <div class="mb-8">
        <h1 class="text-2xl font-bold text-gray-900">Your Boards</h1>
        <p class="mt-1 text-sm text-gray-500">Manage and organize all your projects</p>
      </div>

      <!-- Your boards grid from the boards.vue template -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <!-- ... rest of your boards content ... -->
      </div>
    </main>

    <TrekkaFooter />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useBoardStore } from '~/store/board'

const boardStore = useBoardStore()
const boards = computed(() => boardStore.boards)
// ... rest of your boards page script
</script> 