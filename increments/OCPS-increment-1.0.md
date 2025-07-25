# OCPS 1.0: The Baseline

**Status: DRAFT**
**Date: 2025-07-03**

## 1. Introduction

This document defines version 1.0 of the Open Cron Pattern Specification (OCPS). This version serves as the foundational baseline for all future versions. Its primary goal is to codify the established Vixie / ISC cron standard, ensuring a stable and universally understood foundation for scheduling.

---
## 2. Design Rationale

The design of OCPS 1.0 is guided by the core principles of **stability, familiarity, and incremental introduction**.

* **Vixie Cron as the Foundation:** The specification intentionally codifies the Vixie/ISC cron dialect because it is the most ubiquitous and widely understood cron syntax in the world. By starting with this de facto standard, OCPS ensures that the vast majority of existing cron patterns work as expected, providing immediate value and a frictionless adoption path for developers and system administrators.

* **Intentional Exclusions:** Features from other popular cron dialects, such as Quartz's `?`, `L`, and `W` characters, or support for second-level precision, are deliberately excluded from this baseline version. This maintains the simplicity and stability of the foundation. These and other features are candidates for inclusion in subsequent, backward-compatible increments.

* **Clarification of Ambiguity:** A key goal of OCPS 1.0 is to go beyond a simple restatement of the syntax by providing strict, explicit rules for previously ambiguous or inconsistently handled edge cases (e.g., invalid ranges, step behavior). This ensures that all OCPS 1.0 compliant implementations will behave identically, increasing the reliability and portability of schedules.

---
## 3. Conformance

An implementation is considered "OCPS 1.0 Compliant" if it correctly parses and evaluates patterns according to all rules specified in this document. Any pattern valid in OCPS 1.0 MUST remain valid and produce an identical schedule in all future versions of the specification.

---
## 4. Pattern Format

### 4.1. Structure
An OCPS 1.0 pattern MUST consist of five fields separated by whitespace. A compliant parser MUST adhere to the following rules:
* It MUST reject a pattern containing any characters not explicitly allowed by Section 4.3 by raising a clear parsing error.
* Any leading or trailing whitespace from the entire string MUST be ignored.
* One or more consecutive whitespace characters MUST be treated as a single delimiter.

`MINUTE HOUR DAY-OF-MONTH MONTH DAY-OF-WEEK`

### 4.2. Field Values

| Field          | Required | Allowed Values  |
| :------------- | :------- | :-------------- |
| **Minute** | Yes      | 0-59            |
| **Hour** | Yes      | 0-23            |
| **Day of Month** | Yes      | 1-31            |
| **Month** | Yes      | 1-12 or JAN-DEC |
| **Day of Week** | Yes      | 0-7 or SUN-SAT  |

* Month and Day of Week names MUST be treated as case-insensitive.
* In the Day of Week field, `0` and `7` MUST both be treated as Sunday.

### 4.3. Character Set

After converting any textual representations (e.g., `JAN`, `SUN`) to their numeric equivalents, a pattern MUST only contain characters from the following set:

* **Whitespace:** Space (`U+0020`) or horizontal tab (`U+0009`).
* **Digits:** `0123456789`
* **Special Characters:** `*,-/`

---
## 5. Special Characters

| Character | Name           | Example      | Description                                                                                                |
| :-------- | :------------- | :----------- | :--------------------------------------------------------------------------------------------------------- |
| `*`       | Wildcard       | `* * * * *`  | Matches every allowed value for the field.                                                                 |
| `,`       | List Separator | `0,15,30,45` | Specifies a list of individual values.                                                                     |
| `-`       | Range          | `9-17`       | Specifies an inclusive range of values.                                                                    |
| `/`       | Step           | `5-59/15`    | Specifies an interval. The step operates on the range it modifies, yielding `5,20,35,50` for this example. |

### 5.1. Combining Special Characters

In OCPS 1.0, the special characters are combined within a single field to create complex schedules. The combination follows a specific order of operations.

1.  **List Separation (`,`)**: The comma is the top-level separator. It breaks a field into a list of independent sub-expressions. The final set of values for the field is the union (logical `OR`) of the results of each sub-expression.
2.  **Range (`-`) or Wildcard (`*`)**: Within each sub-expression, a range (`10-20`) or a wildcard (`*`) defines the initial set of numbers. A wildcard is equivalent to the full possible range for that field (e.g., `0-59` for minutes).
3.  **Step (`/`)**: The step is an operator that filters the set generated by a range or wildcard. The resulting set includes the lowest value of the range, plus every S-th value after that which also falls within the range.

---
## 6. Operational Semantics

### 6.1. Logical Combination of Day of Month and Day of Week
When both the `Day of Month` and `Day of Week` fields are restricted (i.e., not `*`), a match occurs if **either** field matches the current date. This is a logical `OR`.

* **Example:** The pattern `0 12 1 * MON` will trigger at noon on the first day of every month, AND at noon on every Monday.

### 6.2. Error Handling and Edge Cases

#### Out-of-Range Values
A parser MUST reject a pattern if any numeric value falls outside the allowed range for its field (e.g., `60` in the minute field, `32` in the day-of-month field). This MUST be treated as a parsing error.

#### Invalid Ranges
A range `A-B` where `A` is greater than `B` is invalid. A parser MUST treat this as a parsing error.

#### Invalid Step Values
A step value of `0` has no logical definition and is invalid. A parser MUST reject any field containing `/0` as a parsing error.

#### Impossible Date Combinations
A pattern containing a valid but impossible date (e.g., `* * 31 2 *` for February 31st) MUST be considered syntactically valid and MUST NOT cause a parsing error.

Implementations that provide iterators to find the next or previous occurrences of a schedule (e.g., `findNextRun()`) SHOULD throw a runtime error or otherwise indicate that no valid run time can ever be found for such a pattern.

### 6.3. Implementation-Specific Configurations
To allow for flexibility while maintaining a stable standard, the following rules apply to implementation-specific configurations:

* An implementation MAY provide configuration options that alter the default behaviors defined in this specification.
* Compliance with this specification MUST be evaluated based on the implementation's default, unconfigured behavior.

### 6.4. Time Zone Handling

OCPS 1.0 patterns are **timezone-agnostic**.

A compliant parser or scheduler MUST interpret the pattern against the implementation's local time. The mechanism for defining this local time is an implementation detail, as per Section 6.3.
