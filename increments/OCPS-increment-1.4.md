# OCPS 1.4: Logical & Implementation Semantics

**Status: DRAFT**
**Date: 2025-07-03**

## 1\. Introduction

This document defines version 1.4 of the Open Cron Pattern Specification (OCPS). It is a backward-compatible superset of [OCPS 1.3](https://www.google.com/search?q=./1.3.md).

This version does not introduce new scheduling capabilities but instead focuses on standardizing evaluation logic and clarifying implementation-specific ambiguities.

-----

## 2\. Design Rationale

The focus of OCPS 1.4 is to increase reliability by resolving critical ambiguities between major cron dialects. The most significant divergence is the `AND`/`OR` logic for date fields; this version introduces the `!` modifier as a portable, explicit solution. This inncrement also provides guidance for handling the non-portable `?` character and Daylight Saving Time transitions to further unify behavior across all compliant schedulers.

-----

## 3\. Conformance

An implementation is "OCPS 1.4 Compliant" if it meets all OCPS 1.3 requirements and correctly implements the logical modes and character definitions herein.

-----

## 4\. New Features in OCPS 1.4

### 4.1. Logical Combination of Date Fields

To resolve a common ambiguity in cron implementations, OCPS 1.4 formalizes the logical combination of `Day of Month` and `Day of Week`.

#### 4.1.1. Default Behavior and Optional `AND` Mode

  * **Default Behavior (OR):** As defined in OCPS 1.0, the default logic is `OR`.
  * **Optional `AND` Mode:** An OCPS 1.4 compliant implementation MAY provide an optional, non-portable mode to combine these fields with a logical `AND`. When this mode is enabled, a pattern will only match if **both** the `Day of Month` and `Day of Week` conditions are met.

#### 4.1.2. Pattern-Specific `AND` Modifier (`!`)

To provide a portable method for enabling `AND` logic, OCPS 1.4 introduces the `!` modifier.

  * **Functionality:** When the `!` character precedes the value in the `Day of Week` field, the logical combination for that specific pattern MUST switch from `OR` to `AND`.
  * **Syntax:**
      * The `!` modifier is ONLY valid as the first character in the `Day of Week` field.
      * Its use in any other field or position MUST be treated as a parsing error.
  * **Example (`0 12 1 * !MON`):**
      * **Default (OR) `0 12 1 * MON`:** Triggers at noon on the 1st of the month AND at noon on every Monday.
      * **With `!` Modifier `0 12 1 * !MON`:** Triggers at noon ONLY if the 1st of the month is a Monday.

### 4.2. `?` Character Definition

The `?` character has historically had different meanings in different cron libraries (e.g., Quartz vs. Vixie cron). OCPS 1.4 addresses this ambiguity.

  * **Official Status:** The `?` character is formally defined as **non-portable**. Its use is discouraged in patterns intended to be shared between different OCPS-compliant systems.
  * **Implementation Behavior:** An implementation MAY support the `?` character. If supported, it SHOULD behave as an alias for the wildcard (`*`).
  * **Scope and Constraints:**
      * The `?` character is only meaningful in the `Day of Month` and `Day of Week` fields. Its use in any other field MUST be treated as a parsing error.
      * An implementation MUST NOT assign any other meaning to `?`.

### 4.3. Guidance on Implementation Semantics

#### 4.3.1. Daylight Saving Time (DST) Transitions

For any scheduler implementation, whether it enumerates future run times or polls the current time, handling DST transitions consistently is critical. To align with the time-tested behavior of Vixie cron, the following handling is RECOMMENDED:

  * **DST Gap (Spring Forward):** When a scheduled time falls into a DST gap (an hour that does not exist), the job **SHOULD be skipped**. It should not run earlier or be delayed until after the transition.
  * **DST Overlap (Fall Back):** When a scheduled time occurs twice due to a DST overlap, the job **SHOULD run only once**, at the first occurrence.

#### 4.3.2. Date and Time Range Limitations

Establishing clear boundaries and calendar semantics is essential for predictable behavior and error handling.

  * **Calendar System:** It is RECOMMENDED that implementations use a single, well-defined calendar system for all date calculations. The Proleptic Gregorian calendar is the preferred choice, as it applies Gregorian leap year rules consistently to dates both in the future and before its historical adoption.

  * **Supported Range:** While OCPS does not mandate a specific range, implementations that support extended dates SHOULD define and document a finite operational range. A recommended pragmatic range is from the beginning of year 1 to the end of year 9999, inclusive.
      * **Lower Bound (Year 1):** This avoids the complexities and ambiguities associated with year 0 (1 BCE) and pre-Common Era calendar systems. This recommendation is particularly relevant for implementations designed to operate on dates that precede the conventional start of the Unix epoch (1970).
      * **Upper Bound (Year 9999):** This provides an exceptionally wide window for future scheduling while acting as a crucial safeguard against infinite loops when searching for occurrences of patterns that may never match.

  * **Error Handling:** An attempt to find a scheduled occurrence outside the implementation's documented supported range SHOULD fail and return an out-of-range error.
