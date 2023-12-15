import {gql} from "@apollo/client";

export const ALL_TODO = gql`
	query allTodos {
		todos: allTodos {
			id
			title
			completed
		}
	}
`;