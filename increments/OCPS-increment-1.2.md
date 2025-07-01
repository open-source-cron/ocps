# OCPS 1.2: Second-Level Precision

**Status: DRAFT**
**Date: 2025-06-30**

## 1. Introduction

This document defines version 1.2 of the Open Cron Pattern Specification (OCPS). It is a backward-compatible superset of [OCPS 1.1](./1.1.md).

This version introduces an optional `seconds` field to allow for higher-precision scheduling.

## 2. Conformance

An implementation is "OCPS 1.2 Compliant" if it meets all OCPS 1.1 requirements and correctly implements the optional seconds field defined herein.

## 3. New Features in OCPS 1.2

### 3.1. Optional Second-Level Precision
OCPS 1.2 introduces an optional sixth field at the beginning of the pattern string to represent seconds.

* **6-Field Format:** `SECOND MINUTE HOUR DAY-OF-MONTH MONTH DAY-OF-WEEK`
* **Behavior:**
    * If the `Second` field is present, the pattern will only match when the seconds of the time also match the specified value.
    * If the `Second` field is omitted (i.e., a 5-field pattern is used), its value implicitly defaults to `0`. An OCPS 1.2 compliant parser MUST NOT fail when parsing a 5-field pattern.
    * Predefined schedules (e.g., `@daily`) are equivalent to their 5-field pattern with a second value of `0`.