import {useContext, useEffect} from 'react';
import {AppContext} from '../../../common/context/context';
import {useFetchMembers, useFetchPersons} from '../actions/dashboardActions';

export function useSetDataToContext() {
	const { setMembersStore, setPersonsStore } = useContext(AppContext);

	const membersFromFetch = useFetchMembers([]);
	const personsFromFetch = useFetchPersons([]);

	useEffect(() => {
		setMembersStore(membersFromFetch);
		return () => {};
	}, [membersFromFetch]);

	useEffect(() => {
		setPersonsStore(personsFromFetch);
		return () => {};
	}, [personsFromFetch])

	return;
}
