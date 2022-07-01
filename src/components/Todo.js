import React from 'react'

/* コンポーネント */
import TodoItem from './TodoItem'
import Input from './Input'
import Filter from './Filter'

/* カスタムフック */
import useFirebaseContainer from '../hooks/firebaseContainer'

/* ライブラリ */
import { addNewTodo, changeTodoStatus } from '../lib/firebase'

function Todo() {
  const [items, putItemsFirebase, clearItemsFirebase] = useFirebaseContainer()

  const [filter, setFilter] = React.useState('ALL')

  const displayItems = items.filter((item) => {
    if (filter === 'ALL') return true
    if (filter === 'TODO') return !item.done
    if (filter === 'DONE') return item.done
  })

  const handleCheck = async (checked) => {
    // console.log(checked);
    const newItems = items.map((item) => {
      if (item.documentId === checked.documentId) {
        item.done = !item.done
      }
      return item
    })
    // console.log(checked.documentId);
    await changeTodoStatus(checked.documentId)
    putItemsFirebase(newItems)
  }

  const handleAdd = async (text) => {
    const addResult = await addNewTodo({ text, done: false })

    // console.log(addResult.id);
    putItemsFirebase([...items, { documentId: addResult.id, text, done: false }])
  }

  const handleFilterChange = (value) => setFilter(value)

  return (
    <article className="panel is-danger">
      <div className="panel-heading">
        <span className="icon-text">
          <span className="icon">
            <i className="fas fa-calendar-check"></i>
          </span>
          <span> ITSS Todoアプリ</span>
        </span>
      </div>
      <Input onAdd={handleAdd} />
      <Filter onChange={handleFilterChange} value={filter} />
      {displayItems.map((item) => (
        <TodoItem key={item.documentId} item={item} onCheck={handleCheck} />
      ))}
      <div className="panel-block">{displayItems.length} items</div>
      <div className="panel-block">
        <button className="button is-light is-fullwidth" onClick={clearItemsFirebase}>
          全てのToDoを削除
        </button>
      </div>
    </article>
  )
}

export default Todo
