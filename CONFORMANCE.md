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
* N/A: Not Applicable, as the system uses a fundamentally different syntax.

### Specifications

| Specification | OCPS 1.0 | OCPS 1.1 | OCPS 1.2 | OCPS 1.3 | OCPS 1.4 | Notes |
| :--- | :---: | :---: | :---: | :---: | :---: | :--- |
| **POSIX `cron`** | 🟡 | ❌ | ❌ | ❌ | ❌ | The official standard. Does not support steps (`/`) or month/day names. [1] |

### System Cron Daemons

| Daemon | OCPS 1.0 | OCPS 1.1 | OCPS 1.2 | OCPS 1.3 | OCPS 1.4 | Notes |
| :--- | :---: | :---: | :---: | :---: | :---: | :--- |
| **cronie** | ✅ | ✅ | 🟡 | ❌ | ❌ | A fork of Vixie-cron. Supports nicknames and seconds. [3, 4] |

| **vixie-cron** / **isc-cron** | ✅ | ✅ | ❌ | ❌ | ❌ | The de facto standard for system cron. [2, 1, 5] |
| **dcron** | ✅ | ✅ | ❌ | ❌ | ❌ | A simple and lightweight implementation that supports nicknames. [6] |

### Java Libraries

| Library | OCPS 1.0 | OCPS 1.1 | OCPS 1.2 | OCPS 1.3 | OCPS 1.4 | Notes |
| :--- | :---: | :---: | :---: | :---: | :---: | :--- |
| **Spring Framework (`@Scheduled`)** | 🟡 | ❌ | ✅ | ✅ | 🟡 | Supports seconds, `L`, `W`, `#`. Uses `AND` logic for date fields. `?` is a wildcard. No nicknames. [7] |
| **Quartz** | 🟡 | ❌ | ✅ | ✅ | 🟡 | Original source for `L`, `W`, `#`. Does not allow combining dom ad dow, and but requires `?` to disambiguate date fields. No nicknames. [8, 9] |

### .NET Libraries

| Library | OCPS 1.0 | OCPS 1.1 | OCPS 1.2 | OCPS 1.3 | OCPS 1.4 | Notes |
| :--- | :---: | :---: | :---: | :---: | :---: | :--- |
| **Hangfire** | 🟡 | ❌ | ✅ | ✅ | 🟡 | Uses `Cronos`. Supports seconds and advanced characters. Uses `AND` logic for date fields. [10] |
| **Cronos** | 🟡 | ✅ | ✅ | ✅ | 🟡 | Supports seconds, nicknames, and advanced characters. Uses `AND` logic for date fields. [11] |
| **Coravel** | ✅ | ❌ | ❌ | ❌ | ❌ | Provides basic cron string support but encourages a fluent API. |

### Rust Libraries

| Library | OCPS 1.0 | OCPS 1.1 | OCPS 1.2 | OCPS 1.3 | OCPS 1.4 | Notes |
| :--- | :---: | :---: | :---: | :---: | :---: | :--- |
| **croner-rust** | ✅ | ✅ | ✅ | ✅ | 🟡 | Allows `?` as an alias for `*`. [12] |
| **cron** | ✅ | ❌ | ✅ | ❌ | ❌ | Supports seconds but not nicknames or other extended features. [13, 14] |
| **saffron** | 🟡 | ❌ | 🟡 | ✅ | 🟡 | Quartz-like, uses `AND` logic for date fields. Does not support seconds. Weekday numbering differs. [15, 16] |

### Go Libraries

| Library | OCPS 1.0 | OCPS 1.1 | OCPS 1.2 | OCPS 1.3 | OCPS 1.4 | Notes |
| :--- | :---: | :---: | :---: | :---: | :---: | :--- |
| **gocron (`robfig/cron`)** | ✅ | ✅ | ✅ | ❌ | ❌ | Supports seconds & nicknames. `?` is an alias for `*`. No `L`, `W`, `#`. [17] |
| **go-quartz** | 🟡 | ❌ | ✅ | ✅ | 🟡 | Follows Quartz `OR` logic, requiring `?` to disambiguate date fields. No nicknames. [18] |

### JavaScript / TypeScript Libraries

| Library | OCPS 1.0 | OCPS 1.1 | OCPS 1.2 | OCPS 1.3 | OCPS 1.4 | Notes |
| :--- | :---: | :---: | :---: | :---: | :---: | :--- |
| **croner (JS/TS)** | ✅ | ✅ | ✅ | 🟡 | ✅ | Defaults to OCPS `OR` logic. `W` is not supported. `?` is for substitution. Provides an optional `AND` mode. [19] |
| **node-schedule** | ✅ | ❌ | ✅ | ❌ | ❌ | Supports seconds but not nicknames or other extended syntax. |
| **node-cron** | ✅ | ❌ | ✅ | ❌ | ❌ | Supports seconds. |
| **cron (npm)** | ✅ | ❌ | ✅ | ❌ | ❌ | Supports seconds. [20, 21] |
| **cron-parser** | ✅ | ❌ | ✅ | ✅ | 🟡 | Supports seconds, `L`, `#`. `?` is alias for `*`. No `W` or nicknames. [22] |

