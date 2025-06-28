# OCPS 1.0: The Vixie Cron Baseline

**Status: DRAFT**
**Date: 2025-06-29**

## 1. Introduction

This document defines version 1.0 of the Open Cron Pattern Specification (OCPS). This version serves as the foundational baseline for all future versions. Its primary goal is to codify the Vixie cron standard, ensuring a stable and universally understood foundation for scheduling.

## 2. Conformance

An implementation is considered "OCPS 1.0 Compliant" if it correctly parses and evaluates patterns according to all rules specified in this document. Any pattern valid in OCPS 1.0 MUST remain valid and produce an identical schedule in all future versions of the specification.

## 3. Pattern Format

### 3.1. Structure
An OCPS 1.0 pattern MUST consist of five space-separated fields.

`MINUTE HOUR DAY-OF-MONTH MONTH DAY-OF-WEEK`

### 3.2. Field Values

| Field | Required | Allowed Values |
| :--- | :--- | :--- |
| **Minute** | Yes | 0-59 |
| **Hour** | Yes | 0-23 |
| **Day of Month** | Yes | 1-31 |
| **Month** | Yes | 1-12 or JAN-DEC |
| **Day of Week**| Yes | 0-7 or SUN-SAT |

* Month and Day of Week names MUST be treated as case-insensitive.
* In the Day of Week field, `0` and `7` MUST both be treated as Sunday.

## 4. Special Characters

| Character | Name | Example | Description |
| :--- | :--- | :--- | :--- |
| `*` | Wildcard | `* * * * *` | Matches every allowed value for the field. |
| `,` | List Separator | `0,15,30,45` | Specifies a list of individual values. |
| `-` | Range | `9-17` | Specifies an inclusive range of values. |
| `/` | Step | `*/10` | Specifies an interval. `0-30/10` is equivalent to `0,10,20,30`. |

## 5. Operational Semantics

### 5.1. Logical Combination of Day of Month and Day of Week
When both the `Day of Month` and `Day of Week` fields are restricted (i.e., not `*`), a match occurs if **either** field matches the current date. This is a logical `OR`.

* **Example:** The pattern `0 12 1 * MON` will trigger at noon on the first day of every month, AND at noon on every Monday.
