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
            <span class="text-gray-700">Notifications</span>
          </div>

          <h1 class="text-3xl font-bold text-gray-900 mb-8">Setting Up Notifications</h1>
          
          <div class="prose prose-blue max-w-none bg-white p-8 rounded-xl shadow-sm border border-gray-200">
            <h2>Notification Settings Guide</h2>

            <h3>1. Types of Notifications</h3>
            <ul>
              <li>Task assignments</li>
              <li>Due date reminders</li>
              <li>Comments and mentions</li>
              <li>Board updates</li>
              <li>Team activity</li>
            </ul>

            <h3>2. Notification Channels</h3>
            <p>Choose how you want to receive notifications:</p>
            <ul>
              <li>Email notifications</li>
              <li>Browser notifications</li>
              <li>Mobile push notifications</li>
              <li>In-app notifications</li>
            </ul>

            <div class="bg-purple-50 p-6 rounded-lg my-6 not-prose">
              <h4 class="text-lg font-semibold text-purple-900 mb-2">Recommended Settings</h4>
              <p class="text-purple-800">
                Start with essential notifications only and adjust based on your needs:
              </p>
              <ul class="mt-2 text-purple-800">
                <li>✓ Task assignments</li>
                <li>✓ Due date reminders</li>
                <li>✓ @mentions</li>
                <li>✗ All board activity</li>
              </ul>
            </div>

            <h3>3. Frequency Settings</h3>
            <p>Control when you receive notifications:</p>
            <ul>
              <li>Instant notifications</li>
              <li>Daily digest</li>
              <li>Weekly summary</li>
              <li>Custom schedules</li>
            </ul>

            <h3>4. Do Not Disturb</h3>
            <p>Set quiet hours:</p>
            <ul>
              <li>Working hours only</li>
              <li>Custom time ranges</li>
              <li>Weekend settings</li>
              <li>Vacation mode</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </main>
</template> 