<template>
  <main class="flex-1">
    <div class="bg-gray-50 min-h-screen py-8">
      <div class="container mx-auto px-6">
        <h1 class="text-3xl font-bold text-gray-900 mb-8">Help Center</h1>
        
        <div class="space-y-6">
          <!-- Search -->
          <div class="relative">
            <input 
              type="search"
              placeholder="Search help articles..."
              class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            >
          </div>

          <!-- Quick Links -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              <h3 class="text-lg font-medium text-gray-900 mb-2">Getting Started</h3>
              <ul class="space-y-2">
                <li>
                  <a href="#" class="text-blue-600 hover:text-blue-700">Creating your first board</a>
                </li>
                <li>
                  <a href="#" class="text-blue-600 hover:text-blue-700">Adding team members</a>
                </li>
                <li>
                  <a href="#" class="text-blue-600 hover:text-blue-700">Managing tasks</a>
                </li>
              </ul>
            </div>

            <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              <h3 class="text-lg font-medium text-gray-900 mb-2">Common Questions</h3>
              <ul class="space-y-2">
                <li>
                  <a href="#" class="text-blue-600 hover:text-blue-700">How to customize boards</a>
                </li>
                <li>
                  <a href="#" class="text-blue-600 hover:text-blue-700">Setting up notifications</a>
                </li>
                <li>
                  <a href="#" class="text-blue-600 hover:text-blue-700">Managing permissions</a>
                </li>
              </ul>
            </div>
          </div>

          <!-- FAQ Section -->
          <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h2 class="text-xl font-semibold text-gray-900 mb-4">Frequently Asked Questions</h2>
            
            <div class="space-y-4">
              <details class="group">
                <summary class="flex justify-between items-center cursor-pointer p-4 bg-gray-50 rounded-lg">
                  <span class="font-medium">How do I create a new board?</span>
                  <span class="transform group-open:rotate-180 transition-transform">
                    ▼
                  </span>
                </summary>
                <div class="p-4 text-gray-600">
                  To create a new board, click the "+" button in the top navigation bar and select "New Board". 
                  You can then customize your board's title, background, and visibility settings.
                </div>
              </details>

              <details class="group">
                <summary class="flex justify-between items-center cursor-pointer p-4 bg-gray-50 rounded-lg">
                  <span class="font-medium">Can I share boards with external users?</span>
                  <span class="transform group-open:rotate-180 transition-transform">
                    ▼
                  </span>
                </summary>
                <div class="p-4 text-gray-600">
                  Yes! You can share boards with external users by setting the board's visibility to "Public" 
                  or by inviting specific email addresses.
                </div>
              </details>

              <!-- Add more FAQ items as needed -->
            </div>
          </div>

          <!-- Contact Support -->
          <div class="bg-blue-50 p-6 rounded-xl border border-blue-100">
            <h2 class="text-lg font-medium text-blue-900 mb-2">Still need help?</h2>
            <p class="text-blue-700 mb-4">Our support team is here to help you.</p>
            <button class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
.group {
  transition: all 0.2s ease;
}

.group:hover {
  background-color: #f8fafc;
}

details > summary {
  list-style: none;
}

details > summary::-webkit-details-marker {
  display: none;
}
</style> 