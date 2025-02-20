<template>
  <main class="flex-1">
    <div class="bg-gray-50 min-h-screen py-8">
      <div class="container mx-auto px-6">
        <div class="max-w-3xl mx-auto">
          <div class="flex items-center space-x-2 text-sm text-gray-500 mb-4">
            <NuxtLink to="/help" class="hover:text-gray-700">Help</NuxtLink>
            <span>/</span>
            <NuxtLink to="/help/common-questions" class="hover:text-gray-700">Common Questions</NuxtLink>
            <span>/</span>
            <span class="text-gray-700">Customizing Boards</span>
          </div>

          <h1 class="text-3xl font-bold text-gray-900 mb-8">How to Customize Boards</h1>
          
          <div class="prose prose-blue max-w-none bg-white p-8 rounded-xl shadow-sm border border-gray-200">
            <h2>Board Customization Options</h2>

            <h3>1. Visual Customization</h3>
            <ul>
              <li>Change board background:
                <ul>
                  <li>Solid colors</li>
                  <li>Gradient patterns</li>
                  <li>Custom images</li>
                  <li>Preset themes</li>
                </ul>
              </li>
              <li>Adjust card appearance:
                <ul>
                  <li>Card size</li>
                  <li>Label styles</li>
                  <li>Information density</li>
                </ul>
              </li>
            </ul>

            <div class="bg-blue-50 p-6 rounded-lg my-6 not-prose">
              <h4 class="text-lg font-semibold text-blue-900 mb-2">Pro Tip</h4>
              <p class="text-blue-800">
                Use different background colors for different project types to quickly identify boards at a glance.
              </p>
            </div>

            <h3>2. List Management</h3>
            <ul>
              <li>Rename default lists</li>
              <li>Add custom lists</li>
              <li>Set list limits</li>
              <li>Collapse/expand lists</li>
              <li>Archive unused lists</li>
            </ul>

            <h3>3. Card Display Options</h3>
            <p>Customize what information appears on cards:</p>
            <ul>
              <li>Due dates</li>
              <li>Assignee avatars</li>
              <li>Labels and tags</li>
              <li>Progress bars</li>
              <li>Custom fields</li>
            </ul>

            <h3>4. Power-Up Features</h3>
            <p>Enable additional functionality:</p>
            <ul>
              <li>Calendar view</li>
              <li>Time tracking</li>
              <li>Custom fields</li>
              <li>Voting</li>
              <li>File preview</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </main>
</template> 