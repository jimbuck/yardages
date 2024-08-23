
export const STANDARD_CLUBS = [
	{
		name: 'Driver',
		averageCarry: 220,
	},
	{
		name: '3 Wood',
		averageCarry: 205,
	},
	{
		name: '5 Wood',
		averageCarry: 195,
	},
	{
		name: '3 Hybrid',
		averageCarry: 191,
	},
	{
		name: '2 Iron',
		averageCarry: 190,
	},
	{
		name: '4 Hybrid',
		averageCarry: 181,
	},
	{
		name: '3 Iron',
		averageCarry: 180,
	},
	{
		name: '5 Hybrid',
		averageCarry: 171,
	},
	{
		name: '4 Iron',
		averageCarry: 170,
	},
	{
		name: '5 Iron',
		averageCarry: 160,
	},
	{
		name: '6 Iron',
		averageCarry: 150,
	},
	{
		name: '7 Iron',
		averageCarry: 140,
	},
	{
		name: '8 Iron',
		averageCarry: 130,
	},
	{
		name: '9 Iron',
		averageCarry: 115,
	},
	{
		name: 'Pitching Wedge',
		averageCarry: 105,
	},
	{
		name: 'Gap Wedge',
		averageCarry: 95,
	},
	{
		name: 'Sand Wedge',
		averageCarry: 80,
	},
	{
		name: 'Lob Wedge',
		averageCarry: 70,
	},
] as const;

export type ClubName = typeof STANDARD_CLUBS[number]['name'];

export interface Club {
	id: string;
	name: string;
	carry?: number;
	total?: number;
}

export interface GolfBag {
	id: string;
	name: string;
	clubs: Club[];
}