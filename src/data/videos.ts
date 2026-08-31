// The band's 6 real promo shorts (from Javier Saume's channel, @javchisau).
// Titles are fetched at build time from YouTube's public oEmbed endpoint —
// no API key needed, no scraping, an officially documented endpoint meant
// for exactly this (embedding metadata for a known video URL). Falls back
// to a generic label per-video if a single fetch fails, so one bad request
// can't break the whole build — same resilience pattern as shows.ts.

export interface VideoTrack {
	id: string;
	title: string;
	/** Our own short description, not YouTube's title — all 6 videos are
	 * literally titled "GUACAMAYO" on the channel, which doesn't help
	 * anyone tell them apart in a list. Most are our own visual description
	 * from actually watching each clip; "pUUw3akwihE" is Doug's own
	 * correction (the real song being played, not just what's on screen) —
	 * worth asking him for the real song titles on the rest too, rather
	 * than leaving them as guessed visual descriptions. Omitted (not
	 * guessed) for the one clip that never successfully loaded during
	 * that review. */
	caption?: string;
}

// prettier-ignore
const CAPTIONS: Record<string, string> = {
	"KGx6Zwm1Dsg": "Live, beachside set",
	"-4trKHWWudA": "Animated logo intro",
	// "3W4F4VmI0tQ" intentionally has no caption — never successfully
	// watched it (got stuck buffering both times), not guessing at content.
	"pUUw3akwihE": "Cantaloupe Island", // Doug's correction — the real song, not a visual description
	"Flnw1t7SzDI": "Isn't She Lovely", // Doug's correction — the real song, not a visual description
	"6cZyB4y2flA": "Cantaloupe Island — Melody", // Doug's correction — the real song/section, not a visual description
};

const VIDEO_IDS = ["KGx6Zwm1Dsg", "-4trKHWWudA", "3W4F4VmI0tQ", "pUUw3akwihE", "Flnw1t7SzDI", "6cZyB4y2flA"];

async function fetchTitle(id: string): Promise<string> {
	try {
		const url = `https://www.youtube.com/oembed?url=${encodeURIComponent(`https://www.youtube.com/watch?v=${id}`)}&format=json`;
		const res = await fetch(url, { signal: AbortSignal.timeout(5000) });
		if (!res.ok) throw new Error(`oEmbed ${res.status} for ${id}`);
		const data = (await res.json()) as { title?: string };
		return data.title?.trim() || "Guacamayo — Live Clip";
	} catch (err) {
		console.warn(`[videos.ts] oEmbed fetch failed for ${id}, using fallback title:`, err);
		return "Guacamayo — Live Clip";
	}
}

export const tracks: VideoTrack[] = await Promise.all(
	VIDEO_IDS.map(async (id) => ({ id, title: await fetchTitle(id), caption: CAPTIONS[id] })),
);
