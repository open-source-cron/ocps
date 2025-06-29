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
| **POSIX `cron`** | 🟡 | ❌ | ❌ | ❌ | ❌ | The official standard. Does not support steps (`/`) or month/day names. |
| **vixie-cron** | ✅ | ❌ | ❌ | ❌ | ❌ | The de facto standard and baseline for OCPS 1.0. |

### System Cron Daemons

| Daemon | OCPS 1.0 | OCPS 1.1 | OCPS 1.2 | OCPS 1.3 | OCPS 1.4 | Notes |
| :--- | :---: | :---: | :---: | :---: | :---: | :--- |
| **cronie** | ✅ | 🟡 | ❌ | ❌ | ❌ | Supports nicknames (`@reboot`, `@hourly`). Supports seconds in `/etc/cron.d` files. |
| **isc-cron** | ✅ | ❌ | ❌ | ❌ | ❌ | A fork of vixie-cron with similar features. |
| **dcron** | ✅ | ❌ | ❌ | ❌ | ❌ | A simple and lightweight implementation. |

### Java Libraries

| Library | OCPS 1.0 | OCPS 1.1 | OCPS 1.2 | OCPS 1.3 | OCPS 1.4 | Notes |
| :--- | :---: | :---: | :---: | :---: | :---: | :--- |
| **Spring Framework (`@Scheduled`)** | 🟡 | 🟡 | ✅ | ✅ | 🟡 | Supports seconds, `L`, `W`, `#`. Uses `AND` logic by default. `?` is a wildcard. No nicknames. |
| **Quartz** | 🟡 | ❌ | 🟡 | ✅ | 🟡 | Original source for `L`, `W`, `#`, `?`. Does not follow `OR` logic. No nicknames. |

### .NET Libraries

| Library | OCPS 1.0 | OCPS 1.1 | OCPS 1.2 | OCPS 1.3 | OCPS 1.4 | Notes |
| :--- | :---: | :---: | :---: | :---: | :---: | :--- |
| **Hangfire** | ✅ | 🟡 | ❌ | ❌ | 🟡 | Uses `Cronos`. Supports seconds. `AND` logic for date fields. |
| **Cronos** | ✅ | 🟡 | ❌ | ❌ | 🟡 | Supports seconds and nicknames. Uses `AND` logic for date fields. No `L`, `W`, `#`. |
| **Coravel** | ✅ | ❌ | ❌ | ❌ | ❌ | Provides basic cron string support but encourages a fluent API. |

### Rust Libraries

| Library | OCPS 1.0 | OCPS 1.1 | OCPS 1.2 | OCPS 1.3 | OCPS 1.4 | Notes |
| :--- | :---: | :---: | :---: | :---: | :---: | :--- |
| **croner-rust** | ✅ | ✅ | ✅ | ✅ | ✅ | Full support for all specified features. |
| **cron** | ✅ | 🟡 | ❌ | ❌ | ❌ | Supports seconds but not nicknames or other extended features. |
| **saffron** | 🟡 | ❌ | 🟡 | ✅ | 🟡 | Quartz-like. Does not support `OR` logic or seconds. Weekday numbering differs. |

### Go Libraries

| Library | OCPS 1.0 | OCPS 1.1 | OCPS 1.2 | OCPS 1.3 | OCPS 1.4 | Notes |
| :--- | :---: | :---: | :---: | :---: | :---: | :--- |
| **gocron (`robfig/cron`)** | ✅ | 🟡 | ❌ | ❌ | 🟡 | Supports seconds & nicknames. `?` is alias for `*`. No `L`, `W`, `#`. |
| **go-quartz** | 🟡 | ❌ | ❌ | ❌ | ❌ | Quartz-inspired, but lacks most extended character support. |

### JavaScript / TypeScript Libraries

| Library | OCPS 1.0 | OCPS 1.1 | OCPS 1.2 | OCPS 1.3 | OCPS 1.4 | Notes |
| :--- | :---: | :---: | :---: | :---: | :---: | :--- |
| **croner (JS/TS)** | ✅ | ✅ | ✅ | ❌ | 🟡 | `W` is not supported. `?` is for substitution, not wildcard. `AND` mode is supported. |
| **node-schedule** | ✅ | 🟡 | ❌ | ❌ | ❌ | Supports seconds but not nicknames or other extended syntax. |
| **node-cron** | ✅ | ❌ | ❌ | ❌ | ❌ | |
| **cron (npm)** | ✅ | ❌ | ❌ | ❌ | ❌ | |

---
*This table is based on analysis of official documentation and community knowledge. For the most accurate details, please refer to the documentation of the respective libraries.*
