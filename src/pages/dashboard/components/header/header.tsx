import React from "react";

import './header.scss';
import AddMemberModal from "./components/add-member-modal";

export default function Header({isChangeForm, setIsSubmit}: { isChangeForm: boolean, setIsSubmit: (arg: boolean) => void }) {
    const [isOpenModal, setIsOpenModal] = React.useState(false);

    const onClick = () => {
        setIsOpenModal(true);
    };

    const onClose = () => {
        setIsOpenModal(false);
    };

    return (
        <div>
            {!isChangeForm ? (
                <section className="header">
                    <span className="title">Tamazlicari Victor</span>
                    <span className="add-button" onClick={onClick}>New member</span>
                    <AddMemberModal isOpen={isOpenModal} modalHandler={onClose}/>
                </section>) : (
                <section className="header save-header">
                    <span className="add-button" onClick={onClick}>New member</span>
                    <span className="add-button submit-button" onClick={() => setIsSubmit(true)}>SaveChange</span>
                    <AddMemberModal isOpen={isOpenModal} modalHandler={onClose}/>
                </section>)
            }
        </div>
    )
}
