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
            <span class="text-gray-700">Adding Team Members</span>
          </div>

          <h1 class="text-3xl font-bold text-gray-900 mb-8">Adding Team Members</h1>
          
          <div class="prose prose-blue max-w-none bg-white p-8 rounded-xl shadow-sm border border-gray-200">
            <h2>Team Collaboration Guide</h2>

            <h3>1. Creating a Team</h3>
            <ul>
              <li>Navigate to the Teams page</li>
              <li>Click "Create Team"</li>
              <li>Enter team name and description</li>
              <li>Set team visibility and permissions</li>
            </ul>

            <h3>2. Inviting Members</h3>
            <p>Add members to your team:</p>
            <ul>
              <li>Click "Invite Members" in team settings</li>
              <li>Enter email addresses</li>
              <li>Set member roles:
                <ul>
                  <li>Admin - Full team management</li>
                  <li>Member - Can view and edit</li>
                  <li>Observer - View only access</li>
                </ul>
              </li>
            </ul>

            <div class="bg-green-50 p-6 rounded-lg my-6 not-prose">
              <h4 class="text-lg font-semibold text-green-900 mb-2">Best Practices</h4>
              <p class="text-green-800">
                Start with a small core team and gradually add members as needed.
                This helps maintain clear communication and workflow.
              </p>
            </div>

            <h3>3. Managing Team Access</h3>
            <p>Control what team members can do:</p>
            <ul>
              <li>Set board access levels</li>
              <li>Manage member permissions</li>
              <li>Create team-specific boards</li>
              <li>Set up team workflows</li>
            </ul>

            <h3>4. Team Communication</h3>
            <p>Collaborate effectively:</p>
            <ul>
              <li>Use board comments for discussions</li>
              <li>Mention team members with @username</li>
              <li>Set up notifications</li>
              <li>Share updates on team activity</li>
            </ul>

            <div class="bg-yellow-50 p-6 rounded-lg my-6 not-prose">
              <h4 class="text-lg font-semibold text-yellow-900 mb-2">Next Steps</h4>
              <p class="text-yellow-800">
                Learn how to work with your team effectively:
              </p>
              <div class="mt-4 space-y-2">
                <NuxtLink to="/help/getting-started/managing-tasks" 
                  class="block text-yellow-900 hover:text-yellow-700"
                >
                  → Manage tasks and assignments
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template> 