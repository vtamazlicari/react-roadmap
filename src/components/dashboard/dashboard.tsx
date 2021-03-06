import React, {useContext, useEffect, useState} from "react";
import {AppContext} from '../../common/context/context';

import Header from './components/header/header';
import MemberList from './components/member-list/member-list';
import {AccessLevel, Member, Option, Roles} from './types';
import {useSetDataToContext} from './utils/dashboardUtils';

const isEqual = require("react-fast-compare");

export default function Dashboard() {
    useSetDataToContext();

    const {state, setMembersStore} = useContext(AppContext);
    const {members, persons} = state;

    const [membersList, setMembersList] = useState([] as Member[]);

    useEffect(() => {
        setMembersList([...members]);
    }, [members]);

    const getUnselectedMembers = (idPerson: string) => {
        const selectedMembers = membersList.map(({ person_id }) => person_id);
        return persons.filter(person => person.person_id === idPerson || !selectedMembers.includes(person.person_id));
    };

    const handleChange = (member: Member, indexInList: number) => {
        setMembersList(membersList.map((value, index) => index === indexInList ? member : value));
    };

    const addItem = () => {
        if (persons.length === membersList.length) {
            return;
        }
        const selectedMembers = membersList.map(({ person_id }) => person_id);
        const newItem: Member = {
            person_id: persons.find(person => !selectedMembers.includes(person.person_id))?.person_id || '',
            role: Roles.CUSTOMER,
            access_level: AccessLevel.READ
        };
        setMembersList(membersList.concat(newItem))
    };

    const removeItem = (id: string) => {
        setMembersList(membersList.filter(member => member.person_id !== id));
    };

    const saveChanges = () => setMembersStore(membersList);

    return (
        <div>
            <Header
                isChangeForm={!isEqual(members, membersList)}
                saveChanges={saveChanges}
            />
            <MemberList
                membersList={membersList}
                getPersonsOptions={getUnselectedMembers}
                addItem={addItem}
                handleChange={handleChange}
                removeItem={removeItem}
            />
        </div>
    );
}
