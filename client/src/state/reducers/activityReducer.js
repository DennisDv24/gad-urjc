
const initialState = {
	items: [],
	loading: false,
	currentItem: null,
	currentItemTeams: [],
}

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case 'GET_ACTIVITIES':
			return {
				...state,
				items: action.payload,
				loading: false
			};
		case 'GET_ACTIVITY':
			return {
				...state,
				currentItem: action.payload
			};
		case 'UPDATE_ACTIVITY':
			return {
				...state,
				currentItem: action.updatedActivity,
				items: state.items.map(
					x => x._id === action.updatedActivity._id ? action.updatedActivity : x
				)
			};
		case 'ITEMS_LOADING':
			return {
				...state,
				loading: true
			};
		case 'CURRENT_ACT':
			return {
				...state,
				currentItem: action.payload
			};
		case 'CURRENT_TEAM':
			return {
				...state,
				currentTeam: action.team
			};
		case 'ADD_ACTIVITY':
			return {
				...state,
				items: [...state.items, action.payload]
			};
		case 'ADD_TEAM':
			state.currentItemTeams.push(action.newTeam);
			return {
				...state,
				loading: false
			};
		case 'GET_ACTIVITY_TEAMS':
			return {
				...state,
				currentItemTeams: action.teams,
				loading: false
			};
		case 'UPDATE_TEAM':
			return {
				...state,
				currentItemTeams: state.currentItemTeams.map(
					x => x._id === action.team._id ? x = action.team : x
				)
			};
		case 'DELETE_TEAM':
			return {
				...state, 
				currentItemTeams: state.currentItemTeams.filter(
					team => team._id !== action.teamId 
				)
			};
		case 'DELETE_ACTIVITY':
			return {
				items: state.items.filter(act => act._id !== action.actIdToDelete),
				loading: false,
				currentItem: null,
				currentItemTeams: []
			};
		default: return state;
	}
}

export default reducer;
