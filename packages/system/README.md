# System

## Overview

The System is the core directory within the @pap-it ecosystem, serving as the foundational layer for leveraging custom elements across various projects. It hosts essential components and utilities designed to streamline development and ensure uniformity across the ecosystem.

## Usage

This directory is reserved for system-level components and utilities that underpin the functionality of our UI elements. Despite the presence of certain directories slated for reorganization or removal, the System folder contains critical resources:

- `utils`: The central component offering a suite of utilities that support the functionality of other custom elements within the ecosystem.
- `react`: A Higher-Order Component (HOC) wrapper, enabling seamless integration of web components within React applications, facilitating their use in a React-centric development environment.
- `doc`: Temporarily houses documentation aids for components, aiming to enhance the developer experience by providing clear, visual representations of components (e.g., the `<doc-card>` element for aesthetically pleasing documentation boxes). It's noted for future consolidation as part of a broader organizational strategy.
- `showcase`: Intended for demonstration purposes, this directory aligns with design representations in Figma, enhancing the ease of visual component comparison. Plans are underway to integrate Showcase more cohesively into the documentation framework.

## Guidelines

- **Stability**: Changes to the System directory should be approached with caution. Its foundational role within the ecosystem means modifications can have wide-reaching implications.
- **Understanding**: Prior to initiating changes, ensure a comprehensive understanding of the component's purpose and its impact on the ecosystem. Modifications should only be made with a clear rationale and an awareness of the broader system architecture.
- **Collaboration**: Engage with the development team to discuss potential changes, ensuring alignment with overall project goals and maintaining system integrity.
