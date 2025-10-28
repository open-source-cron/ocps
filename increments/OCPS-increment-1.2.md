# OCPS 1.2: Second and Year-Level Precision

**Status: DRAFT**
**Date: 2025-07-03**

## 1. Introduction

This document defines version 1.2 of the Open Cron Pattern Specification (OCPS). It is a backward-compatible superset of [OCPS 1.1](./OCPS-increment-1.1.md).

This version introduces two optional fields for higher-precision scheduling: `seconds` and `year`.

---

## 2. Design Rationale

This version extends the temporal resolution of the pattern to meet the requirements of modern applications and to standardize common extensions. The introduction of an optional seconds field addresses the need for sub-minute scheduling granularity, which is a frequent requirement in distributed systems and monitoring services. The optional year field enables the definition of long-term, non-recurring schedules without requiring external logic.

A critical design constraint is backward compatibility. Making these fields optional ensures that any valid 5-field pattern from previous OCPS versions remains valid and behaves identically. The placement of the `seconds` field (prepended) and `year` field (appended) follows established conventions, promoting predictability for implementers.

---

## 3. Conformance

An implementation is "OCPS 1.2 Compliant" if it meets all OCPS 1.1 requirements and correctly implements the optional `seconds` and `year` fields as defined herein. An implementation MUST be able to parse 5, 6, and 7-field patterns.

---

## 4. New Features in OCPS 1.2

### 4.1. Optional Second-Level Precision

OCPS 1.2 introduces an optional sixth field at the beginning of the pattern string to represent `seconds`.

* **6-Field Format:** `SECOND MINUTE HOUR DAY-OF-MONTH MONTH DAY-OF-WEEK`
* **Behavior:**
    * If the `Second` field is present, the pattern will only match when the seconds of the time also match the specified value.
    * If the `Second` field is omitted (i.e., a 5-field pattern is used), its value implicitly defaults to `0`. An OCPS 1.2 compliant parser MUST NOT fail when parsing a 5-field pattern.
    * Predefined schedules (e.g., `@daily`) are equivalent to their 5-field pattern with a `second` value of `0`.

### 4.2. Optional Year-Level Precision

This version also introduces an optional seventh field at the end of the pattern string to represent the `year`.

* **7-Field Format:** `SECOND MINUTE HOUR DAY-OF-MONTH MONTH DAY-OF-WEEK YEAR`
* **Behavior:**
    * The `Year` field can be used with a 6-part pattern that includes `seconds`.
    * If the `Year` field is present, the pattern will only match if the current year also matches the specified value.
    * If the `Year` field is omitted (i.e., a 5-field or 6-field pattern is used), its value implicitly defaults to `*` (every year). An OCPS 1.2 compliant parser MUST NOT fail when parsing a pattern without a `year` field.
    * The allowed values for the `Year` field are individual years (e.g., `2025`), a range (e.g., `2025-2030`), a list (e.g., `2025,2027`), or a step value (e.g., `*/2`).

* **Example Patterns:**
    * `* * * * * *`: Runs every second of every year. (Standard 6-field pattern)
    * `0 15 10 * * ? 2025`: Runs at 10:15:00 AM on every day-of-week that is the specified day-of-month in the year 2025 only.
    * `0 0 12 1 1 * 2025-2030`: Runs at 12:00:00 PM on January 1st every year from 2025 through 2030.
