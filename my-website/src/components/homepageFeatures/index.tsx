import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';
import getRandomTextFromData from '@site/src/util/getRandomTextFromData';
import Link from '@docusaurus/Link';

type FeatureItem = {
	title: string;
	Svg: React.ComponentType<React.ComponentProps<'svg'>>;
	description: JSX.Element;
	path: string;
};

const FeatureList: FeatureItem[] = [
	{
		title: 'Tech',
		Svg: require('@site/static/img/light-bulb-svgrepo-com.svg').default,
		description: <>科技文档保存</>,
		path: '/docs/intro',
	},
	{
		title: 'Blog',
		Svg: require('@site/static/img/blog-svgrepo-com.svg').default,
		description: <>记录一切内容</>,
		path: '/blog',
	},
	{
		title: 'Todo',
		Svg: require('@site/static/img/todo-svgrepo-com.svg').default,
		description: <>工作待定任务</>,
		path: '/todo/home',
	},
	{
		title: 'Backend',
		Svg: require('@site/static/img/data-storage-svgrepo-com.svg').default,
		description: <>后端文档保存</>,
		path: '/backendDocs/intro',
	},
	{
		title: 'Frontend',
		Svg: require('@site/static/img/smartphones-svgrepo-com.svg').default,
		description: <>前端文档保存</>,
		path: '/frontendDocs/intro',
	},
	{
		title: 'Todo everyDay',
		Svg: require('@site/static/img/todo-svgrepo-com.svg').default,
		description: <>待定</>,
		path: '/todo/home',
	},
];

function Feature({ title, Svg, description, path }: FeatureItem) {
	return (
		<div className={clsx('col col--4')}>
			<div className="text--center">
				<Svg className={styles.featureSvg} role="img" />
			</div>
			<div className="text--center padding-horiz--md">
				<Link className="button  button--info button--lg" to={path}>
					{title}
				</Link>
				<p>{description}</p>
			</div>
		</div>
	);
}

export default function HomepageFeatures(): JSX.Element {
	return (
		<section className={styles.features}>
			<div className="container">
				<div className="row">
					{FeatureList.map((props, idx) => (
						<Feature key={idx} {...props} />
					))}
				</div>
			</div>
		</section>
	);
}
