export interface Experiment { 
	data: {
		id: string
		type: 'guild'
		title: string
		description: string[]
		buckets: number[]
		hash: number
	}
	rollout: [
		number, // hash
		null,
		number,
		[ // populations
			[
				number, //bucket
				{ // rollout
					/** start */ s: number,
					/** end */   e: number
				}[]
			][],
			Filter[]
		][],
		{ // overrides
			/** bucket */     b: number,
			/** server IDs */ k: string[]
		}[]
	]
}

export enum FilterType {
	Feature = 1604612045,
	ID = 2404720969,
	MemberCount = 2918402255,
	HubType = 4148745523
}

type FeatureFilter = [FilterType.Feature, [[number, string[]]]]
type IDFilter = [FilterType.ID, [[number, number | null], [number, number]]]
type MemberCountFilter = [FilterType.MemberCount, [[number, number | null], [number, number]]]
type HubTypeFilter = [FilterType.HubType, [[number, number[]]]]

export type Filter = FeatureFilter | IDFilter | MemberCountFilter | HubTypeFilter
