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

OCPS 1.2 introduces an optional sixth field at the beginning of the pattern string to represent `seconds`. The standard portable numeric range is `0-59`, and the field supports the expressions defined in OCPS 1.0 Section 5.

* **6-Field Format:** `SECOND MINUTE HOUR DAY-OF-MONTH MONTH DAY-OF-WEEK`
* **Behavior:**
    * If the `Second` field is present, the pattern will only match when the seconds of the time also match the specified value.
    * If the `Second` field is omitted (i.e., a 5-field pattern is used), its value implicitly defaults to `0`. An OCPS 1.2 compliant parser MUST NOT fail when parsing a 5-field pattern.
    * Predefined schedules (e.g., `@daily`) are equivalent to their 5-field pattern with a `second` value of `0`.

### 4.2. Optional Year-Level Precision

This version also introduces an optional seventh field at the end of the pattern string to represent the `year`. The standard portable range is `1970-2199`. The range starts at `1970` to align with the Unix epoch. The upper bound of `2199` provides a generous window for future scheduling while remaining practical for implementations.

* **7-Field Format:** `SECOND MINUTE HOUR DAY-OF-MONTH MONTH DAY-OF-WEEK YEAR`
* **Behavior:**
    * The `Year` field may be used only in the 7-field pattern, together with the `seconds` field.
    * If the `Year` field is present, the pattern will only match if the current year also matches the specified value.
    * If the `Year` field is omitted (i.e., a 5-field or 6-field pattern is used), its value implicitly defaults to `*` (every year). In a 6-field pattern, the fields MUST be interpreted according to Section 4.1 as `SECOND MINUTE HOUR DAY-OF-MONTH MONTH DAY-OF-WEEK`. An OCPS 1.2 compliant parser MUST NOT fail when parsing a pattern without a `year` field.
    * The field supports individual years (e.g., `2025`), ranges (e.g., `2025-2030`), lists (e.g., `2025,2027`), and step values (e.g., `*/2`).

> **Note on Year Stepping:** Within the standard portable range, a wildcard step such as `*/2` expands to `1970-2199/2`, yielding even years (1970, 1972, ..., 2198). To match odd years, use an explicit start: `1971-2199/2` (1971, 1973, ..., 2199). This follows directly from the stepping rules defined in OCPS 1.0 Section 5.1.

> **Extended Ranges:** Implementations MAY extend the year range beyond `1970-2199`. Such extensions are non-standard but permitted for compliant implementations. See OCPS 1.4 Section 4.3.2 for the complete set of requirements governing extended ranges, including the effect on wildcard and stepping expansion.

* **Example Patterns:**
    * `* * * * * *`: Runs every second of every year. (Standard 6-field pattern)
    * `0 15 10 * * * 2025`: Runs at 10:15:00 AM every day in the year 2025 only.
    * `0 0 12 1 1 * 2025-2030`: Runs at 12:00:00 PM on January 1st every year from 2025 through 2030.
    * `0 0 0 1 1 * */2`: Runs at midnight on January 1st of every even year within the standard portable range (1970, 1972, ..., 2198).
    * `0 0 0 1 1 * 1971-2199/2`: Runs at midnight on January 1st of every odd year within the standard portable range (1971, 1973, ..., 2199).

### 4.3. Field Value Summary

All special characters and stepping rules defined in OCPS 1.0 Section 5 apply to these fields.

| Field | Required | Standard Portable Range |
| :--- | :--- | :--- |
| **Second** | No | 0-59 |
| **Year** | No | 1970-2199 |
