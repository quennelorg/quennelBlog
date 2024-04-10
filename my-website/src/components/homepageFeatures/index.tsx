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
		title: 'Tech everyone',
		Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
		description: <>Tech everyone.</>,
		path: '/docs/intro',
	},
	{
		title: 'Blog everything',
		Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
		description: <>Blog everything.</>,
		path: '/blog',
	},
	{
		title: 'Todo everyDay',
		Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
		description: <>Todo everyDay.</>,
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
				<Link className="button button--secondary button--lg" to={path}>
					{title}
				</Link>
				{/*<p>{description}</p>*/}
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
