# OCPS 1.4: Logical & Implementation Semantics

**Revision: DRAFT**
**Date: 2025-06-30**

## 1. Introduction

This document defines version 1.4 of the Open Cron Pattern Specification (OCPS). It is a backward-compatible superset of [OCPS 1.3](./1.3.md).

This version does not introduce new scheduling capabilities but instead focuses on standardizing evaluation logic and clarifying implementation-specific ambiguities.

## 2. Conformance

An implementation is "OCPS 1.4 Compliant" if it meets all OCPS 1.3 requirements and correctly implements the logical mode and character definitions herein.

## 3. New Features in OCPS 1.4

### 3.1. Optional `AND` Logic for Date Fields

To resolve a common ambiguity in cron implementations, OCPS 1.4 formalizes the logical combination of `Day of Month` and `Day of Week`.

* **Default Behavior (OR):** As defined in OCPS 1.0, the default logic is `OR`.

* **Optional `AND` Mode:** An OCPS 1.4 compliant implementation MUST provide an optional mode to combine these fields with a logical `AND`. When this mode is enabled, a pattern will only match if **both** the `Day of Month` and `Day of Week` conditions are met.

* **Example (`0 12 1 * MON`):**

  * **Default (OR) Mode:** Triggers at noon on the 1st of the month AND at noon on every Monday.

  * **AND Mode:** Triggers at noon ONLY if the 1st of the month is a Monday.

### 3.2. `?` Character Definition

The `?` character has historically had different meanings in different cron libraries (e.g., Quartz vs. Vixie cron). OCPS 1.4 addresses this ambiguity.

* **Official Status:** The `?` character is formally defined as **non-portable**. Its use is discouraged in patterns intended to be shared between different OCPS-compliant systems.

* **Implementation Behavior:** An implementation MAY support the `?` character. If supported, it SHOULD behave as an alias for the wildcard (`*`). This ensures compatibility with legacy patterns (e.g., from Quartz) where it is used to signify "no specific value" when the other date field is being used.

* **Scope and Constraints:**

  * The `?` character is only meaningful in the `Day of Month` and `Day of Week` fields. Implementations MUST NOT support its use in any other field.

  * An implementation MUST NOT assign any other meaning to `?` (such as one-time substitution), as this behavior is not portable.
