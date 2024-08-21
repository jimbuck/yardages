
const STANDARD_CLUBS = [
	{
		name: 'Driver',
	},
	{
		name: '3 Wood',
	},
	{
		name: '5 Wood',
	},
	{
		name: '7 Wood',
	},
	{
		name: '2 Hybrid',
	},
	{
		name: '3 Hybrid',
	},
	{
		name: '4 Hybrid',
	},
	{
		name: '5 Hybrid',
	},
	{
		name: '2 Iron',
	},
	{
		name: '3 Iron',
	},
	{
		name: '4 Iron',
	},
	{
		name: '5 Iron',
	},
	{
		name: '6 Iron',
	},
	{
		name: '7 Iron',
	},
	{
		name: '8 Iron',
	},
	{
		name: '9 Iron',
	},
	{
		name: 'Pitching Wedge',
	},
	{
		name: '48 Degree',
	},
	{
		name: 'Gap Wedge',
	},
	{
		name: '52 Degree',
	},
	{
		name: 'Sand Wedge'
	},
	{
		name: '56 Degree',
	},
	{
		name: 'Lob Wedge',
	},
	{
		name: '60 Degree',
	},
] as const;

export type ClubName = typeof STANDARD_CLUBS[number]['name'];

export interface Club {
	name: string;
	carry?: number;
	total?: number;
}

export interface GolfBag {
	name: string;
	clubs: Club[];
}