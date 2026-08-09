## The problem is not starting

Most self-directed developers do not need another list of courses. They need a reliable next action after the initial excitement fades.

Commit started with that observation. The product treats a study session as a commit, progress as a contribution graph, and course completion as merging to main. The metaphor is useful only if it changes the workflow, so the product keeps the loop small:

1. Log the session.
2. See what is next.
3. Get pacing feedback.
4. Return tomorrow with context intact.

## One model, several surfaces

The roadmap, streak, XP, badges and email digest all read from the same progress model. That matters because a feature that invents its own definition of progress eventually gives the learner conflicting signals.

The dashboard can be encouraging without becoming noisy. A streak is a record of returning, not a punishment for missing a day. An ETA is guidance, not a promise.

## Local development and production

Commit uses SQLite locally and PostgreSQL in production behind the same application model. The important decision is not the database brand. It is keeping the domain model stable while the environment changes, so a local development workflow does not become a second product.

## What I learned

The product became clearer when every screen answered one question: what useful action should happen next? That constraint improved the interface, the data model and the copy at the same time.
