import React from 'react';
import PropTypes from 'prop-types';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import Button from '@vkontakte/vkui/dist/components/Button/Button';
import Group from '@vkontakte/vkui/dist/components/Group/Group';
import Div from '@vkontakte/vkui/dist/components/Div/Div';
import Avatar from '@vkontakte/vkui/dist/components/Avatar/Avatar';
import List from '@vkontakte/vkui/dist/components/List/List'
import FormLayout from '@vkontakte/vkui/dist/components/FormLayout/FormLayout'
import Textarea from '@vkontakte/vkui/dist/components/Textarea/Textarea'
import Card from '@vkontakte/vkui/dist/components/Card/Card'
import CardGrid from '@vkontakte/vkui/dist/components/CardGrid/CardGrid'
import Input from '@vkontakte/vkui/dist/components/Input/Input'
import Separator from '@vkontakte/vkui/dist/components/Separator/Separator'
import Alert from '@vkontakte/vkui/dist/components/Alert/Alert'
import Cell from '@vkontakte/vkui/dist/components/Cell/Cell'
import Icon24Send from '@vkontakte/icons/dist/24/send';
import Icon24ArrowUturnLeftOutline from '@vkontakte/icons/dist/24/arrow_uturn_left_outline';
import Icon24Cancel from '@vkontakte/icons/dist/24/cancel';
import SERVER_URL from './Params'
import ReactDOM from 'react-dom'
import {FixedLayout} from '@vkontakte/vkui'
import { Tooltip} from '@vkontakte/vkui';
import { PanelSpinner, ScreenSpinner, Spinner } from '@vkontakte/vkui';

class Home extends React.Component {
	constructor(props) {
		 super();
		 this.props = props
		 console.log(this.props)
		 this.get_chat_history = this.get_chat_history.bind(this);
		 this.state = {history: this.get_chat_history()}
	}

	get_chat_history() {
		var last_dialog = this.props.history;
		var formatted_list = [];
		for (var i = 0; i < last_dialog.length; i += 1) {
			formatted_list.push({'text': last_dialog[i], 'actor': i % 2})
		}
		console.log('last_dialog ' + formatted_list);
		return formatted_list
	}

	message2Cell(message) {
		if (message['actor'] == 0) {
			return <Cell multiline before={<Avatar src={require("../img/communicabio.svg")}/>}>
								{message['text']}
							</Cell>
		} else {
			return <Cell multiline>{message['text']}</Cell>
		}
	}

	componentDidMount() {
		const script = document.createElement('script');
		script.text = 'VK.Widgets.Auth("vk_auth", {"authUrl":"/app", "width": 300})'
		script.async = true;
 		document.body.appendChild(script);
	}

	chatRender() {
		return <Panel id={this.props.id}>
			<PanelHeader>Communicabio</PanelHeader>
			<Div><div id="vk_auth"></div></Div>
			<Div id="chat-parent">
					{this.state['history'].map(message =>
						<Card mode={{0: "shadow", 1: "tint"}[message['actor']]} size='l'>
							{this.message2Cell(message)}
						 </Card>
					)}
			</Div>
		</Panel>
	}

  render() {
		console.log('home-render')
		console.log(this.props);
		//console.log(this.state.popout == null)
		/*this.history = [{'text': "dddgggg", "actor": 1, "mistakes": [{"metric": "m", "word": "w"}]}];
		return this.renderFeedbackPanel()*/

		if (this.state.popout == null) {
			return this.chatRender();
		} else {
			if (this.state.popout === "feedback") {
				return this.renderFeedbackPanel();
			}
			if (this.state.popout === "loading") {
				return this.loadigRender();
			}
			return this.state.popout;
		}
	}
}

/*Home.propTypes = {
	id: PropTypes.string.isRequired,
	go: PropTypes.func.isRequired,
	fetchedUser: PropTypes.shape({
		photo_200: PropTypes.string,
		first_name: PropTypes.string,
		last_name: PropTypes.string,
		city: PropTypes.shape({
			title: PropTypes.string,
		}),
	}),
	token: PropTypes.string.isRequired
};*/

export default Home;
