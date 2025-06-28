# OCPS Implementation Conformance

**Status: DRAFT**

## 1. Introduction

This document tracks the conformance of various scheduling libraries against the different versions of the Open Cron Pattern Specification (OCPS). The goal is to provide a clear overview for developers seeking a library that meets their specific scheduling needs.

An implementation may not support all features of a specific OCPS version. The table below aims to capture that nuance.

## 2. Conformance Matrix

**Legend:**

* ✅ **Full:** The library fully supports all features of this OCPS version.
* 🟡 **Partial:** The library supports some, but not all, features of this version. See Notes for details.
* ❌ **None:** The library does not support the key features of this version.
* ❓ **Unknown:** The library's conformance has not yet been determined.

| Library            | OCPS 1.0 | OCPS 1.1 | OCPS 1.2 | OCPS 1.3 | OCPS 1.4 | Notes                                                                                                                    |
| :----------------- | :------: | :------: | :------: | :------: | :------: | :----------------------------------------------------------------------------------------------------------------------- |
| **croner (JS/TS)** |    ✅    |    ✅    |    ✅    |    ❌    |    🟡    | `W` (Closest Weekday) is not supported. `?` is for substitution, not wildcard. `AND` mode is supported via `{ legacyMode: false }`. |
| **croner-rust** |    ✅    |    ✅    |    ✅    |    ✅    |    ✅    | Full support for all specified features.                                                                                 |
| **vixie-cron** |    ✅    |    ❌    |    ❌    |    ❌    |    ❌    | The baseline implementation.                                                                                             |
| **Quartz** |    🟡    |    ❌    |    ❌    |    ❌    |    🟡    | Does not follow the `OR` logic for date fields. `?` is used as a wildcard.                                               |
| **node-cron** |    ✅    |    ❌    |    ❌    |    ❌    |    ❌    |                                                                                                                          |
| **cron (npm)** |    ✅    |    ❌    |    ❌    |    ❌    |    ❌    |                                                                                                                          |

---
*This table is based on a very brief analysis. For the most accurate details, please refer to the documentation of the respective libraries.*