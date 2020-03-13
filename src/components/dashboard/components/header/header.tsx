import React from 'react';

import AddMemberModal from "./components/add-member-modal";

import './header.scss';

export default function Header({isChangeForm, saveChanges}: { isChangeForm: boolean, saveChanges: () => any}) {
    const [isOpenModal, setIsOpenModal] = React.useState(false);

    const handleClick = () => {
        setIsOpenModal(true);
    };

    const handleClose = () => {
        setIsOpenModal(false);
    };

    return (
        <div>
            <section className={`header ${isChangeForm ? 'save-header' : ''}`}>
                {!isChangeForm && (<span className="title">Tamazlicari Victor</span>)}
                <span className="add-button" onClick={handleClick}>New member</span>
                {isChangeForm && (
                    <span className="add-button submit-button" onClick={() => saveChanges()}>SaveChange</span>
                )}
                <AddMemberModal isOpen={isOpenModal} modalHandler={handleClose}/>
            </section>
        </div>
    )
}
