<template>
  <main class="flex-1">
    <div class="bg-gray-50 min-h-screen py-8">
      <div class="container mx-auto px-6">
        <div class="max-w-3xl mx-auto">
          <div class="flex items-center space-x-2 text-sm text-gray-500 mb-4">
            <NuxtLink to="/help" class="hover:text-gray-700">Help</NuxtLink>
            <span>/</span>
            <NuxtLink to="/help/getting-started" class="hover:text-gray-700">Getting Started</NuxtLink>
            <span>/</span>
            <span class="text-gray-700">Creating Your First Board</span>
          </div>

          <h1 class="text-3xl font-bold text-gray-900 mb-8">Creating Your First Board</h1>
          
          <div class="prose prose-blue max-w-none bg-white p-8 rounded-xl shadow-sm border border-gray-200">
            <h2>Step-by-Step Guide</h2>

            <h3>1. Create a New Board</h3>
            <ul>
              <li>Click the "Create Board" button in the top navigation</li>
              <li>Or use keyboard shortcut <kbd class="px-2 py-1 bg-gray-100 rounded">Cmd/Ctrl + B</kbd></li>
            </ul>

            <h3>2. Configure Board Settings</h3>
            <p>In the board creation modal:</p>
            <ul>
              <li>Enter a descriptive board title</li>
              <li>Choose a background (color or image)</li>
              <li>Set visibility (Private or Team)</li>
              <li>Add an optional description</li>
            </ul>

            <div class="bg-blue-50 p-6 rounded-lg my-6 not-prose">
              <h4 class="text-lg font-semibold text-blue-900 mb-2">Pro Tip</h4>
              <p class="text-blue-800">
                Use clear, descriptive names for your boards to help team members quickly understand their purpose.
              </p>
            </div>

            <h3>3. Set Up Lists</h3>
            <p>Your board comes with default lists:</p>
            <ul>
              <li>"To Do" - Tasks to be started</li>
              <li>"In Progress" - Tasks being worked on</li>
              <li>"Done" - Completed tasks</li>
            </ul>

            <p>Customize your lists:</p>
            <ul>
              <li>Add new lists with the "+ Add List" button</li>
              <li>Rename lists by clicking their titles</li>
              <li>Drag lists to reorder them</li>
              <li>Set work-in-progress limits (optional)</li>
            </ul>

            <h3>4. Add Your First Tasks</h3>
            <ol>
              <li>Click "+ Add Task" in any list</li>
              <li>Enter a task title</li>
              <li>Add optional details:
                <ul>
                  <li>Description</li>
                  <li>Due date</li>
                  <li>Attachments</li>
                  <li>Labels</li>
                </ul>
              </li>
            </ol>

            <div class="bg-yellow-50 p-6 rounded-lg my-6 not-prose">
              <h4 class="text-lg font-semibold text-yellow-900 mb-2">Next Steps</h4>
              <p class="text-yellow-800">
                Now that you've created your board, learn how to:
              </p>
              <div class="mt-4 space-y-2">
                <NuxtLink to="/help/getting-started/team-members" 
                  class="block text-yellow-900 hover:text-yellow-700"
                >
                  → Add team members to your board
                </NuxtLink>
                <NuxtLink to="/help/getting-started/managing-tasks" 
                  class="block text-yellow-900 hover:text-yellow-700"
                >
                  → Manage and organize tasks
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template> 