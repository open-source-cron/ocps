# OCPS 1.2: Advanced Calendar Scheduling

**Status: DRAFT**
**Date: 2025-06-29**

## 1. Introduction

This document defines version 1.2 of the Open Cron Pattern Specification (OCPS). It is a backward-compatible superset of [OCPS 1.1](./OCPS-1.1.md).

This version introduces powerful modifiers for complex monthly scheduling scenarios that are not possible with standard cron syntax.

## 2. Conformance

An implementation is "OCPS 1.2 Compliant" if it meets all OCPS 1.1 requirements and correctly implements the special characters defined herein.

## 3. New Special Characters in OCPS 1.2

### 3.1. `L` (Last) Modifier
The `L` character can be used in the `Day of Month` and `Day of Week` fields.

* **In `Day of Month`:** `L` stands for the last day of the month.
    * **Example:** `0 0 L * *` triggers at midnight on the last day of every month (e.g., Jan 31, Feb 28/29, etc.).
* **In `Day of Week`:** `L` specifies the last occurrence of a given weekday in the month. It can be used by itself (e.g., `5L` for the last Friday) or with a hash (`5#L`). For clarity, the `#L` format is RECOMMENDED.
    * **Example:** `0 0 * * 5L` or `0 0 * * FRI#L` triggers at midnight on the last Friday of every month.

### 3.2. `#` (Nth) Modifier
The `#` character is used in the `Day of Week` field to specify the "nth" occurrence of a weekday in the month.

* **Format:** `D#N`, where `D` is the day of the week number (0-7) and `N` is the occurrence (1-5).
* **Example:** `0 0 * * 2#3` triggers at midnight on the third Tuesday of every month.
* **Example:** `0 0 * * MON#1` triggers at midnight on the first Monday of every month.
