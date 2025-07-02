# OCPS 1.3: Advanced Calendar Scheduling

**Status: DRAFT**
**Date: 2025-07-03**

## 1\. Introduction

This document defines version 1.3 of the Open Cron Pattern Specification (OCPS). It is a backward-compatible superset of [OCPS 1.2](https://www.google.com/search?q=./1.2.md).

This version introduces powerful modifiers for complex monthly scheduling scenarios, including `L` (last), `#` (nth), and `W` (closest weekday).

-----

## 2\. Design Rationale

OCPS 1.3 addresses more complex, real-world scheduling needs by adopting proven features from influential schedulers.

  * **Solving Common Business Scenarios:** Standard Vixie cron syntax struggles to express common business requirements like "run on the last Friday of the month" or "trigger on the weekday closest to the 15th." The `L` (Last), `#` (Nth), and `W` (Weekday) modifiers provide a clean, standardized syntax for these exact use cases.

  * **Unifying a Fragmented Ecosystem:** These features are heavily inspired by the powerful and popular Quartz scheduler. Rather than reinventing the wheel, OCPS adopts these well-understood concepts to unify the fragmented cron landscape.

-----

## 3\. Conformance

An implementation is "OCPS 1.3 Compliant" if it meets all OCPS 1.2 requirements and correctly implements the special characters defined herein.

-----

## 4\. New Special Characters in OCPS 1.3

### 4.1. `L` (Last) Modifier
The `L` character can be used in the `Day of Month` and `Day of Week` fields.

* **In `Day of Month`:** `L` stands for the last day of the month.
    * **Example:** `0 0 L * *` triggers at midnight on the last day of every month (e.g., Jan 31, Feb 28/29, etc.).
* **In `Day of Week`:** `L` specifies the last occurrence of a given weekday in the month. It can be used by itself (e.g., `5L` for the last Friday) or with a hash (`5#L`). For clarity, the `#L` format is RECOMMENDED.
    * **Example:** `0 0 * * 5L` or `0 0 * * FRI#L` triggers at midnight on the last Friday of every month.

### 4.2. `#` (Nth) Modifier

The `#` character is used in the `Day of Week` field to specify the "nth" occurrence of a weekday in the month.

  * **Format:** `D#N`, where `D` is the day of the week number (0-7) and `N` is the occurrence (1-5).
  * **Example:** `0 0 * * 2#3` triggers at midnight on the third Tuesday of every month.
  * **Example:** `0 0 * * MON#1` triggers at midnight on the first Monday of every month.

### 4.3. `W` (Closest Weekday) Modifier

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
