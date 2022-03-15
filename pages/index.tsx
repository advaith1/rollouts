import Head from 'next/head'
import List from '../components/list'

export default function Home() {
	return (
		<div className="container">
			<Head>
				<title>Discord Server Experiment Rollouts</title>
				<meta name="description" content="Lists Discord's server experiments and their current rollouts, treatments, and overrides." />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
			</Head>

			<main>
				<h1 className="title">
					Discord Server Experiment Rollouts
				</h1>

				<List/>

			</main>

			<footer>
				Created by <a href="https://advaith.io" target="_blank" rel="noopener">advaith</a><br />
				Not affiliated with Discord
			</footer>

			<style jsx>{`
				.container {
					min-height: 100vh;
					padding: 0 0.5rem;
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;
				}

				main {
					padding: 5rem 0;
					flex: 1;
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;
				}

				footer {
					width: 100%;
					height: 100px;
					justify-content: center;
					align-items: center;
				}

				footer a:hover {
					text-decoration: underline;
				}

				a {
					color: inherit;
					text-decoration: none;
				}

				.title {
					margin: 0;
					line-height: 1.15;
					font-size: 4rem;
					margin-bottom: 2rem;
				}

				.title, footer {
					text-align: center;
				}

				* {
					max-width: 100%;
				}

				@media (max-width: 768px) {
					.title {
						font-size: 3rem;
					}
				}
			`}</style>

			<style jsx global>{`
				html,
				body {
					padding: 0;
					margin: 0;
					font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
						Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
						sans-serif;
					background: #36393f;
					color: white;
					scroll-behavior: smooth;
				}

				.swal2-title, .swal2-html-container {
					color: white !important;
				}

				.swal2-html-container {
					text-align: left !important;
				}

				* {
					box-sizing: border-box;
				}
			`}</style>
		</div>
	)
}
