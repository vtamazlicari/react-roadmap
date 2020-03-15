import React, {useEffect, useState} from "react";

import {AccessLevel, Member, Option, Roles} from "../../../../types";
import './item.scss'
import RemoveIcon from '../../../../../../common/components/remove/remove';

interface Props {
    member: Member,
    personOptions: Option[],
    index: number;
    onChange: (value: Member, index: number) => void;
    removeItem: (person_id: string) => void;
}

export default function ({member, personOptions, onChange, index, removeItem}: Props) {
    const accessList = Object.values(AccessLevel).map(access => access);
    const roleList = Object.values(Roles).map(role => role);

    const [state, setState] = useState(member);

    const [roleOptions] = useState(roleList as string[]);
    const [accessOptions, setAccessOptions] = useState([] as string[]);

    useEffect(() => {
        const setAccessOptionsByRole = () => {
            if (state.role === Roles.MANAGER) {
                setAccessOptions(accessList);
            }
            if (state.role === Roles.CUSTOMER) {
                setAccessOptions([AccessLevel.READ]);
            }
            if (state.role === Roles.EMPLOYEE) {
                setAccessOptions([AccessLevel.READ, AccessLevel.WRITE]);
            }
        };

        setAccessOptionsByRole();
        onChange(state, index);
    }, [state]);

    const handleChange = (value: object, func: (arg: Member) => void) => {
        func({...state, ...value});
    };

    return (
        <li className="list-item">
            <div className="col">
                <select value={state.person_id} onChange={event => {
                    event.persist();
                    handleChange({person_id: event.target.value}, setState);
                }}>
                    {personOptions.map(({value, displayValue}, index) => (
                        <option key={index} value={value}>{displayValue}</option>))}
                </select>
            </div>
            <div className="col">
                <select value={state.role} onChange={event => {
                    event.persist();
                    handleChange({role: event.target.value}, setState);
                }}>
                    {roleOptions.map((value, index) => (<option key={index} value={value}>{value}</option>))}
                </select>
            </div>
            <div className="col">
                <select value={state.access_level} onChange={event => {
                    event.persist();
                    handleChange({access_level: event.target.value}, setState);
                }}>
                    {accessOptions.map((value, index) => (<option key={index} value={value}>{value}</option>))}
                </select>
            </div>
            <span onClick={() => removeItem(state.person_id)}><RemoveIcon/></span>
        </li>
    );
}
