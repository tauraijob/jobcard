import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useTeamStore = defineStore('team', () => {
  const teams = ref([
    {
      id: 'team-1',
      name: 'Development Team',
      description: 'Main development team',
      members: [
        { id: 1, name: 'John Doe', avatar: 'https://ui-avatars.com/api/?name=John+Doe', role: 'admin' },
        { id: 2, name: 'Jane Smith', avatar: 'https://ui-avatars.com/api/?name=Jane+Smith', role: 'member' }
      ],
      recentBoards: [
        { id: 'board-1', title: 'Sprint Planning' },
        { id: 'board-2', title: 'Bug Tracking' }
      ]
    }
  ])

  function addTeam(team) {
    teams.value.push({
      id: `team-${Date.now()}`,
      ...team,
      members: [],
      recentBoards: []
    })
  }

  function updateTeam(updatedTeam) {
    const index = teams.value.findIndex(t => t.id === updatedTeam.id)
    if (index !== -1) {
      teams.value[index] = updatedTeam
    }
  }

  function deleteTeam(teamId) {
    teams.value = teams.value.filter(t => t.id !== teamId)
  }

  function addMember(teamId, member) {
    const team = teams.value.find(t => t.id === teamId)
    if (team) {
      team.members.push({
        id: Date.now(),
        ...member
      })
    }
  }

  function removeMember(teamId, memberId) {
    const team = teams.value.find(t => t.id === teamId)
    if (team) {
      team.members = team.members.filter(m => m.id !== memberId)
    }
  }

  function updateMember(teamId, memberId, updates) {
    const team = teams.value.find(t => t.id === teamId)
    if (team) {
      const member = team.members.find(m => m.id === memberId)
      if (member) {
        Object.assign(member, updates)
      }
    }
  }

  return {
    teams,
    addTeam,
    updateTeam,
    deleteTeam,
    addMember,
    removeMember,
    updateMember
  }
}) 