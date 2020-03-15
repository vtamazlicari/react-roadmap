import React, {useContext} from 'react';
import Modal from 'react-modal';
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as yup from "yup";
import {v4} from "uuid";

import {Person} from "../../../types";
import RemoveIcon from "../../../../../common/components/remove/remove";
import {AppContext} from "../../../../../common/context/context";

import './add-member-modal.scss';

const modalStyle = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};

export default function AddMemberModal({isOpen, modalHandler}: { isOpen: boolean, modalHandler: () => void }) {
    const form: Person = {
        person_id: v4(),
        firstname: '',
        lastname: '',
        title: '',
        business_unit: '',
        is_user: false,
    };

    const {addNewPerson} = useContext(AppContext);

    const formSchema = yup.object().shape({
        firstname: yup.string().required('This field is required'),
        lastname: yup.string().required('This field is required')
    });

    return (
        <Modal
            isOpen={isOpen}
            style={modalStyle}
            onRequestClose={modalHandler}
        >
            <header>
                <span>Create Member</span>
                <i onClick={() => modalHandler()}><RemoveIcon/></i>
            </header>
            <Formik initialValues={form}
                    validationSchema={formSchema}
                    onSubmit={event => {
                        addNewPerson(event);
                        modalHandler();
                    }}>
                <Form>
                    <div className="form">
                        <div className="fields-col">
                            <div className="form-field">
                                <label htmlFor="firstname">First Name<span>*</span></label>
                                <Field
                                    type="text"
                                    name="firstname"
                                    id="firstname"
                                />
                                <ErrorMessage
                                    name="firstname"
                                    component="div"
                                    className="error-field"
                                />
                            </div>
                            <div className="form-field">
                                <label htmlFor="lastname">Last Name<span>*</span></label>
                                <Field
                                    type="text"
                                    name="lastname"
                                    id="lastname"
                                />
                                <ErrorMessage
                                    name="lastname"
                                    component="div"
                                    className="error-field"
                                />
                            </div>
                            <div>
                                <Field
                                    type="checkbox"
                                    name="is_user"
                                    id="is_user"
                                />
                                <label htmlFor="is_user" className="checkbox-label">User status</label>
                            </div>
                            <span
                                className="description">Designates whether the person can login into application</span>
                        </div>

                        <div className="fields-col">
                            <div className="form-field">
                                <label htmlFor="title">Title</label>
                                <Field
                                    type="text"
                                    name="title"
                                    id="title"
                                />
                            </div>
                            <div className="form-field">
                                <label htmlFor="business_unit">Business Unit</label>
                                <Field
                                    type="text"
                                    name="business_unit"
                                    id="business_unit"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <span onClick={() => modalHandler()}>Cancel</span>
                        <button className="primary-button" type="submit">Create Member</button>
                    </div>
                </Form>
            </Formik>
        </Modal>
    );
}

Modal.setAppElement('#root');
