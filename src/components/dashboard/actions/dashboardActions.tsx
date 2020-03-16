import {useEffect, useState} from 'react';
import {Member, Person} from '../types';

const headers = {
	'Content-Type': 'application/json',
	'Accept': 'application/json'
};

export function useFetchMembers(initialValue: any[]) {
	const [ value, setValue ] = useState(initialValue as Member[]);

	useEffect(() => {
		const fetchedMembers = async () => {
			return (await fetch('./members.json', {headers})).json()
		};
		fetchedMembers().then(result => setValue(result.members));

		return () => {};
	}, []);

	return value
}

export function useFetchPersons(initialValue: Person[]) {
	const [ value, setValue ] = useState(initialValue as Person[]);

	useEffect(() => {
		const fetchedPersons = async () => {
			return (await fetch('./persons.json', {headers})).json()
		};
		fetchedPersons().then(result => setValue(result.persons));
	}, []);


	return value
}
