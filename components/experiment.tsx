import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { Experiment as Exp, Filter, FilterType, Population } from '../experiment'

const swal = withReactContent(Swal)
const andList = new Intl.ListFormat('en')
const orList = new Intl.ListFormat('en', { type: 'disjunction' })

const hubTypes = ['Default', 'High School', 'College']

function Population({ population, data }: { population: Population, data: Exp['data'] }) {
	let popTotal = 0
	return <div style={{background: '#202225', padding: '.5rem', marginBottom: '.25rem', borderRadius: '2px'}}>
		{population[1][0] && <>
			<p style={{fontSize: '.9rem', margin: 0}}>Filter: {andList.format(population[1].map(f => parseFilter(f)))}</p>
			<hr style={{border: 0, height: '1px', background: '#2f3136'}}/>
		</>}
		{population[0].map(bucket => <div key={bucket[0]} style={{color: bucket[0] > 0 ? '#46c46e' : '#ed4245'}}>
			{data.description.find(d => d.startsWith(`Treatment ${bucket[0]}`)) ?? (bucket[0] === -1 ? 'None' : `Unknown Treatment ${bucket[0]}`)}:{' '}
			<strong>{(() => {
				const sum = bucket[1].reduce((total, range) => total + range.e - range.s, 0)
				popTotal += sum
				return sum
			})() / 100}%</strong>{` `}
			({bucket[1].map(range => `${range.s} - ${range.e}`).join(', ')})
		</div>)}
		<div style={{color: '#ed4245'}}>{popTotal < 10_000 && <>{data.description[0]}: <strong>{(10_000 - popTotal)/100}%</strong></>}</div>
	</div>
}

export default function Experiment({exp}: {exp: Exp}) {
	return <div style={{background: '#2f3136', marginBottom: '.5rem', textAlign: 'left', width: '800px', padding: '1rem', borderRadius: '3px', maxWidth: '100%'}} key={exp.data.id} id={exp.data.id}>
		<h2 style={{fontSize: '1.5rem', marginTop: '5px', marginBottom: '5px'}}>
			<a href={`#${exp.data.id}`} className="name-link">{exp.data.title}</a>
		</h2>
		<p style={{fontSize: '.9rem'}}>{exp.data.id}</p>
		<div>
			{exp.rollout[3].map((pop, i) => <Population key={i} population={pop} data={exp.data}/>)}
		</div>
		{exp.rollout[5].length ? <>
			<p style={{fontSize: '.8rem', marginBottom: '.5rem'}}>Overrides Formatted:</p>
			{exp.rollout[5].flat().map((pop, i) => <Population key={i} population={pop} data={exp.data}/>)}
		</> : null}
		<button onClick={() => swal.fire({
			title: exp.data.title,
			html: <>
				<p style={{fontSize: '.9rem'}}>ID: {exp.data.id} ({exp.rollout[0]})</p>
				{exp.rollout[1] ? <p style={{fontSize: '.9rem'}}>Hash Key: {exp.rollout[1]}</p> : null}
				<p style={{fontSize: '.9rem'}}>Revision {exp.rollout[2]}</p>
				{exp.data.buckets.map(b =>
					<div key={b}>
						<p style={{marginBottom: '.5rem'}}>{b ? exp.data.description.find(d => d.startsWith(`Treatment ${b}`)) : exp.data.description[0]}</p>
						{exp.rollout[4].find(r => r.b === b) && <details style={{fontSize: '.9rem'}}>
							<summary style={{cursor: 'pointer'}}>{exp.rollout[4].find(r => r.b === b).k.length} Override{exp.rollout[4].find(r => r.b === b).k.length === 1 ? '' : 's'}</summary>
							{exp.rollout[4].find(r => r.b === b).k.map(id => <p key={id} style={{margin: '.25rem 0 .25rem .4rem'}}>{id}</p>)}
						</details>}
					</div>
				)}
			</>,
			background: '#2f3136',
			width: 600,
			confirmButtonColor: '#5865f2'
		})}>Experiment Details</button>

		<style jsx>{`
			.name-link {
				color: white;
				text-decoration: none;
			}

			.name-link:hover {
				text-decoration: underline;
			}

			button {
				background: #5865f2;
				border: 0;
				padding: 5px 10px;
				color: white;
				cursor: pointer;
				border-radius: 3px;
				margin-top: .5rem;
				font-size: .85rem;
			}

			button:hover {
				background: #4752c4;
			}

			button:active {
				background: #3c45a5;
			}
		`}</style>
	</div>
}

const parseFilter = (f: Filter) => {
	if (f[0] === FilterType.Feature) return `Server has feature ${orList.format(f[1][0][1])}`
	if (f[0] === FilterType.IDRange) return `Server ID is in range ${f[1][0][1] ?? 0} - ${f[1][1][1]}`
	if (f[0] === FilterType.MemberCount) return `Server member count is ${f[1][1][1] ? `in range ${f[1][0][1] ?? 0} - ${f[1][1][1]}` : `${f[1][0][1]}+`}`
	if (f[0] === FilterType.ID) return `Server ID is ${orList.format(f[1][0][1])}`
	if (f[0] === FilterType.HubType) return `Server hub type is ${orList.format(f[1][0][1].map(t => hubTypes[t]))}`
	if (f[0] === FilterType.VanityURL) return `Server ${f[1][0][1] ? 'has' : 'does not have'} a vanity URL`
	if (f[0] === FilterType.RangeByHash) return `${f[1][1][1]/100}% of servers (hash key ${f[1][0][1]}, target ${f[1][1][1]})`
	return `Unknown filter type ${f[0]}`
}
