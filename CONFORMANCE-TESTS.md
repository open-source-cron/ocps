# OCPS Conformance Test Vectors

**Status: DRAFT**

This document provides shared conformance test vectors for the OCPS version documents. The cases below are non-exhaustive, but they are intended to provide portable checks that implementations can use to validate behavior at each specification level without embedding the vectors directly in the spec text.

Unless otherwise stated, datetime examples use local wall-clock time.

## OCPS 1.0

Datetimes in this section use `YYYY-MM-DD HH:mm`.

| Purpose | Pattern | MUST match | MUST NOT match |
| :--- | :--- | :--- | :--- |
| Basic 5-field matching | `15 10 * * *` | `2025-03-10 10:15` | `2025-03-10 10:14` |
| Case-insensitive month and weekday names | `30 8 * jan Mon` | `2025-01-06 08:30` | `2025-02-03 08:30` |
| Step evaluation over an explicit range | `5-59/15 9 * * *` | `2025-03-10 09:05`, `2025-03-10 09:20`, `2025-03-10 09:35`, `2025-03-10 09:50` | `2025-03-10 09:15` |
| Restricted day-of-month and day-of-week use logical OR | `0 12 1 * MON` | `2025-10-01 12:00`, `2025-10-06 12:00` | `2025-10-07 12:00` |

Additional distinction for Section 6.1:

Only a literal leading `*` makes the `Day of Month` field unrestricted for this rule. A full-range expression such as `1-31` remains restricted, even though it covers every valid day of the month.

* `0 12 * * MON` MUST NOT match `2025-10-07 12:00`.
* `0 12 1-31 * MON` MUST match `2025-10-07 12:00`.

Parsing-only checks:

* `60 0 * * *` MUST be rejected as a parsing error.
* `0 0 10-5 * *` MUST be rejected as a parsing error.
* `0 0 /30 * *` MUST be rejected as a parsing error.
* `* * 31 2 *` MUST be accepted syntactically, even though no valid run time exists.

## OCPS 1.1

Datetimes in this section use `YYYY-MM-DD HH:mm`.

| Purpose | Pattern | MUST match | MUST NOT match |
| :--- | :--- | :--- | :--- |
| Yearly nickname | `@yearly` | `2026-01-01 00:00` | `2026-01-02 00:00` |
| Monthly nickname | `@monthly` | `2026-02-01 00:00` | `2026-02-02 00:00` |
| Weekly nickname | `@weekly` | `2025-10-05 00:00` | `2025-10-06 00:00` |
| Daily nickname | `@daily` | `2025-10-07 00:00` | `2025-10-07 00:01` |
| Hourly nickname | `@hourly` | `2025-10-07 10:00` | `2025-10-07 10:01` |

Additional parser and equivalence checks:

* `@daily` MUST match exactly the same datetimes as `0 0 * * *`.
* `@Daily` MUST be rejected because nicknames are case-sensitive.
* `@daily 0 0 * * *` MUST be rejected because a nickname cannot be combined with a field expression.
* `@reboot` MUST be accepted during parsing. Runtime conformance MUST be evaluated against a startup event rather than a datetime, and an implementation without such an event MAY reject it at runtime with a clear error.

## OCPS 1.2

Datetimes in this section use `YYYY-MM-DD HH:mm:ss`.

| Purpose | Pattern | MUST match | MUST NOT match |
| :--- | :--- | :--- | :--- |
| Five-field patterns still default seconds to `0` | `15 10 * * *` | `2025-03-10 10:15:00` | `2025-03-10 10:15:30` |
| Six-field patterns match explicit seconds | `30 15 10 * * *` | `2025-03-10 10:15:30` | `2025-03-10 10:15:29` |
| Seven-field patterns constrain the year | `0 15 10 * * * 2025` | `2025-03-10 10:15:00` | `2026-03-10 10:15:00` |
| Stepping over an explicit range beginning at the portable lower bound | `0 0 0 1 1 * 1970-2199/2` | `2026-01-01 00:00:00` | `2025-01-01 00:00:00` |

Additional parser checks:

* A compliant implementation MUST accept 5-field, 6-field, and 7-field patterns.
* `0 0 0 1 1 * 1969` is non-portable and MUST only be accepted by implementations that explicitly document a wider supported year range.

## OCPS 1.3

Datetimes in this section use `YYYY-MM-DD HH:mm`.

| Purpose | Pattern | MUST match | MUST NOT match |
| :--- | :--- | :--- | :--- |
| Last day of month | `0 0 L * *` | `2025-02-28 00:00` | `2025-02-27 00:00` |
| Last weekday of month | `0 0 * * FRI#L` | `2025-02-28 00:00` | `2025-02-21 00:00` |
| Nth weekday of month | `0 0 * * TUE#3` | `2025-06-17 00:00` | `2025-06-10 00:00` |
| Closest weekday within the month | `0 12 15W * *` | `2025-06-16 12:00` | `2025-06-15 12:00` |
| `W` MUST NOT cross a month boundary | `0 12 1W * *` | `2025-02-03 12:00` | `2025-02-01 12:00` |

Additional parser checks:

* `0 12 1-15W * *` MUST be rejected because `W` cannot be combined with a range.

## OCPS 1.4

Datetimes in this section use `YYYY-MM-DD HH:mm`.

For the examples below, `2025-09-01` is a Monday and `2025-10-01` is a Wednesday.

| Purpose | Pattern | MUST match | MUST NOT match |
| :--- | :--- | :--- | :--- |
| Default restricted day-field behavior remains logical OR | `0 12 1 * MON` | `2025-09-01 12:00`, `2025-09-08 12:00`, `2025-10-01 12:00` | `2025-10-07 12:00` |
| `+` requires logical AND | `0 12 1 * +MON` | `2025-09-01 12:00` | `2025-09-08 12:00`, `2025-10-01 12:00` |

Additional parser checks:

* `0 12 +1 * MON` MUST be rejected because `+` MUST prefix the `Day of Week` field expression, not the `Day of Month` field.
* `? 12 * * *` MUST be rejected because `?` is only meaningful in the `Day of Month` and `Day of Week` fields.
