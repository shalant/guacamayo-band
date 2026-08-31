// Placeholder/test data — NOT real confirmed shows. Doug asked for dummy
// gig dates to test the Shows layout. Shape mirrors what a future
// email-to-calendar sync service would produce (date, venue, city, time,
// ticket link), so swapping this static array for a real data source
// later shouldn't require touching Shows.astro.

export interface Show {
	date: string; // ISO date, e.g. "2026-09-14"
	time: string; // e.g. "8:00 PM"
	venue: string;
	city: string;
	ticketUrl?: string; // omit if tickets aren't on sale yet
}

export const shows: Show[] = [
	{
		date: "2026-09-14",
		time: "8:00 PM",
		venue: "Reggies Chicago",
		city: "Chicago, IL",
		ticketUrl: "#",
	},
	{
		date: "2026-09-27",
		time: "9:00 PM",
		venue: "Sleeping Village",
		city: "Chicago, IL",
		ticketUrl: "#",
	},
	{
		date: "2026-10-11",
		time: "7:30 PM",
		venue: "Golden Dagger",
		city: "Chicago, IL",
	},
	{
		date: "2026-10-24",
		time: "8:30 PM",
		venue: "Beat Kitchen",
		city: "Chicago, IL",
		ticketUrl: "#",
	},
	{
		date: "2026-11-08",
		time: "6:00 PM",
		venue: "SPACE",
		city: "Evanston, IL",
		ticketUrl: "#",
	},
];
