<template>
  <div>
    <slot />
  </div>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

function handleKeyPress(event) {
  // Only trigger if Ctrl/Cmd + key is pressed
  if (event.metaKey || event.ctrlKey) {
    switch (event.key) {
      case 'b':
        event.preventDefault()
        router.push('/boards')
        break
      case 't':
        event.preventDefault()
        router.push('/teams')
        break
    }
  }
}

onMounted(() => {
  document.addEventListener('keydown', handleKeyPress)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeyPress)
})
</script> 