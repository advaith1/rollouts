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
		string | null, // hash key
		number, // revision
		Population[], // populations
		{ // overrides
			/** bucket */     b: number,
			/** server IDs */ k: string[]
		}[],
		[Population[]], // overrides formatted
		string | null, // holdout name
		number | null, // holdout bucket
		number, // aa mode
	]
}

export type Population = [
	[
		number, //bucket
		{ // rollout
			/** start */ s: number,
			/** end */   e: number
		}[]
	][],
	Filter[]
]

export enum FilterType {
	Feature = 1604612045,
	IDRange = 2404720969,
	MemberCount = 2918402255,
	ID = 3013771838,
	HubType = 4148745523,
	VanityURL = 188952590,
	RangeByHash = 2294888943
}

type FeatureFilter = [FilterType.Feature, [[number, string[]]]]
type IDRangeFilter = [FilterType.IDRange, [[number, number | null], [number, number]]]
type MemberCountFilter = [FilterType.MemberCount, [[number, number | null], [number, number]]]
type IDFilter = [FilterType.ID, [[number, string[]]]]
type HubTypeFilter = [FilterType.HubType, [[number, number[]]]]
type VanityURLFilter = [FilterType.VanityURL, [[FilterType.VanityURL, boolean]]]
type RangeByHashFilter = [FilterType.RangeByHash, [[number, number], [number, number]]]

export type Filter = FeatureFilter | IDRangeFilter | MemberCountFilter | IDFilter | HubTypeFilter | VanityURLFilter | RangeByHashFilter
