import React, { useState, useEffect } from 'react'
import axios from 'axios'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { useParams } from 'react-router-dom'
const CreateNote = () => {
    const [users, setUsers] = useState([]);
    const [userSelected, setUserSelected] = useState([]);
    // const [userSelected, setUserSelected] = useState(users.length > 0 ? users[0] : '');
    const [date, setDate] = useState(new Date());
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [editing, setEditing] = useState(false)
    const { id } = useParams();

    useEffect(() => {
        const getNote = async () => {
            const res = await axios.get('http://localhost:4000/api/users');
            setUsers(res.data.map(user => user.userName));
            setUserSelected(res.data[0].userName);
            if (id) {
                const res = await axios.get('http://localhost:4000/api/notes/' + id);
                const { author, date, title, content } = res.data.data;
                setTitle(title);
                setContent(content);
                setUserSelected(author);
                setDate(new Date(date));
                setEditing(true)
            }
        };
        getNote()
    }, [id]);


    const limpiarFormulario = () => {
        setTitle('')
        setContent('')
    }

    const onSumbmit = async (e) => {
        e.preventDefault();

        const newNote = {
            title: title,
            content: content,
            author: userSelected,
            /*  En este caso para poder modificar la propiedad de date me toco acomodar la parte de back en que pueda recivir la parte de date, ya que no se tenia esta parte actualmente */
            date: date,
        };
        if (editing) {

            const res = await axios.put('http://localhost:4000/api/notes/' + id, newNote);
            console.log(res);
        } else {
            const res = await axios.post('http://localhost:4000/api/notes', newNote);
            console.log(res);
        }

        limpiarFormulario();
        window.location.href = '/';

    }
    const onInputChange = (e) => {
        const { name, value } = e.target;

        switch (name) {
            case 'userSelected':
                setUserSelected(value);
                break;
            case 'title':
                setTitle(value);
                break;
            case 'content':
                setContent(value);
                break;
            default:
                break;
        }
    };
    const onChangeDate = (newDate) => {
        setDate(newDate)
    }
    console.log(date);
    return (
        <div className="col-md-6 offset-md-3">
            <div className="card card-body">
                <form onSubmit={onSumbmit}>
                    <h3>Create new note</h3>
                    {/* Select user */}
                    <div className="form-group p-2 mb-2">
                        <select name="userSelected" className='form-control'
                            onChange={onInputChange} value={userSelected} >
                            {
                                users.map((user, index) => (
                                    <option key={index} value={user}>{user}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div className="form-group p-2 mb-2">
                        <input type="text" className="form-control" placeholder='Title' name='title' required onChange={onInputChange} value={title} />
                    </div>
                    <div className="form-group p-2 mb-2">
                        <textarea name="content" className='form-control' placeholder='content' required onChange={onInputChange} value={content}>
                        </textarea>
                    </div>
                    <div className="form-group p-2 mb-2">
                        <DatePicker
                            className='form-control'
                            selected={date}
                            onChange={onChangeDate}
                        />
                    </div>
                    <button className="btn btn-primary ">Save</button>
                </form>
            </div>
        </div >
    )
}
export default CreateNote;