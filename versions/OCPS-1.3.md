# OCPS 1.3: Context-Sensitive Modifiers

**Status: DRAFT**
**Date: 2025-06-29**

## 1. Introduction

This document defines version 1.3 of the Open Cron Pattern Specification (OCPS). It is a backward-compatible superset of [OCPS 1.2](./OCPS-1.2.md).

This version introduces the `W` modifier, which allows a schedule to be defined relative to the calendar context (i.e., whether a day is a weekday or weekend).

## 2. Conformance

An implementation is "OCPS 1.3 Compliant" if it meets all OCPS 1.2 requirements and correctly implements the special character defined herein.

## 3. New Special Character in OCPS 1.3

### 3.1. `W` (Closest Weekday) Modifier
The `W` character can be used in the `Day of Month` field to find the closest weekday (Monday-Friday) to a given date.

* **Behavior:**
    1.  If the specified day of the month is a weekday, the trigger is on that day.
    2.  If the specified day is a Saturday, the trigger is on the preceding Friday.
    3.  If the specified day is a Sunday, the trigger is on the following Monday.
* **Example:** `0 12 15W * *` will trigger at noon on the weekday closest to the 15th of the month.
    * If the 15th is a Wednesday, it triggers on the 15th.
    * If the 15th is a Saturday, it triggers on Friday the 14th.
    * If the 15th is a Sunday, it triggers on Monday the 16th.
* **Constraint:** The `W` character is a modifier for a single day and cannot be used with ranges or lists. For example, `1-15W` is an invalid pattern.
