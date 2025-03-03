import { defineStore } from 'pinia'

export const useTeamStore = defineStore('team', {
  state: () => ({
    teams: [],
    currentTeam: null,
    loading: false,
    error: null
  }),

  actions: {
    async fetchTeams() {
      this.loading = true
      try {
        const response = await fetch('/api/teams')
        this.teams = await response.json()
      } catch (error) {
        this.error = error.message
      } finally {
        this.loading = false
      }
    },

    async createTeam(teamData) {
      this.loading = true
      try {
        const response = await fetch('/api/teams', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(teamData)
        })
        const newTeam = await response.json()
        this.teams.push(newTeam)
        return newTeam
      } catch (error) {
        this.error = error.message
        throw error
      } finally {
        this.loading = false
      }
    },

    async updateTeam(id, teamData) {
      this.loading = true
      try {
        const response = await fetch(`/api/teams/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(teamData)
        })
        const updatedTeam = await response.json()
        const index = this.teams.findIndex(team => team.id === id)
        if (index !== -1) {
          this.teams[index] = updatedTeam
        }
        return updatedTeam
      } catch (error) {
        this.error = error.message
        throw error
      } finally {
        this.loading = false
      }
    }
  }
}) 