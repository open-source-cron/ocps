# OCPS 1.2: Second-Level Precision

**Status: DRAFT**
**Date: 2025-07-03**

## 1\. Introduction

This document defines version 1.2 of the Open Cron Pattern Specification (OCPS). It is a backward-compatible superset of [OCPS 1.1](https://www.google.com/search?q=./1.1.md).

This version introduces an optional `seconds` field to allow for higher-precision scheduling.

-----

## 2\. Design Rationale

The introduction of an optional seconds field is driven by the scheduling needs of **modern applications** and the goal of **standardizing a common extension**.

  * **Addressing Modern Needs:** The original cron utility's one-minute precision was sufficient for the system administration tasks of its era. However, modern applications in areas like real-time monitoring, data processing, and distributed systems often require scheduling granularity below one minute. OCPS 1.2 addresses this need directly.

  * **Standardizing a Common Extension:** Many cron libraries have independently added support for a seconds field, but this has led to further fragmentation. OCPS 1.2 provides a single, standard way to implement this feature. The seconds field is prepended to the pattern, which is the most common convention and follows a logical time hierarchy.

  * **Preserving Backward Compatibility:** A critical design choice was to make the seconds field optional and to define its default value as `0` when omitted. This ensures that every valid 5-field pattern from OCPS 1.0 and 1.1 remains valid and behaves identically in an OCPS 1.2-compliant implementation.

-----

## 3\. Conformance

An implementation is "OCPS 1.2 Compliant" if it meets all OCPS 1.1 requirements and correctly implements the optional seconds field defined herein.

-----

## 4\. New Features in OCPS 1.2

### 4.1. Optional Second-Level Precision

OCPS 1.2 introduces an optional sixth field at the beginning of the pattern string to represent seconds.

  * **6-Field Format:** `SECOND MINUTE HOUR DAY-OF-MONTH MONTH DAY-OF-WEEK`
  * **Behavior:**
      * If the `Second` field is present, the pattern will only match when the seconds of the time also match the specified value.
      * If the `Second` field is omitted (i.e., a 5-field pattern is used), its value implicitly defaults to `0`. An OCPS 1.2 compliant parser MUST NOT fail when parsing a 5-field pattern.
      * Predefined schedules (e.g., `@daily`) are equivalent to their 5-field pattern with a second value of `0`.
