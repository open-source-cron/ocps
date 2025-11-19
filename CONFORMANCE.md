# OCPS Implementation Conformance

**Status: DRAFT**

## 1. Introduction

This document tracks the conformance of various scheduling libraries, daemons, and standards against the different versions of the Open Cron Pattern Specification (OCPS). The goal is to provide a clear overview for developers seeking a tool that meets their specific scheduling needs.

An implementation may not support all features of a specific OCPS version. The tables below aim to capture that nuance.

## 2. Conformance Matrix

**Legend:**
* ✅ **Full:** Fully supports all features of this OCPS version.
* 🟡 **Partial:** Supports some, but not all, features of this version. See Notes.
* ❌ **None:** Does not support the key features of this version.
* N/A **N/A:** Not Applicable, as the system uses a fundamentally different syntax.


### Adoption Summary

This table shows the percentage of the 17 libraries listed below that meet different levels of conformance.

| **Conformance Level** | **OCPS 1.0** | **OCPS 1.1** | **OCPS 1.2** | **OCPS 1.3** | **OCPS 1.4** |
| :--- | :---: | :---: | :---: | :---: | :---: |
| Any Feature Adoption | **100%** | **41%** | **82%** | **53%** | **47%** |
| Full Feature Adoption | **65%** | **41%** | **76%** | **47%** | **6%** |
| Any Conformance (Cumulative) | **100%** | **35%** | **24%** | **12%** | **6%** |
| Full Conformance (Cumulative) | **65%** | **35%** | **24%** | **6%** | **0%** |

### Specifications

| **Specifications** | **OCPS 1.0** | **OCPS 1.1** | **OCPS 1.2** | **OCPS 1.3** | **OCPS 1.4** | **Notes** |
| :--- | :---: | :---: | :---: | :---: | :---: | :--- |
| **POSIX `cron`** | 🟡 | ❌ | ❌ | ❌ | ❌ | The official standard. Does not support steps (`/`) or month/day names. [1] |

### System Cron Daemons

| **System Cron Daemons** | **OCPS 1.0** | **OCPS 1.1** | **OCPS 1.2** | **OCPS 1.3** | **OCPS 1.4** | **Notes** |
| :--- | :---: | :---: | :---: | :---: | :---: | :--- |
| **cronie** | ✅ | ✅ | ✅ | ❌ | ❌ | A fork of Vixie-cron. Supports nicknames and seconds. [3][4] |
| **vixie-cron / isc-cron** | ✅ | ✅ | ❌ | ❌ | ❌ | The de facto standard for system cron. [1][2][5] |
| **dcron** | ✅ | ✅ | ❌ | ❌ | ❌ | A simple and lightweight implementation that supports nicknames. [6] |

### Java Libraries

| **Java Libraries** | **OCPS 1.0** | **OCPS 1.1** | **OCPS 1.2** | **OCPS 1.3** | **OCPS 1.4** | **Notes** |
| :--- | :---: | :---: | :---: | :---: | :---: | :--- |
| **Spring Framework (`@Scheduled`)** | 🟡 | ❌ | ✅ | ✅ | 🟡 | Supports seconds, `L`, `W`, `#`. Uses `AND` logic for date fields. `?` is a wildcard. No nicknames. [7] |
| **Quartz** | 🟡 | ❌ | ✅ | ✅ | 🟡 | Original source for `L`, `W`, `#`. Does not allow combining dom and dow, but requires `?` to disambiguate date fields. No nicknames. [8][9] |

### .NET Libraries

| **.NET Libraries** | **OCPS 1.0** | **OCPS 1.1** | **OCPS 1.2** | **OCPS 1.3** | **OCPS 1.4** | **Notes** |
| :--- | :---: | :---: | :---: | :---: | :---: | :--- |
| **Cronos** | 🟡 | ✅ | ✅ | ✅ | 🟡 | Supports seconds, nicknames, and advanced characters. Uses `AND` logic for date fields. [11] |
| **Coravel** | ✅ | ❌ | ❌ | ❌ | ❌ | Provides basic cron string support but encourages a fluent API. |

### Rust Libraries

| **Rust Libraries** | **OCPS 1.0** | **OCPS 1.1** | **OCPS 1.2** | **OCPS 1.3** | **OCPS 1.4** | **Notes** |
| :--- | :---: | :---: | :---: | :---: | :---: | :--- |
| **croner-rust** | ✅ | ✅ | ✅ | ✅ | 🟡 | Allows `?` as an alias for `*`. [12] |
| **cron** | 🟡 | ❌ | ✅ | ❌ | ❌ | Weekday numbering differs. Supports seconds but not nicknames or other extended features. [13][14] |
| **saffron** | 🟡 | ❌ | 🟡 | ✅ | 🟡 | Quartz-like, uses `AND` logic for date fields. Does not support seconds. Weekday numbering differs. [15][16] |

### Go Libraries

