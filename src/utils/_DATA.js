//Source: https://github.com/udacity/reactnd-project-would-you-rather-starter
//Modified by Abdelhady
/*
 * Changelog 25/10/2021:
 *  
 */

import { formatQuestion, generateUAvatar } from './helpers'

let users = {
	sarahedo: {
		id: 'sarahedo',
		name: 'Sarah Edo',
		avatarURL: generateUAvatar('sarahedo'),
		answers: {
			"8xf0y6ziyjabvozdd253nd": 'optionOne',
			"6ni6ok3ym7mf1p33lnez": 'optionTwo',
			"am8ehyc8byjqgar0jgpub9": 'optionTwo',
			"loxhs1bqm25b708cmbf3g": 'optionTwo'
		},
		questions: ['8xf0y6ziyjabvozdd253nd', 'am8ehyc8byjqgar0jgpub9'],
		password: '12345',
	},
	tylermcginnis: {
		id: 'tylermcginnis',
		name: 'Tyler McGinnis',
		avatarURL: generateUAvatar('tylermcginnis'),
		answers: {
			"vthrdm985a262al8qx3do": 'optionOne',
			"xj352vofupe1dqz9emx13r": 'optionTwo',
		},
		questions: ['loxhs1bqm25b708cmbf3g', 'vthrdm985a262al8qx3do'],
		password: '12345',
	},
	johndoe: {
		id: 'johndoe',
		name: 'John Doe',
		avatarURL: generateUAvatar('johndoe'),
		answers: {
			"xj352vofupe1dqz9emx13r": 'optionOne',
			"vthrdm985a262al8qx3do": 'optionTwo',
			"6ni6ok3ym7mf1p33lnez": 'optionTwo'
		},
		questions: ['6ni6ok3ym7mf1p33lnez', 'xj352vofupe1dqz9emx13r'],
		password: '12345',
	}
}

let questions = {
	"8xf0y6ziyjabvozdd253nd": {
		id: '8xf0y6ziyjabvozdd253nd',
		author: 'sarahedo',
		timestamp: 1467166872634,
		optionOne: {
			votes: ['sarahedo'],
			text: 'have horrible short term memory',
		},
		optionTwo: {
			votes: [],
			text: 'have horrible long term memory'
		}
	},
	"6ni6ok3ym7mf1p33lnez": {
		id: '6ni6ok3ym7mf1p33lnez',
		author: 'johndoe',
		timestamp: 1468479767190,
		optionOne: {
			votes: [],
			text: 'become a superhero',
		},
		optionTwo: {
			votes: ['johndoe', 'sarahedo'],
			text: 'become a supervillain'
		}
	},
	"am8ehyc8byjqgar0jgpub9": {
		id: 'am8ehyc8byjqgar0jgpub9',
		author: 'sarahedo',
		timestamp: 1488579767190,
		optionOne: {
			votes: [],
			text: 'be telekinetic',
		},
		optionTwo: {
			votes: ['sarahedo'],
			text: 'be telepathic'
		}
	},
	"loxhs1bqm25b708cmbf3g": {
		id: 'loxhs1bqm25b708cmbf3g',
		author: 'tylermcginnis',
		timestamp: 1482579767190,
		optionOne: {
			votes: [],
			text: 'be a front-end developer',
		},
		optionTwo: {
			votes: ['sarahedo'],
			text: 'be a back-end developer'
		}
	},
	"vthrdm985a262al8qx3do": {
		id: 'vthrdm985a262al8qx3do',
		author: 'tylermcginnis',
		timestamp: 1489579767190,
		optionOne: {
			votes: ['tylermcginnis'],
			text: 'find $50 yourself',
		},
		optionTwo: {
			votes: ['johndoe'],
			text: 'have your best friend find $500'
		}
	},
	"xj352vofupe1dqz9emx13r": {
		id: 'xj352vofupe1dqz9emx13r',
		author: 'johndoe',
		timestamp: 1493579767190,
		optionOne: {
			votes: ['johndoe'],
			text: 'write JavaScript',
		},
		optionTwo: {
			votes: ['tylermcginnis'],
			text: 'write Swift'
		}
	},
}

export function _getUsers () {
	return new Promise((res, rej) => {
		setTimeout(() => res({...users}), 1000)
	})
}

export function _getQuestions () {
	return new Promise((res, rej) => {
		setTimeout(() => res({...questions}), 1000)
	})
}

export function _saveQuestion (question) {
	return new Promise((res, rej) => {
		const authedUser = question.author;
		const formattedQuestion = formatQuestion(question);

		setTimeout(() => {
			questions = {
				...questions,
				[formattedQuestion.id]: formattedQuestion
			}
			
			users = {
				...users,
				[authedUser]: {
					...users[authedUser],
					questions: users[authedUser].questions.concat([formattedQuestion.id])
				}
			}

			res(formattedQuestion)
		}, 1000)
	})
}

export function _saveQuestionAnswer ({ authedUser, qid, answer }) {
	return new Promise((res, rej) => {
		setTimeout(() => {
			let answers = {}
			if (Object.keys(users[authedUser].answers).includes(qid)) {
				for (const [key, value] of Object.entries(users[authedUser].answers)) {
					if (key !== qid) {
						answers = Object.assign(answers, { [key]: value })
					}
				}
			} else {
				answers = Object.assign(answers, { ...users[authedUser].answers, [qid]: answer })
			}

			users = {
				...users,
				[authedUser]: {
					...users[authedUser],
					answers,
				}
			}

			questions = {
				...questions,
				[qid]: {
					...questions[qid],
					[answer]: {
						...questions[qid][answer],
						votes: questions[qid][answer].votes.includes(authedUser) === false ? questions[qid][answer].votes.concat([authedUser]) :
						questions[qid][answer].votes.filter((voter) => voter !== authedUser)
					}
				}
			}

			res()
		}, 500)
	})
}

export function _authenticateUser({ user, password }) {
	return new Promise((res, rej) => setTimeout(() => res(
			Object.keys(users).includes(user) && users[user].password === password
		), 500)
	)
}

export function _saveUser({ id, name, password }) {
	return new Promise((res, rej) => setTimeout(() => {
		const newUser = {
			[id]: {
				id,
				name,
				avatarURL: generateUAvatar(id),
				answers: {},
				questions: [],
				password,
			}	
		}
		users = Object.assign(users, newUser)
		res(newUser[id])
	}, 500)
	)
}