<template>
  <div class="min-h-screen flex flex-col bg-blue-50">
    <TrekkaHeader />
    
    <main class="flex-1 container mx-auto px-6 py-8">
      <!-- This is your existing index.vue content -->
      <!-- Move your board content here -->
    </main>

    <TrekkaFooter />
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { useBoardStore } from '~/store/board'

const route = useRoute()
const boardStore = useBoardStore()

// Set current board when page loads
boardStore.currentBoard = route.params.id
</script> 