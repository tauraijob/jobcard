<template>
  <header class="bg-white shadow-sm">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
      <div class="flex items-center">
        <div class="flex-shrink-0">
          <!-- Logo Section -->
          <NuxtLink to="/" class="flex items-center">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" class="text-blue-600">
              <path 
                d="M16 2L4 8V24L16 30L28 24V8L16 2Z" 
                fill="currentColor" 
                fill-opacity="0.2"
              />
              <path 
                d="M16 2L4 8L16 14L28 8L16 2Z" 
                fill="currentColor"
              />
              <path 
                d="M16 14L4 8V24L16 30V14Z" 
                fill="currentColor" 
                fill-opacity="0.6"
              />
              <path 
                d="M28 8L16 14V30L28 24V8Z" 
                fill="currentColor" 
                fill-opacity="0.4"
              />
              <!-- Mountain peaks representing progress/journey -->
              <path 
                d="M12 18L16 14L20 18L24 14V22L16 26L8 22V14L12 18Z" 
                fill="white"
              />
            </svg>
            <h1 class="text-2xl font-bold text-gray-900 tracking-tight ml-2">
              <span class="text-blue-600">Trek</span>ka
            </h1>
          </NuxtLink>
        </div>

        <!-- Navigation Links -->
        <nav class="ml-8 flex space-x-4">
          <NuxtLink 
            to="/boards"
            class="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
            active-class="text-blue-600"
          >
            Boards
          </NuxtLink>
          <NuxtLink 
            to="/teams"
            class="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
            active-class="text-blue-600"
          >
            Teams
          </NuxtLink>
        </nav>
      </div>

      <!-- Right side buttons -->
      <div class="flex items-center space-x-4">
        <button 
          @click="$router.push('/boards/new')"
          class="bg-blue-50 text-blue-600 hover:bg-blue-100 px-3 py-2 rounded-md text-sm font-medium"
        >
          Create Board
        </button>
        <img
          class="h-8 w-8 rounded-full"
          src="https://ui-avatars.com/api/?name=User"
          alt="User avatar"
        >
      </div>
    </div>
  </header>
</template> 