import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useBoardStore = defineStore('board', () => {
  const boards = ref([
    {
      id: 'main',
      title: 'Main Board',
      columns: [
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
      ],
      favorite: false,
      members: []
    }
  ])
  
  const currentBoard = ref('main')

  const currentBoardData = computed(() => 
    boards.value.find(b => b.id === currentBoard.value)
  )

  function addTask(task) {
    const board = boards.value.find(b => b.id === currentBoard.value)
    const column = board.columns.find(c => c.id === 'todo')
    column.tasks.push({
      ...task,
      createdAt: new Date().toISOString()
    })
  }

  function updateTask(taskId, updatedTask) {
    const board = boards.value.find(b => b.id === currentBoard.value)
    board.columns.forEach(column => {
      const taskIndex = column.tasks.findIndex(t => t.id === taskId)
      if (taskIndex !== -1) {
        column.tasks[taskIndex] = { ...updatedTask }
      }
    })
  }

  function moveTask(fromColumn, toColumn, fromIndex, toIndex) {
    const board = boards.value.find(b => b.id === currentBoard.value)
    const sourceColumn = board.columns.find(c => c.id === fromColumn)
    const targetColumn = board.columns.find(c => c.id === toColumn)
    
    if (!sourceColumn || !targetColumn) return
    
    // Remove from source column
    const [task] = sourceColumn.tasks.splice(fromIndex, 1)
    
    // Add to target column
    targetColumn.tasks.splice(toIndex, 0, task)
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
    boards.value.push(board)
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
    deleteTask,
    updateColumn,
    deleteColumn
  }
}) 