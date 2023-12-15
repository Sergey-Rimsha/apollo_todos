import React from 'react';
import ReactDOM from 'react-dom/client';
import {ChakraProvider} from '@chakra-ui/react';

import App from './App';
import './index.css';
import {ApolloProvider} from "@apollo/client";
import {client} from "./apollo/client";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<ChakraProvider>
			<ApolloProvider client={client}>
				<App/>
			</ApolloProvider>
		</ChakraProvider>
	</React.StrictMode>
);
