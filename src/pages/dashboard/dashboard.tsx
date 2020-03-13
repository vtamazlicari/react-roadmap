import React, {useContext, useEffect, useState} from "react";

import Header from './components/header/header';
import MemberList from './components/member-list/member-list';
import {AppContext} from "../../shared/context/context";

export default function Dashboard() {
    const [isChangeForm, setIsChangeForm] = useState(false);
    const [isSubmit, setIsSubmit] = useState(false);

    const { setMembersStore, setPersonsStore} = useContext(AppContext);

    const headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    };

    useEffect(() => {
        const fetchedMembers = async () => {
            return (await fetch('./members.json', {headers})).json()
        };
        fetchedMembers().then(result => setMembersStore(result.members));
    }, []);

    useEffect(() => {
        const fetchedPersons = async () => {
            return (await fetch('./persons.json', {headers})).json()
        };
        fetchedPersons().then(result => setPersonsStore(result.persons));
    }, []);

    return (
        <div>
            <Header isChangeForm={isChangeForm} setIsSubmit={setIsSubmit}/>
            <MemberList toggleHeader={setIsChangeForm} isSubmit={isSubmit} setIsSubmit={setIsSubmit}/>
        </div>
    );
}
