<template>
  <footer class="bg-white border-t border-gray-200">
    <div class="container mx-auto px-6 py-8">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
        <!-- Product -->
        <div>
          <h3 class="text-sm font-semibold text-gray-900 uppercase tracking-wider">Product</h3>
          <ul class="mt-4 space-y-3">
            <li>
              <NuxtLink to="/boards" class="text-base text-gray-600 hover:text-gray-900">
                Boards
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/teams" class="text-base text-gray-600 hover:text-gray-900">
                Teams
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Resources -->
        <div>
          <h3 class="text-sm font-semibold text-gray-900 uppercase tracking-wider">Resources</h3>
          <ul class="mt-4 space-y-3">
            <li>
              <NuxtLink to="/help/" class="text-base text-gray-600 hover:text-gray-900">
                Help Center
              </NuxtLink>
            </li>
            <li>
              <a href="https://github.com/yourusername/trekka" target="_blank" class="text-base text-gray-600 hover:text-gray-900">
                GitHub
              </a>
            </li>
          </ul>
        </div>

        <!-- Legal -->
        <div>
          <h3 class="text-sm font-semibold text-gray-900 uppercase tracking-wider">Legal</h3>
          <ul class="mt-4 space-y-3">
            <li>
              <NuxtLink to="/privacy/" class="text-base text-gray-600 hover:text-gray-900">
                Privacy Policy
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/terms/" class="text-base text-gray-600 hover:text-gray-900">
                Terms of Service
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Company -->
        <div>
          <h3 class="text-sm font-semibold text-gray-900 uppercase tracking-wider">Company</h3>
          <ul class="mt-4 space-y-3">
            <li>
              <a href="mailto:support@trekka.com" class="text-base text-gray-600 hover:text-gray-900">
                Contact Us
              </a>
            </li>
            <li>
              <a href="https://twitter.com/trekkaapp" target="_blank" class="text-base text-gray-600 hover:text-gray-900">
                Twitter
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div class="mt-8 pt-8 border-t border-gray-200">
        <p class="text-base text-gray-500 text-center">
          © {{ new Date().getFullYear() }} Trekka. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
</template> 