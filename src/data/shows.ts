// Shape mirrors what the GigSync backend produces (date, venue, city, time,
// ticket link), so swapping the data source doesn't require touching
// Shows.astro — see fetchShows() below.

export interface Show {
	date: string; // ISO date, e.g. "2026-09-14"
	time: string; // e.g. "8:00 PM"
	venue: string;
	city: string;
	ticketUrl?: string; // omit if tickets aren't on sale yet
}

// Placeholder/test data — NOT real confirmed shows. Used only as a fallback
// when the GigSync fetch below fails (backend not deployed yet, network
// hiccup during build, etc.) so a backend outage never breaks the site build.
const FALLBACK_SHOWS: Show[] = [
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

// GigSync (sibling repo `GigSync`) auto-populates this from forwarded
// gig-confirmation emails via Claude extraction — no manual entry.
// Live as of 2026-08-30 — the free *.workers.dev URL from the GigSync
// repo's deploy. GigSync returns a street `address`, not a bare city —
// passed straight through as `city` for now since Shows.astro just
// displays whatever string is there; revisit if that reads oddly once
// real addresses show up.
const GIGSYNC_API = "https://gigsync-backend.doug-rosenberg.workers.dev";
const GIGSYNC_CLIENT = "guacamayo";

interface GigSyncGig {
	date: string;
	time: string;
	venue: string;
	address: string;
}

// GigSync extracts dates from free-text emails, so a gig can arrive with an
// unparseable source date (e.g. "32-September,2026") — GigSync stores those
// as date: "" rather than guessing. Shows.astro parses `date` straight into
// an Intl.DateTimeFormat, which throws on an empty/invalid string and would
// take down the whole section, so invalid gigs are filtered out here instead
// of passed through — same "one bad record can't break the build" resilience
// as the fetch-failure fallback below, just for one bad item instead of the
// whole response.
function hasValidDate(gig: GigSyncGig): boolean {
	return gig.date !== "" && !Number.isNaN(new Date(`${gig.date}T00:00:00`).getTime());
}

async function fetchShows(): Promise<Show[]> {
	try {
		const res = await fetch(`${GIGSYNC_API}/gigs?client=${GIGSYNC_CLIENT}`, {
			signal: AbortSignal.timeout(5000),
		});
		if (!res.ok) throw new Error(`GigSync returned ${res.status}`);
		const data = (await res.json()) as { gigs: GigSyncGig[] };
		if (!data.gigs?.length) return FALLBACK_SHOWS;
		return data.gigs
			.filter((gig) => {
				if (hasValidDate(gig)) return true;
				console.warn(`[shows.ts] Skipping gig with invalid date ("${gig.date}"): ${gig.venue}`);
				return false;
			})
			.map((gig) => ({
				date: gig.date,
				time: gig.time,
				venue: gig.venue,
				city: gig.address,
			}));
	} catch (err) {
		console.warn("[shows.ts] GigSync fetch failed, using placeholder shows:", err);
		return FALLBACK_SHOWS;
	}
}

export const shows: Show[] = await fetchShows();
