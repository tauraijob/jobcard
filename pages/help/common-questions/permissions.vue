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
            <span class="text-gray-700">Managing Permissions</span>
          </div>

          <h1 class="text-3xl font-bold text-gray-900 mb-8">Managing Permissions</h1>
          
          <div class="prose prose-blue max-w-none bg-white p-8 rounded-xl shadow-sm border border-gray-200">
            <h2>Permission Management Guide</h2>

            <h3>1. User Roles</h3>
            <p>Understanding different access levels:</p>
            <ul>
              <li>Workspace Admin
                <ul>
                  <li>Full control over workspace</li>
                  <li>Manage all teams and boards</li>
                  <li>Configure workspace settings</li>
                  <li>Manage billing and subscriptions</li>
                </ul>
              </li>
              <li>Team Admin
                <ul>
                  <li>Manage team settings</li>
                  <li>Add/remove team members</li>
                  <li>Create and manage team boards</li>
                </ul>
              </li>
              <li>Member
                <ul>
                  <li>Create personal boards</li>
                  <li>Edit assigned boards</li>
                  <li>Manage own tasks</li>
                </ul>
              </li>
              <li>Observer
                <ul>
                  <li>View boards and tasks</li>
                  <li>Add comments</li>
                  <li>No edit permissions</li>
                </ul>
              </li>
            </ul>

            <div class="bg-green-50 p-6 rounded-lg my-6 not-prose">
              <h4 class="text-lg font-semibold text-green-900 mb-2">Best Practice</h4>
              <p class="text-green-800">
                Follow the principle of least privilege: Give users only the permissions they need to do their work.
              </p>
            </div>

            <h3>2. Board Permissions</h3>
            <p>Configure access at the board level:</p>
            <ul>
              <li>Visibility settings
                <ul>
                  <li>Private - Only invited members</li>
                  <li>Team - All team members</li>
                  <li>Public - Anyone with link</li>
                </ul>
              </li>
              <li>Member permissions
                <ul>
                  <li>View only</li>
                  <li>Comment</li>
                  <li>Edit</li>
                  <li>Admin</li>
                </ul>
              </li>
            </ul>

            <h3>3. Team Permissions</h3>
            <p>Manage team-level access:</p>
            <ul>
              <li>Team visibility</li>
              <li>Member management</li>
              <li>Board creation rights</li>
              <li>Resource access levels</li>
            </ul>

            <h3>4. Security Features</h3>
            <ul>
              <li>Two-factor authentication</li>
              <li>Single sign-on (SSO)</li>
              <li>Activity logging</li>
              <li>IP restrictions</li>
            </ul>

            <div class="bg-yellow-50 p-6 rounded-lg my-6 not-prose">
              <h4 class="text-lg font-semibold text-yellow-900 mb-2">Need Help?</h4>
              <p class="text-yellow-800">
                Contact our support team for help with advanced permission settings or security configurations.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template> 