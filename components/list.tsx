import { useEffect } from 'react'
import useSWR from 'swr'
import { Experiment as Exp } from '../experiment'
import Experiment from './experiment'
import Loading from './loading'

export default function List() {
	const { data, error } = useSWR<Exp[]>('https://rollouts.advaith.workers.dev', input => fetch(input).then(res => res.json()))

	useEffect(() => document.getElementById(location.hash.substring(1))?.scrollIntoView(), [data])

	if (error) return <span style={{fontSize: '4rem'}}>An error occurred :(</span>
	if (!data) return <Loading />
	return <>{data.sort((a, b) => b.data.id.localeCompare(a.data.id)).map(exp => <Experiment key={exp.data.id} exp={exp} />)}</>
}
