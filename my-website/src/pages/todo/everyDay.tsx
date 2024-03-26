import clsx from 'clsx';
import React from 'react';
import Layout from '@theme/Layout';
import Admonition from '@theme/Admonition';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from '@site/src/pages/index.module.css';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import getRandomTextFromData from '@site/src/util/getRandomTextFromData';
import { TODOLIST } from '@site/src/model/TODOLIST';
import TodoFeature from '@site/src/components/TodoFeature/main';

export default function EveryDayTodoPage(): JSX.Element {
	const { siteConfig } = useDocusaurusContext();
	return (
		<Layout title={`DO TO ${siteConfig.title}`}>
			<Header />
			<main>
				<TodoFeature />
			</main>
		</Layout>
	);
}

function Header() {
	const { siteConfig } = useDocusaurusContext();
	const todoTitles: [] = siteConfig.customFields.todoTitles as [];
	const storeValue = () => {
		const text = '123';
		TODOLIST.push(text);
	};
	const getValue = () => {
		console.log(TODOLIST);
	};
	const inputValue: string = '';
	const addTodo = () => {};
	return (
		<header className={clsx('hero hero--primary', styles.heroBanner)}>
			<div className="container">
				<Admonition type="tip" icon="💡💡💡" title="只能记录每日TODO">
					<h3>{getRandomTextFromData(todoTitles)}</h3>
					<h4></h4>
				</Admonition>
				<a className="button button--secondary button--lg" onClick={storeValue}>
					store value
				</a>
				<a className="button button--secondary button--lg" onClick={getValue}>
					get value
				</a>
				<input type="text" name="name" value={inputValue} onChange={addTodo} />
			</div>
		</header>
	);
}
