import axios from 'axios'
import React, { Component } from 'react'



export default class CreateNote extends Component {
    state = {
        users: [],
        userSelected: [],
        title: '',
        content: '',
        author: ''
    }
    getNote = async () => {
        const res = await axios.get('http://localhost:4000/api/users')

        this.setState({
            users: res.data.map(user => (user.userName))
        })

    }
    limpiarFormulario = () => {
        this.setState({
            title: '',
            content: '',
            author: ' '
        })
    }

    onSumbmit = async (e) => {
        e.preventDefault();
        try {
            if (!this.state.title || !this.state.content || !this.state.author) {
                throw new Error('Por favor , complete todos los campos.')
            }
            await axios.post('http://localhost:4000/api/notes',
                {
                    title: this.state.title,
                    content: this.state.content,
                    author: this.state.author
                })
            this.limpiarFormulario();
            this.getNote()
        } catch (error) {
            console.error(`Error al enviar el formulario: ${error}`);
            alert(`Intente de nuevo`)
        }
    }
    onInputChange = e => {
        this.setState({ userSelected: e.target.value })

    }
    async componentDidMount() {
        this.getNote()
    }

    render() {
        return (

            <div className="col-md-6 offset-md-3">
                <div className="card card-body">
                    <h3>Create new note</h3>
                    {/* Select user */}

                    <div className="form-group p-2 mb-2">
                        <select name="userSelected" className='form-control'
                            onChange={this.onInputChange}>
                            {
                                this.state.users.map((user, index) => (
                                    <option key={index} value={user}>{user}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div className="form-group p-2 mb-2">
                        <input type="text" className="form-control" placeholder='Title' name='title' required />
                    </div>
                    <div className="form-group p-2 mb-2">
                        <textarea name="content" className='form-control' placeholder='content' required>
                        </textarea>
                    </div>
                    <form>
                        <button className="btn btn-primary">Save</button>
                    </form>
                </div>

            </div>


        )
    }
}
