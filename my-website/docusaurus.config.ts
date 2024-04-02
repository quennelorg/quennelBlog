import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
	title: 'QuennelCoder',
	tagline: 'Go everything!',
	favicon: 'img/cat.ico',

	// Set the production url of your site here
	url: 'https://quennelorg.github.io',
	// Set the /<baseUrl>/ pathname under which your site is served
	// For GitHub pages deployment, it is often '/<projectName>/'
	baseUrl: '/quennelBlog',

	// GitHub pages deployment config.
	// If you aren't using GitHub pages, you don't need these.
	organizationName: 'quennelOrg', // Usually your GitHub org/user name.
	projectName: 'quennelBlog', // Usually your repo name.
	trailingSlash: false,

	onBrokenLinks: 'throw',
	onBrokenMarkdownLinks: 'throw',

	// Even if you don't use internationalization, you can use this field to set
	// useful metadata like html lang. For example, if your site is Chinese, you
	// may want to replace "en" with "zh-Hans".
	i18n: {
		defaultLocale: 'zh-Hans',
		locales: ['zh-Hans', 'en'],
		path: 'i18n',
		localeConfigs: {
			'zh-Hans': {
				label: '中文',
			},
			en: {
				label: 'English',
				path: 'en',
			},
		},
	},
	themes: [
		[
			require.resolve('@easyops-cn/docusaurus-search-local'),
			/** @type {import("@easyops-cn/docusaurus-search-local").PluginOptions} */
			{
				// ... Your options.
				// `hashed` is recommended as long-term-cache of index file is possible.
				hashed: true,
				// For Docs using Chinese, The `language` is recommended to set to:
				// ```
				language: ['en', 'zh'],
				// ```
			},
		],
	],
	presets: [
		[
			'classic',
			{
				docs: {
					sidebarPath: './sidebars.ts',
				},
				blog: {
					showReadingTime: true,
					blogSidebarTitle: 'All posts', // default: Recent posts
					blogSidebarCount: 'ALL', // default: 5
				},
				theme: {
					customCss: './src/css/custom.css',
				},
			} satisfies Preset.Options,
		],
	],

	plugins: [
		[
			'@docusaurus/plugin-content-docs',
			{
				id: 'community',
				path: 'community',
				routeBasePath: 'community',
				sidebarPath: './sidebarsCommunity.js',
				// ... other options
			},
		],
	],

	themeConfig: {
		// Replace with your project's social card
		image: 'img/docusaurus-social-card.jpg',
		navbar: {
			title: 'QuennelCoder',
			logo: {
				alt: 'Quennel Cat',
				src: 'img/cat.svg',
			},
			items: [
				{
					type: 'docSidebar',
					sidebarId: 'techSidebar',
					position: 'left',
					label: 'Tech',
				},
				{ to: '/blog', label: 'Blog', position: 'left' },
				{ to: '/todo/home', label: 'Todo', position: 'left' },
				{
					href: 'https://github.com/Quennel-coder',
					// label: 'GitHub',
					position: 'right',
					'aria-label': 'GitHub repository',
					className: 'navbar__icon navbar__github',
					html: '<i class="fa fa-github"></i>',
				},
				{
					type: 'localeDropdown',
					position: 'right',
				},
			],
		},
		footer: {
			style: 'dark',
			links: [
				{
					title: 'Docs',
					items: [
						{
							label: 'Tech',
							to: '/docs/intro',
						},
					],
				},
				{
					title: 'Community',
					items: [
						{
							label: 'Stack Overflow',
							href: 'https://stackoverflow.com/questions/tagged/docusaurus',
						},
						{
							label: 'Discord',
							href: 'https://discordapp.com/invite/docusaurus',
						},
						{
							label: 'Twitter',
							href: 'https://twitter.com/docusaurus',
						},
					],
				},
				{
					title: 'Personal',
					items: [
						{
							label: 'Todo',
							to: '/todo/home',
						},
					],
				},
				{
					title: 'More',
					items: [
						{
							label: 'GitHub',
							href: 'https://github.com/Quennel-coder',
						},
					],
				},
			],
			copyright: `Copyright © ${new Date().getFullYear()} Quennel-Coder, Inc. Built with Docusaurus.`,
		},
		prism: {
			theme: prismThemes.github,
			darkTheme: prismThemes.dracula,
		},
	} satisfies Preset.ThemeConfig,

	customFields: {
		greetings: [
			'The shortest way to do many things is to only one thing at a time ',
			'Be cheerful and hopeful',
			'Treat yourself well',
			'Spend your life in your own way',
			'It’s up to you how far you’ll go',
			'The first step is as good as half over',
			'Time waits for no one. Treasure every moment you have',
		],
		todoTitles: ['完不成任务，就别想睡觉', '不能偷懒，不能偷懒'],
	},
};

export default config;
