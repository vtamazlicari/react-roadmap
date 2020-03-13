import React, {useContext, useEffect, useState} from "react";

import './member-list.scss';
import Item from "./components/item/item";
import {AccessLevel, Member, Option, Roles} from "../../types";
import {AppContext} from "../../../../shared/context/context";

interface Props {
    toggleHeader: (arg: boolean) => void;
    isSubmit: boolean;
    setIsSubmit: (arg: boolean) => void;
}

export default function ({toggleHeader, isSubmit, setIsSubmit}: Props) {
    const {state, setMembersStore} = useContext(AppContext);
    const {members, persons} = state;

    const [loading, setLoading] = useState(false);

    const [membersList, setMembersList] = useState([] as Member[]);

    useEffect(() => {
        if (isSubmit) {
            toggleHeader(false);
            setMembersStore(membersList);
            setIsSubmit(false);
        }
    }, [isSubmit]);

    useEffect(() => {
        if (loading) {
            toggleHeader(false);
            setLoading(false);
        } else {
            toggleHeader(true);
        }
    }, [membersList]);

    useEffect(() => {
        setLoading(true);
        setMembersList([...members]);
    }, [members]);

    const getListItem = (id: string) => {
        return persons.filter(person => person.person_id === id ||
            !membersList.find(member => person.person_id === member.person_id))
            .map(value => ({
                value: value.person_id,
                displayValue: `${value.firstname} ${value.lastname}`
            })) as Option[];
    };

    const handleChange = (member: Member, indexInList: number) => {
        if (!loading) {
            setMembersList(membersList.map((value, index) => index === indexInList ? member : value));
        }
    };

    const addItem = () => {
        if (persons.length === membersList.length) {
            return;
        }
        const newItem: Member = {
            person_id: persons.find(person => !membersList.find(member => person.person_id === member.person_id))?.person_id || '',
            role: Roles.CUSTOMER,
            access_level: AccessLevel.READ
        };
        setMembersList(membersList.concat(newItem))
    };

    const removeItem = (listIndex: number) => {
        setMembersList(membersList.filter((_, index) => listIndex !== index));
    };

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
                      personOptions={getListItem(member.person_id)}
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
