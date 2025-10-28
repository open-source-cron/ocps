# OCPS: The Open Cron Pattern Specification

**Status: 1.0 RELEASED**

## 1\. Abstract

OCPS (Open Cron Pattern Specification) is an open specification that aims to resolve the long-standing fragmentation and ambiguity in cron expression syntax. It defines a well-defined, backward-compatible superset of the Vixie-cron format. The goal of OCPS is to provide a reliable, feature-rich, and incrementally adoptable standard that allows developers to write portable and predictable schedules across any compliant tool.

This repository contains the official versioned specifications for OCPS.

-----

## 2\. Background: The Evolution of Cron

The `cron` utility has a long history with several evolutionary paths. Understanding this history is key to understanding why OCPS is structured the way it is.

  * **The Origin (AT\&T Cron):** The original cron daemon was developed at Bell Labs and was part of AT\&T's Unix. It was simple and effective but lacked many features now considered standard.

  * **The Formal Standard (POSIX):** The POSIX standard later defined a formal specification for `cron`. However, this standard is very minimal. It mandates the basic five-field format but does not include widely used features like step values (`*/5`), ranges of values (`1-5`), or names for months and days of the week (`JAN`, `MON`). An implementation can be POSIX-compliant without being very user-friendly.

  * **The De Facto Standard (Vixie/ISC Cron):** In 1987, Paul Vixie created a new implementation, `vixie-cron`, which added the user-friendly features missing from the POSIX standard. This version became immensely popular and is the default cron implementation on most Linux distributions and BSD systems. It later became known as ISC Cron. Because of its ubiquity, Vixie cron represents the syntax that most developers and system administrators know and expect.

  * **Divergent Implementations (e.g., Quartz)**: Schedulers like Quartz, originating in the Java ecosystem, introduced significant variations to the cron format. In addition to new modifiers like `L`, `W`, and `#`, Quartz altered core behaviors. It enforces a logical `AND` between the day-of-month and day-of-week fields, which requires using a `?` character to deactivate one field. Furthermore, it uses a `1-7` numbering for days of the week (Sunday=1), diverging from the Vixie cron standard where Sunday is `0` or `7`. This design choice, rooted in Java's Calendar class, has propagated to other libraries, even outside of Java, further fragmenting the cron syntax landscape.

### Why OCPS is based on Vixie Cron

OCPS chooses Vixie cron as its baseline (OCPS 1.0) because it represents the most common and widely understood cron syntax, which builds upon the minimal POSIX standard with essential, user-friendly features. By starting with a 100% Vixie-compatible foundation, OCPS ensures that the vast majority of existing cron patterns work as expected, providing a stable and familiar base upon which to incrementally add new, powerful features from other implementations.

-----

## 3\. The OCPS Principles

The core principles behind OCPS are **Incremental Introduction** and **Backward Compatibility**. OCPS is designed to be adopted in stages, ensuring that any pattern valid in a previous version remains valid and behaves identically in all subsequent versions. This guarantees that implementers can adopt the level of complexity they need, and users can rely on consistent behavior across any OCPS-compliant tool.

-----

## 4\. Repository Layout

This repository is structured to provide two views of the specification:

  * **/increments**: This directory contains documents describing only the *new features* introduced in each version. These are useful for quickly seeing what has changed. Works in progress for future versions are also located here and named according to their state until being finalized (e.g., `OCPS-increment-1.5.md`).

  * **/specifications**: This directory contains the *full, consolidated* specification for each version. These documents are the canonical reference for implementers. A new specification file is only published here once its corresponding increment has been finalized.

-----

## 5\. Increments and Full Specifications

The official specification documents are linked below.

Progress for each iteration is tracked through [milestones](https://github.com/open-source-cron/ocps/milestones).

| Version | Status | Title | Incremental Change | Full Specification |
| :--- | :---: | :--- | :--- | :--- |
| **1.4** | DRAFT | Logical & Implementation Semantics | [1.4 Increment](./increments/OCPS-increment-1.4.md) | N/A |
| **1.3** | DRAFT | Advanced Calendar Scheduling | [1.3 Increment](./increments/OCPS-increment-1.3.md) | N/A |
| **1.2** | DRAFT | Second and Year-Level Precision | [1.2 Increment](./increments/OCPS-increment-1.2.md) | N/A |
| **1.1** | DRAFT | Pre-defined Schedules | [1.1 Increment](./increments/OCPS-increment-1.1.md) | N/A |
| **1.0** | **FINAL** | The Baseline | N/A | **[OCPS 1.0](./specifications/OCPS-1.0.md)** |

-----

## 6\. Conformance & Implementations

Each full specification document contains a "Conformance" section detailing the requirements for an implementation to claim compliance with that version.

For a list of known libraries and their current conformance levels, please see the **[Implementation Conformance Matrix](./CONFORMANCE.md)**.

-----

## 7\. Contributing

This project is in its draft stages. Contributions, suggestions, and feedback are welcome. Please open an issue to start a discussion.

### Contribution Guidelines

All issues regarding the specification and organization of OCPS are handled as issues on this repository (https://github.com/open-source-cron/ocps).

The **finalization of the next iteration** of the specification is handled as a pull request that creates a full specification document from its corresponding draft increment. All discussions pertinent to this finalization should occur within that pull request.

Discussions on **future iterations, new feature requests, or proposed problems/improvements** are handled as separate issues and should be tagged appropriately (e.g., `feature-request`, `discussion`, `problem`, `enhancement`). When proposing changes to future iterations, it is **highly encouraged to open a pull request** with your proposed changes to facilitate discussion and review.

Changes to this **README** should always be submitted as a pull request.

### Updating the Conformance Matrix

The Implementation Conformance Matrix is automatically generated from the `data/conformance.json` file. To propose changes, please edit `data/conformance.json` and submit a pull request.

If you wish to regenerate the `CONFORMANCE.md` file locally to preview your changes, you can run the generation script. This requires Deno to be installed.

**From the root of the repository:**
`cd scripts && deno run -A generate-conformance-report.ts`
