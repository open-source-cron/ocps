# OCPS 1.1: Predefined Schedules

**Status: DRAFT**
**Date: 2025-07-03**

## 1\. Introduction

This document defines version 1.1 of the Open Cron Pattern Specification (OCPS). It is a backward-compatible superset of [OCPS 1.0](../specifications/OCPS-1.0.md).

This version introduces "nicknames" as human-readable aliases for common scheduling patterns.

-----

## 2\. Design Rationale

The primary goal for introducing predefined schedules in OCPS 1.1 is to **standardize existing de facto features**.

Predefined schedules have been a feature of Vixie cron and its derivatives for many years. OCPS 1.1 formalizes the most common set of these nicknames to ensure they are portable and predictable. This includes the special, event-based `@reboot` alias, which is included due to its historical prevalence. By defining its special handling (valid at parse-time, potentially rejected at run-time), the specification acknowledges that not all environments can support it while maintaining syntactic consistency.

-----

## 3\. Conformance

An implementation is "OCPS 1.1 Compliant" if it meets all OCPS 1.0 requirements and correctly implements the predefined schedules defined herein.

-----

## 4\. New Features in OCPS 1.1

### 4.1. Predefined Schedules ("Nicknames")

OCPS 1.1 adds support for case-insensitive nicknames as aliases for common patterns. An implementation MUST recognize the following strings, which MUST NOT be combined with a 5-field expression:

| Nickname | Equivalent 5-Field Pattern | Description |
| :--- | :--- | :--- |
| `@yearly` / `@annually`| `0 0 1 1 *` | On January 1st at midnight. |
| `@monthly` | `0 0 1 * *` | On the first day of the month at midnight. |
| `@weekly` | `0 0 * * 0` | Every Sunday at midnight. |
| `@daily` / `@midnight` | `0 0 * * *` | Every day at midnight. |
| `@hourly` | `0 * * * *` | At the start of every hour. |
| `@reboot` | N/A | Run once at startup. |

### 4.2. Special Handling for `@reboot`

The `@reboot` nickname is a special case, as it is not time-based but event-based.

  * An OCPS 1.1 compliant parser **MUST** recognize `@reboot` as a valid pattern.
  * If an implementation's execution environment does not support a "startup" or "reboot" event (for example, a browser or a serverless environment), the implementation **MAY** reject the pattern at runtime. If rejected, it **SHOULD** provide a clear error message stating that `@reboot` is unsupported in the current context. It **MUST NOT** be treated as a syntax error during parsing.
