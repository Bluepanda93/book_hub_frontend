import { useState } from 'react'
import axios from 'axios'

const NewBookForm = (props) => {
  // const [books, updateBooks] = useState([])
  const [formState, setFormState] = useState({
    title: '',
    author: '',
    genre: ''
  })

  const handleChange = (event) => {
    setFormState({ ...formState, [event.target.id]: event.target.value })
  }

  // const updateBook = async (event, id) => {
  //   event.preventDefault()
  //   let response = await axios.put(`${BASE_URL}/books/${id}`, formState)
  //   updateBook([books, response])
  //   setFormState({
  //     title: '',
  //     author: '',
  //     genre: ''
  //   })
  // }

  const handleSubmit = async (event) => {
    event.preventDefault()
    let newBook = await axios
      .post(
        'https://the-book-hub-generalassembly.herokuapp.com/api/books',
        formState
      )
      .then((response) => {
        return response
      })
      .catch((error) => {
        console.log(error)
      })

    props.updateBooks([...props.books, newBook.data])
    setFormState({ title: '', author: '', genre: '' })
  }
  return (
    <div>
      <h1>New Book</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title:</label>
        <input id="title" value={formState.title} onChange={handleChange} />
        <label htmlFor="author">Author:</label>
        <input id="author" value={formState.author} onChange={handleChange} />
        <label htmlFor="genre">Genre:</label>
        <input id="genre" value={formState.genre} onChange={handleChange} />
        <button type="submit">Add Book</button>
      </form>
    </div>
  )
}

export default NewBookForm
