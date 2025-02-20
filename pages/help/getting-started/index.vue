<template>
  <main class="flex-1">
    <div class="bg-gray-50 min-h-screen py-8">
      <div class="container mx-auto px-6">
        <div class="max-w-3xl mx-auto">
          <div class="flex items-center space-x-2 text-sm text-gray-500 mb-4">
            <NuxtLink to="/help" class="hover:text-gray-700">Help</NuxtLink>
            <span>/</span>
            <span class="text-gray-700">Getting Started</span>
          </div>

          <h1 class="text-3xl font-bold text-gray-900 mb-8">Getting Started with Trekka</h1>
          
          <div class="prose prose-blue max-w-none bg-white p-8 rounded-xl shadow-sm border border-gray-200">
            <h2>Welcome to Trekka!</h2>
            <p>
              This guide will help you get up and running with Trekka quickly. Follow these steps to start managing your projects effectively.
            </p>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-6 not-prose my-8">
              <NuxtLink to="/help/getting-started/first-board" 
                class="block p-6 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors"
              >
                <h4 class="text-lg font-semibold text-blue-900 mb-2">1. Create Your First Board</h4>
                <p class="text-blue-700 text-sm">Set up your workspace and organize your first project.</p>
              </NuxtLink>

              <NuxtLink to="/help/getting-started/team-members" 
                class="block p-6 bg-green-50 rounded-xl hover:bg-green-100 transition-colors"
              >
                <h4 class="text-lg font-semibold text-green-900 mb-2">2. Add Team Members</h4>
                <p class="text-green-700 text-sm">Invite your team and start collaborating.</p>
              </NuxtLink>

              <NuxtLink to="/help/getting-started/managing-tasks" 
                class="block p-6 bg-purple-50 rounded-xl hover:bg-purple-100 transition-colors"
              >
                <h4 class="text-lg font-semibold text-purple-900 mb-2">3. Manage Tasks</h4>
                <p class="text-purple-700 text-sm">Learn to create and organize tasks effectively.</p>
              </NuxtLink>
            </div>

            <h3>Quick Overview</h3>
            <p>Here's what you'll learn in this getting started guide:</p>
            <ul>
              <li>How to create and customize your first board</li>
              <li>Adding and managing team members</li>
              <li>Creating and organizing tasks</li>
              <li>Basic workflow management</li>
              <li>Collaboration features</li>
            </ul>

            <div class="bg-yellow-50 p-6 rounded-lg my-8 not-prose">
              <h4 class="text-lg font-semibold text-yellow-900 mb-2">Pro Tip</h4>
              <p class="text-yellow-800">
                Start with a simple board structure and gradually add more features as your team gets comfortable with the basics.
              </p>
            </div>

            <h3>Additional Resources</h3>
            <ul>
              <li>
                <NuxtLink to="/help/common-questions/customize-boards" class="text-blue-600 hover:text-blue-800">
                  Board customization guide
                </NuxtLink>
              </li>
              <li>
                <NuxtLink to="/help/common-questions/notifications" class="text-blue-600 hover:text-blue-800">
                  Setting up notifications
                </NuxtLink>
              </li>
              <li>
                <NuxtLink to="/help/common-questions/permissions" class="text-blue-600 hover:text-blue-800">
                  Managing permissions
                </NuxtLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </main>
</template> 