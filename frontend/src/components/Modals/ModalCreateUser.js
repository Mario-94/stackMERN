import React from 'react'

export const ModalCreateUser = ({ userName, id, index, onDelete }) => {
    const handleDelete = () => {
        onDelete(id);
    };


    return (
        <div className="modal fade" id={index} tabIndex="-1" aria-labelledby="modalCreateUser" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5 text-danger border-bottom border-danger" id="modalCreateUser">
                            Eliminar
                        </h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body text-center">
                        <h3>
                            ¿Desea eliminar al usuario?
                            <p>

                                <span className='text-danger '>
                                    {userName}
                                </span>
                            </p>
                        </h3>

                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-danger" onClick={handleDelete}>Eliminar</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
