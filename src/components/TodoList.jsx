import {VStack} from '@chakra-ui/react';
import {Spinner} from '@chakra-ui/react';

import {useMutation, useQuery} from '@apollo/client'

import TodoItem from './TodoItem';
import TotalCount from './TotalCount';
import {ALL_TODO, REMOVE_TODO, UPDATE_TODO} from "../apollo/todos";

const TodoList = () => {

	const {error, loading, data} = useQuery(ALL_TODO)

	const [toggleTodo, {error: updateError}] = useMutation(UPDATE_TODO)
	const [removeTodo, {error: removeError}] = useMutation(REMOVE_TODO, {
		update(cache, {data: {removeTodo}}) {
			cache.modify({
				fields: {
					allTodos(currentTodos = []) {
						return currentTodos.filter(todo => todo.__ref !== `Todo:${removeTodo.id}`)
					}
				}
			})
		}
	})

	if (loading) {
		return <Spinner/>
	}

	if (error || updateError || removeError) {
		return <div>Error...</div>
	}

	return (
		<>
			<VStack spacing={2} mt={4}>
				{data.todos.map((todo) => (
					<TodoItem
						key={todo.id}
						{...todo}
						onToggle={toggleTodo}
						onRemove={removeTodo}
					/>
				))}
			</VStack>
			<TotalCount/>
		</>
	);
};

export default TodoList;
