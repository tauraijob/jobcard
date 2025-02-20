<template>
  <main class="flex-1">
    <div class="bg-gray-50 min-h-screen py-8">
      <div class="container mx-auto px-6">
        <div class="max-w-3xl mx-auto">
          <h1 class="text-3xl font-bold text-gray-900 mb-8">Help Center</h1>
          
          <div class="space-y-8">
            <!-- Quick Links Section -->
            <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h2 class="text-xl font-semibold text-gray-900 mb-4">Quick Links</h2>
              <div class="space-y-3">
                <NuxtLink 
                  to="/boards"
                  class="block text-blue-600 hover:text-blue-800 hover:bg-blue-50 p-2 rounded-md -mx-2"
                >
                  Boards Dashboard
                </NuxtLink>
                <NuxtLink 
                  to="/teams"
                  class="block text-blue-600 hover:text-blue-800 hover:bg-blue-50 p-2 rounded-md -mx-2"
                >
                  Teams Management
                </NuxtLink>
              </div>
            </div>

            <!-- Getting Started Section -->
            <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h2 class="text-xl font-semibold text-gray-900 mb-4">Getting Started</h2>
              <div class="space-y-3">
                <NuxtLink 
                  to="/help/getting-started"
                  class="block text-blue-600 hover:text-blue-800 hover:bg-blue-50 p-2 rounded-md -mx-2"
                >
                  Getting Started Guide
                </NuxtLink>
                <NuxtLink 
                  to="/help/getting-started/first-board"
                  class="block text-blue-600 hover:text-blue-800 hover:bg-blue-50 p-2 rounded-md -mx-2"
                >
                  Creating your first board
                </NuxtLink>
                <NuxtLink 
                  to="/help/getting-started/team-members"
                  class="block text-blue-600 hover:text-blue-800 hover:bg-blue-50 p-2 rounded-md -mx-2"
                >
                  Adding team members
                </NuxtLink>
                <NuxtLink 
                  to="/help/getting-started/managing-tasks"
                  class="block text-blue-600 hover:text-blue-800 hover:bg-blue-50 p-2 rounded-md -mx-2"
                >
                  Managing tasks
                </NuxtLink>
              </div>
            </div>

            <!-- Common Questions Section -->
            <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h2 class="text-xl font-semibold text-gray-900 mb-4">Common Questions</h2>
              <div class="space-y-3">
                <NuxtLink 
                  to="/help/common-questions/customize-boards"
                  class="block text-blue-600 hover:text-blue-800 hover:bg-blue-50 p-2 rounded-md -mx-2"
                >
                  How to customize boards
                </NuxtLink>
                <NuxtLink 
                  to="/help/common-questions/notifications"
                  class="block text-blue-600 hover:text-blue-800 hover:bg-blue-50 p-2 rounded-md -mx-2"
                >
                  Setting up notifications
                </NuxtLink>
                <NuxtLink 
                  to="/help/common-questions/permissions"
                  class="block text-blue-600 hover:text-blue-800 hover:bg-blue-50 p-2 rounded-md -mx-2"
                >
                  Managing permissions
                </NuxtLink>
              </div>
            </div>

            <!-- Documentation Section -->
            <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h2 class="text-xl font-semibold text-gray-900 mb-4">Documentation</h2>
              <div class="space-y-3">
                <NuxtLink 
                  to="/documentation"
                  class="block text-blue-600 hover:text-blue-800 hover:bg-blue-50 p-2 rounded-md -mx-2"
                >
                  Full Documentation
                </NuxtLink>
              </div>
            </div>

            <!-- Contact Support -->
            <div class="bg-blue-50 p-6 rounded-xl border border-blue-100">
              <h2 class="text-lg font-semibold text-blue-900 mb-2">Need More Help?</h2>
              <p class="text-blue-800 mb-4">
                Can't find what you're looking for? Our support team is here to help.
              </p>
              <a 
                href="mailto:support@trekka.com"
                class="inline-flex items-center text-blue-700 hover:text-blue-800"
              >
                Contact Support →
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template> 