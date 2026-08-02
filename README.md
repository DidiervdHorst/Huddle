# huddle

A visual prototype for **Huddle** — the app that makes meeting up with friends feel effortless again.

Built with React, TypeScript, Tailwind CSS, and Framer Motion. Styled as a premium lifestyle-brand mobile app: soft animated gradients, glassmorphism, rounded corners, hand-drawn line illustrations, and playful micro-animations. All data is mocked — there's no backend, auth, or persistence.

## Philosophy

Huddle removes social friction. Nothing is an "event" or an "invite" — everything is a Huddle. Responding is always **I'm in / Maybe / Not this time**, never a reason required, and a host only ever sees who's joining — declines stay invisible. Friends who are already busy at a chosen time simply appear greyed out when inviting, with no explanation.

## Screens

- **Home** — greeting, an "I'm free" Open Huddle shortcut, illustrated Activity Huddle starters, weather/event-based inspiration, a live friend feed, and upcoming Birthday & bigger Huddles
- **Calendar** — everything to look forward to as beautiful cards: date polls awaiting a vote, your upcoming Huddles, bigger moments with countdowns, and Birthday Huddles with one-tap suggestions (dinner, group gift, surprise party)
- **Huddles** — Huddles waiting on your response (with inline I'm in / Maybe / Not this time), what's live now, and recent activity
- **Profile** — interests, favorite activities, unlimited friend groups, and friends
- **Start a Huddle** — choose "I have an idea" (Activity Huddle) or "Just want company" (Open Huddle), optionally add a time, location, details, and who it's for
- **Huddle detail** — who created it, who's joining, and for bigger Huddles: a countdown, a date poll, and comments

## Run locally

```bash
npm install
npm run dev
```

The app renders inside a phone frame in the browser — best viewed at a mobile viewport width.
