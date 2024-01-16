// // redux thunk allows for nested arrow functions
// export const AddSampleAction = (sample) => (dispatch, getState) => {
//   const {
//     Todo: { todos }
//   } = getState()

//   const hasTodo = todos.find((i) => i.todo === sample)

//   if (!hasTodo && sample !== '') {
//     dispatch({
//       type: 'ADD_TODO_SUCCESS',
//       payload: [{ id: sample, sample }, ...todos]
//     })
//   }
// }

// export const RemoveTodoAction = (todo) => (dispatch, getState) => {
//   const {
//     Todo: { todos }
//   } = getState()

//   dispatch({
//     type: 'REMOVE_TODO',
//     payload: todos.filter((t) => t.id !== todo.id)
//   })
// }