### PHP Libraries

| Library | OCPS 1.0 | OCPS 1.1 | OCPS 1.2 | OCPS 1.3 | OCPS 1.4 | Notes |
| :--- | :---: | :---: | :---: | :---: | :---: | :--- |
| **dragonmantank/cron-expression** | ✅ | ✅ | ❌ | ✅ | ❌ | A popular foundational library. Supports `L`, `W`, `#`, and nicknames. Does not support seconds. |
| **Laravel Scheduler** | 🟡 | 🟡 | ✅ | 🟡 | 🟡 | Uses a fluent API. Supports seconds and `->lastDayOfMonth()`. Uses `AND` logic when combining constraints. |
| **php-cron-scheduler** | ✅ | 🟡 | ❌ | ✅ | ❌ | A wrapper around `dragonmantank/cron-expression` that provides a fluent API. |

### Python Libraries

| Library | OCPS 1.0 | OCPS 1.1 | OCPS 1.2 | OCPS 1.3 | OCPS 1.4 | Notes |
| :--- | :---: | :---: | :---: | :---: | :---: | :--- |
| **python-crontab** | ✅ | ✅ | ❌ | ❌ | ❌ | Designed to manage system crontabs. Supports nicknames. No advanced characters. |

### Ruby Libraries

| Library | OCPS 1.0 | OCPS 1.1 | OCPS 1.2 | OCPS 1.3 | OCPS 1.4 | Notes |
| :--- | :---: | :---: | :---: | :---: | :---: | :--- |
| **Sidekiq-Cron** | ✅ | ✅ | ✅ | ❌ | ❌ | Supports seconds and natural language parsing via the Fugit gem. No support for `L`, `W`, `#`. |

## References

| Reference | URL |
| :--- | :--- |
| 1 | [https://en.wikipedia.org/wiki/Cron](https://en.wikipedia.org/wiki/Cron) |
| 2 | [https://github.com/vixie/cron](https://github.com/vixie/cron) |
| 3 | [https://wiki.gentoo.org/wiki/Cron](https://wiki.gentoo.org/wiki/Cron) |
| 4 | [https://manpages.ubuntu.com/manpages/jammy/man8/cron.8.html](https://manpages.ubuntu.com/manpages/jammy/man8/cron.8.html) |
| 5 | [https://medium.com/bumble-tech/cron-in-linux-history-use-and-structure-70d938569b40](https://medium.com/bumble-tech/cron-in-linux-history-use-and-structure-70d938569b40) |
| 6 | [https://www.jimpryor.net/linux/dcron.html](https://www.jimpryor.net/linux/dcron.html) |
| 7 | [https://productresources.collibra.com/docs/collibra/latest/Content/Cron/co_spring-cron.htm](https://productresources.collibra.com/docs/collibra/latest/Content/Cron/co_spring-cron.htm) |
| 8 | [https://www.quartz-scheduler.org/documentation/quartz-2.3.0/tutorials/crontrigger.html](https://www.quartz-scheduler.org/documentation/quartz-2.3.0/tutorials/crontrigger.html) |
| 9 | [https://docs.oracle.com/cd/E12058_01/doc/doc.1014/e12030/cron_expressions.htm](https://docs.oracle.com/cd/E12058_01/doc/doc.1014/e12030/cron_expressions.htm) |
| 10 | [https://indexoutofrange.com/Don't-do-it-now!-Part-6.-Hangfire-recurring-jobs/](https://indexoutofrange.com/Don't-do-it-now!-Part-6.-Hangfire-recurring-jobs/) |
| 11 | [https://github.com/HangfireIO/Cronos](https://github.com/HangfireIO/Cronos) |
| 12 | [https://crates.io/crates/croner/1.0.2](https://crates.io/crates/croner/1.0.2) |
| 13 | [https://docs.rs/cron](https://docs.rs/cron) |
| 14 | [https://www.twilio.com/en-us/blog/developers/community/run-cron-jobs-rust](https://www.twilio.com/en-us/blog/developers/community/run-cron-jobs-rust) |
| 15 | [https://github.com/cloudflare/saffron](https://github.com/cloudflare/saffron) |
| 16 | [https://news.ycombinator.com/item?id=41654723](https://news.ycombinator.com/item?id=41654723) |
| 17 | [https://www.scalent.io/golang/golang-cron-job-example/](https://www.scalent.io/golang/golang-cron-job-example/) |
| 18 | [https://github.com/reugn/go-quartz](https://github.com/reugn/go-quartz) |
| 19 | [https://www.npmjs.com/package/croner](https://www.npmjs.com/package/croner) |
| 20 | [https://www.npmjs.com/package/cron](https://www.npmjs.com/package/cron) |
| 21 | [https://npm-compare.com/cron,node-cron,node-schedule](https://npm-compare.com/cron,node-cron,node-schedule) |
| 22 | [https://www.npmjs.com/package/cron-parser](https://www.npmjs.com/package/cron-parser) |

---
*This table is based on analysis of official documentation and community knowledge. For the most accurate details, please refer to the documentation of the respective libraries.*