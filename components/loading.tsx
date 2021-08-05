import { useEffect, useState } from "react"

export default function Loading() {
	const [count, setCount] = useState(1)

	useEffect(() => {
		const interval = setInterval(() => setCount(count => count === 3 ? 1 : count + 1), 200)
		return () => clearInterval(interval)
	}, [])

	return <span style={{fontSize: '4rem'}}>Loading{'.'.repeat(count)}</span>
}
