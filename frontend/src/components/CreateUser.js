import React, { Component } from 'react'
import axios from 'axios'
import { ModalCreateUser } from './Modals/ModalCreateUser'


export default class CreateUser extends Component {
    state = {
        users: [],
        userName: '',
        email: '',
    }
    getUser = async () => {
        const res = await axios.get('http://localhost:4000/api/users')
        this.setState({ users: res.data })
    }
    deleteUser = async (id) => {

        await axios.delete(`http://localhost:4000/api/users/${id}`)
        this.getUser()
    }

    onChangeUserName = (e) => {
        this.setState({
            userName: e.target.value
        })
    }
    onChangeUserEmail = (e) => {
        this.setState({
            email: e.target.value
        })
    }
    async componentDidMount() {
        this.getUser()
        // console.log(this.state.users);
    }

    onSubmit = async (e) => {
        e.preventDefault();

        try {
            // Verificar si los campos userName y email están llenos
            if (!this.state.userName || !this.state.email) {
                // Si alguno de los campos está vacío, lanzar un error
                throw new Error('Por favor, completa todos los campos.');
            }

            // Hacer la solicitud POST
            await axios.post('http://localhost:4000/api/users', {
                userName: this.state.userName,
                email: this.state.email
            });

            // Limpiar los campos y actualizar la lista de usuarios
            this.setState({ userName: '', email: '' });
            this.getUser();
        } catch (error) {
            // Manejar el error y mostrar una alerta
            console.error('Error al enviar el formulario:', error.message);
            alert('Error: ' + error.message);
        }
    };

    render() {
        return (
            <div className='row'>

                <div className="col-md-4 p-2">
                    <div className="card card-body ">
                        <h3>Create new user</h3>
                        <form onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <input type="text" className="form-control" value={this.state.userName} onChange={this.onChangeUserName} />
                                <input type="text" className="form-control" value={this.state.email} onChange={this.onChangeUserEmail} />

                            </div>
                            <button type='submit' className="btn btn-primary">Save</button>
                        </form>
                    </div>



                </div>
                <div className="col-md-8">
                    <ul className="list-group">
                        {this.state.users.map((user, index) =>
                            <li className='list-group-item p-1 m-1 border border-info  rounded-end ' key={user._id}
                                data-bs-toggle="modal" data-bs-target={`#deleteModal${index}`}>
                                <div className=''>

                                    <span className=''>
                                        {user.userName}
                                    </span>
                                </div>
                                <ModalCreateUser
                                    userName={user.userName}
                                    id={user._id}
                                    index={`deleteModal${index}`}
                                    onDelete={this.deleteUser}
                                />
                            </li>)}
                    </ul>
                </div>
            </div>
        )
    }
}
