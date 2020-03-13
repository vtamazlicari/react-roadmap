import React, {useState} from 'react';
import {Member, Person} from "../../pages/dashboard/types";

interface AppContextType {
    state: {
        persons: Person[],
        members: Member[],
    };
    addNewPerson: (arg: Person) => void;
    setMembersStore: (arg: Member[]) => void;
    setPersonsStore: (arg: Person[]) => void;
}

const AppContext = React.createContext({} as AppContextType);

function ContextProvider({ children }: { children: any }) {
    const [persons, setPersons] = useState([] as Person[]);
    const [members, setMembers] = useState([] as Member[]);

    const addNewPerson = (person: Person) => {
        setPersons([...persons, person]);
    };

    const setMembersStore = (members: Member[]) => {
        setMembers(members);
    };

    const setPersonsStore = (persons: Person[]) => {
        setPersons(persons);
    };
    
    const store: AppContextType = {
        state: {
            persons,
            members,
        },
        addNewPerson,
        setMembersStore,
        setPersonsStore,
    };

    return (
        <AppContext.Provider value={store}>
            {children}
        </AppContext.Provider>
    );
}

// @ts-ignore
export { ContextProvider, AppContext, AppContextType };
