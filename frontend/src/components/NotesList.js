import React, { Component } from 'react'
import axios from 'axios'
import { format } from 'timeago.js';
import { Link } from "react-router-dom";

export default class NotesList extends Component {
    state = {
        notes: [],
    }

    getNotes = async () => {
        const res = await axios.get('http://localhost:4000/api/notes')
        this.setState({ notes: res.data })

    }
    deleteNote = async (id) => {
        await axios.delete(`http://localhost:4000/api/notes/${id}`)
        this.getNotes()
    }
    async componentDidMount() {
        this.getNotes()
    }


    render() {
        return (
            <div className="row ">
                <h1 className='text-light'>List Note</h1>
                {this.state.notes.map((note, index) => (
                    <div className="col-md-4 p-2 mb-2" key={index}>
                        <div className="card ">
                            <div className="card-header ">
                                <div className=" d-flex justify-content-between ">
                                    <h5>{note.title}</h5>


                                    <Link className='btn  btn-secondary' to={`/edit/${note._id}`}>Edit</Link>
                                </div>
                                <p >
                                    Autor: {" "}
                                    <span className="fst-italic text-decoration-underline">
                                        {note.author}
                                    </span>
                                </p>
                            </div>
                            <div className="card-body">
                                <p>
                                    {note.content}
                                </p>
                                <p>{format(note.date, 'es_Es')}</p>
                            </div>
                            <div className="card-footer text-body-secondary">
                                <div className='d-flex justify-content-center '>
                                    {/* Siempre poner  () => this.deleteNote(note._id) ya que si solo ponemos  this.deleteNote(note._id) en automatico se ejecuta y eliminara todos los usuarios ya que se llama la funcion rapidamente*/}
                                    <button className="btn btn-danger" onClick={() => this.deleteNote(note._id)}>Delete</button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
                }
            </div>
        )
    }
}
