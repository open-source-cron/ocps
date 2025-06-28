# OCPS: The Open Cron Pattern Specification

**Status: DRAFT**

## 1. Abstract

OCPS (Open Cron Pattern Specification) is an open standard for cron expressions that defines a well-defined, backward-compatible superset of the Vixie cron format. The goal of OCPS is to provide a reliable, feature-rich, and incrementally adoptable standard for developers and scheduling applications.

This repository contains the official versioned specifications for OCPS.

## 2. The OCPS Principle: Incremental Introduction

The core principle behind OCPS is **Incremental Introduction & Backward Compatibility**. OCPS is designed to be adopted in stages, ensuring that any pattern valid in a previous version remains valid and behaves identically in all subsequent versions.

This approach provides a clear and stable evolution path:

* **OCPS 1.0:** The foundational baseline, offering 100% compatibility with the widely-used Vixie cron standard.
* **OCPS 1.1 and beyond:** Each subsequent version introduces a new, self-contained feature set (like second-level precision or advanced calendar modifiers) without altering existing behavior.

This guarantees that implementers can adopt the level of complexity they need, and users can rely on consistent behavior across any OCPS-compliant tool.

## 3. Specification Versions

The official specification documents are located in the `/versions` directory.

| Version | Status | Title | Summary | Link |
| :--- | :--- | :--- | :--- | :--- |
| **1.4** | DRAFT | Logical & Implementation Semantics | Adds configurable AND/OR logic and defines the `?` character. | [OCPS 1.4](./versions/OCPS-1.4.md) |
| **1.3** | DRAFT | Context-Sensitive Modifiers | Adds the `W` (Closest Weekday) modifier. | [OCPS 1.3](./versions/OCPS-1.3.md) |
| **1.2** | DRAFT | Advanced Calendar Scheduling | Adds the `L` (Last) and `#` (Nth) modifiers. | [OCPS 1.2](./versions/OCPS-1.2.md) |
| **1.1** | DRAFT | High-Level Abstractions | Adds optional second-level precision and predefined nicknames (`@daily`, etc.). | [OCPS 1.1](./versions/OCPS-1.1.md) |
| **1.0** | DRAFT | The Vixie Cron Baseline | The foundational standard, 100% compatible with Vixie cron. | [OCPS 1.0](./versions/OCPS-1.0.md) |

## 4. Conformance

Each specification document contains a "Conformance" section detailing the requirements for an implementation to claim compliance with that specific version of OCPS.

## 5. Contributing

This project is in its draft stages. Contributions, suggestions, and feedback are welcome. Please open an issue to start a discussion.
