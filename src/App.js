import React from 'react';
import connect from '@vkontakte/vkui-connect';
import { View, Epic, Tabbar, TabbarItem, Panel, PanelHeader, Spinner } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import Icon28ChatsOutline from '@vkontakte/icons/dist/28/chats_outline';
import Icon28ListOutline from '@vkontakte/icons/dist/28/list_outline';
import Icon24Settings from '@vkontakte/icons/dist/24/settings';

import Home from './panels/Home';
import SERVER_URL from './panels/Params'

class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			activePanel: 'home',
			activeStory: 'chat',
		};

		this.setHistory = this.setHistory.bind(this);
	}

	async setHistory(response) {
		var json = await response.json();
		this.setState({history: json.dialog});
	}

	componentDidMount() {
		const urlParams = window.location.search;
		fetch(SERVER_URL + 'dialog' + urlParams).then(response => {this.setHistory(response)});
	}

	renderHome() {
		if (this.state.history == null) {
			return <Panel id="home"><Spinner size="large" style={{ marginTop: 50 }} /></Panel>;
		}
		return <Home id="home" history={this.state.history}/>
	}

	render() {
		return <View id="chat" activePanel={this.state.activePanel}>
							{this.renderHome()}
					</View>
	}
}

export default App;
