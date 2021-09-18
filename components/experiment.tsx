import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { Experiment as Exp, Filter, FilterType } from '../experiment'

const swal = withReactContent(Swal)
const list = new Intl.ListFormat()

export default function Experiment({exp}: {exp: Exp}) {
	return <div style={{background: '#2f3136', marginBottom: '.5rem', textAlign: 'left', width: '800px', padding: '1rem', borderRadius: '3px', maxWidth: '100%'}} key={exp.data.id}>
		<h2 style={{fontSize: '1.5rem', marginTop: '5px', marginBottom: '5px'}}>{exp.data.title}</h2>
		<p style={{fontSize: '.9rem'}}>{exp.data.id}</p>
		<div>
			{exp.rollout[3].map((population, i) => <div key={i} style={{background: '#202225', padding: '.5rem', marginBottom: '.25rem', borderRadius: '2px'}}>
				{population[1][0] && <>
					<p style={{fontSize: '.9rem', margin: 0}}>Filter: {list.format(population[1].map(f => parseFilter(f)))}</p>
					<hr style={{border: 0, height: '1px', background: '#2f3136'}}/>
				</>}
				{population[0].map(bucket => <div key={bucket[0]}>
					{exp.data.description.find(d => d.startsWith(`Treatment ${bucket[0]}`)) ?? 'None'}:{' '}
						{bucket[1].reduce((total, range) => total + range.e - range.s, 0)/100}%
						({bucket[1].map(range => `${range.s} - ${range.e}`).join(', ')})
				</div>)}
			</div>)}
		</div>
		<button onClick={() => swal.fire({
			title: exp.data.title,
			html: <>{exp.data.buckets.map(b => 
				<div key={b}>
					<p style={{marginBottom: '.5rem'}}>{exp.data.description.find(d => d.startsWith(`Treatment ${b}`))}</p>
					{exp.rollout[4].find(r => r.b === b) && <details style={{fontSize: '.9rem'}}>
						<summary style={{cursor: 'pointer'}}>{exp.rollout[4].find(r => r.b === b).k.length} Override{exp.rollout[4].find(r => r.b === b).k.length === 1 ? '' : 's'}</summary>
						{exp.rollout[4].find(r => r.b === b).k.map(id => <p key={id} style={{margin: '.25rem 0 .25rem .4rem'}}>{id}</p>)}
					</details>}
				</div>
			)}</>,
			background: '#2f3136',
			width: 600,
			confirmButtonColor: '#5865f2'
		})}>Experiment Details</button>

		<style jsx>{`
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
	if (f[0] === FilterType.Feature) return `Server has feature${f[1][0][1].length > 1 ? 's' : ''} ${list.format(f[1][0][1])}`
	if (f[0] === FilterType.ID) return `Server ID is in range ${f[1][0][1] ?? 0} - ${f[1][1][1]}`
	if (f[0] === FilterType.MemberCount) return `Server member count is in range ${f[1][0][1] ?? 0} - ${f[1][1][1]}`
}