| **Go Libraries** | **OCPS 1.0** | **OCPS 1.1** | **OCPS 1.2** | **OCPS 1.3** | **OCPS 1.4** | **Notes** |
| :--- | :---: | :---: | :---: | :---: | :---: | :--- |
| **gocron (`robfig/cron`)** | ✅ | ✅ | ✅ | ❌ | 🟡 | Supports seconds & nicknames. `?` is alias for `*`. No `L`, `W`, `#`. [17] |
| **go-quartz** | 🟡 | ❌ | ✅ | ✅ | ❌ | Requiring `?` to disambiguate date fields. No nicknames. [18] |

### JavaScript / TypeScript Libraries

| **JavaScript / TypeScript Libraries** | **OCPS 1.0** | **OCPS 1.1** | **OCPS 1.2** | **OCPS 1.3** | **OCPS 1.4** | **Notes** |
| :--- | :---: | :---: | :---: | :---: | :---: | :--- |
| **croner (JS/TS)** | ✅ | ✅ | ✅ | 🟡 | ✅ | Defaults to OCPS `OR` logic. `W` is not supported. `?` is for substitution. Provides an optional `AND` mode. [19] |
| **node-schedule** | ✅ | ❌ | ✅ | ❌ | ❌ | Supports seconds but not nicknames or other extended syntax. |
| **node-cron** | ✅ | ❌ | ✅ | ❌ | ❌ | Supports seconds. |
| **cron (npm)** | ✅ | ❌ | ✅ | ❌ | ❌ | Supports seconds. [20][21] |
| **cron-parser** | ✅ | ❌ | ✅ | ✅ | 🟡 | Supports seconds, `L`, `#`. `?` is alias for `*`. No `W` or nicknames. [22] |

### PHP Libraries

| **PHP Libraries** | **OCPS 1.0** | **OCPS 1.1** | **OCPS 1.2** | **OCPS 1.3** | **OCPS 1.4** | **Notes** |
| :--- | :---: | :---: | :---: | :---: | :---: | :--- |
| **dragonmantank/cron-expression** | ✅ | ✅ | ❌ | ✅ | ❌ | A popular foundational library. Supports `L`, `W`, `#`, and nicknames. Does not support seconds. |

### Python Libraries

| **Python Libraries** | **OCPS 1.0** | **OCPS 1.1** | **OCPS 1.2** | **OCPS 1.3** | **OCPS 1.4** | **Notes** |
| :--- | :---: | :---: | :---: | :---: | :---: | :--- |
| **python-crontab** | ✅ | ✅ | ❌ | ❌ | ❌ | Designed to manage system crontabs. Supports nicknames. No advanced characters. |

### Ruby Libraries

| **Ruby Libraries** | **OCPS 1.0** | **OCPS 1.1** | **OCPS 1.2** | **OCPS 1.3** | **OCPS 1.4** | **Notes** |
| :--- | :---: | :---: | :---: | :---: | :---: | :--- |
| **Sidekiq-Cron** | ✅ | ✅ | ✅ | ❌ | ❌ | Supports seconds and natural language parsing via the Fugit gem. No support for `L`, `W`, `#`. |


## References

| **Reference** | **URL** |
| :--- | :--- |
| 1 | <https://en.wikipedia.org/wiki/Cron> |
| 2 | <https://github.com/vixie/cron> |
| 3 | <https://wiki.gentoo.org/wiki/Cron> |
| 4 | <https://manpages.ubuntu.com/manpages/jammy/man8/cron.8.html> |
| 5 | <https://medium.com/bumble-tech/cron-in-linux-history-use-and-structure-70d938569b40> |
| 6 | <https://www.jimpryor.net/linux/dcron.html> |
| 7 | <https://productresources.collibra.com/docs/collibra/latest/Content/Cron/co_spring-cron.htm> |
| 8 | <https://www.quartz-scheduler.org/documentation/quartz-2.3.0/tutorials/crontrigger.html> |
| 9 | <https://docs.oracle.com/cd/E12058_01/doc/doc.1014/e12030/cron_expressions.htm> |
| 11 | <https://github.com/HangfireIO/Cronos> |
| 12 | <https://crates.io/crates/croner/1.0.2> |
| 13 | <https://docs.rs/cron> |
| 14 | <https://www.twilio.com/en-us/blog/developers/community/run-cron-jobs-rust> |
| 15 | <https://github.com/cloudflare/saffron> |
| 16 | <https://news.ycombinator.com/item?id=41654723> |
| 17 | <https://www.scalent.io/golang/golang-cron-job-example/> |
| 18 | <https://github.com/reugn/go-quartz> |
| 19 | <https://www.npmjs.com/package/croner> |
| 20 | <https://www.npmjs.com/package/cron> |
| 21 | <https://npm-compare.com/cron,node-cron,node-schedule> |
| 22 | <https://www.npmjs.com/package/cron-parser> |


---
*This document is automatically generated from [data/conformance.json](./data/conformance.json) on 2025-11-19.*

*This table is based on analysis of official documentation and community knowledge. For the most accurate details, please refer to the documentation of the respective libraries.*