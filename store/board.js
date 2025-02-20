import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

const createDefaultColumns = () => [
  {
    id: 'todo',
    title: 'To Do',
    tasks: []
  },
  {
    id: 'inProgress',
    title: 'In Progress',
    tasks: []
  },
  {
    id: 'done',
    title: 'Done',
    tasks: []
  }
]

export const useBoardStore = defineStore('board', () => {
  const boards = ref([
    {
      id: 'main',
      title: 'Main Board',
      background: '#F8FAFC',
      visibility: 'private',
      favorite: false,
      teamId: '',
      createdAt: '2024-01-01T00:00:00.000Z',
      updatedAt: '2024-01-01T00:00:00.000Z',
      columns: createDefaultColumns(),
      members: []
    }
  ])
  
  const currentBoard = ref('main')

  const currentBoardData = computed(() => 
    boards.value.find(b => b.id === currentBoard.value) || {
      id: 'main',
      title: 'Main Board',
      background: '#F8FAFC',
      columns: createDefaultColumns(),
      members: [],
      favorite: false,
      team: '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  )

  function addTask(task, columnId) {
    const board = boards.value.find(b => b.id === currentBoard.value)
    if (!board) return

    // Use the provided columnId or task's stage
    const targetColumnId = columnId || task.stage || 'todo'
    const column = board.columns.find(c => c.id === targetColumnId)
    if (!column) return

    column.tasks.push({
      ...task,
      stage: targetColumnId // Ensure the stage matches the column
    })
  }

  function updateTask(taskId, updates) {
    const board = boards.value.find(b => b.id === currentBoard.value)
    if (!board) return

    // If stage has changed, move the task
    let currentStage
    for (const column of board.columns) {
      const task = column.tasks.find(t => t.id === taskId)
      if (task) {
        currentStage = column.id
        break
      }
    }

    if (currentStage && updates.stage && currentStage !== updates.stage) {
      moveTaskToStage(taskId, updates.stage)
    } else {
      // Update task in place if stage hasn't changed
      for (const column of board.columns) {
        const taskIndex = column.tasks.findIndex(t => t.id === taskId)
        if (taskIndex !== -1) {
          column.tasks[taskIndex] = { ...column.tasks[taskIndex], ...updates }
          break
        }
      }
    }
  }

  function moveTask(fromColumnId, toColumnId, taskId) {
    const board = boards.value.find(b => b.id === currentBoard.value)
    if (!board) return

    const fromColumn = board.columns.find(c => c.id === fromColumnId)
    const toColumn = board.columns.find(c => c.id === toColumnId)
    
    if (!fromColumn || !toColumn) return
    
    const taskIndex = fromColumn.tasks.findIndex(t => t.id === taskId)
    if (taskIndex === -1) return

    const task = fromColumn.tasks[taskIndex]
    
    // Remove from original column
    fromColumn.tasks.splice(taskIndex, 1)
    
    // Add to new column with updated stage
    toColumn.tasks.push({
      ...task,
      stage: toColumnId // Update the stage to match new column
    })
  }

  function moveTaskToStage(taskId, newStage) {
    const board = boards.value.find(b => b.id === currentBoard.value)
    if (!board) return

    // Find the task in any column
    let task
    let fromColumn
    
    for (const column of board.columns) {
      const taskIndex = column.tasks.findIndex(t => t.id === taskId)
      if (taskIndex !== -1) {
        task = column.tasks[taskIndex]
        fromColumn = column
        // Remove task from current column
        column.tasks.splice(taskIndex, 1)
        break
      }
    }

    if (!task) return

    // Add task to new stage column with updated stage property
    const toColumn = board.columns.find(c => c.id === newStage)
    if (toColumn) {
      toColumn.tasks.push({
        ...task,
        stage: newStage // Ensure stage is updated
      })
    }
  }

  function addColumn(title) {
    const board = boards.value.find(b => b.id === currentBoard.value)
    board.columns.push({
      id: `column-${Date.now()}`,
      title,
      tasks: []
    })
  }

  function addComment(taskId, comment) {
    const board = boards.value.find(b => b.id === currentBoard.value)
    board.columns.forEach(column => {
      const task = column.tasks.find(t => t.id === taskId)
      if (task) {
        if (!task.comments) task.comments = []
        task.comments.push(comment)
      }
    })
  }

  function updateComment(taskId, commentId, updatedContent) {
    const board = boards.value.find(b => b.id === currentBoard.value)
    board.columns.forEach(column => {
      const task = column.tasks.find(t => t.id === taskId)
      if (task && task.comments) {
        const comment = task.comments.find(c => c.id === commentId)
        if (comment) {
          comment.content = updatedContent
          comment.editedAt = new Date().toISOString()
        }
      }
    })
  }

  function deleteComment(taskId, commentId) {
    const board = boards.value.find(b => b.id === currentBoard.value)
    board.columns.forEach(column => {
      const task = column.tasks.find(t => t.id === taskId)
      if (task && task.comments) {
        task.comments = task.comments.filter(c => c.id !== commentId)
      }
    })
  }

  function addBoard(board) {
    boards.value.push({
      ...board,
      lists: [],
      members: []
    })
  }

  function updateBoard(updatedBoard) {
    const index = boards.value.findIndex(b => b.id === updatedBoard.id)
    if (index !== -1) {
      const background = updatedBoard.background?.includes('gradient')
        ? updatedBoard.background
        : updatedBoard.background || '#EFF6FF'

      boards.value[index] = {
        ...boards.value[index],
        ...updatedBoard,
        background,
        updatedAt: new Date().toISOString()
      }
    }
  }

  function deleteBoard(boardId) {
    boards.value = boards.value.filter(b => b.id !== boardId)
  }

  function deleteTask(taskId) {
    const board = boards.value.find(b => b.id === currentBoard.value)
    board.columns.forEach(column => {
      const taskIndex = column.tasks.findIndex(t => t.id === taskId)
      if (taskIndex !== -1) {
        column.tasks.splice(taskIndex, 1)
      }
    })
  }

  function updateColumn(columnId, updates) {
    const board = boards.value.find(b => b.id === currentBoard.value)
    const column = board.columns.find(c => c.id === columnId)
    if (column) {
      Object.assign(column, updates)
    }
  }

  function deleteColumn(columnId) {
    const board = boards.value.find(b => b.id === currentBoard.value)
    board.columns = board.columns.filter(c => c.id !== columnId)
  }

  function updateBoardSettings(settings) {
    const board = boards.value.find(b => b.id === currentBoard.value)
    if (board) {
      board.title = settings.title
      board.visibility = settings.visibility
      board.background = settings.background
      board.labels = settings.labels
    }
  }

  return {
    boards,
    currentBoard,
    currentBoardData,
    addTask,
    updateTask,
    moveTask,
    addColumn,
    addComment,
    updateComment,
    deleteComment,
    addBoard,
    updateBoard,
    deleteBoard,
    deleteTask,
    updateColumn,
    deleteColumn,
    updateBoardSettings,
    moveTaskToStage
  }
}) 