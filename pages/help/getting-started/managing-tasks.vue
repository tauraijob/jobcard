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
            <span class="text-gray-700">Managing Tasks</span>
          </div>

          <h1 class="text-3xl font-bold text-gray-900 mb-8">Managing Tasks</h1>
          
          <div class="prose prose-blue max-w-none bg-white p-8 rounded-xl shadow-sm border border-gray-200">
            <h2>Task Management Guide</h2>

            <h3>1. Creating Tasks</h3>
            <p>Add new tasks to your board:</p>
            <ul>
              <li>Click "+ Add Task" in any list</li>
              <li>Press <kbd class="px-2 py-1 bg-gray-100 rounded">N</kbd> anywhere on the board</li>
              <li>Drag files directly onto a list</li>
            </ul>

            <h3>2. Task Details</h3>
            <p>Each task can include:</p>
            <ul>
              <li>Title and description</li>
              <li>Due dates and reminders</li>
              <li>Attachments and links</li>
              <li>Checklists for subtasks</li>
              <li>Color labels for categorization</li>
              <li>Comments and discussions</li>
              <li>Assignees and watchers</li>
            </ul>

            <div class="bg-purple-50 p-6 rounded-lg my-6 not-prose">
              <h4 class="text-lg font-semibold text-purple-900 mb-2">Power User Tips</h4>
              <p class="text-purple-800">
                Use keyboard shortcuts to manage tasks quickly:
              </p>
              <ul class="mt-2 space-y-1 text-purple-800">
                <li><kbd class="px-2 py-1 bg-purple-100 rounded">E</kbd> - Edit task</li>
                <li><kbd class="px-2 py-1 bg-purple-100 rounded">D</kbd> - Due date</li>
                <li><kbd class="px-2 py-1 bg-purple-100 rounded">Space</kbd> - Quick complete</li>
              </ul>
            </div>

            <h3>3. Organizing Tasks</h3>
            <p>Keep your board organized:</p>
            <ul>
              <li>Drag and drop tasks between lists</li>
              <li>Use labels for categorization</li>
              <li>Set priorities with colored flags</li>
              <li>Filter tasks by assignee, label, or due date</li>
              <li>Sort lists by various criteria</li>
            </ul>

            <h3>4. Task Workflow</h3>
            <p>Manage task progression:</p>
            <ul>
              <li>Move tasks through lists as they progress</li>
              <li>Set task dependencies</li>
              <li>Track time spent on tasks</li>
              <li>Mark tasks as complete</li>
              <li>Archive completed tasks</li>
            </ul>

            <h3>5. Collaboration on Tasks</h3>
            <p>Work together effectively:</p>
            <ul>
              <li>Assign tasks to team members</li>
              <li>Add comments and feedback</li>
              <li>Mention team members with @username</li>
              <li>Share task updates</li>
              <li>Set up task notifications</li>
            </ul>

            <div class="bg-blue-50 p-6 rounded-lg my-6 not-prose">
              <h4 class="text-lg font-semibold text-blue-900 mb-2">Task Templates</h4>
              <p class="text-blue-800">
                Save time by creating templates for recurring tasks. Use the "Save as Template"
                option when creating a task that you'll need again.
              </p>
            </div>

            <h3>6. Task Analytics</h3>
            <p>Monitor progress and performance:</p>
            <ul>
              <li>View task completion rates</li>
              <li>Track time estimates vs actuals</li>
              <li>Monitor team workload</li>
              <li>Generate task reports</li>
            </ul>

            <div class="bg-yellow-50 p-6 rounded-lg my-6 not-prose">
              <h4 class="text-lg font-semibold text-yellow-900 mb-2">Need More Help?</h4>
              <p class="text-yellow-800">
                Check out our detailed guides or contact our support team for assistance.
              </p>
              <div class="mt-4">
                <a href="mailto:support@trekka.com" 
                  class="text-yellow-900 hover:text-yellow-700"
                >
                  → Contact Support
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template> 