<template>
  <main class="flex-1">
    <div class="bg-gray-50 min-h-screen py-8">
      <div class="container mx-auto px-6">
        <div class="max-w-3xl mx-auto">
          <div class="flex items-center space-x-2 text-sm text-gray-500 mb-4">
            <NuxtLink to="/help" class="hover:text-gray-700">Help</NuxtLink>
            <span>/</span>
            <span class="text-gray-700">Common Questions</span>
          </div>

          <h1 class="text-3xl font-bold text-gray-900 mb-8">Common Questions</h1>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <NuxtLink to="/help/common-questions/customize-boards" 
              class="block p-6 bg-white rounded-xl shadow-sm border border-gray-200 hover:border-blue-200 hover:shadow-md transition-all"
            >
              <h3 class="text-lg font-semibold text-gray-900 mb-2">How to Customize Boards</h3>
              <p class="text-gray-600">Learn how to personalize your boards with themes, layouts, and power-ups.</p>
            </NuxtLink>

            <NuxtLink to="/help/common-questions/notifications" 
              class="block p-6 bg-white rounded-xl shadow-sm border border-gray-200 hover:border-blue-200 hover:shadow-md transition-all"
            >
              <h3 class="text-lg font-semibold text-gray-900 mb-2">Setting Up Notifications</h3>
              <p class="text-gray-600">Configure your notification preferences and stay updated on important changes.</p>
            </NuxtLink>

            <NuxtLink to="/help/common-questions/permissions" 
              class="block p-6 bg-white rounded-xl shadow-sm border border-gray-200 hover:border-blue-200 hover:shadow-md transition-all"
            >
              <h3 class="text-lg font-semibold text-gray-900 mb-2">Managing Permissions</h3>
              <p class="text-gray-600">Control access levels and security settings for your teams and boards.</p>
            </NuxtLink>

            <div class="p-6 bg-blue-50 rounded-xl border border-blue-100">
              <h3 class="text-lg font-semibold text-blue-900 mb-2">Need More Help?</h3>
              <p class="text-blue-800 mb-4">Can't find what you're looking for? Our support team is here to help.</p>
              <a href="mailto:support@trekka.com" 
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