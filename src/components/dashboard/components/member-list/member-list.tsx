import React from "react";

import Item from "./components/item/item";
import {Member, Option, Person} from '../../types';

import './member-list.scss';

interface Props {
    membersList: Member[];
    getPersonsOptions: (idPerson: string) => Person[];
    addItem: () => void;
    handleChange: (member: Member, lastIndex: number) => void,
    removeItem: (person_id: string) => void;
}

export default function ({membersList, getPersonsOptions, addItem, removeItem, handleChange}: Props) {

    return (
        <ul>
            <li className="list-item list-header">
                <span className="col">Member</span>
                <span className="col">Role</span>
                <span className="col">Access Level</span>
            </li>
            {membersList.map((member, index) => (
                <Item key={index}
                      member={member}
                      personOptions={getPersonsOptions(member.person_id)}
                      index={index}
                      removeItem={removeItem}
                      onChange={handleChange}
                />))}
            <li className="list-item">
                <span className="add-member" onClick={() => addItem()}>Add new member</span>
            </li>
        </ul>
    );
}
