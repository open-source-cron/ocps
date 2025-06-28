# OCPS 1.1: High-Level Abstractions

**Status: DRAFT**
**Date: 2025-06-29**

## 1. Introduction

This document defines version 1.1 of the Open Cron Pattern Specification (OCPS). It is a backward-compatible superset of [OCPS 1.0](./OCPS-1.0.md).

This version introduces two key features for convenience and higher precision: an optional `seconds` field and predefined schedule "nicknames".

## 2. Conformance

An implementation is "OCPS 1.1 Compliant" if it meets all OCPS 1.0 requirements and correctly implements the features defined herein.

## 3. New Features in OCPS 1.1

### 3.1. Optional Second-Level Precision
OCPS 1.1 introduces an optional sixth field at the beginning of the pattern string to represent seconds.

* **6-Field Format:** `SECOND MINUTE HOUR DAY-OF-MONTH MONTH DAY-OF-WEEK`
* **Behavior:**
    * If the `Second` field is present, the pattern will only match when the seconds of the time also match the specified value.
    * If the `Second` field is omitted (i.e., a 5-field pattern is used), its value implicitly defaults to `0`. An OCPS 1.1 compliant parser MUST NOT fail when parsing a 5-field pattern.

### 3.2. Predefined Schedules ("Nicknames")
OCPS 1.1 adds support for case-insensitive nicknames as aliases for common patterns.

| Nickname | Equivalent 5-Field Pattern | Description |
| :--- | :--- | :--- |
| `@yearly` / `@annually`| `0 0 1 1 *` | On January 1st at midnight. |
| `@monthly` | `0 0 1 * *` | On the first day of the month at midnight. |
| `@weekly` | `0 0 * * 0` | Every Sunday at midnight. |
| `@daily` | `0 0 * * *` | Every day at midnight. |
| `@hourly` | `0 * * * *` | At the start of every hour. |

* **Note:** The equivalent patterns are shown in 5-field format. In a 6-field context, the second value is implicitly `0`.
