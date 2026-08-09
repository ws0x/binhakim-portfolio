## Tenant isolation is a database responsibility

Orbit stores professional relationships for multiple accounts. That makes tenant isolation a correctness property, not a feature that can safely depend on every future query remembering one extra filter.

## The application is not the final boundary

Application code still scopes queries, but PostgreSQL row-level security is the deeper guarantee. If a future endpoint forgets a filter, the database policy remains the last line between one tenant and another tenant's records.

That does not make security automatic. Policies need tests, migrations need review, and privileged operations need explicit paths. It does make the intended boundary executable.

## Search without hiding ordinary workflows

Orbit combines structured contacts with semantic search and a relationship graph. The search layer is useful when a keyword is not enough, but ordinary filters remain available because users need predictable ways to inspect and correct their own data.

## The practical lesson

Security decisions are strongest when they are visible in the data model. A future contributor should be able to discover the isolation rule by reading the schema and policies, not by memorising a convention hidden in a controller.
